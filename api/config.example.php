<?php
/**
 * Configuration file for the Quikku API
 * Copy this file to config.php and fill in your actual values
 */

return [
    // Brevo API Configuration
    'brevo_api_key' => 'your-brevo-api-key-here',
    'brevo_list_id' => 1, // Your Brevo contact list ID

    // Email Configuration
    'email_from' => 'notifications@yourdomain.com',
    'email_from_name' => 'Quikku Notifications',
    'email_to' => 'admin@yourdomain.com',
    'email_to_name' => 'Quikku Admin',

    // CORS Configuration
    'allowed_origins' => [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://yourdomain.com',
        'https://www.yourdomain.com',
    ],
];
