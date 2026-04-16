import { client } from "@/sanity/lib/client";
import { SectionTitle } from "@/components/ui/section-title";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { HOME_TITLE_QUERY, POSTS_QUERY, POSTS_PAGE_QUERY, POSTS_COUNT_QUERY } from "@/sanity/lib/queries";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PostCard } from "@/components/blog/post-card";
import { MoveLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

import { POSTS_QUERYResult, POSTS_PAGE_QUERYResult, HOME_TITLE_QUERYResult } from "@/sanity/types";
import { buildAlternates } from "@/lib/hreflang";

const PAGE_SIZE = 12;

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const pageData: POSTS_PAGE_QUERYResult = await client.fetch(POSTS_PAGE_QUERY, { lang });

  if (!pageData) return {};

  const canonicalUrl = `/${lang}/posts`;

  const metadata: Metadata = {
    title: pageData.seo?.title || pageData.title,
    description: pageData.seo?.description,
    alternates: {
      canonical: canonicalUrl,
      ...buildAlternates("/posts"),
    },
  };

  if (pageData.seo?.seoImage) {
    metadata.openGraph = {
      url: canonicalUrl,
      images: [
        {
          url: urlFor(pageData.seo.seoImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
        },
      ],
    };
  }

  return metadata;
}

export default async function Page({ params, searchParams }: Props) {
  const { lang } = await params;
  const { page } = await searchParams;

  const currentPage = Math.max(1, parseInt(page ?? "1", 10));
  const offset = (currentPage - 1) * PAGE_SIZE;

  const [posts, pageData, homeData, totalCount]: [POSTS_QUERYResult, POSTS_PAGE_QUERYResult, HOME_TITLE_QUERYResult, number] =
    await Promise.all([
      client.fetch(POSTS_QUERY, { lang, limit: offset + PAGE_SIZE, offset }),
      client.fetch(POSTS_PAGE_QUERY, { lang }),
      client.fetch(HOME_TITLE_QUERY, { lang }),
      client.fetch(POSTS_COUNT_QUERY, { lang }),
    ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <section className="pt-28 md:pt-40 pb-24">
      <Container>
        <Breadcrumbs
          homeLabel={homeData?.title || "Home"}
          items={[{ label: pageData?.title || "Blog", href: "/posts" }]}
          className="mb-4"
        />
        <header className="mb-16">
          {pageData?.eyebrow && <Eyebrow text={pageData.eyebrow} />}
          <SectionTitle
            text={pageData?.title || "Blog"}
            tag="h1"
            className="mb-4 max-w-1xl"
          />
        </header>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <PostCard 
                key={post._id} 
                {...post} 
                lang={lang} 
                noCoverImageLabel={pageData?.noCoverImageLabel} 
              />
            ))
          ) : (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-semibold">{pageData?.emptyStateTitle || "No posts yet"}</h2>
              <p className="mt-2 text-muted-foreground">{pageData?.emptyStateDescription || "Check back soon for new articles."}</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            {hasPrev ? (
              <Link
                href={`/${lang}/posts?page=${currentPage - 1}`}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-md border border-border/60 text-sm font-medium hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-4 py-2 rounded-md border border-border/20 text-sm font-medium text-muted-foreground cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
                Prev
              </span>
            )}

            <span className="text-sm text-muted-foreground">
              {currentPage} / {totalPages}
            </span>

            {hasNext ? (
              <Link
                href={`/${lang}/posts?page=${currentPage + 1}`}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-md border border-border/60 text-sm font-medium hover:bg-muted transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-4 py-2 rounded-md border border-border/20 text-sm font-medium text-muted-foreground cursor-not-allowed">
                Next
                <ChevronRight className="w-4 h-4" />
              </span>
            )}
          </div>
        )}

        <div className="mt-20 pt-8 border-t">
          <Link
            href={`/${lang}`}
            className="group inline-flex items-center gap-2 text-muted-foreground"
          >
            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {pageData?.backToHomeLabel || "Return home"}
          </Link>
        </div>
      </Container>
    </section>
  );
}
