<?php
// CRUD de skills, agrupadas por categoria (skill_groups 1:N skills).
//   GET  ?action=list   (público) — grupos com skills aninhadas
//   GET  ?action=all    (admin)   — idêntico (skills não têm flag publicado)
//   POST ?action=create | update  (admin + CSRF) — grava o grupo e suas skills
//   POST ?action=delete            (admin + CSRF) — remove o grupo (cascade)

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

apply_cors();
start_session();

/** Monta os grupos com as skills aninhadas, na ordem definida. */
function fetch_skill_groups(): array
{
    $groups = db()->query('SELECT * FROM skill_groups ORDER BY ordem ASC, id ASC')->fetchAll();
    $skills = db()->query('SELECT * FROM skills ORDER BY ordem ASC, id ASC')->fetchAll();

    $byGroup = [];
    foreach ($skills as $s) {
        $byGroup[(int)$s['group_id']][] = [
            'id' => (int)$s['id'],
            'name' => $s['name'],
            'level' => (int)$s['level'],
        ];
    }

    return array_map(fn($g) => [
        'id' => (int)$g['id'],
        'category_pt' => $g['category_pt'],
        'category_en' => $g['category_en'],
        'ordem' => (int)$g['ordem'],
        'skills' => $byGroup[(int)$g['id']] ?? [],
    ], $groups);
}

function fetch_skill_group_by_id(int $id): array
{
    foreach (fetch_skill_groups() as $g) {
        if ($g['id'] === $id) {
            return $g;
        }
    }
    fail(404, 'Grupo de skills não encontrado.');
}

/** Lê categoria + skills do payload. */
function read_skill_group_payload(): array
{
    $b = read_json_body();
    $cat = is_array($b['category'] ?? null) ? $b['category'] : [];

    $catPt = str_or_null($cat['pt'] ?? '');
    $catEn = str_or_null($cat['en'] ?? '');
    if ($catPt === null && $catEn === null) {
        fail(422, 'Informe a categoria.');
    }

    $skills = [];
    $rawSkills = is_array($b['skills'] ?? null) ? $b['skills'] : [];
    foreach ($rawSkills as $s) {
        $name = trim((string)($s['name'] ?? ''));
        if ($name === '') {
            continue;
        }
        $level = (int)($s['level'] ?? 3);
        $level = max(1, min(5, $level));
        $skills[] = ['name' => $name, 'level' => $level];
    }

    return [
        'category_pt' => $catPt ?? $catEn,
        'category_en' => $catEn ?? $catPt,
        'skills' => $skills,
    ];
}

/** Substitui (deleta e reinsere) as skills de um grupo. */
function replace_group_skills(int $groupId, array $skills): void
{
    $del = db()->prepare('DELETE FROM skills WHERE group_id = ?');
    $del->execute([$groupId]);

    $ins = db()->prepare('INSERT INTO skills (group_id, name, level, ordem) VALUES (?,?,?,?)');
    foreach ($skills as $i => $s) {
        $ins->execute([$groupId, $s['name'], $s['level'], $i]);
    }
}

$action = $_GET['action'] ?? '';

if ($action === 'list' || $action === 'all') {
    require_method('GET');
    if ($action === 'all') {
        require_auth();
    }
    send_json(200, ['skillGroups' => fetch_skill_groups()]);
}

if ($action === 'create') {
    require_method('POST');
    require_auth();
    require_csrf();
    $p = read_skill_group_payload();

    db()->beginTransaction();
    $stmt = db()->prepare('INSERT INTO skill_groups (category_pt, category_en) VALUES (?,?)');
    $stmt->execute([$p['category_pt'], $p['category_en']]);
    $id = (int)db()->lastInsertId();
    replace_group_skills($id, $p['skills']);
    db()->commit();

    send_json(201, ['skillGroup' => fetch_skill_group_by_id($id)]);
}

if ($action === 'update') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $p = read_skill_group_payload();

    db()->beginTransaction();
    $stmt = db()->prepare('UPDATE skill_groups SET category_pt=?, category_en=? WHERE id=?');
    $stmt->execute([$p['category_pt'], $p['category_en'], $id]);
    replace_group_skills($id, $p['skills']);
    db()->commit();

    send_json(200, ['skillGroup' => fetch_skill_group_by_id($id)]);
}

if ($action === 'delete') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $stmt = db()->prepare('DELETE FROM skill_groups WHERE id = ?');
    $stmt->execute([$id]);
    send_json(200, ['ok' => true]);
}

if ($action === 'reorder') {
    require_method('POST');
    require_auth();
    require_csrf();
    reorder_table('skill_groups', read_reorder_ids());
    send_json(200, ['ok' => true]);
}

fail(404, 'Ação desconhecida.');
