<?php

declare(strict_types=1);

namespace Quikku\Services;

/**
 * Thin client for the Brevo REST API (v3).
 *
 * Every call returns ['ok' => bool, 'status' => int, 'body' => array|null, 'error' => string|null]
 * and logs failures with a readable hint, so problems with the API key, IP allow-list or
 * sender show up in the PHP error log instead of failing silently.
 */
class BrevoService
{
    private const TIMEOUT_SECONDS = 10;
    private const CONNECT_TIMEOUT_SECONDS = 5;

    private array $settings;
    private string $baseUrl;

    public function __construct(array $settings)
    {
        $this->settings = $settings;
        $this->baseUrl = rtrim($settings['brevo_api_url'] ?? 'https://api.brevo.com/v3', '/');
    }

    /** Add (or update) a contact in the waitlist list. An existing contact counts as success. */
    public function addContact(string $email): array
    {
        $result = $this->request('POST', '/contacts', [
            'email' => $email,
            'listIds' => [$this->settings['brevo_list_id']],
            'updateEnabled' => true,
        ]);

        // Without updateEnabled Brevo answers 400 duplicate_parameter for known contacts
        if (!$result['ok'] && ($result['body']['code'] ?? '') === 'duplicate_parameter') {
            $result['ok'] = true;
        }

        if (!$result['ok']) {
            $this->logFailure('add contact', $result);
        }

        return $result;
    }

    /** Send the internal notification email to the team. */
    public function sendNotification(string $subject, string $htmlContent): array
    {
        $result = $this->request('POST', '/smtp/email', [
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
        ]);

        if (!$result['ok']) {
            $this->logFailure('send notification email', $result);
        }

        return $result;
    }

    /** GET helper used by the bin/check-brevo.php diagnostic. */
    public function get(string $path): array
    {
        return $this->request('GET', $path);
    }

    /** Human-readable explanation for a failed Brevo call. */
    public static function describe(array $result): string
    {
        if ($result['error']) {
            return "Could not reach Brevo: {$result['error']}";
        }

        $message = (string) ($result['body']['message'] ?? '');
        $code = (string) ($result['body']['code'] ?? '');
        $detail = trim("HTTP {$result['status']} {$code}: {$message}");

        if ($result['status'] === 401 && stripos($message, 'IP address') !== false) {
            return "$detail\nHint: Brevo blocked this server's IP. Add it under Brevo > Security > Authorised IPs "
                . "(https://app.brevo.com/security/authorised_ips), or deactivate IP blocking there.";
        }
        if ($result['status'] === 401) {
            return "$detail\nHint: BREVO_API_KEY is invalid or revoked. Create an API key (it starts with "
                . "\"xkeysib-\") under Brevo > SMTP & API > API Keys. SMTP keys (\"xsmtpsib-\") do not work here.";
        }
        if ($result['status'] === 400 && stripos($message, 'sender') !== false) {
            return "$detail\nHint: EMAIL_FROM must be a sender verified in Brevo (Senders, domains & dedicated IPs).";
        }
        if ($result['status'] === 404) {
            return "$detail\nHint: check BREVO_LIST_ID matches an existing contact list in Brevo.";
        }

        return $detail;
    }

    private function request(string $method, string $path, ?array $payload = null): array
    {
        $ch = curl_init($this->baseUrl . $path);
        $options = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_TIMEOUT => self::TIMEOUT_SECONDS,
            CURLOPT_CONNECTTIMEOUT => self::CONNECT_TIMEOUT_SECONDS,
            CURLOPT_HTTPHEADER => [
                'Accept: application/json',
                'Content-Type: application/json',
                'api-key: ' . $this->settings['brevo_api_key'],
            ],
        ];
        if ($payload !== null) {
            $options[CURLOPT_POSTFIELDS] = json_encode($payload);
        }
        curl_setopt_array($ch, $options);

        $raw = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        $body = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;

        return [
            'ok' => $error === '' && $status >= 200 && $status < 300,
            'status' => $status,
            'body' => is_array($body) ? $body : null,
            'error' => $error !== '' ? $error : null,
        ];
    }

    private function logFailure(string $action, array $result): void
    {
        error_log('[quikku] Brevo: failed to ' . $action . '. ' . str_replace("\n", ' ', self::describe($result)));
    }
}
