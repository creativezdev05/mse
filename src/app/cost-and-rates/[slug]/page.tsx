import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogView } from "@/components/content/CatalogView";
import { bySlug, rateTopics } from "@/data/catalogs";
import { rateLinks } from "@/data/menus";

type RatePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return rateTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: RatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = bySlug(rateTopics, slug);

  if (!topic) {
    return { title: "Cost & Rates" };
  }

  return {
    title: topic.name,
    description: topic.description,
  };
}

export default async function RateTopicPage({ params }: RatePageProps) {
  const { slug } = await params;
  const topic = bySlug(rateTopics, slug);

  if (!topic) {
    notFound();
  }

  const related = rateLinks
    .filter((item) => item.slug !== topic.slug)
    .map((item) => ({ href: `/cost-and-rates/${item.slug}`, title: item.title }));

  return <CatalogView entry={topic} related={related} relatedLabel="Other rates" />;
}
