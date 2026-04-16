import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="pt-28 md:pt-40 pb-24 min-h-screen">
      <Container>
        <div className="h-4 w-48 rounded bg-muted animate-pulse mb-12" />
        <div className="mb-12">
          <div className="h-10 w-40 rounded bg-muted animate-pulse" />
        </div>
        <div className="max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-muted animate-pulse" />
            <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-muted animate-pulse" />
            <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-muted animate-pulse" />
            <div className="h-32 w-full rounded-md bg-muted animate-pulse" />
          </div>
          <div className="h-10 w-32 rounded-md bg-muted animate-pulse" />
        </div>
      </Container>
    </section>
  );
}
