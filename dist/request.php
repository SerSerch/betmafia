<?php

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
	$headers = 'From: betmafia@betmafia.ru' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

	$message = "
		Детали:
		Телефон: {$phone}
	";
	mail('betmafiaclub@gmail.com', 'Заявка на партнёрство', $message, $headers);
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
