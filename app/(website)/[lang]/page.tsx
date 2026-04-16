import { PageBuilder } from "@/components/sanity/page-builder";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { HOME_PAGE_QUERY, PERSON_SCHEMA_QUERY } from "@/sanity/lib/queries";
import type { PERSON_SCHEMA_QUERYResult } from "@/sanity/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema, siteUrl } from "@/lib/json-ld";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  const [{ data: page }, personData] = await Promise.all([
    sanityFetch({ query: HOME_PAGE_QUERY, params: { lang } }),
    client.fetch<PERSON_SCHEMA_QUERYResult>(PERSON_SCHEMA_QUERY),
  ]);

  return page?.homePage?.content ? (
    <>
      {personData?.person?.name && (
        <JsonLd
          schema={personSchema({
            name: personData.person.name,
            jobTitle: personData.person.jobTitle,
            url: siteUrl(lang),
            sameAs: personData.person.sameAs,
          })}
        />
      )}
      <PageBuilder
        content={page.homePage.content}
        documentId={page.homePage._id}
        documentType="page"
      />
    </>
  ) : null;
}