<?php
// Endpoint de contato. Não exibe erros na resposta (evita vazar dados); registra no log.
ini_set('display_errors', '0');
error_reporting(E_ALL);
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function respond(int $status, string $message): void
{
    http_response_code($status);
    echo json_encode(['message' => $message]);
    exit;
}

// Credenciais: config.php (fora do versionamento) com fallback para variáveis de ambiente.
$config = file_exists(__DIR__ . '/config.php') ? require __DIR__ . '/config.php' : [];
$smtpHost = $config['smtp_host'] ?? getenv('SMTP_HOST') ?: 'smtp.hostinger.com';
$smtpUser = $config['smtp_user'] ?? (getenv('SMTP_USER') ?: '');
$smtpPass = $config['smtp_pass'] ?? (getenv('SMTP_PASS') ?: '');
$smtpPort = (int) ($config['smtp_port'] ?? (getenv('SMTP_PORT') ?: 465));
$mailTo   = $config['mail_to'] ?? (getenv('MAIL_TO') ?: $smtpUser);

if ($smtpUser === '' || $smtpPass === '') {
    error_log('sendEmail: credenciais SMTP ausentes (config.php ou variáveis de ambiente).');
    respond(500, 'Configuração de e-mail indisponível.');
}

$data = json_decode(file_get_contents('php://input'), true) ?: [];

$nome = trim(htmlspecialchars($data['nome'] ?? ''));
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$mensagem = trim(htmlspecialchars($data['mensagem'] ?? ''));

if ($nome === '' || $email === '' || $mensagem === '') {
    respond(422, 'Todos os campos são obrigatórios.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, 'E-mail inválido.');
}

$mail = new PHPMailer(true);
try {
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $smtpPort;

    $mail->setFrom($smtpUser, 'Formulário de Contato');
    $mail->addAddress($mailTo);
    $mail->addReplyTo($email, $nome);

    $mail->isHTML(true);
    $mail->Subject = 'Contato do Site';
    $mail->Body = "<h1>Novo Contato</h1>
                   <p><strong>Nome:</strong> $nome</p>
                   <p><strong>E-mail:</strong> $email</p>
                   <p><strong>Mensagem:</strong> $mensagem</p>";

    $mail->send();
    respond(200, 'E-mail enviado com sucesso!');
} catch (Exception $e) {
    error_log('sendEmail: falha ao enviar — ' . $mail->ErrorInfo);
    respond(500, 'Não foi possível enviar a mensagem. Tente novamente mais tarde.');
}
