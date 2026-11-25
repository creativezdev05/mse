"use client";

import { useEffect, useRef } from "react";

export function useRevealOnScroll<T extends HTMLElement>(minRatio = 0.28) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-inview");
      return;
    }

    const reveal = () => {
      const rect = node.getBoundingClientRect();
      const viewHeight = window.innerHeight * 0.92;
      const visible = Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
      const target = Math.min(rect.height * minRatio, viewHeight * 0.72);
      if (rect.height <= 0 || visible < target) return;
      node.classList.add("is-inview");
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };

    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("resize", reveal);
    return () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };
  }, [minRatio]);

  return ref;
}
