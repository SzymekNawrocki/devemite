import { ProjectsBlock } from "@/components/blocks/projects-block";
import { client } from "@/sanity/lib/client";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/ui/container";
import { HOME_TITLE_QUERY, PROJECTS_QUERY, HEADER_QUERY, PROJECTS_PAGE_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { PROJECTS_PAGE_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const pageData: PROJECTS_PAGE_QUERYResult = await client.fetch(PROJECTS_PAGE_QUERY, { lang });

  if (!pageData) return {};

  const canonicalUrl = `/${lang}/projects`;

  const metadata: Metadata = {
    title: pageData.seo?.title || pageData.title,
    description: pageData.seo?.description || pageData.description,
    alternates: {
      canonical: canonicalUrl,
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

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const [projects, homeData, headerData, pageData] = await Promise.all([
    client.fetch(PROJECTS_QUERY, { lang }),
    client.fetch(HOME_TITLE_QUERY, { lang }),
    client.fetch(HEADER_QUERY, { lang }),
    client.fetch(PROJECTS_PAGE_QUERY, { lang }),
  ]);

  const projectsLabel = pageData?.title || headerData?.navigation?.find((n) => n.href === "/projects")?.label || "Projects";

  return (
    <main className="min-h-screen pt-28 md:pt-40">
       <Container>
         <Breadcrumbs 
            homeLabel={homeData?.title || "Home"}
            items={[{ label: projectsLabel, href: "/projects" }]} 
            className="mb-8" 
         />
       </Container>
       <ProjectsBlock 
          _type="projectsBlock"
          _key="projects-listing"
          mode="selected" 
          projects={projects}
          title={pageData?.title || "All Projects"}
          description={pageData?.description || "Explore our latest work and case studies."}
       />
    </main>
  );
}
