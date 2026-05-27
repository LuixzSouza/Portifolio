<?php
// Cria o usuário admin a partir do config.php (hash bcrypt). Idempotente.
// Exige ?token=<setup_token>. >>> REMOVA este arquivo do servidor após o uso. <<<

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

$c = get_config();
$token = $_GET['token'] ?? '';
$expected = $c['setup_token'] ?? '';

if ($expected === '' || !is_string($token) || !hash_equals($expected, $token)) {
    fail(403, 'Token de setup inválido.');
}

$username = trim((string)($c['admin_user'] ?? ''));
$password = (string)($c['admin_pass'] ?? '');
if ($username === '' || $password === '') {
    fail(500, 'admin_user/admin_pass ausentes no config.php.');
}

$stmt = db()->prepare('SELECT id FROM admin_users WHERE username = ? LIMIT 1');
$stmt->execute([$username]);
if ($stmt->fetch()) {
    send_json(200, ['ok' => true, 'message' => 'Usuário admin já existe — nada a fazer. Pode remover este arquivo.']);
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$ins = db()->prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)');
$ins->execute([$username, $hash]);

send_json(201, ['ok' => true, 'message' => 'Usuário admin criado com sucesso. REMOVA o setup-admin.php agora.']);
