import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="pt-28 md:pt-40 pb-24">
      <Container>
        <div className="h-4 w-32 rounded bg-muted animate-pulse mb-4" />
        <div className="mb-16">
          <div className="h-8 w-24 rounded bg-muted animate-pulse mb-4" />
          <div className="h-10 w-64 rounded bg-muted animate-pulse" />
        </div>
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/40 p-6 space-y-4">
              <div className="h-48 rounded-lg bg-muted animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
              <div className="h-3 w-full rounded bg-muted animate-pulse" />
              <div className="h-3 w-5/6 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
