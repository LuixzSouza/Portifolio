<?php
// Helpers compartilhados pelos endpoints da API (resposta, sessão, CORS, CSRF, auth).

declare(strict_types=1);

require_once __DIR__ . '/db.php';

// Nunca exibir erros no corpo da resposta (evita vazar SQL/credenciais); só logar.
ini_set('display_errors', '0');
error_reporting(E_ALL);

set_exception_handler(function (Throwable $e): void {
    error_log('API error: ' . $e->getMessage());
    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
    }
    echo json_encode(['error' => 'Erro interno do servidor.']);
    exit;
});

function send_json(int $status, array $data): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(int $status, string $message): void
{
    send_json($status, ['error' => $message]);
}

function read_json_body(): array
{
    $data = json_decode(file_get_contents('php://input'), true);
    return is_array($data) ? $data : [];
}

function require_method(string $method): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== $method) {
        fail(405, 'Método não permitido.');
    }
}

/** CORS: mesma origem em produção (allowed_origin vazio); libera a origem do dev se configurada. */
function apply_cors(): void
{
    $allowed = get_config()['allowed_origin'] ?? '';
    if ($allowed !== '' && ($_SERVER['HTTP_ORIGIN'] ?? '') === $allowed) {
        header("Access-Control-Allow-Origin: {$allowed}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
    }
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'httponly' => true,
        'secure' => $secure,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function is_authenticated(): bool
{
    return !empty($_SESSION['admin_id']);
}

function require_auth(): void
{
    if (!is_authenticated()) {
        fail(401, 'Não autenticado.');
    }
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

/** Exige o token CSRF (header X-CSRF-Token) nas operações de escrita. */
function require_csrf(): void
{
    $sent = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!is_string($sent) || !hash_equals($_SESSION['csrf'] ?? '', $sent)) {
        fail(403, 'Token CSRF inválido.');
    }
}

// --- Helpers de payload, compartilhados pelos endpoints CRUD ---

/** Trim; devolve null se vazio (para colunas NULL). */
function str_or_null($v): ?string
{
    $v = trim((string)$v);
    return $v !== '' ? $v : null;
}

/** Array de strings limpas (trim + remove vazios), reindexado. */
function clean_string_array($arr): array
{
    if (!is_array($arr)) {
        return [];
    }
    return array_values(array_filter(
        array_map(fn($t) => trim((string)$t), $arr),
        fn($t) => $t !== ''
    ));
}

/** Serializa um array de strings como JSON para colunas JSON. */
function json_strings($arr): string
{
    return json_encode(clean_string_array($arr), JSON_UNESCAPED_UNICODE);
}

/** Slug URL-safe a partir de um texto (espelha o slugify do front). */
function slugify_php(string $input): string
{
    $s = function_exists('mb_strtolower') ? mb_strtolower($input, 'UTF-8') : strtolower($input);
    $accents = [
        'á' => 'a', 'à' => 'a', 'â' => 'a', 'ã' => 'a', 'ä' => 'a', 'å' => 'a',
        'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e',
        'í' => 'i', 'ì' => 'i', 'î' => 'i', 'ï' => 'i',
        'ó' => 'o', 'ò' => 'o', 'ô' => 'o', 'õ' => 'o', 'ö' => 'o',
        'ú' => 'u', 'ù' => 'u', 'û' => 'u', 'ü' => 'u',
        'ç' => 'c', 'ñ' => 'n', 'ý' => 'y', 'ÿ' => 'y',
    ];
    $s = strtr($s, $accents);
    $s = preg_replace('/[^\x00-\x7f]/', '', $s) ?? '';     // remove não-ASCII restante
    $s = preg_replace('/[^a-z0-9]+/', '-', $s) ?? '';
    $s = trim($s, '-');
    return $s !== '' ? $s : 'item';
}

/**
 * Reordena uma tabela com coluna `ordem`: recebe os ids na nova ordem e grava
 * 0,1,2... em `ordem`. O nome da tabela é validado contra uma allowlist porque
 * não é parametrizável em prepared statements.
 */
function reorder_table(string $table, array $ids): void
{
    $allowed = ['projects', 'certificates', 'testimonials', 'milestones', 'services', 'skill_groups'];
    if (!in_array($table, $allowed, true)) {
        fail(500, 'Tabela inválida para reordenar.');
    }
    $ids = array_values(array_filter(
        array_map('intval', $ids),
        fn($id) => $id > 0
    ));
    if (empty($ids)) {
        fail(422, 'Lista de ids vazia.');
    }
    db()->beginTransaction();
    $stmt = db()->prepare("UPDATE {$table} SET ordem = ? WHERE id = ?");
    foreach ($ids as $i => $id) {
        $stmt->execute([$i, $id]);
    }
    db()->commit();
}

/** Lê os ids de reordenação do corpo da requisição. */
function read_reorder_ids(): array
{
    $ids = read_json_body()['ids'] ?? [];
    return is_array($ids) ? $ids : [];
}

/**
 * Garante unicidade do slug numa tabela acrescentando -2, -3... e
 * ignorando o próprio id (no update). O nome da tabela é validado contra
 * uma allowlist porque não é parametrizável em prepared statements.
 */
function unique_slug(string $table, string $base, int $ignoreId = 0): string
{
    $allowed = ['projects', 'certificates', 'services'];
    if (!in_array($table, $allowed, true)) {
        fail(500, 'Tabela inválida para slug.');
    }
    $slug = $base;
    $i = 1;
    while (true) {
        $stmt = db()->prepare("SELECT id FROM {$table} WHERE slug = ? AND id <> ? LIMIT 1");
        $stmt->execute([$slug, $ignoreId]);
        if (!$stmt->fetch()) {
            return $slug;
        }
        $i++;
        $slug = $base . '-' . $i;
    }
}
