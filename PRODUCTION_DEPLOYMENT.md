# Production Deployment Guide

## Overview

This guide covers deploying the Quikku landing page with the new waitlist notification system to production.

## Architecture

- **Frontend**: React + Vite static site (can be deployed to Vercel, Netlify, Cloudflare Pages)
- **Backend**: Express.js API server (can be deployed to Railway, Heroku, DigitalOcean, AWS)

## Prerequisites

1. Brevo SMTP credentials (or alternative SMTP service)
2. Domain name (optional but recommended)
3. Hosting accounts for frontend and backend

## Deployment Steps

### Step 1: Prepare Environment Variables

Create environment variables on your hosting platforms:

#### Backend Environment Variables (Railway/Heroku/etc.)

```env
VITE_SMTP_Server=smtp-relay.brevo.com
VITE_SMTP_PORT=587
VITE_LOGIN=your-smtp-login@smtp-brevo.com
VITE_SMTP_PASS=your-smtp-password
VITE_EMAIL_TO=dagence.digital@gmail.com
VITE_EMAIL_FROM=hello@quikkupay.com
PORT=3001
NODE_ENV=production
```

#### Frontend Environment Variables (Vercel/Netlify/etc.)

```env
VITE_API_URL=https://your-api-domain.com
```

### Step 2: Deploy Backend (Example: Railway)

1. **Create a Railway Account**: Go to [Railway.app](https://railway.app)

2. **Create a New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account and select the repository

3. **Configure the Service**:
   - Set the **Root Directory** to `/server` (or configure start command)
   - Set **Start Command**: `node index.js`

4. **Add Environment Variables**:
   - Go to Variables tab
   - Add all backend environment variables listed above

5. **Deploy**:
   - Railway will automatically deploy on push to main branch
   - Note the deployment URL (e.g., `https://your-app.railway.app`)

### Step 3: Deploy Backend (Alternative: Heroku)

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create Heroku App**:
   ```bash
   heroku create quikku-waitlist-api
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set VITE_SMTP_Server=smtp-relay.brevo.com
   heroku config:set VITE_SMTP_PORT=587
   heroku config:set VITE_LOGIN=your-smtp-login@smtp-brevo.com
   heroku config:set VITE_SMTP_PASS=your-smtp-password
   heroku config:set VITE_EMAIL_TO=dagence.digital@gmail.com
   heroku config:set VITE_EMAIL_FROM=hello@quikkupay.com
   ```

4. **Create Procfile** in root:
   ```
   web: node server/index.js
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

### Step 4: Deploy Frontend (Example: Vercel)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [Vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install --legacy-peer-deps`

3. **Add Environment Variable**:
   - Go to Project Settings > Environment Variables
   - Add: `VITE_API_URL` = `https://your-api-domain.railway.app`

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Step 5: Deploy Frontend (Alternative: Netlify)

1. **Via Netlify Dashboard**:
   - Go to [Netlify.com](https://netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub and select repository

2. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Install command**: `npm install --legacy-peer-deps`

3. **Add Environment Variable**:
   - Go to Site settings > Environment variables
   - Add: `VITE_API_URL` = `https://your-api-domain.railway.app`

4. **Deploy**:
   - Click "Deploy site"

## Post-Deployment Configuration

### 1. Update CORS Settings (Backend)

For production, restrict CORS to your frontend domain:

Edit `/Users/salif/Documents/Development/WebProjects/landing-page/server/index.js`:

```javascript
// Instead of:
app.use(cors());

// Use:
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  methods: ['GET', 'POST'],
  credentials: true
}));
```

### 2. Add IP Geolocation (Optional but Recommended)

Install a geolocation service:

```bash
npm install geoip-lite
```

Update the `getLocationFromIp` function in `server/index.js`:

```javascript
import geoip from 'geoip-lite';

const getLocationFromIp = async (ip) => {
  if (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1') {
    return 'localhost (development)';
  }

  const geo = geoip.lookup(ip);
  if (geo) {
    return `${geo.city || 'Unknown'}, ${geo.country || 'Unknown'} (${ip})`;
  }

  return ip;
};
```

### 3. Add Rate Limiting (Recommended)

Install rate limiting:

```bash
npm install express-rate-limit
```

Add to `server/index.js`:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many subscription attempts, please try again later.'
});

app.post('/api/waitlist/subscribe', limiter, async (req, res) => {
  // existing code...
});
```

### 4. Enable HTTPS

Both hosting platforms (Railway, Vercel, Netlify, Heroku) automatically provide HTTPS. Ensure you're using the HTTPS URLs in your configuration.

### 5. Set Up Custom Domain (Optional)

#### For Backend (Railway):
1. Go to your Railway project settings
2. Click "Generate Domain" or add a custom domain
3. Update DNS records as instructed

#### For Frontend (Vercel/Netlify):
1. Go to domain settings
2. Add your custom domain
3. Update DNS records as instructed

## Monitoring and Maintenance

### 1. Monitor Backend Logs

**Railway**:
- Go to project > Deployments > View Logs

**Heroku**:
```bash
heroku logs --tail --app quikku-waitlist-api
```

### 2. Set Up Error Monitoring (Recommended)

Install Sentry for error tracking:

```bash
npm install @sentry/node
```

Add to `server/index.js`:

```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV || 'development',
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

### 3. Email Delivery Monitoring

Monitor your Brevo account for:
- Email delivery rates
- Bounce rates
- SMTP quota usage

### 4. Database Integration (Future Enhancement)

For storing waitlist emails permanently:

1. Set up a PostgreSQL database (Railway provides free PostgreSQL)
2. Install Prisma or another ORM:
   ```bash
   npm install @prisma/client
   ```
3. Create a waitlist table schema
4. Save emails to database in addition to sending notifications

## Testing Production Deployment

### 1. Test Backend API

```bash
curl -X POST https://your-api-domain.com/api/waitlist/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### 2. Test Frontend

1. Visit your production URL
2. Submit a test email
3. Verify:
   - Success message appears
   - Email notification received at `dagence.digital@gmail.com`
   - No console errors

### 3. Test Error Handling

- Submit an invalid email
- Submit the same email multiple times (test rate limiting)
- Check error messages are user-friendly

## Rollback Plan

If issues occur in production:

1. **Vercel/Netlify**: Rollback to previous deployment from dashboard
2. **Railway/Heroku**: Rollback using CLI:
   ```bash
   heroku releases:rollback v123
   ```

## Security Checklist

- [ ] HTTPS enabled on both frontend and backend
- [ ] CORS configured to only allow frontend domain
- [ ] Rate limiting implemented
- [ ] Environment variables secured (not in code)
- [ ] SMTP credentials rotated regularly
- [ ] Input validation on both frontend and backend
- [ ] Error messages don't expose sensitive information
- [ ] Logging doesn't include sensitive data

## Cost Estimates

### Free Tier Options

- **Frontend (Vercel/Netlify)**: Free for personal projects
- **Backend (Railway)**: $5/month (500 hours free initially)
- **Backend (Heroku)**: Free dyno available (sleeps after 30 min inactivity)
- **Brevo SMTP**: Free up to 300 emails/day

### Recommended Paid Tier (for production)

- **Frontend**: $20/month (Vercel Pro)
- **Backend**: $10-20/month (Railway/Heroku)
- **Brevo**: Free tier is sufficient for most use cases

## Support

For issues:
1. Check deployment logs
2. Review WAITLIST_SETUP.md for troubleshooting
3. Verify environment variables are set correctly
4. Test locally first with production environment variables
