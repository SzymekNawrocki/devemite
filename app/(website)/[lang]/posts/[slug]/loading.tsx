import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="pt-28 md:pt-40 pb-24">
      <Container>
        <div className="h-4 w-48 rounded bg-muted animate-pulse mb-12" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-5 w-24 rounded bg-muted animate-pulse" />
          <div className="h-12 w-full rounded bg-muted animate-pulse" />
          <div className="h-12 w-3/4 rounded bg-muted animate-pulse" />
          <div className="flex gap-4 pt-2">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          </div>
          <div className="h-72 w-full rounded-xl bg-muted animate-pulse mt-8" />
          <div className="space-y-3 pt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`h-4 rounded bg-muted animate-pulse ${i % 5 === 4 ? "w-2/3" : "w-full"}`} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
