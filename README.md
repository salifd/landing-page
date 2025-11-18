# Quikku Landing Page

A modern, sophisticated landing page built with React, TypeScript, and Tailwind CSS for a payment solution targeting travelers.

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
│   ├── components/
│   │   ├── Header.tsx          # Logo and branding
│   │   ├── FirstSection.tsx    # Journey introduction with image
│   │   └── SecondSection.tsx   # Opt-in form with validation
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Tailwind CSS directives
├── tailwind.config.js         # Tailwind configuration with custom theme
├── postcss.config.js          # PostCSS configuration
├── index.html                 # HTML entry point
└── package.json               # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Navigate to the project directory:

```bash
cd /Users/salif/Documents/Development/WebProjects/landing-page
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit the URL shown in the terminal (typically `http://localhost:5173`)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
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

The build output will be in the `dist` directory, ready for deployment.

## Deployment

This project can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Technologies Used

- React 18
- TypeScript
- Vite
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
