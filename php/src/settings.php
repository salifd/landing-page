<?php

declare(strict_types=1);

use Dotenv\Dotenv;

// Throws a RuntimeException with a readable message when configuration is missing;
// bootstrap.php turns that into a JSON error response and logs it.
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
try {
    $dotenv->load();
} catch (\Dotenv\Exception\InvalidPathException $e) {
    throw new \RuntimeException('Missing php/.env file. Copy php/.env.example to php/.env and fill it in.', 0, $e);
}
$dotenv->required([
    'BREVO_API_KEY',
    'BREVO_LIST_ID',
    'EMAIL_FROM',
    'EMAIL_FROM_NAME',
    'EMAIL_TO',
    'EMAIL_TO_NAME',
])->notEmpty();
$dotenv->required('BREVO_LIST_ID')->isInteger();

$apiKey = trim($_ENV['BREVO_API_KEY']);
if (str_starts_with($apiKey, 'xsmtpsib-')) {
    throw new \RuntimeException(
        'BREVO_API_KEY is an SMTP key (xsmtpsib-...). The API needs an API v3 key (xkeysib-...) '
        . 'from Brevo > SMTP & API > API Keys.'
    );
}
if ($apiKey === 'your-brevo-api-key-here') {
    throw new \RuntimeException('BREVO_API_KEY is still the placeholder from .env.example.');
}

return [
    'brevo_api_key' => $apiKey,
    'brevo_api_url' => $_ENV['BREVO_API_URL'] ?? 'https://api.brevo.com/v3',
    'brevo_list_id' => (int) $_ENV['BREVO_LIST_ID'],
    'email_from' => trim($_ENV['EMAIL_FROM']),
    'email_from_name' => $_ENV['EMAIL_FROM_NAME'],
    'email_to' => trim($_ENV['EMAIL_TO']),
    'email_to_name' => $_ENV['EMAIL_TO_NAME'],
    // Only needed when the site calls the API from another origin
    'allowed_origins' => array_filter(array_map('trim', explode(',', $_ENV['ALLOWED_ORIGINS'] ?? ''))),
];
