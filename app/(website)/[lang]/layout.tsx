import "@/app/globals.css";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/sanity/disable-draft-mode";
import { Header } from "@/components/layout/header";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { sanityFetch } from "@/sanity/lib/live";
import { HEADER_QUERY, FOOTER_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { JetBrains_Mono } from "next/font/google";
import { buildAlternates } from "@/lib/hreflang";
import { SanityLive } from "@/sanity/lib/live";

const jbMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jb-mono",
});
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY, params: { lang } });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devemite.vercel.app";
  return {
    metadataBase: new URL(baseUrl),
    title: siteSettings?.seoTitle ?? "Devemite - Where every grain holds a story",
    description: siteSettings?.seoDescription ?? "Devemite - Where every grain holds a story. A portfolio/blog website of a developer Szymon Nawrocki",
    manifest: "/manifest.json",
    icons: {
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      canonical: `/${lang}`,
      ...buildAlternates("/"),
    },
  };
}

export default async function FrontendLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const messages = await getMessages();

  const [headerData, footerData, siteSettingsData] = await Promise.all([
    sanityFetch({ query: HEADER_QUERY, params: { lang } }),
    sanityFetch({ query: FOOTER_QUERY, params: { lang } }),
    sanityFetch({ query: SITE_SETTINGS_QUERY, params: { lang } }),
  ]);

  return (
    <html lang={lang} className={jbMono.variable} suppressHydrationWarning>
      <body className="bg-background min-h-screen antialiased">
          <NextIntlClientProvider locale={lang} messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header data={headerData.data} siteSettings={siteSettingsData.data} />
              {children}
              <Footer data={footerData.data} />
            </ThemeProvider>
          </NextIntlClientProvider>
          <SanityLive />
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
        </body>
      </html>
  );
}
