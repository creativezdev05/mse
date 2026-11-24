import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeSections } from "@/components/home/HomeSections";
import { ScrollCrane } from "@/components/home/ScrollCrane";
import { home } from "@/data/content";
import { brand } from "@/lib/site";
import "@/styles/home.css";

export const metadata: Metadata = {
  title: {
    absolute: brand.name,
  },
  description: home.meta.description,
};

export default function HomePage() {
  return (
    <main className="home-page-stage">
      <ScrollCrane />
      <HomeHero />
      <HomeSections />
    </main>
  );
}
