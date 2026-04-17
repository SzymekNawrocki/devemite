"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ui/dark-mode";
import LanguageSwitcher from "./language-switcher";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { HEADER_QUERYResult, SITE_SETTINGS_QUERYResult } from "@/sanity/types";

export function Header({ data, siteSettings }: { data: HEADER_QUERYResult; siteSettings?: SITE_SETTINGS_QUERYResult }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigation = data?.navigation || [
    { label: "Blog", href: "/posts" },
    { label: "Projects", href: "/projects" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur bg-background/80 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8  md:py-2 max-w-7xl">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
          {data?.logoImage && (
            <Image
              src={urlFor(data.logoImage).width(480).quality(80).url()}
              alt={data?.logoAlt || "Logo"}
              width={240}
              height={80}
              priority
              sizes="(max-width: 768px) 160px, 240px"
              className="w-auto h-16 md:h-24 object-contain"
            />
          )}
        </Link>

        {navigation && (
          <nav className={`hidden md:flex gap-8 font-semibold transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}>
            {navigation.map((item, index: number) => (
              <Link
                key={index}
                href={item.href as "/" | "/posts" | "/projects"}
                className="nav-link transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <ModeToggle scrolled={scrolled} labels={siteSettings} />
            <LanguageSwitcher scrolled={scrolled} />
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}
                aria-label={data?.menuLabel || "Open menu"}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[380px] p-0 flex flex-col bg-background">
              <div className="flex items-center px-6 py-5 border-b border-border/50">
                <span className="text-xl font-semibold tracking-tight">{data?.menuLabel || "Menu"}</span>
              </div>

              <nav className="flex-1 px-6 py-8">
                <ul className="space-y-1">
                  {navigation.map((item, index: number) => (
                    <li
                      key={index}
                      className="animate-in slide-in-from-right-4 fade-in duration-500 fill-mode-backwards"
                      style={{ animationDelay: `${index * 75}ms` }}
                    >
                      <SheetClose asChild>
                        <Link
                          href={item.href as "/" | "/posts" | "/projects"}
                          className="group flex items-center py-4 text-2xl font-medium tracking-tight text-foreground/90 transition-all duration-200 hover:text-primary hover:translate-x-1 active:scale-[0.98]"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="relative">
                            {item.label}
                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                          </span>
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="px-6 py-5 bg-muted/30 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ModeToggle scrolled={true} labels={siteSettings} />
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <LanguageSwitcher scrolled={true} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}