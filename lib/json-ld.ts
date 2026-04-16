const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

export function siteUrl(lang: string, path = "") {
  return `${SITE_URL}/${lang}${path}`;
}

export function breadcrumbListSchema(
  items: Array<{ label: string; url: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.url,
    })),
  };
}

export function blogPostingSchema({
  title,
  description,
  publishedAt,
  updatedAt,
  imageUrl,
  url,
}: {
  title: string;
  description?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  imageUrl?: string | null;
  url: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    ...(description ? { description } : {}),
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    url,
  };
}

export function personSchema({
  name,
  jobTitle,
  url,
  sameAs,
}: {
  name: string;
  jobTitle?: string | null;
  url: string;
  sameAs?: Array<string | null> | null;
}): Record<string, unknown> {
  const filteredSameAs = (sameAs ?? []).filter((s): s is string => !!s);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(jobTitle ? { jobTitle } : {}),
    url,
    ...(filteredSameAs.length ? { sameAs: filteredSameAs } : {}),
  };
}
