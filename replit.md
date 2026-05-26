# Jennifer Mello, LICSW - Therapy Practice Website

## Overview
Modern, professional website for Jennifer Mello, LICSW - a certified trauma therapist based in Plymouth, MA. The site serves as a public-facing practice website with contact form functionality.

## ⚠️ Pre-Launch Checklist (Must Complete Before Going Live)
- [ ] **Email notifications** — Add `RESEND_API_KEY` secret (from resend.com free account). Code is fully wired in `server/email.ts`. Initial FROM address is `onboarding@resend.dev` (works for testing). Once a custom domain is verified in Resend, update `FROM_ADDRESS` in `server/email.ts` to use that domain. Notifications go to `jmellolicsw@gmail.com`; senders receive an auto-reply.
- [ ] **Custom domain** — Point `jmellolicsw.com` DNS to the deployed Replit app.
- [ ] **Google Analytics** — Create GA4 property, add `VITE_GA_MEASUREMENT_ID` to environment secrets.

## Recent Changes
- 2026-02-15: SEO enhancements - canonical URLs, Twitter cards, OG tags, LocalBusiness JSON-LD, robots.txt, sitemap.xml
- 2026-02-15: Added "Current Clients" dropdown with Client Portal and Doxy.me telehealth links
- 2026-02-15: Removed Fullscript and Podcast links from Resources, replaced with Brene Brown and Headspace
- 2026-02-13: Full site rebuild from WordPress to modern React stack
- Pages: Home, About, Services, Resources, Contact, 404
- Added contact form with PostgreSQL persistence
- Warm sage/cream therapy-appropriate color palette
- Dark mode support with theme toggle
- Responsive design with mobile navigation

## Architecture
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui + Framer Motion
- **Backend**: Express.js with PostgreSQL (Drizzle ORM)
- **Routing**: wouter for client-side routing
- **SEO**: react-helmet-async for per-page meta tags, JSON-LD structured data
- **Fonts**: Inter (sans) + Lora (serif)
- **Color Theme**: Warm sage green primary, cream/warm white backgrounds

## Project Structure
- `client/src/pages/` - Home, About, Services, Resources, Contact, NotFound
- `client/src/components/` - Navigation (with Current Clients dropdown), Footer, ThemeProvider, SEO
- `server/routes.ts` - Contact form API endpoint (POST /api/contact)
- `server/storage.ts` - DatabaseStorage with contact submission CRUD
- `server/db.ts` - PostgreSQL connection pool
- `shared/schema.ts` - contactSubmissions table schema
- `client/public/images/` - Generated hero, about, and services background images
- `client/public/robots.txt` - Search engine crawling rules
- `client/public/sitemap.xml` - Site map for search engines

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
