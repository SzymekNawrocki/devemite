import { PortableText } from "next-sanity";
import Image from "next/image";
import type { CSSProperties } from "react";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { TypewriterText } from "../ui/typewriter-text";
import { Container } from "../ui/container";

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;

export function Hero(props: HeroProps) {
  const { title, text, image } = props;

  const isExpandedImage = (img: unknown): img is NonNullable<HeroProps["image"]> => {
    return !!img && typeof img === "object" && "asset" in img;
  };
  return (
    <section className="hero-grain relative w-full h-[100dvh] md:h-auto md:aspect-[2/1] overflow-hidden">
      {isExpandedImage(image) && (
     <Image
  className="absolute inset-0 w-full h-full object-cover"

  src={urlFor(image).width(2000).auto('format').quality(80).url()}
  alt={title || ""}
  fill
  priority
  sizes="100vw"
/>
      )}

      <div className="absolute inset-0 bg-black/80" />

      {/* Sand particles */}
      <span className="sand-particle w-[2px] h-[2px] bg-[rgb(200,170,100)] left-[12%] top-[62%]" style={{ "--dx": "40px", "--dy": "-65px", "--duration": "7s", "--delay": "0s", "--particle-opacity": "0.4" } as CSSProperties} aria-hidden="true" />
      <span className="sand-particle w-[3px] h-[2px] bg-[rgb(210,180,110)] left-[32%] top-[74%]" style={{ "--dx": "28px", "--dy": "-55px", "--duration": "9.5s", "--delay": "2.1s", "--particle-opacity": "0.3" } as CSSProperties} aria-hidden="true" />
      <span className="sand-particle w-[2px] h-[3px] bg-[rgb(195,165,95)] left-[51%] top-[58%]" style={{ "--dx": "-48px", "--dy": "-72px", "--duration": "8s", "--delay": "0.8s", "--particle-opacity": "0.35" } as CSSProperties} aria-hidden="true" />
      <span className="sand-particle w-[2px] h-[2px] bg-[rgb(215,185,115)] left-[68%] top-[70%]" style={{ "--dx": "44px", "--dy": "-50px", "--duration": "10s", "--delay": "3.2s", "--particle-opacity": "0.3" } as CSSProperties} aria-hidden="true" />
      <span className="sand-particle w-[3px] h-[2px] bg-[rgb(200,168,98)] left-[82%] top-[66%]" style={{ "--dx": "-38px", "--dy": "-68px", "--duration": "7.5s", "--delay": "1.5s", "--particle-opacity": "0.35" } as CSSProperties} aria-hidden="true" />

      <Container className="z-10 relative flex flex-col justify-center items-center gap-8 h-full text-center">
        {title && (
          <h1 className="text-foreground font-bold text-3xl md:text-4xl lg:text-5xl lg:text-6xl tracking-tight text-white">
            <TypewriterText text={title} />
          </h1>
        )}
        {text && (
          <div className="hero-enter-late flex items-center text-white lg:prose-xl">
            <PortableText value={text} />
          </div>
        )}
      </Container>
    </section>
  );
}
