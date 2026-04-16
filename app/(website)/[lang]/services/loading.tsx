import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="pt-28 md:pt-40 pb-24">
      <Container className="space-y-12">
        <div className="space-y-4">
          <div className="h-4 w-48 rounded bg-muted animate-pulse" />
          <div className="h-10 w-48 rounded bg-muted animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/40 p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-muted animate-pulse shrink-0" />
                <div className="h-5 w-32 rounded bg-muted animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
                <div className="h-4 w-4/6 rounded bg-muted animate-pulse" />
              </div>
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
