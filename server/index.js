import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create email transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
  host: process.env.VITE_SMTP_Server || 'smtp-relay.brevo.com',
  port: parseInt(process.env.VITE_SMTP_PORT || '587'),
  secure: false, // Use TLS
  auth: {
    user: process.env.VITE_LOGIN,
    pass: process.env.VITE_SMTP_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter configuration error:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

// Helper function to get client IP address
const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket.remoteAddress || 'Unknown';
};

// Helper function to get location from IP (simple version)
// For production, you might want to use a service like ipapi.co or maxmind
const getLocationFromIp = async (ip) => {
  // For now, we'll just return the IP
  // In production, you can integrate with IP geolocation services
  if (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1') {
    return 'localhost (development)';
  }
  return ip;
};

// Waitlist subscription endpoint
app.post('/api/waitlist/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }

    // Get client information
    const clientIp = getClientIp(req);
    const location = await getLocationFromIp(clientIp);
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });

    // Compose notification email
    const mailOptions = {
      from: {
        name: 'Quikku Notifications',
        address: process.env.VITE_EMAIL_FROM || 'hello@quikkupay.com',
      },
      to: process.env.VITE_EMAIL_TO || 'dagence.digital@gmail.com',
      subject: '✅ New Waitlist Subscription - Quikku',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9fafb;
              }
              .header {
                background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
                color: white;
                padding: 30px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 0 0 8px 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .info-box {
                background-color: #f0f9ff;
                border-left: 4px solid #3b82f6;
                padding: 20px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .info-item {
                margin: 15px 0;
              }
              .label {
                font-weight: 600;
                color: #1e40af;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .value {
                font-size: 16px;
                color: #1f2937;
                word-break: break-all;
              }
              .email-value {
                color: #059669;
                font-size: 18px;
                font-weight: 500;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
              .icon {
                display: inline-block;
                margin-right: 8px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 New Waitlist Subscription</h1>
              </div>
              <div class="content">
                <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
                  Congratulations! Someone just joined the Quikku waitlist.
                </p>

                <div class="info-box">
                  <div class="info-item">
                    <div class="label">📧 Email Address</div>
                    <div class="value email-value">${email}</div>
                  </div>

                  <div class="info-item">
                    <div class="label">🌍 IP Address / Location</div>
                    <div class="value">${location}</div>
                  </div>

                  <div class="info-item">
                    <div class="label">🕒 Subscription Date & Time</div>
                    <div class="value">${timestamp}</div>
                  </div>
                </div>

                <div class="footer">
                  <p style="margin: 0;">
                    This is an automated notification from the Quikku landing page.
                  </p>
                  <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">
                    Powered by Quikku Waitlist System
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Waitlist Subscription - Quikku

Email Address: ${email}
IP Address / Location: ${location}
Subscription Date & Time: ${timestamp}

This is an automated notification from the Quikku landing page.
      `.trim(),
    };

    // Send email notification
    await transporter.sendMail(mailOptions);

    console.log(`Waitlist subscription notification sent for: ${email}`);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to waitlist',
    });

  } catch (error) {
    console.error('Error processing waitlist subscription:', error);

    res.status(500).json({
      success: false,
      error: 'Failed to process subscription. Please try again later.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Quikku Waitlist API'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Waitlist API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
