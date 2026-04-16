"use client";

import dynamic from "next/dynamic";

const SanityLive = dynamic(
  () => import("@/sanity/lib/live").then((m) => m.SanityLive),
  { ssr: false }
);

export { SanityLive };
