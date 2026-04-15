import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="pt-28 md:pt-40 pb-24">
      <Container>
        <div className="h-4 w-48 rounded bg-muted animate-pulse mb-12" />
        <div className="space-y-6 max-w-4xl">
          <div className="h-10 w-3/4 rounded bg-muted animate-pulse" />
          <div className="h-4 w-full rounded bg-muted animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
          <div className="h-80 w-full rounded-xl bg-muted animate-pulse mt-4" />
          <div className="flex flex-wrap gap-2 pt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-7 w-20 rounded-full bg-muted animate-pulse" />
            ))}
          </div>
          <div className="space-y-3 pt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`h-4 rounded bg-muted animate-pulse ${i % 4 === 3 ? "w-1/2" : "w-full"}`} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
