<?php

declare(strict_types=1);

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
$dotenv->required([
    'BREVO_API_KEY',
    'BREVO_LIST_ID',
    'EMAIL_FROM',
    'EMAIL_FROM_NAME',
    'EMAIL_TO',
    'EMAIL_TO_NAME',
    'ALLOWED_ORIGINS',
]);

return [
    'brevo_api_key' => $_ENV['BREVO_API_KEY'],
    'brevo_list_id' => (int) $_ENV['BREVO_LIST_ID'],
    'email_from' => $_ENV['EMAIL_FROM'],
    'email_from_name' => $_ENV['EMAIL_FROM_NAME'],
    'email_to' => $_ENV['EMAIL_TO'],
    'email_to_name' => $_ENV['EMAIL_TO_NAME'],
    'allowed_origins' => array_map('trim', explode(',', $_ENV['ALLOWED_ORIGINS'])),
];
