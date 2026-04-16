# 🚀 Modern Multi-Language Portfolio & Blog

A high-performance, fully localized portfolio and blog engine built with **Next.js 15**, **React 19**, and **Sanity CMS**. Designed for developers and agencies who want a seamless, content-driven experience with top-tier SEO and performance.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Sanity](https://img.shields.io/badge/Sanity-v3-F03E2F?style=for-the-badge&logo=sanity)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

---

## ✨ Key Features

- 🌍 **Document-Level Localization**: Fully managed multi-language support (PL, EN, DE) integrated directly into Sanity CMS.
- 🏗️ **Modern Tech Stack**: Built with Next.js 15 (App Router), React 19, and Tailwind CSS 4.
- 📝 **Advanced Blog Engine**: Categorized posts, related content, reading time estimation, and rich text support.
- 🎨 **Fully Content-Managed**: Every string, image, and SEO meta tag is modifiable via Sanity Studio. No hardcoded UI strings.
- 🛡️ **Type-Safe**: Complete TypeScript definitions for all Sanity queries via automatic type generation.
- 🏎️ **Optimized Performance**: Next.js ISR (Incremental Static Regeneration) for lightning-fast page loads.
- 📱 **Responsive Design**: Premium, mobile-first UI with dark mode support.
- ✉️ **Contact Integration**: Dynamic contact forms powered by Zod validation and Resend.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **CMS**: [Sanity.io](https://www.sanity.io/) (Headless CMS)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **i18n**: [next-intl](https://next-intl-docs.vercel.app/) & [@sanity/document-internationalization](https://github.com/sanity-io/document-internationalization)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Mailing**: [Resend](https://resend.com/)
- **Testing**: [Vitest](https://vitest.dev/)

---

## 🚀 Getting Started

### 1. Requirements
- Node.js 20+
- Sanity.io Account

### 2. Installation
```bash
git clone https://github.com/SzymekNawrocki/devemite.git
cd devemite
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your Sanity and Resend credentials:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
RESEND_API_KEY=your_resend_key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

---

## 📜 Available Scripts

- `npm run dev` – Starts the development server (runs typegen automatically).
- `npm run build` – Builds the application for production.
- `npm run start` – Starts the production server.
- `npm run typegen` – Extracts Sanity schema and generates TypeScript types for all queries.
- `npm run lint` – Runs ESLint to check for code quality.
- `npm run test` – Runs unit tests via Vitest.

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Website & Studio)
│   ├── (website)/        # Public website routes
│   │   └── [lang]/       # Multi-language routing
│   └── studio/           # Sanity Studio route
├── components/           # Reusable UI & Business components
│   ├── blog/             # Blog-related components
│   ├── projects/         # Portfolio-related components
│   └── ui/               # Base UI components (Radix/Tailwind)
├── lib/                  # Utility functions & helpers
├── sanity/               # Sanity configuration, schemas, and queries
│   ├── lib/              # GROQ queries and client config
│   ├── schemaTypes/      # CMS Document & Object definitions
│   └── types.ts          # Auto-generated TypeScript types
├── public/               # Static assets
└── i18n/                 # Localization configuration
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is private and owned by [Szymek Nawrocki](https://github.com/SzymekNawrocki).
