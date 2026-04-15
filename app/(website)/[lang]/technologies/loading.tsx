import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="pt-28 md:pt-40 pb-24 min-h-screen">
      <Container>
        <div className="h-4 w-48 rounded bg-muted animate-pulse mb-12" />
        <header className="mb-16">
          <div className="h-10 w-56 rounded bg-muted animate-pulse mb-4" />
          <div className="h-4 w-96 rounded bg-muted animate-pulse" />
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/40 p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-muted animate-pulse shrink-0" />
                <div className="h-5 w-24 rounded bg-muted animate-pulse" />
              </div>
              <div className="h-3 w-full rounded bg-muted animate-pulse" />
              <div className="h-3 w-4/5 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
