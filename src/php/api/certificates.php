<?php
// CRUD de certificados.
//   GET  ?action=list            (público) — só publicados
//   GET  ?action=get&slug=...    (público)
//   GET  ?action=all             (admin)
//   POST ?action=create          (admin + CSRF)
//   POST ?action=update          (admin + CSRF)
//   POST ?action=delete          (admin + CSRF)

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

apply_cors();
start_session();

/** Linha do banco -> formato da API. */
function certificate_row_to_api(array $r): array
{
    return [
        'id' => (int)$r['id'],
        'slug' => $r['slug'],
        'course' => $r['course'],
        'issuer' => $r['issuer'],
        'date' => $r['data_curso'],
        'file' => $r['file'],
        'image' => $r['image'],
        'descricao_pt' => $r['descricao_pt'],
        'descricao_en' => $r['descricao_en'],
        'skills' => $r['skills'] !== null ? (json_decode($r['skills'], true) ?: []) : [],
        'ordem' => (int)$r['ordem'],
        'publicado' => (bool)(int)$r['publicado'],
    ];
}

/** Normaliza o payload do painel. */
function read_certificate_payload(): array
{
    $b = read_json_body();

    $course = trim((string)($b['course'] ?? ''));
    if ($course === '') {
        fail(422, 'O nome do curso é obrigatório.');
    }

    $desc = is_array($b['descricao'] ?? null) ? $b['descricao'] : [];

    return [
        'course' => $course,
        'issuer' => str_or_null($b['issuer'] ?? '') ?? '',
        'data_curso' => str_or_null($b['date'] ?? ''),
        'file' => str_or_null($b['file'] ?? ''),
        'image' => str_or_null($b['image'] ?? ''),
        'descricao_pt' => str_or_null($desc['pt'] ?? ''),
        'descricao_en' => str_or_null($desc['en'] ?? ''),
        'skills' => json_strings($b['skills'] ?? []),
        'publicado' => !empty($b['publicado']) ? 1 : 0,
    ];
}

function fetch_certificate_by_id(int $id): array
{
    $stmt = db()->prepare('SELECT * FROM certificates WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) {
        fail(404, 'Certificado não encontrado.');
    }
    return certificate_row_to_api($row);
}

$action = $_GET['action'] ?? '';

if ($action === 'list') {
    require_method('GET');
    $rows = db()->query('SELECT * FROM certificates WHERE publicado = 1 ORDER BY ordem ASC, id DESC')->fetchAll();
    send_json(200, ['certificates' => array_map('certificate_row_to_api', $rows)]);
}

if ($action === 'get') {
    require_method('GET');
    $slug = (string)($_GET['slug'] ?? '');
    $stmt = db()->prepare('SELECT * FROM certificates WHERE slug = ? LIMIT 1');
    $stmt->execute([$slug]);
    $row = $stmt->fetch();
    if (!$row) {
        fail(404, 'Certificado não encontrado.');
    }
    send_json(200, ['certificate' => certificate_row_to_api($row)]);
}

if ($action === 'all') {
    require_method('GET');
    require_auth();
    $rows = db()->query('SELECT * FROM certificates ORDER BY ordem ASC, id DESC')->fetchAll();
    send_json(200, ['certificates' => array_map('certificate_row_to_api', $rows)]);
}

if ($action === 'create') {
    require_method('POST');
    require_auth();
    require_csrf();
    $p = read_certificate_payload();
    $slug = unique_slug('certificates', slugify_php($p['course']));
    $stmt = db()->prepare(
        'INSERT INTO certificates
            (slug, course, issuer, data_curso, file, image, descricao_pt, descricao_en, skills, publicado)
         VALUES (?,?,?,?,?,?,?,?,?,?)'
    );
    $stmt->execute([
        $slug, $p['course'], $p['issuer'], $p['data_curso'], $p['file'], $p['image'],
        $p['descricao_pt'], $p['descricao_en'], $p['skills'], $p['publicado'],
    ]);
    send_json(201, ['certificate' => fetch_certificate_by_id((int)db()->lastInsertId())]);
}

if ($action === 'update') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $p = read_certificate_payload();
    $stmt = db()->prepare(
        'UPDATE certificates SET
            course=?, issuer=?, data_curso=?, file=?, image=?,
            descricao_pt=?, descricao_en=?, skills=?, publicado=?
         WHERE id=?'
    );
    $stmt->execute([
        $p['course'], $p['issuer'], $p['data_curso'], $p['file'], $p['image'],
        $p['descricao_pt'], $p['descricao_en'], $p['skills'], $p['publicado'], $id,
    ]);
    send_json(200, ['certificate' => fetch_certificate_by_id($id)]);
}

if ($action === 'delete') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $stmt = db()->prepare('DELETE FROM certificates WHERE id = ?');
    $stmt->execute([$id]);
    send_json(200, ['ok' => true]);
}

if ($action === 'reorder') {
    require_method('POST');
    require_auth();
    require_csrf();
    reorder_table('certificates', read_reorder_ids());
    send_json(200, ['ok' => true]);
}

fail(404, 'Ação desconhecida.');
