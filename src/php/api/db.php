<?php
// Conexão PDO e leitura de configuração, reaproveitadas pelos endpoints da API.

declare(strict_types=1);

/** Lê o config.php (uma vez). Em produção: public_html/php/config.php. */
function get_config(): array
{
    static $config = null;
    if ($config === null) {
        $path = __DIR__ . '/../config.php';
        $config = file_exists($path) ? require $path : [];
    }
    return $config;
}

/** Conexão PDO única para o MySQL. */
function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $c = get_config();
        $host = $c['db_host'] ?? 'localhost';
        $name = $c['db_name'] ?? '';
        $user = $c['db_user'] ?? '';
        $pass = $c['db_pass'] ?? '';
        $charset = $c['db_charset'] ?? 'utf8mb4';
        $dsn = "mysql:host={$host};dbname={$name};charset={$charset}";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
    return $pdo;
}
