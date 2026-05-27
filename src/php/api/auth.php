<?php
// Autenticação do painel: ?action=login | logout | me

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

apply_cors();
start_session();

$action = $_GET['action'] ?? '';

if ($action === 'login') {
    require_method('POST');
    $body = read_json_body();
    $username = trim((string)($body['username'] ?? ''));
    $password = (string)($body['password'] ?? '');
    if ($username === '' || $password === '') {
        fail(422, 'Informe usuário e senha.');
    }

    $stmt = db()->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        fail(401, 'Usuário ou senha inválidos.');
    }

    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int)$user['id'];
    $_SESSION['admin_user'] = $user['username'];

    send_json(200, [
        'user' => ['id' => (int)$user['id'], 'username' => $user['username']],
        'csrf' => csrf_token(),
    ]);
}

if ($action === 'logout') {
    require_method('POST');
    $_SESSION = [];
    session_destroy();
    send_json(200, ['ok' => true]);
}

if ($action === 'me') {
    if (!is_authenticated()) {
        send_json(200, ['user' => null]);
    }
    send_json(200, [
        'user' => ['id' => (int)$_SESSION['admin_id'], 'username' => $_SESSION['admin_user']],
        'csrf' => csrf_token(),
    ]);
}

fail(404, 'Ação desconhecida.');
