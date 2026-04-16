import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="pt-28 md:pt-40 pb-24">
      <Container>
        <div className="space-y-16">
          <div className="space-y-6">
            <div className="h-5 w-24 rounded bg-muted animate-pulse" />
            <div className="h-14 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-14 w-1/2 rounded bg-muted animate-pulse" />
            <div className="h-5 w-96 rounded bg-muted animate-pulse" />
          </div>
          <div className="h-80 w-full rounded-2xl bg-muted animate-pulse" />
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 rounded bg-muted animate-pulse ${i % 6 === 5 ? "w-1/2" : "w-full"}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
