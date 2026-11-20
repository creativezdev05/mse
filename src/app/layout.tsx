import type { Metadata } from "next";
import { RouteTruck } from "@/components/layout/RouteTruck";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TrowelCursor } from "@/components/layout/TrowelCursor";
import { brand } from "@/lib/site";
import { spaceGrotesk } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: brand.name,
    template: `%s | ${brand.name}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={spaceGrotesk.variable}
    >
      <body>
        <TrowelCursor />
        <SiteHeader />
        {children}
        <SiteFooter />
        <RouteTruck />
      </body>
    </html>
  );
}
