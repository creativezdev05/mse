import type { Metadata } from "next";
import { CatalogView } from "@/components/content/CatalogView";
import { majorService } from "@/data/catalogs";
import { serviceGroups } from "@/data/menus";

const entry = majorService("residential");

export const metadata: Metadata = {
  title: entry.name,
  description: entry.description,
};

export default function ResidentialPage() {
  const related = serviceGroups.flatMap((group) =>
    group.items.filter((item) => item.href !== "/services/residential"),
  );

  return <CatalogView entry={entry} related={related} relatedLabel="Related services" />;
}
