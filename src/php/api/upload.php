<?php
// Upload de imagem (admin + CSRF). Salva em /uploads e devolve o caminho público.
//   POST multipart/form-data, campo "file".

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

apply_cors();
start_session();
require_method('POST');
require_auth();
require_csrf();

if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    fail(422, 'Nenhum arquivo enviado.');
}

$file = $_FILES['file'];

if ($file['size'] > 5 * 1024 * 1024) {
    fail(422, 'Arquivo maior que 5 MB.');
}

$allowed = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'image/gif' => 'gif',
];
$mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
if (!isset($allowed[$mime])) {
    fail(422, 'Tipo não permitido (use JPG, PNG, WEBP ou GIF).');
}

// Em produção: public_html/php/api/upload.php -> ../../uploads = public_html/uploads
$dir = __DIR__ . '/../../uploads';
if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
    fail(500, 'Não foi possível criar a pasta de uploads.');
}

// Bloqueia execução de scripts dentro de /uploads (defesa contra upload malicioso).
$htaccess = $dir . '/.htaccess';
if (!file_exists($htaccess)) {
    file_put_contents(
        $htaccess,
        "php_flag engine off\n<FilesMatch \"\\.(php|phtml|php3|php4|php5|pl|py|cgi)$\">\n  Require all denied\n</FilesMatch>\n"
    );
}

$name = bin2hex(random_bytes(16)) . '.' . $allowed[$mime];
if (!move_uploaded_file($file['tmp_name'], $dir . '/' . $name)) {
    fail(500, 'Falha ao salvar o arquivo.');
}

send_json(201, ['path' => '/uploads/' . $name]);
