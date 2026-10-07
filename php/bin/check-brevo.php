<?php

/**
 * Checks the Brevo setup used by the waitlist API, using the values in php/.env.
 *
 *   php bin/check-brevo.php              verify API key, contact list and sender
 *   php bin/check-brevo.php --send-test  also send a test notification to EMAIL_TO
 *
 * Run it on the server that hosts the API: Brevo's IP allow-list applies per machine.
 */

declare(strict_types=1);

use Quikku\Services\BrevoService;

require __DIR__ . '/../vendor/autoload.php';

$failed = false;
$report = function (bool $ok, string $label, string $detail = '') use (&$failed): void {
    $failed = $failed || !$ok;
    echo ($ok ? '  OK    ' : '  FAIL  ') . $label . ($detail !== '' ? "\n        " . str_replace("\n", "\n        ", $detail) : '') . "\n";
};

echo "Brevo configuration check\n\n";

try {
    $settings = require __DIR__ . '/../src/settings.php';
} catch (\Throwable $e) {
    $report(false, 'php/.env', $e->getMessage());
    exit(1);
}
$report(true, 'php/.env loaded', 'API key ends in …' . substr($settings['brevo_api_key'], -4));

$brevo = new BrevoService($settings);

// 1. API key (also catches Brevo's IP allow-list)
$account = $brevo->get('/account');
$report($account['ok'], 'API key accepted', $account['ok']
    ? 'Account: ' . ($account['body']['email'] ?? 'unknown')
    : BrevoService::describe($account));
if (!$account['ok']) {
    exit(1);
}

// 2. Contact list
$list = $brevo->get('/contacts/lists/' . $settings['brevo_list_id']);
$report($list['ok'], "Contact list #{$settings['brevo_list_id']} exists", $list['ok']
    ? 'Name: ' . ($list['body']['name'] ?? '?') . ', contacts: ' . ($list['body']['uniqueSubscribers'] ?? $list['body']['totalSubscribers'] ?? '?')
    : BrevoService::describe($list));

// 3. Sender used for the notification email
$senders = $brevo->get('/senders');
if ($senders['ok']) {
    $match = null;
    foreach ($senders['body']['senders'] ?? [] as $sender) {
        if (strcasecmp($sender['email'] ?? '', $settings['email_from']) === 0) {
            $match = $sender;
        }
    }
    $domain = substr(strrchr($settings['email_from'], '@') ?: '', 1);
    $report(
        $match !== null && ($match['active'] ?? false),
        "Sender {$settings['email_from']} is verified",
        $match === null
            ? "Not in your Brevo senders. Add it (or authenticate the domain {$domain}) under Senders, domains & dedicated IPs."
            : (($match['active'] ?? false) ? '' : 'The sender exists but is not active yet: confirm it from the email Brevo sent.')
    );
} else {
    $report(false, 'Read senders', BrevoService::describe($senders));
}

// 4. Optional real send
if (in_array('--send-test', $argv, true)) {
    $sent = $brevo->sendNotification(
        'Test notification - Quikku waitlist',
        '<p>This is a test from <code>php bin/check-brevo.php --send-test</code>. Waitlist notifications are working.</p>'
    );
    $report($sent['ok'], "Test email sent to {$settings['email_to']}", $sent['ok']
        ? 'Message id: ' . ($sent['body']['messageId'] ?? '?')
        : BrevoService::describe($sent));
}

echo $failed ? "\nSome checks failed. Fix the items above and run this again.\n" : "\nAll good.\n";
exit($failed ? 1 : 0);
