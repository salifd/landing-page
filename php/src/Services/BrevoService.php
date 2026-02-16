<?php

declare(strict_types=1);

namespace Quikku\Services;

class BrevoService
{
    private array $settings;

    public function __construct(array $settings)
    {
        $this->settings = $settings;
    }

    public function addContact(string $email): array
    {
        $payload = [
            'email' => $email,
            'listIds' => [$this->settings['brevo_list_id']],
            'updateEnabled' => true,
        ];

        $ch = curl_init('https://api.brevo.com/v3/contacts');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_HTTPHEADER => [
                'Accept: application/json',
                'Content-Type: application/json',
                'api-key: ' . $this->settings['brevo_api_key'],
            ],
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        return [
            'success' => $httpCode >= 200 && $httpCode < 300,
            'httpCode' => $httpCode,
            'response' => $response,
            'error' => $error,
        ];
    }

    public function sendNotification(string $subject, string $htmlContent): void
    {
        $payload = [
            'sender' => [
                'name' => $this->settings['email_from_name'],
                'email' => $this->settings['email_from'],
            ],
            'to' => [
                [
                    'email' => $this->settings['email_to'],
                    'name' => $this->settings['email_to_name'],
                ],
            ],
            'subject' => $subject,
            'htmlContent' => $htmlContent,
        ];

        $ch = curl_init('https://api.brevo.com/v3/smtp/email');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_HTTPHEADER => [
                'Accept: application/json',
                'Content-Type: application/json',
                'api-key: ' . $this->settings['brevo_api_key'],
            ],
        ]);

        curl_exec($ch);
        curl_close($ch);
    }
}
