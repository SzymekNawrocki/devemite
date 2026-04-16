import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <main className="min-h-screen pt-28 md:pt-40">
      <Container>
        <div className="h-4 w-48 rounded bg-muted animate-pulse mb-8" />
      </Container>
      <section className="py-16">
        <Container>
          <div className="mb-12 space-y-4">
            <div className="h-5 w-24 rounded bg-muted animate-pulse" />
            <div className="h-10 w-64 rounded bg-muted animate-pulse" />
            <div className="h-4 w-96 rounded bg-muted animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border/40 overflow-hidden">
                <div className="h-52 bg-muted animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                  <div className="h-4 w-full rounded bg-muted animate-pulse" />
                  <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
                  <div className="flex gap-2 pt-2">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="h-6 w-16 rounded-full bg-muted animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
