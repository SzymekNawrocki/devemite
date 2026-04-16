import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SERVICES_QUERY, HOME_TITLE_QUERY, HEADER_QUERY, SERVICES_PAGE_QUERY } from "@/sanity/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import { Globe, Code, Mail, Server, Cpu, ArrowRight, Layers, Zap, LineChart, Database, Monitor, MoveLeft } from "lucide-react";

import { type LucideIcon } from "lucide-react";
import { SERVICES_QUERYResult, HOME_TITLE_QUERYResult, HEADER_QUERYResult, SERVICES_PAGE_QUERYResult } from "@/sanity/types";

const iconsMap: Record<string, LucideIcon> = {
  Globe,
  Code,
  Mail,
  Server,
  Cpu,
  Layers,
  Zap,
  LineChart,
  Database,
  Monitor,
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const [services, homeData, headerData, pageData]: [SERVICES_QUERYResult, HOME_TITLE_QUERYResult, HEADER_QUERYResult, SERVICES_PAGE_QUERYResult] = await Promise.all([
    client.fetch(SERVICES_QUERY, { lang }),
    client.fetch(HOME_TITLE_QUERY, { lang }),
    client.fetch(HEADER_QUERY, { lang }),
    client.fetch(SERVICES_PAGE_QUERY, { lang }),
  ]);

  const servicesLabel = pageData?.title ||
    headerData?.navigation?.find((n) => n.href === "/services")?.label || "Services";

  const readMoreLabel = pageData?.readMoreLabel || "Learn more";

  const backToHomeLabel = pageData?.backToHomeLabel || "Back to home";

  return (
    <section className="pt-28 md:pt-40 pb-24">
      <Container className="space-y-12">
        <div className="space-y-4">
          <Breadcrumbs
            homeLabel={homeData?.title || "Home"}
            items={[{ label: servicesLabel, href: "/services" }]}
          />
          <SectionTitle text={servicesLabel} />
        </div>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => {
            const Icon =
              service.icon && iconsMap[service.icon] ? iconsMap[service.icon] : Globe;

            return (
              <Card key={service._id} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex justify-center items-center bg-primary/10 rounded-lg w-12 h-12 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="line-clamp-1">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={`/${lang}/services/${service.slug?.current}`}
                    className="inline-flex items-center gap-2 font-semibold hover:opacity-70 transition-opacity"
                  >
                    {readMoreLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t">
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