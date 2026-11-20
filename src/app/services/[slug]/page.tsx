import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogView } from "@/components/content/CatalogView";
import { bySlug, workServices } from "@/data/catalogs";
import { workServiceLinks } from "@/data/menus";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workServices.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = bySlug(workServices, slug);

  if (!work) {
    return { title: "Service" };
  }

  return {
    title: work.name,
    description: work.description,
  };
}

export default async function WorkServicePage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = bySlug(workServices, slug);

  if (!work) {
    notFound();
  }

  const related = workServiceLinks
    .filter((item) => item.slug !== work.slug)
    .map((item) => ({ href: `/services/${item.slug}`, title: item.title }));

  return <CatalogView entry={work} related={related} relatedLabel="Other work" />;
}
