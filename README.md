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

### Changing Photos and Videos

All images and videos are referenced in `index.html`. Here's where to find and change each one:

#### 1. Hero Section (Lines 24-33)
**Current:** Unsplash image as poster, video source commented out
```html
<video poster="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80">
  <!-- <source src="VIDEO_URL" type="video/mp4"> -->
</video>
```
**To add video:** Uncomment the `<source>` line and replace `VIDEO_URL` with your video URL  
**To change poster:** Replace the `poster` attribute URL

#### 2. Split Feature Section (Lines 94-99)
**Current:** Traditional pub exterior
```html
<img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" 
     alt="Traditional English pub exterior">
```

#### 3. Campaign Grid - Block A (Lines 113-117)
**Current:** Community gathering at pub
```html
<img src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&q=80"
     alt="Community gathering at a traditional pub">
```

#### 4. Campaign Grid - Block B (Lines 135-139)
**Current:** Historic pub interior
```html
<img src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80"
     alt="Historic pub interior">
```

#### 5. Campaign Grid - Block C (Lines 154-158)
**Current:** Historic building architecture
```html
<img src="https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=600&q=80"
     alt="Historic building architecture">
```

#### 6. Campaign Grid - Block D (Lines 174-178)
**Current:** Community coming together
```html
<img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
     alt="Community coming together">
```

#### 7. Press Card Section (Lines 318-323)
**Current:** Pub exterior with good local pub text
```html
<img src="https://images.unsplash.com/photo-1594993540085-d8b8dca0cbb5?w=400&q=80"
     alt="The value of a good local pub">
```

**How to change any image:**
1. Open `index.html`
2. Find the line number from the list above
3. Replace the `src` URL with your own image URL or local file path
4. Update the `alt` text to describe your image

**Recommended image sizes:**
- Hero poster: 1920px wide minimum
- Hero video: 1920x1080 (Full HD) MP4 format
- Split feature: 800px wide
- Campaign grid images: 600px wide
- Press card image: 400px wide

## Local Development

Start the Netlify development server:

```bash
netlify dev
```

The site will be available at `http://localhost:8888`.

## Deployment

The site deploys automatically on Netlify. Simply push to the main branch.

## Design System

- **Primary dark slate**: #3f4d57
- **Soft white**: #F4F4F2
- **Accent gold**: #3f4d57
- **Burgundy (accent)**: #000000

Typography uses Poppins for headings and Inter for body text.
