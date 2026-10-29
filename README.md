# Photography Website

A modern, professional photography website built with React, TypeScript, Vite, and Tailwind CSS. Features three pages (Home/Services, Portfolio, Contact), full technical SEO, a functional contact form backed by Supabase, and a responsive, accessible design.

## Pages

- **Home** (`/`) — Hero, photographer intro, services showcase (maternity, couples, family), featured gallery preview, and CTA banner.
- **Portfolio** (`/portfolio`) — Categorized photography galleries with tab navigation and a lightbox viewer.
- **Contact** (`/contact`) — Contact information and a validated inquiry form that saves to Supabase.

## Quick Start

```bash
npm install      # Install dependencies
npm run dev      # Start the dev server
npm run build    # Production build (outputs to /dist)
npm run preview  # Preview the production build
npm run typecheck # TypeScript type checking
```

## Configuration

All business information is centralized in **`src/config/site.ts`**. Update this single file to change:

- Business name, photographer name, and tagline
- Production domain (used for canonical URLs, sitemap, Open Graph)
- Primary city, state/region, and service areas
- Contact email, phone, and social links
- Services (titles, descriptions, images)
- Portfolio categories and images
- Homepage intro copy

### Important: Update before deploying

1. Set `productionDomain` in `src/config/site.ts` to your real domain.
2. Update `public/robots.txt` — change the `Sitemap:` URL.
3. Update `public/sitemap.xml` — replace all `https://www.example.com/` URLs.
4. Replace `public/favicon.svg` if desired.
5. Add a 1200×630 `og-image.jpg` to `public/` for social sharing.
6. Update the `<title>` and `<meta description>` fallbacks in `index.html`.

## Contact Form

The contact form saves inquiries to a Supabase `contact_inquiries` table. The table is created and secured with RLS — the public can submit inquiries (INSERT), but only authenticated users (the photographer via Supabase dashboard) can read, update, or delete them.

### Spam prevention
- A honeypot field catches bots without affecting real users.
- No CAPTCHA is required. If spam becomes an issue, consider adding reCAPTCHA or a Supabase Edge Function rate-limiter.

### Reading submissions
Inquiries are stored in Supabase. To view them:
1. Go to your Supabase dashboard → Table Editor → `contact_inquiries`.
2. Or query via the SQL Editor: `SELECT * FROM contact_inquiries ORDER BY created_at DESC;`

### Email notification (optional, not configured)
The form currently saves to the database only — it does not send an email. To get email notifications, you would need to:
1. Create a Supabase Edge Function triggered on insert (via a database webhook or scheduled check).
2. Use an email service (Resend, SendGrid, Postmark) within the edge function.
3. Store the email API key as a Supabase secret — never in client code.

## SEO Implementation

### What's included
- **Unique page titles and meta descriptions** per page (managed by the `Seo` component).
- **Canonical URLs** set via `<link rel="canonical">` on every page.
- **Open Graph and Twitter Card** metadata for social sharing.
- **Semantic HTML** — `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, proper heading hierarchy (one H1 per page, logical H2/H3 nesting).
- **Structured data (JSON-LD)** — `ProfessionalService` schema on the homepage, `CollectionPage` on the portfolio, `ContactPage` on contact.
- **XML sitemap** at `public/sitemap.xml` (update URLs before deploy).
- **robots.txt** at `public/robots.txt` allowing all crawlers and pointing to the sitemap.
- **Image optimization** — lazy-loading below the fold, eager hero image with `fetchPriority="high"`, width/height attributes to prevent layout shift, descriptive alt text.
- **Clean URLs** — `/`, `/portfolio`, `/contact` (no query params or hash fragments).
- **Internal links** — descriptive anchor text between pages and services.
- **Configurable local SEO** — city, state, and service area referenced naturally in titles, headings, and body copy.

### What's NOT included (and why)
- **No LocalBusiness schema with address/phone** — because no real business information has been provided yet. Add `LocalBusiness` or `Photographer` schema only when you have a verified business name, address, and phone number.
- **No reviews, ratings, prices, or testimonials** — fabricated structured data can result in Google penalties.
- **No breadcrumb structured data** — the site is only 3 pages deep with clear top-level navigation.

### After deployment

1. **Verify with Google's tools:**
   - [Rich Results Test](https://search.google.com/test/rich-results) — paste URLs to validate structured data.
   - [PageSpeed Insights](https://pagespeed.web.dev/) — test Core Web Vitals (LCP, INP, CLS).
   - [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) — verify mobile usability.

2. **Google Search Console setup:**
   - Go to [Google Search Console](https://search.google.com/search-console).
   - Add your property (domain or URL prefix).
   - Verify ownership — typically via a DNS TXT record, HTML file upload, or meta tag.
   - Submit the sitemap: enter `sitemap.xml` (relative to your domain).
   - Use **URL Inspection** to check individual page indexing status.
   - Monitor **Performance** for search queries, impressions, clicks, and CTR.
   - Check **Coverage** for indexing errors or excluded pages.

3. **Performance targets (Core Web Vitals):**
   - LCP ≤ 2.5s — hero image is loaded eagerly; images use the Pexels CDN with compression.
   - INP ≤ 200ms — minimal JavaScript, no heavy interactions.
   - CLS ≤ 0.1 — image dimensions specified, fonts loaded via `display=swap`.
   - Test with PageSpeed Insights after deployment and address any issues found.

## Deployment

### Cloudflare Pages (recommended)

1. Push the project to a GitHub repository.
2. In Cloudflare Pages, create a new project from the GitHub repo.
3. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Add environment variables (from your `.env` file):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy. Cloudflare Pages automatically serves `public/_redirects` for SPA routing.

### Other platforms (Netlify, Vercel, GitHub Pages)

- **Build command:** `npm run build`
- **Output directory:** `dist`
- For SPA routing, ensure all paths fall back to `index.html`. The included `public/_redirects` handles this for Netlify/Cloudflare. For Vercel, add a rewrite rule. For GitHub Pages, you may need a 404.html fallback.

### Environment variables

| Variable | Description | Required |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes (contact form) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key | Yes (contact form) |

These are pre-populated in `.env` for development. For production, set them in your hosting platform's environment variables. Never commit the service role key.

## Tech Stack

- **React 18** + **TypeScript** — type-safe UI components
- **Vite 7** — fast dev server and build tool
- **Tailwind CSS 3** — utility-first styling with a custom design system
- **Lucide React** — icon library
- **Supabase** — database for contact form submissions
- **Pexels** — stock photography (replace with your own images before launch)

## Project Structure

```
src/
  config/
    site.ts          # All business info, services, portfolio data
  components/
    Seo.tsx          # Per-page meta tag management
    Header.tsx       # Navigation (sticky, responsive)
    Footer.tsx       # Footer with contact info and links
    Reveal.tsx       # Scroll-reveal animation wrapper
    ui/
      Section.tsx    # SectionHeading and CTAButton
  hooks/
    useReveal.ts     # IntersectionObserver hook
  lib/
    router.ts        # Minimal History API router
    supabase.ts      # Supabase client singleton
  pages/
    HomePage.tsx     # Home + Services
    PortfolioPage.tsx # Portfolio galleries
    ContactPage.tsx  # Contact form
  App.tsx            # Root component + routing
  main.tsx           # Entry point
  index.css          # Global styles + design tokens
public/
  robots.txt          # Crawler directives
  sitemap.xml         # XML sitemap
  _redirects          # SPA routing fallback (Cloudflare/Netlify)
  favicon.svg         # Custom favicon
```

## Accessibility

- Semantic HTML5 elements throughout.
- Keyboard-accessible navigation and interactive elements.
- Visible focus states on all focusable elements.
- Proper form labels with `aria-invalid` and `aria-describedby` for errors.
- Sufficient color contrast (dark charcoal text on warm-white backgrounds).
- Descriptive alt text on informative images.
- `prefers-reduced-motion` respected — animations disabled for users who prefer reduced motion.
- Mobile menu uses `role="dialog"` and `aria-modal`.
- Lightbox is keyboard-dismissible (Escape key).

## License

This is a template project. Replace all placeholder content, images, and business information before using in production.
