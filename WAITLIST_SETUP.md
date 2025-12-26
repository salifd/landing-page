# Waitlist System Documentation

## Overview

The waitlist subscription system has been updated to use a custom backend API that sends email notifications instead of using Brevo's contact list API. When a user subscribes to the waitlist, a notification email is sent to `dagence.digital@gmail.com` containing:

- Email address of the subscriber
- IP address/location information
- Date and timestamp of the subscription

## Architecture

### Frontend (React + Vite)
- **Component**: `src/components/SecondSection.tsx`
- **Functionality**: Captures email input and submits to the backend API

### Backend (Express.js)
- **Location**: `server/index.js`
- **Port**: 3001 (configurable via PORT environment variable)
- **Email Service**: Uses Nodemailer with Brevo SMTP relay

## Setup Instructions

### 1. Environment Variables

Ensure your `.env` file contains the following variables:

```env
# SMTP Configuration (for backend email notifications)
VITE_SMTP_Server=smtp-relay.brevo.com
VITE_SMTP_PORT=587
VITE_LOGIN=your-smtp-login@smtp-brevo.com
VITE_SMTP_PASS=your-smtp-password

# Email Configuration
VITE_EMAIL_TO=dagence.digital@gmail.com
VITE_EMAIL_FROM=hello@quikkupay.com

# API Configuration
VITE_API_URL=http://localhost:3001

# Server Port
PORT=3001
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Running the Application

#### Option 1: Run Both Frontend and Backend Together (Recommended)

```bash
npm run dev:all
```

This will start both the Vite dev server (frontend) and the Express API server (backend) concurrently.

#### Option 2: Run Frontend and Backend Separately

In one terminal (Frontend):
```bash
npm run dev
```

In another terminal (Backend):
```bash
npm run server
```

### 4. Testing the Waitlist

1. Open your browser to `http://localhost:5173` (or the port Vite assigns)
2. Navigate to the waitlist section
3. Enter a valid email address
4. Click "Join the waitlist"
5. Check that:
   - The frontend shows a success message
   - An email notification is sent to `dagence.digital@gmail.com`

## API Endpoints

### POST `/api/waitlist/subscribe`

Subscribe a user to the waitlist.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully subscribed to waitlist"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Invalid email address"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to process subscription. Please try again later."
}
```

### GET `/api/health`

Health check endpoint.

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2025-12-18T10:00:00.000Z",
  "service": "Quikku Waitlist API"
}
```

## Email Notification Format

When a user subscribes, an HTML email is sent with the following information:

- **Subject**: ✅ New Waitlist Subscription - Quikku
- **Content**:
  - Subscriber's email address
  - IP address/location (shows "localhost (development)" for local testing)
  - Subscription date and time in UTC

## Production Deployment

### Environment Variables for Production

Update `.env` or your hosting platform's environment variables:

```env
VITE_API_URL=https://your-api-domain.com
PORT=3001
```

### Deployment Considerations

1. **Backend Server**: Deploy the Express.js server (`server/index.js`) to a Node.js hosting platform (e.g., Heroku, Railway, DigitalOcean, AWS)

2. **Frontend**: Build and deploy the React app to a static hosting service (e.g., Vercel, Netlify, Cloudflare Pages)

3. **CORS Configuration**: The backend is configured to accept requests from any origin using `cors()`. For production, you may want to restrict this:

   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.com'
   }));
   ```

4. **HTTPS**: Ensure both frontend and backend use HTTPS in production

5. **IP Geolocation**: The current implementation shows raw IP addresses. For production, consider integrating a geolocation service:
   - ipapi.co (free tier available)
   - MaxMind GeoIP2
   - ipstack.com

### Example Production Deployment Steps

#### Backend (e.g., Railway)
```bash
# In your Railway project settings:
1. Set environment variables (VITE_SMTP_Server, VITE_SMTP_PORT, etc.)
2. Set PORT environment variable
3. Deploy from /server directory
```

#### Frontend (e.g., Vercel)
```bash
# Add to Vercel environment variables:
VITE_API_URL=https://your-api-url.railway.app

# Build command:
npm run build

# Output directory:
dist
```

## Monitoring and Logs

### Backend Logs

The server logs the following events:
- Email transporter configuration status
- Waitlist subscription attempts
- Email sending success/failures
- API errors

### Frontend Tracking

The frontend uses Matomo for analytics tracking:
- Validation errors
- API errors
- Successful signups
- Exceptions

## Troubleshooting

### Issue: Email not being sent

**Solution:**
1. Verify SMTP credentials in `.env`
2. Check backend server logs for errors
3. Test SMTP credentials using a tool like [SMTP Tester](https://www.smtper.net/)
4. Ensure Brevo SMTP is not rate-limited

### Issue: CORS errors

**Solution:**
1. Ensure backend server is running
2. Verify `VITE_API_URL` in `.env` matches the backend URL
3. Check browser console for specific CORS error messages

### Issue: "Failed to process subscription"

**Solution:**
1. Check if the backend server is running
2. Verify the API URL is correct
3. Check browser network tab for the actual error response
4. Review backend server logs for detailed error information

## Security Considerations

1. **Input Validation**: Email addresses are validated on both frontend and backend
2. **Rate Limiting**: Consider adding rate limiting to prevent spam (e.g., using `express-rate-limit`)
3. **Environment Variables**: Never commit `.env` file to version control
4. **SMTP Credentials**: Keep SMTP credentials secure and rotate them periodically

## Future Enhancements

1. **Database Integration**: Store waitlist emails in a database (PostgreSQL, MongoDB) for record-keeping
2. **IP Geolocation**: Add precise location data using a geolocation service
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Admin Dashboard**: Create an admin interface to view and manage waitlist subscribers
5. **Email Verification**: Add double opt-in email verification
6. **Welcome Email**: Send a welcome email to new subscribers
