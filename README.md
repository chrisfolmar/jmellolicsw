# Jennifer Mello, LICSW — Therapy Practice Website

A modern, responsive website for Jennifer Mello, LICSW — a certified trauma therapist providing holistic health and wellness therapy in Plymouth, Massachusetts.

**Live Site:** [jmellolicsw.com](https://jmellolicsw.com)

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwindcss)
![Express](https://img.shields.io/badge/Express-4-black?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)

---

## Overview

Full-stack rebuild of a WordPress site into a modern React application with a clean, calming design tailored for a therapy practice. Features a warm sage and cream color palette, smooth animations, dark mode support, SEO optimization, and a working contact form backed by PostgreSQL.

## Features

- **5-Page Responsive Site** — Home, About, Services, Resources, and Contact pages with mobile-first design
- **Contact Form** — Validated form with PostgreSQL persistence via Drizzle ORM
- **Dark Mode** — Full light/dark theme toggle with localStorage persistence
- **SEO Optimized** — Per-page meta tags, Open Graph/Twitter cards, canonical URLs, JSON-LD structured data, robots.txt, and sitemap.xml
- **Client Portal Access** — Secure links to ClientSecure.me and Doxy.me telehealth
- **Smooth Animations** — Framer Motion scroll-triggered animations throughout
- **Crisis Resources** — Prominently displayed mental health helpline numbers
- **Accessible Design** — Semantic HTML, proper heading hierarchy, and ARIA-friendly components

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Styling | TailwindCSS, shadcn/ui, Framer Motion |
| Routing | wouter |
| Backend | Express.js, Node.js |
| Database | PostgreSQL (Neon), Drizzle ORM |
| Validation | Zod, react-hook-form |
| SEO | react-helmet-async, JSON-LD |
| Fonts | Inter (sans-serif), Lora (serif) |

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── pages/           # Home, About, Services, Resources, Contact, NotFound
│   │   ├── components/      # Navigation, Footer, SEO, ThemeProvider, UI components
│   │   ├── hooks/           # Custom React hooks
│   │   └── lib/             # Query client and utilities
│   └── public/
│       ├── images/          # Hero, about, and services background images
│       ├── robots.txt       # Search engine crawling rules
│       └── sitemap.xml      # Sitemap for search engines
├── server/
│   ├── routes.ts            # API endpoints (POST /api/contact)
│   ├── storage.ts           # Database storage interface
│   ├── db.ts                # PostgreSQL connection
│   └── vite.ts              # Vite dev server integration
├── shared/
│   └── schema.ts            # Drizzle schema and Zod validation
└── drizzle.config.ts        # Drizzle ORM configuration
```

## Pages

| Page | Description |
|------|-------------|
| **Home** | Hero section, welcome message, services preview, client portals, and CTA |
| **About** | Bio, credentials, therapeutic approach, and mind-body healing philosophy |
| **Services** | 10 detailed service cards covering trauma, anxiety, holistic wellness, and more |
| **Resources** | Crisis hotlines and curated mental health resources (NAMI, NCTSN, Mindful.org, etc.) |
| **Contact** | Contact info cards, office hours, and validated submission form |

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# DATABASE_URL=postgresql://...
# SESSION_SECRET=your-secret

# Push database schema
npm run db:push

# Start development server
npm run dev
```

The application runs on `http://localhost:5000`.

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit a contact form (name, email, phone, message) |

## Design

The site uses a warm, calming color palette appropriate for a therapy practice:

- **Primary:** Sage green (#6b9080)
- **Background:** Warm cream tones
- **Typography:** Lora (serif) for headings, Inter (sans-serif) for body text
- **Approach:** Clean, minimal design with generous whitespace and subtle animations

---

Built by [Chris Folmar](https://www.linkedin.com/in/clfolmar)
