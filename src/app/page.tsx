import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeSections } from "@/components/home/HomeSections";
import { home } from "@/data/content";
import { brand } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: brand.name,
  },
  description: home.meta.description,
};

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeSections />
    </main>
  );
}
