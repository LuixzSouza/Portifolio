<?php
// Textos de seção (chave/valor) — conteúdo livre bilíngue (about, hero, etc.).
//   GET  ?action=list          (público) — mapa { chave: {tipo, valor} }
//   GET  ?action=get&key=...   (público)
//   POST ?action=set           (admin + CSRF) — upsert por chave
//   POST ?action=delete        (admin + CSRF)

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

apply_cors();
start_session();

const CONTENT_TIPOS = ['text', 'list', 'facts'];

function content_row_to_api(array $r): array
{
    return [
        'chave' => $r['chave'],
        'tipo' => $r['tipo'],
        'valor' => $r['valor'] !== null ? json_decode($r['valor'], true) : null,
    ];
}

$action = $_GET['action'] ?? '';

if ($action === 'list') {
    require_method('GET');
    $rows = db()->query('SELECT * FROM section_content ORDER BY chave ASC')->fetchAll();
    $map = [];
    foreach ($rows as $r) {
        $item = content_row_to_api($r);
        $map[$item['chave']] = ['tipo' => $item['tipo'], 'valor' => $item['valor']];
    }
    send_json(200, ['content' => $map]);
}

if ($action === 'get') {
    require_method('GET');
    $key = (string)($_GET['key'] ?? '');
    $stmt = db()->prepare('SELECT * FROM section_content WHERE chave = ? LIMIT 1');
    $stmt->execute([$key]);
    $row = $stmt->fetch();
    if (!$row) {
        fail(404, 'Conteúdo não encontrado.');
    }
    send_json(200, ['content' => content_row_to_api($row)]);
}

if ($action === 'set') {
    require_method('POST');
    require_auth();
    require_csrf();
    $b = read_json_body();

    $chave = trim((string)($b['chave'] ?? ''));
    if ($chave === '') {
        fail(422, 'A chave é obrigatória.');
    }
    $tipo = (string)($b['tipo'] ?? 'text');
    if (!in_array($tipo, CONTENT_TIPOS, true)) {
        fail(422, 'Tipo inválido.');
    }
    if (!array_key_exists('valor', $b)) {
        fail(422, 'O valor é obrigatório.');
    }
    $valor = json_encode($b['valor'], JSON_UNESCAPED_UNICODE);

    $stmt = db()->prepare(
        'INSERT INTO section_content (chave, tipo, valor) VALUES (?,?,?)
         ON DUPLICATE KEY UPDATE tipo = VALUES(tipo), valor = VALUES(valor)'
    );
    $stmt->execute([$chave, $tipo, $valor]);

    $get = db()->prepare('SELECT * FROM section_content WHERE chave = ? LIMIT 1');
    $get->execute([$chave]);
    send_json(200, ['content' => content_row_to_api($get->fetch())]);
}

if ($action === 'delete') {
    require_method('POST');
    require_auth();
    require_csrf();
    $chave = trim((string)(read_json_body()['chave'] ?? ''));
    if ($chave === '') {
        fail(422, 'A chave é obrigatória.');
    }
    $stmt = db()->prepare('DELETE FROM section_content WHERE chave = ?');
    $stmt->execute([$chave]);
    send_json(200, ['ok' => true]);
}

fail(404, 'Ação desconhecida.');
