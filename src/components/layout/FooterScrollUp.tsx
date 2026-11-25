"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FooterScrollUp() {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      className="footer-scroll-up"
      aria-label="Back to top"
      onClick={(event) => {
        if (pathname !== "/") return;
        event.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 14.5 12 8.5 18 14.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </Link>
  );
}
