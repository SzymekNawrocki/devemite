'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SELECTORS = [
  '.fade-in-up',
  '.dune-rise',
  '.mirage-in',
  '.mirage-in-left',
  '.animate-line-draw',
  '.stagger-children',
  '.stagger-desert',
].join(', ');

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<Element>(SELECTORS);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      el.classList.remove('revealed');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
