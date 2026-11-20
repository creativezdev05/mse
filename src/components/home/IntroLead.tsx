"use client";

import { useEffect, useRef } from "react";

type IntroLeadProps = {
  id: string;
  children: string;
};

export function IntroLead({ id, children }: IntroLeadProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        node.classList.add("is-inview");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <p className="intro-lead" id={id} ref={ref}>
      {children}
    </p>
  );
}
