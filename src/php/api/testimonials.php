<?php
// CRUD de depoimentos.
//   GET  ?action=list   (público) — só publicados
//   GET  ?action=all    (admin)
//   POST ?action=create | update | delete   (admin + CSRF)

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

apply_cors();
start_session();

function testimonial_row_to_api(array $r): array
{
    return [
        'id' => (int)$r['id'],
        'name' => $r['nome'],
        'role_pt' => $r['role_pt'],
        'role_en' => $r['role_en'],
        'quote_pt' => $r['quote_pt'],
        'quote_en' => $r['quote_en'],
        'image' => $r['image'],
        'ordem' => (int)$r['ordem'],
        'publicado' => (bool)(int)$r['publicado'],
    ];
}

function read_testimonial_payload(): array
{
    $b = read_json_body();

    $nome = trim((string)($b['name'] ?? ''));
    if ($nome === '') {
        fail(422, 'O nome é obrigatório.');
    }

    $role = is_array($b['role'] ?? null) ? $b['role'] : [];
    $quote = is_array($b['quote'] ?? null) ? $b['quote'] : [];

    return [
        'nome' => $nome,
        'role_pt' => str_or_null($role['pt'] ?? ''),
        'role_en' => str_or_null($role['en'] ?? ''),
        'quote_pt' => str_or_null($quote['pt'] ?? ''),
        'quote_en' => str_or_null($quote['en'] ?? ''),
        'image' => str_or_null($b['image'] ?? ''),
        'publicado' => !empty($b['publicado']) ? 1 : 0,
    ];
}

function fetch_testimonial_by_id(int $id): array
{
    $stmt = db()->prepare('SELECT * FROM testimonials WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) {
        fail(404, 'Depoimento não encontrado.');
    }
    return testimonial_row_to_api($row);
}

$action = $_GET['action'] ?? '';

if ($action === 'list') {
    require_method('GET');
    $rows = db()->query('SELECT * FROM testimonials WHERE publicado = 1 ORDER BY ordem ASC, id DESC')->fetchAll();
    send_json(200, ['testimonials' => array_map('testimonial_row_to_api', $rows)]);
}

if ($action === 'all') {
    require_method('GET');
    require_auth();
    $rows = db()->query('SELECT * FROM testimonials ORDER BY ordem ASC, id DESC')->fetchAll();
    send_json(200, ['testimonials' => array_map('testimonial_row_to_api', $rows)]);
}

if ($action === 'create') {
    require_method('POST');
    require_auth();
    require_csrf();
    $p = read_testimonial_payload();
    $stmt = db()->prepare(
        'INSERT INTO testimonials (nome, role_pt, role_en, quote_pt, quote_en, image, publicado)
         VALUES (?,?,?,?,?,?,?)'
    );
    $stmt->execute([
        $p['nome'], $p['role_pt'], $p['role_en'], $p['quote_pt'], $p['quote_en'], $p['image'], $p['publicado'],
    ]);
    send_json(201, ['testimonial' => fetch_testimonial_by_id((int)db()->lastInsertId())]);
}

if ($action === 'update') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $p = read_testimonial_payload();
    $stmt = db()->prepare(
        'UPDATE testimonials SET nome=?, role_pt=?, role_en=?, quote_pt=?, quote_en=?, image=?, publicado=?
         WHERE id=?'
    );
    $stmt->execute([
        $p['nome'], $p['role_pt'], $p['role_en'], $p['quote_pt'], $p['quote_en'], $p['image'], $p['publicado'], $id,
    ]);
    send_json(200, ['testimonial' => fetch_testimonial_by_id($id)]);
}

if ($action === 'delete') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $stmt = db()->prepare('DELETE FROM testimonials WHERE id = ?');
    $stmt->execute([$id]);
    send_json(200, ['ok' => true]);
}

if ($action === 'reorder') {
    require_method('POST');
    require_auth();
    require_csrf();
    reorder_table('testimonials', read_reorder_ids());
    send_json(200, ['ok' => true]);
}

fail(404, 'Ação desconhecida.');
