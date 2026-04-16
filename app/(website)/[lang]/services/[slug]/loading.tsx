import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="pt-28 md:pt-40">
      <Container className="space-y-10">
        <div className="h-4 w-56 rounded bg-muted animate-pulse" />
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-muted animate-pulse shrink-0" />
          <div className="h-10 w-72 rounded bg-muted animate-pulse" />
        </div>
        <div className="space-y-4 pt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`h-4 rounded bg-muted animate-pulse ${i % 5 === 4 ? "w-2/3" : "w-full"}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
