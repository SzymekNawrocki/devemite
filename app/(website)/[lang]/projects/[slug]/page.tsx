import { notFound } from "next/navigation";
import { client, sanityFetch } from "@/sanity/lib/client";
import { HOME_TITLE_QUERY, PROJECT_QUERY, PROJECTS_SLUGS_QUERY, HEADER_QUERY, PROJECTS_PAGE_QUERY } from "@/sanity/lib/queries";
import { PROJECTS_SLUGS_QUERYResult } from "@/sanity/types";
import { buildAlternates } from "@/lib/hreflang";
import { Project } from "@/components/projects/project";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type RouteParams = {
  slug: string;
  lang: string;
};

type RouteProps = {
  params: Promise<RouteParams>;
};

const getProject = async (params: RouteParams) =>
  sanityFetch({
    query: PROJECT_QUERY,
    params,
    revalidate: 3600,
    tags: [`project:${params.slug}`, "project"],
  });

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams);

  if (!project) {
    return {};
  }

  const { slug, lang } = resolvedParams;
  const canonicalUrl = `/${lang}/projects/${slug}`;

  const metadata: Metadata = {
    title: project.seo?.title || project.title,
    description: project.seo?.description || project.description,
    alternates: {
      canonical: canonicalUrl,
      ...buildAlternates(`/projects/${slug}`),
    },
  };

  if (project.seo?.seoImage || project.mainImage) {
      const image = project.seo?.seoImage || project.mainImage;
       if (image) {
          metadata.openGraph = {
            url: canonicalUrl,
            images: [
              {
                url: urlFor(image).width(1200).height(630).url(),
                width: 1200,
                height: 630,
              },
            ],
          };
       }
  }

  return metadata;
}

export async function generateStaticParams() {
  const allParams = await Promise.all(
    routing.locales.map(async (lang) => {
      const slugs = await client
        .withConfig({ useCdn: false })
        .fetch<PROJECTS_SLUGS_QUERYResult>(PROJECTS_SLUGS_QUERY, { lang });

      return slugs.map((item: { slug: string }) => ({
        lang,
        slug: item.slug,
      }));
    })
  );

  return allParams.flat();
}

export default async function Page({ params }: RouteProps) {
  const resolvedParams = await params;
  const [project, homeData, headerData, projectsPageData] = await Promise.all([
    getProject(resolvedParams),
    sanityFetch({ query: HOME_TITLE_QUERY, params: { lang: resolvedParams.lang } }),
    sanityFetch({ query: HEADER_QUERY, params: { lang: resolvedParams.lang } }),
    sanityFetch({ query: PROJECTS_PAGE_QUERY, params: { lang: resolvedParams.lang } }),
  ]);

  const projectsLabel = projectsPageData?.title ||
    headerData?.navigation?.find((n: { label: string | null; href: string | null }) => n.href === "/projects")?.label || "Projects";

  const pageSettings = {
    technologiesLabel: projectsPageData?.technologiesLabel ?? undefined,
    noDescriptionLabel: projectsPageData?.noDescriptionLabel ?? undefined,
    backToProjectsLabel: projectsPageData?.backToProjectsLabel ?? undefined,
  };


  if (!project) {
    notFound();
  }

  return (
    <section className="pt-28 md:pt-40">
       <Container>
         <Breadcrumbs
            homeLabel={homeData?.title || "Home"}
            items={[
               { label: projectsLabel, href: "/projects" },
               { label: project?.title }
            ]}
            className="mb-8"
         />

         <Project {...project} pageSettings={pageSettings} lang={resolvedParams.lang} />
       </Container>
    </section>
  );
}
