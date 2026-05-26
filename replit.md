# Jennifer Mello, LICSW - Therapy Practice Website

## Overview
Modern, professional website for Jennifer Mello, LICSW - a certified trauma therapist based in Plymouth, MA. The site serves as a public-facing practice website with contact form functionality.

## ⚠️ Pre-Launch Checklist (Must Complete Before Going Live)
- [ ] **Email notifications** — Add `RESEND_API_KEY` secret (from resend.com free account). Code is fully wired in `server/email.ts`. Initial FROM address is `onboarding@resend.dev` (works for testing). Once a custom domain is verified in Resend, update `FROM_ADDRESS` in `server/email.ts` to use that domain. Notifications go to `jmellolicsw@gmail.com`; senders receive an auto-reply.
- [ ] **Custom domain** — Site is deployed at https://jmellolicsw.replit.app. To connect jmellolicsw.com: (1) Open the Replit deployment panel, go to the domain settings, and add `jmellolicsw.com` as a custom domain. (2) Replit will show you a CNAME record value — log in to your domain registrar and add it. (3) DNS propagation takes up to 48 hours.
- [ ] **Google Analytics** — Code is wired in `client/src/components/analytics.tsx`. To activate: (1) go to analytics.google.com, create a GA4 property for jmellolicsw.com, (2) copy the Measurement ID (format: G-XXXXXXXXXX), (3) add it as a secret named `VITE_GA_MEASUREMENT_ID`. Tracking loads only when this variable is present — dev stays clean.

## Deployment
- **Status**: Live at https://jmellolicsw.replit.app (autoscale deployment, healthy build)
- **Target**: Autoscale (scales with traffic, cost-effective)
- **Build**: `npm run build` → serves from `dist/` via `node ./dist/index.cjs`
- **Custom domain**: jmellolicsw.com (DNS setup pending — see checklist above)

## Recent Changes
- 2026-05-26: Accessibility audit (WCAG 2.1 AA) — skip-to-content link, focus trap in mobile nav, ARIA labels, aria-controls on FAQ accordion, decorative icons marked aria-hidden
- 2026-05-26: Sitemap updated to include /faq and /privacy pages
- 2026-02-15: SEO enhancements - canonical URLs, Twitter cards, OG tags, LocalBusiness JSON-LD, robots.txt, sitemap.xml
- 2026-02-15: Added "Current Clients" dropdown with Client Portal and Doxy.me telehealth links
- 2026-02-15: Removed Fullscript and Podcast links from Resources, replaced with Brene Brown and Headspace
- 2026-02-13: Full site rebuild from WordPress to modern React stack
- Pages: Home, About, Services, Resources, FAQ, Contact, Privacy, 404
- Added contact form with PostgreSQL persistence
- Warm sage/cream therapy-appropriate color palette
- Dark mode support with theme toggle
- Responsive design with mobile navigation
- Rate limiting on contact form (5 submissions/hr/IP)
- Security headers via Helmet

## Architecture
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui + Framer Motion
- **Backend**: Express.js with PostgreSQL (Drizzle ORM)
- **Routing**: wouter for client-side routing
- **SEO**: react-helmet-async for per-page meta tags, JSON-LD structured data
- **Fonts**: Inter (sans) + Lora (serif)
- **Color Theme**: Warm sage green primary, cream/warm white backgrounds

## Project Structure
- `client/src/pages/` - Home, About, Services, Resources, FAQ, Contact, Privacy, NotFound
- `client/src/components/` - Navigation (with Current Clients dropdown), Footer, ThemeProvider, SEO, Analytics
- `server/routes.ts` - Contact form API endpoint (POST /api/contact)
- `server/email.ts` - Email notifications via Resend (admin alert + auto-reply)
- `server/storage.ts` - DatabaseStorage with contact submission CRUD
- `server/db.ts` - PostgreSQL connection pool
- `shared/schema.ts` - contactSubmissions table schema
- `client/public/images/` - Generated hero, about, and services background images
- `client/public/robots.txt` - Search engine crawling rules
- `client/public/sitemap.xml` - Site map for search engines (all 7 pages)

## External Portal Links
- Client Portal: https://jmellolicsw.clientsecure.me/
- Telehealth (Doxy.me): https://doxy.me/v2/check-in/jmellolicsw/

## Key Contact Info (Content)
- Name: Jennifer Mello, LICSW
- Address: 225 Water Street, Suite B239, Plymouth, MA 02360
- Phone: (508) 591-0569
- Email: jmellolicsw@gmail.com
- Hours: Mon-Thu 10AM-7PM
- Instagram: @jennifermellolicsw
