<?php
// CRUD dos marcos da trajetória (timeline).
//   GET  ?action=list   (público) — só publicados
//   GET  ?action=all    (admin)
//   POST ?action=create | update | delete   (admin + CSRF)

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

apply_cors();
start_session();

function milestone_row_to_api(array $r): array
{
    return [
        'id' => (int)$r['id'],
        'year_pt' => $r['year_pt'],
        'year_en' => $r['year_en'],
        'title_pt' => $r['title_pt'],
        'title_en' => $r['title_en'],
        'desc_pt' => $r['desc_pt'],
        'desc_en' => $r['desc_en'],
        'techs' => $r['techs'] !== null ? (json_decode($r['techs'], true) ?: []) : [],
        'ordem' => (int)$r['ordem'],
        'publicado' => (bool)(int)$r['publicado'],
    ];
}

function read_milestone_payload(): array
{
    $b = read_json_body();

    $year = is_array($b['year'] ?? null) ? $b['year'] : [];
    $title = is_array($b['title'] ?? null) ? $b['title'] : [];
    $desc = is_array($b['desc'] ?? null) ? $b['desc'] : [];

    $yearPt = str_or_null($year['pt'] ?? '');
    $yearEn = str_or_null($year['en'] ?? '');
    if ($yearPt === null && $yearEn === null) {
        fail(422, 'Informe o ano (pelo menos um idioma).');
    }

    return [
        'year_pt' => $yearPt ?? $yearEn,
        'year_en' => $yearEn ?? $yearPt,
        'title_pt' => str_or_null($title['pt'] ?? ''),
        'title_en' => str_or_null($title['en'] ?? ''),
        'desc_pt' => str_or_null($desc['pt'] ?? ''),
        'desc_en' => str_or_null($desc['en'] ?? ''),
        'techs' => json_strings($b['techs'] ?? []),
        'publicado' => !empty($b['publicado']) ? 1 : 0,
    ];
}

function fetch_milestone_by_id(int $id): array
{
    $stmt = db()->prepare('SELECT * FROM milestones WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) {
        fail(404, 'Marco não encontrado.');
    }
    return milestone_row_to_api($row);
}

$action = $_GET['action'] ?? '';

if ($action === 'list') {
    require_method('GET');
    $rows = db()->query('SELECT * FROM milestones WHERE publicado = 1 ORDER BY ordem ASC, id ASC')->fetchAll();
    send_json(200, ['milestones' => array_map('milestone_row_to_api', $rows)]);
}

if ($action === 'all') {
    require_method('GET');
    require_auth();
    $rows = db()->query('SELECT * FROM milestones ORDER BY ordem ASC, id ASC')->fetchAll();
    send_json(200, ['milestones' => array_map('milestone_row_to_api', $rows)]);
}

if ($action === 'create') {
    require_method('POST');
    require_auth();
    require_csrf();
    $p = read_milestone_payload();
    $stmt = db()->prepare(
        'INSERT INTO milestones (year_pt, year_en, title_pt, title_en, desc_pt, desc_en, techs, publicado)
         VALUES (?,?,?,?,?,?,?,?)'
    );
    $stmt->execute([
        $p['year_pt'], $p['year_en'], $p['title_pt'], $p['title_en'],
        $p['desc_pt'], $p['desc_en'], $p['techs'], $p['publicado'],
    ]);
    send_json(201, ['milestone' => fetch_milestone_by_id((int)db()->lastInsertId())]);
}

if ($action === 'update') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $p = read_milestone_payload();
    $stmt = db()->prepare(
        'UPDATE milestones SET year_pt=?, year_en=?, title_pt=?, title_en=?, desc_pt=?, desc_en=?, techs=?, publicado=?
         WHERE id=?'
    );
    $stmt->execute([
        $p['year_pt'], $p['year_en'], $p['title_pt'], $p['title_en'],
        $p['desc_pt'], $p['desc_en'], $p['techs'], $p['publicado'], $id,
    ]);
    send_json(200, ['milestone' => fetch_milestone_by_id($id)]);
}

if ($action === 'delete') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $stmt = db()->prepare('DELETE FROM milestones WHERE id = ?');
    $stmt->execute([$id]);
    send_json(200, ['ok' => true]);
}

if ($action === 'reorder') {
    require_method('POST');
    require_auth();
    require_csrf();
    reorder_table('milestones', read_reorder_ids());
    send_json(200, ['ok' => true]);
}

fail(404, 'Ação desconhecida.');
