<?php
// CRUD de serviços (páginas /services/[slug]).
//   GET  ?action=list           (público) — só publicados
//   GET  ?action=get&slug=...   (público)
//   GET  ?action=all            (admin)
//   POST ?action=create | update | delete   (admin + CSRF)

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

apply_cors();
start_session();

/** Decodifica uma coluna JSON, devolvendo array vazio se nula/ inválida. */
function service_json(?string $v): array
{
    return $v !== null ? (json_decode($v, true) ?: []) : [];
}

function service_row_to_api(array $r): array
{
    return [
        'id' => (int)$r['id'],
        'slug' => $r['slug'],
        'n' => $r['n'],
        'image' => $r['image'],
        'accent' => $r['accent'],
        'title_pt' => $r['title_pt'],
        'title_en' => $r['title_en'],
        'tagline_pt' => $r['tagline_pt'],
        'tagline_en' => $r['tagline_en'],
        'intro_pt' => $r['intro_pt'],
        'intro_en' => $r['intro_en'],
        'forwho_pt' => $r['forwho_pt'],
        'forwho_en' => $r['forwho_en'],
        'process' => service_json($r['process']),
        'includes' => service_json($r['includes']),
        'tags' => service_json($r['tags']),
        'meta_title_pt' => $r['meta_title_pt'],
        'meta_title_en' => $r['meta_title_en'],
        'meta_description_pt' => $r['meta_description_pt'],
        'meta_description_en' => $r['meta_description_en'],
        'ordem' => (int)$r['ordem'],
        'publicado' => (bool)(int)$r['publicado'],
    ];
}

/** Par bilíngue {pt,en} a partir de um valor cru; null se ambos vazios. */
function bilingual_or_null($v): ?array
{
    if (!is_array($v)) {
        return null;
    }
    $pt = trim((string)($v['pt'] ?? ''));
    $en = trim((string)($v['en'] ?? ''));
    if ($pt === '' && $en === '') {
        return null;
    }
    return ['pt' => $pt, 'en' => $en];
}

/** Normaliza process: [{title:{pt,en}, desc:{pt,en}}]. */
function normalize_process($raw): array
{
    if (!is_array($raw)) {
        return [];
    }
    $out = [];
    foreach ($raw as $step) {
        $title = bilingual_or_null($step['title'] ?? null);
        $desc = bilingual_or_null($step['desc'] ?? null);
        if ($title === null && $desc === null) {
            continue;
        }
        $out[] = [
            'title' => $title ?? ['pt' => '', 'en' => ''],
            'desc' => $desc ?? ['pt' => '', 'en' => ''],
        ];
    }
    return $out;
}

/** Normaliza includes: [{pt,en}]. */
function normalize_includes($raw): array
{
    if (!is_array($raw)) {
        return [];
    }
    $out = [];
    foreach ($raw as $item) {
        $pair = bilingual_or_null($item);
        if ($pair !== null) {
            $out[] = $pair;
        }
    }
    return $out;
}

function read_service_payload(): array
{
    $b = read_json_body();

    $title = is_array($b['title'] ?? null) ? $b['title'] : [];
    $titlePt = str_or_null($title['pt'] ?? '');
    $titleEn = str_or_null($title['en'] ?? '');
    if ($titlePt === null && $titleEn === null) {
        fail(422, 'Informe o título do serviço.');
    }

    $tagline = is_array($b['tagline'] ?? null) ? $b['tagline'] : [];
    $intro = is_array($b['intro'] ?? null) ? $b['intro'] : [];
    $forWho = is_array($b['forWho'] ?? null) ? $b['forWho'] : [];
    $metaTitle = is_array($b['metaTitle'] ?? null) ? $b['metaTitle'] : [];
    $metaDesc = is_array($b['metaDescription'] ?? null) ? $b['metaDescription'] : [];

    return [
        'titleForSlug' => $titlePt ?? $titleEn,
        'n' => str_or_null($b['n'] ?? ''),
        'image' => str_or_null($b['image'] ?? ''),
        'accent' => str_or_null($b['accent'] ?? ''),
        'title_pt' => $titlePt,
        'title_en' => $titleEn,
        'tagline_pt' => str_or_null($tagline['pt'] ?? ''),
        'tagline_en' => str_or_null($tagline['en'] ?? ''),
        'intro_pt' => str_or_null($intro['pt'] ?? ''),
        'intro_en' => str_or_null($intro['en'] ?? ''),
        'forwho_pt' => str_or_null($forWho['pt'] ?? ''),
        'forwho_en' => str_or_null($forWho['en'] ?? ''),
        'process' => json_encode(normalize_process($b['process'] ?? []), JSON_UNESCAPED_UNICODE),
        'includes' => json_encode(normalize_includes($b['includes'] ?? []), JSON_UNESCAPED_UNICODE),
        'tags' => json_strings($b['tags'] ?? []),
        'meta_title_pt' => str_or_null($metaTitle['pt'] ?? ''),
        'meta_title_en' => str_or_null($metaTitle['en'] ?? ''),
        'meta_description_pt' => str_or_null($metaDesc['pt'] ?? ''),
        'meta_description_en' => str_or_null($metaDesc['en'] ?? ''),
        'publicado' => !empty($b['publicado']) ? 1 : 0,
    ];
}

function fetch_service_by_id(int $id): array
{
    $stmt = db()->prepare('SELECT * FROM services WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) {
        fail(404, 'Serviço não encontrado.');
    }
    return service_row_to_api($row);
}

$action = $_GET['action'] ?? '';

if ($action === 'list') {
    require_method('GET');
    $rows = db()->query('SELECT * FROM services WHERE publicado = 1 ORDER BY ordem ASC, id ASC')->fetchAll();
    send_json(200, ['services' => array_map('service_row_to_api', $rows)]);
}

if ($action === 'get') {
    require_method('GET');
    $slug = (string)($_GET['slug'] ?? '');
    $stmt = db()->prepare('SELECT * FROM services WHERE slug = ? LIMIT 1');
    $stmt->execute([$slug]);
    $row = $stmt->fetch();
    if (!$row) {
        fail(404, 'Serviço não encontrado.');
    }
    send_json(200, ['service' => service_row_to_api($row)]);
}

if ($action === 'all') {
    require_method('GET');
    require_auth();
    $rows = db()->query('SELECT * FROM services ORDER BY ordem ASC, id ASC')->fetchAll();
    send_json(200, ['services' => array_map('service_row_to_api', $rows)]);
}

if ($action === 'create') {
    require_method('POST');
    require_auth();
    require_csrf();
    $p = read_service_payload();
    $slug = unique_slug('services', slugify_php($p['titleForSlug']));
    $stmt = db()->prepare(
        'INSERT INTO services
            (slug, n, image, accent, title_pt, title_en, tagline_pt, tagline_en, intro_pt, intro_en,
             forwho_pt, forwho_en, process, includes, tags,
             meta_title_pt, meta_title_en, meta_description_pt, meta_description_en, publicado)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    );
    $stmt->execute([
        $slug, $p['n'], $p['image'], $p['accent'], $p['title_pt'], $p['title_en'],
        $p['tagline_pt'], $p['tagline_en'], $p['intro_pt'], $p['intro_en'],
        $p['forwho_pt'], $p['forwho_en'], $p['process'], $p['includes'], $p['tags'],
        $p['meta_title_pt'], $p['meta_title_en'], $p['meta_description_pt'], $p['meta_description_en'], $p['publicado'],
    ]);
    send_json(201, ['service' => fetch_service_by_id((int)db()->lastInsertId())]);
}

if ($action === 'update') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $p = read_service_payload();
    $stmt = db()->prepare(
        'UPDATE services SET
            n=?, image=?, accent=?, title_pt=?, title_en=?, tagline_pt=?, tagline_en=?,
            intro_pt=?, intro_en=?, forwho_pt=?, forwho_en=?, process=?, includes=?, tags=?,
            meta_title_pt=?, meta_title_en=?, meta_description_pt=?, meta_description_en=?, publicado=?
         WHERE id=?'
    );
    $stmt->execute([
        $p['n'], $p['image'], $p['accent'], $p['title_pt'], $p['title_en'], $p['tagline_pt'], $p['tagline_en'],
        $p['intro_pt'], $p['intro_en'], $p['forwho_pt'], $p['forwho_en'], $p['process'], $p['includes'], $p['tags'],
        $p['meta_title_pt'], $p['meta_title_en'], $p['meta_description_pt'], $p['meta_description_en'], $p['publicado'], $id,
    ]);
    send_json(200, ['service' => fetch_service_by_id($id)]);
}

if ($action === 'delete') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $stmt = db()->prepare('DELETE FROM services WHERE id = ?');
    $stmt->execute([$id]);
    send_json(200, ['ok' => true]);
}

if ($action === 'reorder') {
    require_method('POST');
    require_auth();
    require_csrf();
    reorder_table('services', read_reorder_ids());
    send_json(200, ['ok' => true]);
}

fail(404, 'Ação desconhecida.');
