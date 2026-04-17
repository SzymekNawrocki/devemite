# Devemite — Where every grain holds a story

> *A developer who wanders alone through the desert of code, leaving footprints in the sand.*

A high-performance, multilingual portfolio and blog built for the long haul — no fluff, no noise, just clean architecture baked under the sun of modern web standards.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Sanity](https://img.shields.io/badge/Sanity-v4-F03E2F?style=flat-square&logo=sanity)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)

---

## The Oasis

What you're looking at is a fully content-managed personal portfolio with an embedded blog engine, localized into three languages (English, Polish, German) — all managed from a single Sanity Studio embedded directly in the app. No external CMS dashboard. No hardcoded strings. Every label, every heading, every SEO tag lives in Sanity.

The visual identity borrows from the desert: sandy warm tones (`#f2e7c9`), dark dunes at night (`#1c1a15`), grain overlays, sand particle animations, and scroll-driven transitions that carry the reader like a desert wind.

---

## Sandstorm — the tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 — App Router | RSC, ISR, View Transitions API |
| CMS | Sanity v4 + embedded Studio | Type-safe GROQ, Live Visual Editing |
| Styling | Tailwind CSS v4 + JetBrains Mono | Design tokens via CSS custom properties |
| i18n | next-intl (routing) + `@sanity/document-internationalization` | Locale routing + document-level translations |
| Components | Radix UI primitives + shadcn/ui patterns | Accessible, unstyled, composable |
| Forms | React Hook Form + Zod + Resend | Type-safe validation, email delivery |
| Animations | CSS Scroll-Driven Animations + View Transitions | Zero JS, progressive enhancement |
| Testing | Vitest | Fast, ESM-native unit tests |

---

## Dunes — key features

- **Page Builder** — hero, about me, projects, services, technologies, CTA, FAQ, rich text, split image, contact — all blocks composable in Sanity Studio
- **Blog Engine** — categories, related posts, pagination, PortableText rendering
- **Portfolio** — projects with live/GitHub links, per-project technology stacks with i18n fallback
- **Services & Technologies** — dedicated detail pages with their own GROQ queries
- **OG Image Generation** — edge function extracts Sanity's color palette and builds dynamic Open Graph images
- **JSON-LD** — `Person`, `BlogPosting`, `BreadcrumbList` schema for every relevant page
- **Sitemap** — dynamically generated from Sanity content across all three locales
- **Draft Mode + Visual Editing** — full Sanity presentation layer integration
- **Sanity-driven Redirects** — redirect rules managed entirely in CMS
- **Security Headers** — CSP, HSTS, X-Frame-Options, Permissions-Policy, CORP
- **Accessibility** — `prefers-reduced-motion` respected for all animations

---

## Getting started

### Requirements

- Node.js 20+
- A [Sanity.io](https://sanity.io) account

### Installation

```bash
git clone https://github.com/SzymekNawrocki/devemite.git
cd devemite
npm install
```

### Environment variables

Copy `.env.example` and fill in your credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
SANITY_API_READ_TOKEN=your_read_token
SANITY_REVALIDATE_SECRET=your_revalidate_secret
RESEND_API_KEY=your_resend_key
```

### Run

```bash
npm run dev          # dev server — runs typegen first
npm run build        # production build — runs typegen first
npm run typegen      # regenerate Sanity types
tsc --noEmit         # type check
npm run test         # vitest run
```

- Website → `http://localhost:3000/en`
- Studio → `http://localhost:3000/studio`

---

## The desert map — project structure

```
├── app/
│   ├── (website)/[lang]/        # Public routes — home, blog, projects, services, technologies, contact
│   ├── api/
│   │   ├── og/                  # Dynamic OG image generator (edge)
│   │   ├── revalidate/          # ISR revalidation webhooks from Sanity
│   │   └── draft-mode/          # Sanity Draft Mode enable/disable
│   └── studio/                  # Embedded Sanity Studio
├── components/
│   ├── blocks/                  # Page Builder blocks (suffix: Block)
│   ├── blog/                    # Blog-specific components
│   ├── layout/                  # Header, Footer, LanguageSwitcher, ThemeProvider
│   ├── projects/                # Project detail components
│   ├── seo/                     # JsonLd component
│   ├── technology/              # Technology detail components
│   └── ui/                      # Base UI (Button, Card, Sheet, Typewriter, ...)
├── sanity/
│   ├── lib/
│   │   ├── queries.ts           # ALL GROQ queries — one file, no exceptions
│   │   ├── client.ts            # Sanity client config
│   │   ├── live.ts              # SanityLive + sanityFetch
│   │   └── image.ts             # urlFor helper
│   ├── schemaTypes/             # All CMS document & object schemas
│   ├── extract.json             # Committed schema extract (manually maintained)
│   └── types.ts                 # Auto-generated GROQ result types
├── lib/
│   ├── json-ld.ts               # Structured data schema builders
│   ├── hreflang.ts              # hreflang alternate link builder
│   ├── breadcrumb-dictionary.ts # Breadcrumb label map
│   └── validation/contact.ts   # Zod schema for contact form
├── i18n/
│   └── routing.ts               # next-intl locale routing config (en/de/pl)
├── __tests__/                   # Vitest unit tests
└── public/                      # Static assets, manifest.json, robots.txt
```

---

## Gotchas worth knowing

**`sanity/extract.json`** is committed and manually maintained. Do **not** replace it with raw `sanity schema extract` output — that regenerates stricter types that break existing GROQ queries. To add a new schema type: register it in `schemaTypes/index.ts`, then manually write the matching `QUERYResult` type in `sanity/types.ts`.

**All GROQ queries live in `sanity/lib/queries.ts`** — one file, no exceptions. The `PROJECTS_BLOCK_FRAGMENT` is currently duplicated 4× because inline GROQ doesn't support shared fragments across `defineQuery` calls — use a shared const fragment before adding a fifth.

**`revalidateTag(tag, 'default')`** in `api/revalidate/tag/route.ts` takes two arguments intentionally — Next.js 16 type definitions require it. Don't remove the second arg or `tsc` will fail.

**i18n strings** — `next-intl` is used for locale routing only. All UI strings come from Sanity CMS with English fallbacks. `useTranslations()` is not wired up.

---

## What could be carved next

The oasis is habitable. These are the trails that haven't been walked yet:

- **RSS/Atom feed** for the blog — essential for developer audiences
- **Full-text search** across posts and projects (Sanity search or Algolia)
- **GDPR / Cookie consent** banner — legally required in PL/DE
- **Rate limiting** on the contact form Server Action
- **Reading time** calculation from PortableText body (already referenced in CMS schema)
- **Table of contents** for long blog posts
- **Scroll-to-top** button
- **Vercel Analytics / Plausible** — privacy-first page view tracking
- **PWA service worker** — manifest exists, worker missing
- **More test coverage** — currently only contact validation is tested

---

## License

Private project. Owned by [Szymon Nawrocki](https://github.com/SzymekNawrocki) — Devemite.

---

*"The desert does not hurry. Neither does good software."*
