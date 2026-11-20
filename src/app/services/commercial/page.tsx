import type { Metadata } from "next";
import { CatalogView } from "@/components/content/CatalogView";
import { majorService } from "@/data/catalogs";
import { serviceGroups } from "@/data/menus";

const entry = majorService("commercial");

export const metadata: Metadata = {
  title: entry.name,
  description: entry.description,
};

export default function CommercialPage() {
  const related = serviceGroups.flatMap((group) =>
    group.items.filter((item) => item.href !== "/services/commercial"),
  );

  return <CatalogView entry={entry} related={related} relatedLabel="Related services" />;
}
