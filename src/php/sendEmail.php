<?php
session_start();
// Habilita a exibição de erros
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Incluindo os arquivos do PHPMailer manualmente
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$data = json_decode(file_get_contents('php://input'), true);  // Recebe o JSON enviado pelo fetch

$nome = htmlspecialchars($data['nome'] ?? '');
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$mensagem = htmlspecialchars($data['mensagem'] ?? '');

if (empty($nome) || empty($email) || empty($mensagem)) {
    echo "Todos os campos são obrigatórios.";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "E-mail inválido.";
    exit;
}

$mail = new PHPMailer(true);
try {
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';  // Substitua com o seu host
    $mail->SMTPAuth = true;
    $mail->Username = 'ola@luixzsouza.com.br';
    $mail->Password = 'Luizsouza@2025';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('ola@luixzsouza.com.br', 'Formulário de Contato');
    $mail->addAddress('ola@luixzsouza.com.br');  // E-mail para onde será enviado

    $mail->isHTML(true);
    $mail->Subject = 'Contato do Site';
    $mail->Body = "<h1>Novo Contato</h1>
                   <p><strong>Nome:</strong> $nome</p>
                   <p><strong>E-mail:</strong> $email</p>
                   <p><strong>Mensagem:</strong> $mensagem</p>";

    $mail->send();
    echo "E-mail enviado com sucesso!";
} catch (Exception $e) {
    echo "Erro ao enviar o e-mail: " . $mail->ErrorInfo;
}
?>
