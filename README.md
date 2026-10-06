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
├── public/                     # Static assets, .htaccess, api.php
├── php/                        # Slim PHP API (waitlist subscription via Brevo)
├── next.config.ts              # Next.js config (static export, dev /api proxy)
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

During development, requests to `/api/*` are proxied to the PHP API at `http://localhost:8080` (e.g. `php -S localhost:8080 -t public`). To call an API on another origin, set `NEXT_PUBLIC_API_URL`.

## Available Scripts

- `npm run dev` - Start the Next.js development server
- `npm run build` - Build and export the static site to `out/`
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

## Deployment

Upload the contents of `out/` to the Apache document root, with the `php/` directory beside it (run `composer install` in `php/`). The bundled `.htaccess` routes `/api/*` to the PHP API, serves pages without the `.html` extension (`/terms` → `terms.html`) and uses `404.html` for unknown URLs.

The `out/` folder can also be hosted on any static host (Vercel, Netlify, S3 + CloudFront, ...) as long as the `/api` endpoint is provided separately.

## Technologies Used

- Next.js 16 (App Router, static export)
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
