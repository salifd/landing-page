<?php
/**
 * Waitlist Subscription API Endpoint
 * Handles email subscriptions and sends notifications via Brevo
 */

// Load configuration
$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server configuration missing']);
    exit;
}

$config = require $configPath;

// Set headers
header('Content-Type: application/json');

// Handle CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $config['allowed_origins'])) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Get and validate input
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

/**
 * Send notification email via Brevo SMTP API
 */
function sendNotificationEmail(array $config, string $type, string $userEmail, ?string $errorDetails = null): void
{
    $subject = $type === 'success'
        ? 'New Waitlist Subscription - Quikku'
        : 'Failed Waitlist Subscription - Quikku';

    $htmlContent = $type === 'success'
        ? generateSuccessEmailHtml($userEmail)
        : generateFailureEmailHtml($userEmail, $errorDetails);

    $payload = [
        'sender' => [
            'name' => $config['email_from_name'],
            'email' => $config['email_from'],
        ],
        'to' => [
            [
                'email' => $config['email_to'],
                'name' => $config['email_to_name'],
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
            'api-key: ' . $config['brevo_api_key'],
        ],
    ]);

    curl_exec($ch);
    curl_close($ch);
}

/**
 * Generate success notification email HTML
 */
function generateSuccessEmailHtml(string $userEmail): string
{
    $safeEmail = htmlspecialchars($userEmail, ENT_QUOTES, 'UTF-8');
    return <<<HTML
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
    <h2 style="color: #1e40af; margin-bottom: 20px;">New Waitlist Subscription</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">
      Great news! Someone just joined the Quikku waitlist.
    </p>
    <div style="background-color: white; padding: 20px; border-radius: 6px; border-left: 4px solid #10b981;">
      <p style="margin: 0; font-weight: bold; color: #1e40af;">Subscriber Email:</p>
      <p style="margin: 5px 0 0 0; font-size: 18px; color: #059669;">{$safeEmail}</p>
    </div>
    <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
      This is an automated notification from the Quikku landing page.
    </p>
  </div>
</body>
</html>
HTML;
}

/**
 * Generate failure notification email HTML
 */
function generateFailureEmailHtml(string $userEmail, ?string $errorDetails): string
{
    $safeEmail = htmlspecialchars($userEmail, ENT_QUOTES, 'UTF-8');
    $errorSection = $errorDetails
        ? "<p style=\"margin: 15px 0 0 0; font-weight: bold; color: #1e40af;\">Error Details:</p>
           <p style=\"margin: 5px 0 0 0; color: #6b7280; font-size: 14px;\">" . htmlspecialchars($errorDetails, ENT_QUOTES, 'UTF-8') . "</p>"
        : '';

    return <<<HTML
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
    <h2 style="color: #dc2626; margin-bottom: 20px;">Failed Waitlist Subscription</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">
      A waitlist subscription attempt failed for the following email:
    </p>
    <div style="background-color: white; padding: 20px; border-radius: 6px; border-left: 4px solid #ef4444;">
      <p style="margin: 0; font-weight: bold; color: #1e40af;">Email Address:</p>
      <p style="margin: 5px 0 15px 0; font-size: 18px; color: #dc2626;">{$safeEmail}</p>
      {$errorSection}
    </div>
    <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
      This is an automated notification from the Quikku landing page.
    </p>
  </div>
</body>
</html>
HTML;
}

/**
 * Add contact to Brevo list
 */
function addContactToBrevo(array $config, string $email): array
{
    $payload = [
        'email' => $email,
        'listIds' => [$config['brevo_list_id']],
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
            'api-key: ' . $config['brevo_api_key'],
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

// Main logic
try {
    $result = addContactToBrevo($config, $email);

    // Contact already exists (409) is considered success
    if ($result['success'] || $result['httpCode'] === 409) {
        // Send success notification
        sendNotificationEmail($config, 'success', $email);

        echo json_encode([
            'success' => true,
            'message' => 'Successfully subscribed to the waitlist',
        ]);
    } else {
        // Send failure notification
        $errorDetails = "HTTP {$result['httpCode']}: {$result['response']}";
        sendNotificationEmail($config, 'failure', $email, $errorDetails);

        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to subscribe. Please try again later.',
        ]);
    }
} catch (Exception $e) {
    // Send failure notification
    sendNotificationEmail($config, 'failure', $email, $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'An error occurred. Please try again later.',
    ]);
}
