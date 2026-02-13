# Jennifer Mello, LICSW - Therapy Practice Website

## Overview
Modern, professional website for Jennifer Mello, LICSW - a certified trauma therapist based in Plymouth, MA. The site serves as a public-facing practice website with contact form functionality.

## Recent Changes
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
- **Fonts**: Inter (sans) + Lora (serif)
- **Color Theme**: Warm sage green primary, cream/warm white backgrounds

## Project Structure
- `client/src/pages/` - Home, About, Services, Resources, Contact, NotFound
- `client/src/components/` - Navigation, Footer, ThemeProvider
- `server/routes.ts` - Contact form API endpoint (POST /api/contact)
- `server/storage.ts` - DatabaseStorage with contact submission CRUD
- `server/db.ts` - PostgreSQL connection pool
- `shared/schema.ts` - contactSubmissions table schema
- `client/public/images/` - Generated hero, about, and services background images

## Key Contact Info (Content)
- Name: Jennifer Mello, LICSW
- Address: 225 Water Street, Suite B239, Plymouth, MA 02360
- Phone: (508) 591-0569
- Email: jmellolicsw@gmail.com
- Hours: Mon-Thu 10AM-7PM
- Instagram: @jennifermellolicsw
