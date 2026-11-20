import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogView } from "@/components/content/CatalogView";
import { areas, bySlug } from "@/data/catalogs";
import { areaLinks } from "@/data/menus";

type AreaPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = bySlug(areas, slug);

  if (!area) {
    return { title: "Area" };
  }

  return {
    title: area.name,
    description: area.description,
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = bySlug(areas, slug);

  if (!area) {
    notFound();
  }

  const related = areaLinks
    .filter((item) => item.slug !== area.slug)
    .map((item) => ({ href: `/areas/${item.slug}`, title: item.title }));

  return <CatalogView entry={area} related={related} relatedLabel="Other areas" />;
}
