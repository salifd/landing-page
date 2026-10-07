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
        $email = is_array($body) && is_string($body['email'] ?? null) ? trim($body['email']) : '';

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
        $json = function (array $data, int $status = 200) use ($response) {
            $response->getBody()->write(json_encode($data));
            return $response->withHeader('Content-Type', 'application/json')->withStatus($status);
        };

        try {
            $contact = $brevo->addContact($email);

            if ($contact['ok']) {
                // A failed notification is logged by BrevoService and must not fail the signup
                $brevo->sendNotification('New Waitlist Subscription - Quikku', EmailTemplates::success($email));

                return $json(['success' => true, 'message' => 'Successfully subscribed to the waitlist']);
            }

            // With a rejected API key the alert email would be rejected too; the log has the details
            if ($contact['status'] !== 401) {
                $brevo->sendNotification(
                    'Failed Waitlist Subscription - Quikku',
                    EmailTemplates::failure($email, BrevoService::describe($contact))
                );
            }

            return $json(['success' => false, 'error' => 'Failed to subscribe. Please try again later.'], 500);
        } catch (\Throwable $e) {
            error_log('[quikku] Subscribe error: ' . $e->getMessage());

            return $json(['success' => false, 'error' => 'An error occurred. Please try again later.'], 500);
        }
    });
};
