import { routing } from "@/i18n/routing";

/**
 * Builds the `alternates.languages` object for Next.js generateMetadata.
 * `path` is the locale-agnostic part, e.g. "/posts" or "/posts/my-slug".
 */
export function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `/${locale}${path}`;
  }
  return { languages };
}
