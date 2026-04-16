import { client } from "@/sanity/lib/client";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/blocks/contact-form";
import { CONTACT_SETTINGS_QUERY, HOME_TITLE_QUERY, HEADER_QUERY } from "@/sanity/lib/queries";
import { CONTACT_SETTINGS_QUERYResult, HOME_TITLE_QUERYResult, HEADER_QUERYResult } from "@/sanity/types";
import { Metadata } from "next";
import { buildAlternates } from "@/lib/hreflang";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const headerData: HEADER_QUERYResult = await client.fetch(HEADER_QUERY, { lang });
  const contactLabel =
    headerData?.navigation?.find((n) => n.href === "/contact")?.label ?? "Contact";

  return {
    title: contactLabel,
    alternates: {
      canonical: `/${lang}/contact`,
      ...buildAlternates("/contact"),
    },
    openGraph: { url: `/${lang}/contact` },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;

  const [contactSettings, homeData, headerData]: [
    CONTACT_SETTINGS_QUERYResult,
    HOME_TITLE_QUERYResult,
    HEADER_QUERYResult,
  ] = await Promise.all([
    client.fetch(CONTACT_SETTINGS_QUERY, { lang }),
    client.fetch(HOME_TITLE_QUERY, { lang }),
    client.fetch(HEADER_QUERY, { lang }),
  ]);

  const contactLabel =
    headerData?.navigation?.find((n) => n.href === "/contact")?.label ?? "Contact";

  return (
    <section className="pt-28 md:pt-40 pb-24 min-h-screen">
      <Container>
        <Breadcrumbs
          homeLabel={homeData?.title ?? "Home"}
          items={[{ label: contactLabel, href: "/contact" }]}
          className="mb-12"
        />
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">{contactLabel}</h1>
        </header>
        <div className="max-w-xl">
          <ContactForm
            settings={{
              nameLabel: contactSettings?.nameLabel ?? undefined,
              namePlaceholder: contactSettings?.namePlaceholder ?? undefined,
              emailLabel: contactSettings?.emailLabel ?? undefined,
              emailPlaceholder: contactSettings?.emailPlaceholder ?? undefined,
              messageLabel: contactSettings?.messageLabel ?? undefined,
              messagePlaceholder: contactSettings?.messagePlaceholder ?? undefined,
              submitButtonLabel: contactSettings?.submitButtonLabel ?? undefined,
              successMessage: contactSettings?.successMessage ?? undefined,
              errorMessage: contactSettings?.errorMessage ?? undefined,
            }}
          />
        </div>
      </Container>
    </section>
  );
}
