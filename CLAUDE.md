Portfolio — Next.js 16 + Sanity CMS
Multilingual (pl/en/de) portfolio with blog. Next.js 16 App Router + Sanity v3 embedded Studio + next-intl + Tailwind v4 + Resend.
Commands

npm run dev — dev server
npm run build — production build
tsc --noEmit — type check (run after every change)
eslint . — lint

Key locations

All GROQ queries: sanity/lib/queries.ts (one file only, never elsewhere)
Page builder blocks: components/blocks/ (suffix Block)
i18n strings: messages/pl.json, en.json, de.json
Server Actions: app/actions/
Sanity schemas: sanity/schemaTypes/

Gotchas

revalidateTag takes ONE argument — revalidateTag(tag, 'default') in api/revalidate/tag/route.ts:35 is a bug, don't replicate
Contact form status render is commented out at components/blocks/contact-form.tsx:134 — tracked, intentional placeholder
Hardcoded recipient email in app/actions/contact.ts:37 — known issue, don't copy this pattern
GROQ projectsBlock is duplicated 4× in queries.ts — don't add a 5th; use a shared const fragment instead

Non-negotiable rules

No any in TypeScript
No user-facing strings hardcoded in components — always useTranslations / getTranslations
New env vars → add to .env.example immediately
Before writing code: state which files you will change → wait for my go-ahead
