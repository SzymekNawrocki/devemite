import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center">
      <Container>
        <div className="flex flex-col items-center text-center gap-6">
          <p className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            404
          </p>
          <SectionTitle text="Page not found" tag="h1" />
          <p className="text-muted-foreground text-lg max-w-md">
            The page you are looking for does not exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
