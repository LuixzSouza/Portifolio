<?php
// CRUD de projetos.
//   GET  ?action=list            (público) — só publicados
//   GET  ?action=get&slug=...    (público)
//   GET  ?action=all             (admin)   — todos, inclusive não publicados
//   POST ?action=create          (admin + CSRF)
//   POST ?action=update          (admin + CSRF)
//   POST ?action=delete          (admin + CSRF)

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

apply_cors();
start_session();

/** Linha do banco -> formato da API (tipos corretos: int/bool/array). */
function project_row_to_api(array $r): array
{
    return [
        'id' => (int)$r['id'],
        'slug' => $r['slug'],
        'nome' => $r['nome'],
        'imagem' => $r['imagem'],
        'tecnologias' => $r['tecnologias'] !== null ? (json_decode($r['tecnologias'], true) ?: []) : [],
        'link_linkedin' => $r['link_linkedin'],
        'link_github' => $r['link_github'],
        'link_ver_projeto' => $r['link_ver_projeto'],
        'descricao_pt' => $r['descricao_pt'],
        'descricao_en' => $r['descricao_en'],
        'data_pt' => $r['data_pt'],
        'data_en' => $r['data_en'],
        'ordem' => (int)$r['ordem'],
        'publicado' => (bool)(int)$r['publicado'],
    ];
}

/** Normaliza o payload de criação/edição vindo do painel. */
function read_project_payload(): array
{
    $b = read_json_body();

    $nome = trim((string)($b['nome'] ?? ''));
    if ($nome === '') {
        fail(422, 'Nome é obrigatório.');
    }

    $links = is_array($b['links'] ?? null) ? $b['links'] : [];
    $desc = is_array($b['descricao'] ?? null) ? $b['descricao'] : [];
    $data = is_array($b['data'] ?? null) ? $b['data'] : [];

    return [
        'nome' => $nome,
        'imagem' => str_or_null($b['imagem'] ?? ''),
        'tecnologias' => json_strings($b['tecnologias'] ?? []),
        'link_linkedin' => str_or_null($links['linkedin'] ?? ''),
        'link_github' => str_or_null($links['github'] ?? ''),
        'link_ver_projeto' => str_or_null($links['verProjeto'] ?? ''),
        'descricao_pt' => str_or_null($desc['pt'] ?? ''),
        'descricao_en' => str_or_null($desc['en'] ?? ''),
        'data_pt' => str_or_null($data['pt'] ?? ''),
        'data_en' => str_or_null($data['en'] ?? ''),
        'publicado' => !empty($b['publicado']) ? 1 : 0,
    ];
}

function fetch_project_by_id(int $id): array
{
    $stmt = db()->prepare('SELECT * FROM projects WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) {
        fail(404, 'Projeto não encontrado.');
    }
    return project_row_to_api($row);
}

$action = $_GET['action'] ?? '';

if ($action === 'list') {
    require_method('GET');
    $rows = db()->query('SELECT * FROM projects WHERE publicado = 1 ORDER BY ordem ASC, id DESC')->fetchAll();
    send_json(200, ['projects' => array_map('project_row_to_api', $rows)]);
}

if ($action === 'get') {
    require_method('GET');
    $slug = (string)($_GET['slug'] ?? '');
    $stmt = db()->prepare('SELECT * FROM projects WHERE slug = ? LIMIT 1');
    $stmt->execute([$slug]);
    $row = $stmt->fetch();
    if (!$row) {
        fail(404, 'Projeto não encontrado.');
    }
    send_json(200, ['project' => project_row_to_api($row)]);
}

if ($action === 'all') {
    require_method('GET');
    require_auth();
    $rows = db()->query('SELECT * FROM projects ORDER BY ordem ASC, id DESC')->fetchAll();
    send_json(200, ['projects' => array_map('project_row_to_api', $rows)]);
}

if ($action === 'create') {
    require_method('POST');
    require_auth();
    require_csrf();
    $p = read_project_payload();
    $slug = unique_slug('projects', slugify_php($p['nome']));
    $stmt = db()->prepare(
        'INSERT INTO projects
            (slug, nome, imagem, tecnologias, link_linkedin, link_github, link_ver_projeto,
             descricao_pt, descricao_en, data_pt, data_en, publicado)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
    );
    $stmt->execute([
        $slug, $p['nome'], $p['imagem'], $p['tecnologias'], $p['link_linkedin'], $p['link_github'],
        $p['link_ver_projeto'], $p['descricao_pt'], $p['descricao_en'], $p['data_pt'], $p['data_en'], $p['publicado'],
    ]);
    send_json(201, ['project' => fetch_project_by_id((int)db()->lastInsertId())]);
}

if ($action === 'update') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $p = read_project_payload();
    $stmt = db()->prepare(
        'UPDATE projects SET
            nome=?, imagem=?, tecnologias=?, link_linkedin=?, link_github=?, link_ver_projeto=?,
            descricao_pt=?, descricao_en=?, data_pt=?, data_en=?, publicado=?
         WHERE id=?'
    );
    $stmt->execute([
        $p['nome'], $p['imagem'], $p['tecnologias'], $p['link_linkedin'], $p['link_github'], $p['link_ver_projeto'],
        $p['descricao_pt'], $p['descricao_en'], $p['data_pt'], $p['data_en'], $p['publicado'], $id,
    ]);
    send_json(200, ['project' => fetch_project_by_id($id)]);
}

if ($action === 'delete') {
    require_method('POST');
    require_auth();
    require_csrf();
    $id = (int)(read_json_body()['id'] ?? 0);
    if ($id <= 0) {
        fail(422, 'ID inválido.');
    }
    $stmt = db()->prepare('DELETE FROM projects WHERE id = ?');
    $stmt->execute([$id]);
    send_json(200, ['ok' => true]);
}

if ($action === 'reorder') {
    require_method('POST');
    require_auth();
    require_csrf();
    reorder_table('projects', read_reorder_ids());
    send_json(200, ['ok' => true]);
}

fail(404, 'Ação desconhecida.');
