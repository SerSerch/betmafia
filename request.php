<?php

require __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

process($_POST);

function process($data) {
	if (!verifyCaptcha($data['g-recaptcha-response'])) {
		return send([
			'error' => 'invalid captcha'
		]);
	}

	sendRequest($data['phone']);

	send([
		'success' => true
	]);

}

function sendRequest($phone) {

    $message = "
		Детали:
		Телефон: {$phone}
	";

    $mail = new PHPMailer();
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'mafia.bet.mafia';                 // SMTP username
    $mail->Password = 'mafia.bet';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;
    $mail->setFrom('mafia.bet.mafia@yandex.ru', 'Betmafia');
    $mail->addAddress('betmafiaclub@gmail.com', 'Betmafia');     // Add a recipient
//    $mail->addAddress('neizerth@gmail.com', 'Betmafia');     // Add a recipient
    $mail->Subject = 'Заявка на партнёрство';
    $mail->Body    = $message;
    $status = $mail->send();

//    var_dump($status, $mail->ErrorInfo);
	// mail('betmafiaclub@gmail.com', 'Заявка на партнёрство', $message);
//	mail('neizerth@gmail.com', 'Заявка на партнёрство', $message);
}

function verifyCaptcha($value) {
	$url = 'https://www.google.com/recaptcha/api/siteverify';
	$secret = '6LfxoVoUAAAAAA_1hjEMqKvO-7YrIapYZSM6NNP5';

	$data = [
		'response' => $value,
		'secret' => $secret,
	];
	$options = array(
		'http' => array (
			'method' => 'POST',
			'content' => http_build_query($data)
		)
	);
	$context  = stream_context_create($options);
	$verify = file_get_contents($url, false, $context);
	$response=json_decode($verify);

    return $response->success;
}

function send($data) {
    echo json_encode($data);
}
