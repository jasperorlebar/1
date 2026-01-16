# Save the King's Arms Campaign

A heritage campaign landing page for the Save the King's Arms community initiative in Polebrook.

## Project Overview

This is a static HTML/CSS/JS campaign website designed to raise awareness and gather community support for preserving the King's Arms, a 300-year-old pub facing closure.

## Configuration

All configurable options are located at the top of `scripts.js`:

```javascript
const CONFIG = {
  // Countdown target date (format: 'YYYY-MM-DDTHH:MM:SS')
  countdownTargetDate: '2026-03-31T23:59:59',

  // Form submission endpoint (optional)
  formEndpoint: null, // Set to your API endpoint
};
```

### Hero Media

To add a video background, uncomment and update the source in `index.html`:

```html
<video autoplay muted loop playsinline poster="YOUR_POSTER_IMAGE_URL">
  <source src="YOUR_VIDEO_URL" type="video/mp4">
</video>
```

## Local Development

Start the Netlify development server:

```bash
netlify dev
```

The site will be available at `http://localhost:8888`.

## Deployment

The site deploys automatically on Netlify. Simply push to the main branch.

## Design System

- **Primary dark slate**: #2F3A40
- **Soft white**: #F4F4F2
- **Accent gold**: #C6A24D
- **Burgundy (accent)**: #7A2E2B

Typography uses Poppins for headings and Inter for body text.
