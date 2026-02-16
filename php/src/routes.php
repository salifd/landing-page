<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Quikku\Services\BrevoService;
use Quikku\Email\EmailTemplates;

return function (App $app, array $settings) {

    $app->get('/health', function (Request $request, Response $response) {
        $response->getBody()->write(json_encode([
            'status' => 'ok',
            'timestamp' => date('c'),
        ]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->post('/subscribe', function (Request $request, Response $response) use ($settings) {
        $body = $request->getParsedBody();
        $email = $body['email'] ?? '';

        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'error' => 'Invalid email address',
            ]));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(400);
        }

        $brevo = new BrevoService($settings);

        try {
            $result = $brevo->addContact($email);

            if ($result['success'] || $result['httpCode'] === 409) {
                $brevo->sendNotification(
                    'New Waitlist Subscription - Quikku',
                    EmailTemplates::success($email)
                );

                $response->getBody()->write(json_encode([
                    'success' => true,
                    'message' => 'Successfully subscribed to the waitlist',
                ]));
                return $response->withHeader('Content-Type', 'application/json');
            }

            $errorDetails = "HTTP {$result['httpCode']}: {$result['response']}";
            $brevo->sendNotification(
                'Failed Waitlist Subscription - Quikku',
                EmailTemplates::failure($email, $errorDetails)
            );

            $response->getBody()->write(json_encode([
                'success' => false,
                'error' => 'Failed to subscribe. Please try again later.',
            ]));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(500);
        } catch (\Exception $e) {
            $brevo->sendNotification(
                'Failed Waitlist Subscription - Quikku',
                EmailTemplates::failure($email, $e->getMessage())
            );

            $response->getBody()->write(json_encode([
                'success' => false,
                'error' => 'An error occurred. Please try again later.',
            ]));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(500);
        }
    });
};
