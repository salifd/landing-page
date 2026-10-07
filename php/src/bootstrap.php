<?php

declare(strict_types=1);

use Slim\Factory\AppFactory;
use Quikku\Middleware\CorsMiddleware;

try {
    $settings = require __DIR__ . '/settings.php';
} catch (\Throwable $e) {
    // Misconfiguration: log the real reason, answer the form with JSON it can read
    error_log('[quikku] Configuration error: ' . $e->getMessage());
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Server not configured']);
    exit;
}

$app = AppFactory::create();

$app->setBasePath('/api');

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->add(new CorsMiddleware($settings['allowed_origins']));

$errorMiddleware = $app->addErrorMiddleware(false, true, true);
$errorMiddleware->setDefaultErrorHandler(function (
    $request,
    \Throwable $exception,
    bool $displayErrorDetails,
    bool $logErrors,
    bool $logErrorDetails
) use ($app) {
    error_log('[quikku] Unhandled error: ' . $exception->getMessage());
    $response = $app->getResponseFactory()->createResponse();
    $response->getBody()->write(json_encode([
        'success' => false,
        'error' => 'An unexpected error occurred.',
    ]));
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(500);
});

(require __DIR__ . '/routes.php')($app, $settings);

return $app;
