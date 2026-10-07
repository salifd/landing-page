# Quikku Landing Page

A modern, sophisticated landing page built with Next.js (App Router), React, TypeScript, and Tailwind CSS for a payment solution targeting travelers.

## Features

- Modern, clean design with smooth animations
- Fully responsive layout (mobile-first approach)
- TypeScript for type safety
- Tailwind CSS for styling with custom color palette
- Email validation on the opt-in form
- Loading states and success feedback
- SVG illustrations for visual appeal

## Color Palette

- **Primary**: #0A2472 (Deep Blue)
- **Secondary**: #A6E1FA (Light Blue)
- **Accent Dark**: #001C55 (Dark Navy)
- **Accent Coral**: #FF6B6B (Coral Red)

## Project Structure

```
landing-page/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout: metadata, fonts, JSON-LD, Matomo
│   │   ├── page.tsx            # Home page (/)
│   │   ├── terms/page.tsx      # Terms of Use (/terms)
│   │   ├── privacy/page.tsx    # Privacy Policy (/privacy)
│   │   ├── not-found.tsx       # 404 page
│   │   └── globals.css         # Tailwind CSS directives and global styles
│   ├── components/             # Page sections and page bodies
│   └── hooks/                  # Client-side hooks (scroll reveal)
├── src/app/api/                # Waitlist API: /api/subscribe and /api/health
├── src/lib/                    # Server-only Brevo client and email templates
├── public/                     # Static assets
├── scripts/check-brevo.mjs     # Checks the Brevo setup from the server
├── Dockerfile, docker-compose.yml, Caddyfile
├── next.config.ts              # Next.js config (standalone server, security headers)
├── tailwind.config.js          # Tailwind configuration with custom theme
└── package.json                # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and visit `http://localhost:3000`

To test the waitlist form locally, copy `.env.example` to `.env.local` and fill in the Brevo settings; `npm run dev` picks them up.

## Available Scripts

- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the production server into `.next/standalone`
- `npm run lint` - Run ESLint for code quality

## Components Overview

### Header Component

- Displays the Quikku logo with modern gradient design
- Includes a notification badge for visual appeal
- Fully responsive with hover animations

### FirstSection Component

- Features the main value proposition text on the left
- Includes an SVG illustration of a globe with travel elements on the right
- Animated entrance with slide effects
- Decorative gradient background elements

### SecondSection Component

- Email opt-in form with proper validation
- Real-time email validation feedback
- Loading state with spinner animation
- Success state with confirmation message
- SVG email illustration on the left
- Links to terms of use and privacy policy

## Customization

### Changing Colors

Edit `tailwind.config.js` to modify the color palette:

```javascript
colors: {
  primary: '#0A2472',
  secondary: '#A6E1FA',
  accent: {
    dark: '#001C55',
    coral: '#FF6B6B',
  },
}
```

### Modifying Text Content

Update the text in the respective component files:

- `src/components/FirstSection.tsx` - Journey message
- `src/components/SecondSection.tsx` - Call-to-action heading

### Adding Images

Replace the SVG placeholders in the components with actual images:

- Use the `<img>` tag with your image source
- Or integrate with a service like Unsplash or use local assets

## Production Build

To create a production build:

```bash
npm run build
```

The site is statically exported (`output: "export"`) to the `out` directory, ready for deployment.

## Waitlist API (Brevo)

Signups go to `/api/subscribe`, a Next.js route handler that adds the email to a Brevo contact list and emails the team a notification. The Brevo settings are server-side environment variables (see `.env.example`); none of them reach the browser.

- `BREVO_API_KEY` must be an **API v3 key** (`xkeysib-…`), not an SMTP key
- `EMAIL_FROM` must be a sender verified in Brevo
- If Brevo's *Authorised IPs* protection is on, add the server's public IP

Failures are logged to the container output with a `[quikku]` prefix and a hint on how to fix them (`docker compose logs web`).

## Deployment (Docker)

On the server, from the project folder:

```bash
cp .env.example .env        # fill in the Brevo settings
docker compose up -d --build
docker compose exec web node scripts/check-brevo.mjs --send-test
```

The site listens on `127.0.0.1:3000`. Point your reverse proxy (nginx, Traefik, ...) at it, or start the bundled Caddy, which serves `quikkupay.com` / `www.quikkupay.com` with automatic HTTPS (DNS must point at the server and ports 80/443 must be open):

```bash
docker compose --profile proxy up -d --build
```

To update: `git pull && docker compose up -d --build`. The container restarts automatically and exposes a health check at `/api/health`.

## Technologies Used

- Next.js 16 (App Router, standalone server)
- React 19
- TypeScript
- Tailwind CSS
- PostCSS
- Autoprefixer

## Browser Support

This application supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
