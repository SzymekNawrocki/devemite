import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { Metadata } from "next";
import { TECHNOLOGIES_QUERYResult, TECHNOLOGIES_PAGE_QUERYResult, HOME_TITLE_QUERYResult, HEADER_QUERYResult } from "@/sanity/types";
import { buildAlternates } from "@/lib/hreflang";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionTitle } from "@/components/ui/section-title";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";
import { 
  TECHNOLOGIES_QUERY, 
  HOME_TITLE_QUERY, 
  HEADER_QUERY 
} from '@/sanity/lib/queries';
import { MoveLeft } from "lucide-react";
import { TECHNOLOGIES_PAGE_QUERY } from "@/sanity/lib/queries";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema, siteUrl } from "@/lib/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const pageData: TECHNOLOGIES_PAGE_QUERYResult = await sanityFetch({
    query: TECHNOLOGIES_PAGE_QUERY,
    params: { lang },
    tags: [`technologiesPage:${lang}`],
  });
  const canonicalUrl = `/${lang}/technologies`;
  return {
    title: pageData?.title,
    description: pageData?.description,
    alternates: {
      canonical: canonicalUrl,
      ...buildAlternates("/technologies"),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const [technologies, homeData, headerData, pageData]: [TECHNOLOGIES_QUERYResult, HOME_TITLE_QUERYResult, HEADER_QUERYResult, TECHNOLOGIES_PAGE_QUERYResult] = await Promise.all([
    sanityFetch({
      query: TECHNOLOGIES_QUERY,
      params: { lang },
      tags: [`technologies:${lang}`],
    }),
    sanityFetch({
      query: HOME_TITLE_QUERY,
      params: { lang },
    }),
    sanityFetch({
      query: HEADER_QUERY,
      params: { lang },
    }),
    sanityFetch({
      query: TECHNOLOGIES_PAGE_QUERY,
      params: { lang },
      tags: [`technologiesPage:${lang}`],
    }),
  ]);

  const technologiesLabel = pageData?.title ||
    headerData?.navigation?.find((n) => n.href === "/technologies")?.label || "Technologies";
  
  const description = pageData?.description || "A comprehensive list of the tools, frameworks, and technologies that drive our projects and solutions.";
  const emptyStateTitle = pageData?.emptyStateTitle || "No technologies found";
  const emptyStateDescription = pageData?.emptyStateDescription || "Come back later to see more updates.";
  const backToHomeLabel = pageData?.backToHomeLabel || "Return home";

  const homeLabel = homeData?.title || "Home";

  return (
    <section className="pt-28 md:pt-40 pb-24 min-h-screen">
      <JsonLd
        schema={breadcrumbListSchema([
          { label: homeLabel, url: siteUrl(lang) },
          { label: technologiesLabel, url: siteUrl(lang, "/technologies") },
        ])}
      />
      <Container>
        <Breadcrumbs
          homeLabel={homeLabel}
          items={[{ label: technologiesLabel, href: "/technologies" }]}
          className="mb-12"
        />
        
        <header className="mb-16">
          <SectionTitle
            text={technologiesLabel}
            tag="h1"
            className="mb-4"
          />
          <p className="text-muted-foreground text-lg max-w-2xl">
            {description}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technologies?.length > 0 ? (
            technologies.map((tech) => (
              <Link
                key={tech._id}
                href={`/${lang}/technologies/${tech.slug?.current}`}
                className="block h-full hover:opacity-70 transition-opacity"
              >
                <Card className="h-full border-border/40">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    {tech.icon ? (
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/50 p-2 shadow-sm">
                        <Image
                          src={urlFor(tech.icon).width(48).height(48).url()}
                          alt={tech.name ?? pageData?.title ?? "Technology"}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted/50 font-bold text-lg">
                          {tech.name?.charAt(0)}
                       </div>
                    )}
                    <CardTitle className="text-xl">
                      {tech.name}
                    </CardTitle>
                  </CardHeader>
                  {tech.description && (
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                        {tech.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <h2 className="text-2xl font-semibold opacity-50">{emptyStateTitle}</h2>
              <p className="text-muted-foreground mt-2">{emptyStateDescription}</p>
            </div>
          )}
        </div>

        <div className="mt-20 pt-8 border-t">
          <Link
            href={`/${lang}`}
            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {backToHomeLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
