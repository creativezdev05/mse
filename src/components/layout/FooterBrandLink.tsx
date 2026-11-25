"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand/BrandMark";

export function FooterBrandLink({ label }: { label: string }) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      className="site-footer-brand-link"
      aria-label={label}
      onClick={(event) => {
        if (pathname !== "/") return;
        event.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <BrandMark />
    </Link>
  );
}
