Portfolio — Next.js 16 + Sanity CMS
  Multilingual (pl/en/de) portfolio with blog. Next.js 16 App Router + Sanity v4
  embedded Studio + next-intl + Tailwind v4 + Resend.

  Commands

  npm run dev      — dev server (runs typegen first via predev)
  npm run build    — production build (runs typegen first via prebuild)
  npm run typegen  — regenerate sanity/extract.json + sanity/types.ts
  tsc --noEmit     — type check (run after every change)
  eslint .         — lint
  npm run test     — vitest run

  Key locations

  All GROQ queries:        sanity/lib/queries.ts (one file only, never elsewhere)
  Page builder blocks:     components/blocks/ (suffix Block)
  Server Actions:          app/actions/
  Sanity schemas:          sanity/schemaTypes/
  i18n routing only:       i18n/routing.ts — next-intl used for locale routing,
                           NOT for translation messages (messages: {} is empty);
                           all UI strings come from Sanity CMS with English fallbacks
  Tests:                   __tests__/

  Gotchas

  revalidateTag(tag, 'default') in api/revalidate/tag/route.ts — Next.js 16 type
    definition requires 2 args; this is intentional for this version, don't remove
    the second argument or tsc will fail

  Contact form status render is commented out at
    components/blocks/contact-form.tsx:134 — tracked, intentional placeholder

  Hardcoded recipient email in app/actions/contact.ts:37 — known issue,
    don't copy this pattern

  GROQ projectsBlock is duplicated 4× in queries.ts — don't add a 5th;
    use a shared const fragment instead

  sanity/extract.json is committed and manually maintained — do NOT replace it
    wholesale with output from `sanity schema extract` as that regenerates
    stricter types that break existing code. To add a new schema type:
    (1) register in sanity/schemaTypes/index.ts
    (2) manually write the QUERYResult type in sanity/types.ts
    matching the shape of the GROQ query

  Next.js 16 renamed middleware.ts to proxy.ts — the active i18n middleware is
    at proxy.ts in the project root (not middleware.ts)

  Non-negotiable rules

  No any in TypeScript
  No user-facing strings hardcoded in components — strings come from Sanity CMS
    with English fallbacks (useTranslations is not wired up)
  New env vars → add to .env.example immediately
  Before writing code: state which files you will change → wait for go-ahead