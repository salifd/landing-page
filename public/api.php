<?php

declare(strict_types=1);

// Resolve the php/ directory relative to this file's real location on disk.
// In production, api.php lives in document_root/ and php/ sits beside it.
// During local dev with `php -S`, __DIR__ points to public/.
$phpDir = is_dir(__DIR__ . '/../php') ? __DIR__ . '/../php' : __DIR__ . '/php';

$autoloader = $phpDir . '/vendor/autoload.php';
if (!file_exists($autoloader)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Server not configured']);
    exit;
}

require $autoloader;

$app = require $phpDir . '/src/bootstrap.php';
$app->run();
