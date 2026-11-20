export type MenuLink = {
  href: string;
  title: string;
};

export type MenuGroup = {
  label: string;
  items: readonly MenuLink[];
};

export type HeaderItem = {
  href: string;
  title: string;
  groups?: readonly MenuGroup[];
};

export const majorServiceLinks = [
  { slug: "residential", title: "Residential" },
  { slug: "commercial", title: "Commercial" },
  { slug: "renovation", title: "Renovation" },
] as const;

export const workServiceLinks = [
  { slug: "grey-structure", title: "Grey structure" },
  { slug: "turnkey", title: "Turnkey" },
  { slug: "architectural-design", title: "Architectural design" },
  { slug: "structural-drawings", title: "Structural drawings" },
  { slug: "interior-design", title: "Interior design" },
] as const;

export const areaLinks = [
  { slug: "gulberg", title: "Gulberg" },
  { slug: "dha", title: "DHA" },
  { slug: "johar-town", title: "Johar Town" },
  { slug: "bahria-town", title: "Bahria Town" },
  { slug: "lake-city", title: "Lake City" },
  { slug: "model-town", title: "Model Town" },
  { slug: "bahria-orchard", title: "Bahria Orchard" },
  { slug: "paragon-city", title: "Paragon City" },
] as const;

export const rateLinks = [
  { slug: "grey-structure", title: "Grey structure rate" },
  { slug: "five-marla", title: "5 marla" },
  { slug: "ten-marla", title: "10 marla" },
  { slug: "one-kanal", title: "1 kanal" },
  { slug: "turnkey", title: "Turnkey" },
  { slug: "renovation", title: "Renovation" },
] as const;

function links(
  prefix: string,
  items: readonly { slug: string; title: string }[],
): MenuLink[] {
  return items.map((item) => ({
    href: `${prefix}/${item.slug}`,
    title: item.title,
  }));
}

export const serviceGroups = [
  { label: "Practices", items: links("/services", majorServiceLinks) },
  { label: "The work", items: links("/services", workServiceLinks) },
] as const satisfies readonly MenuGroup[];

export const headerMenus = [
  { href: "/", title: "Home" },
  { href: "/services", title: "Services", groups: serviceGroups },
  {
    href: "/areas",
    title: "Areas",
    groups: [{ label: "Lahore", items: links("/areas", areaLinks) }],
  },
  {
    href: "/cost-and-rates",
    title: "Cost & Rates",
    groups: [{ label: "Rates", items: links("/cost-and-rates", rateLinks) }],
  },
  { href: "/about", title: "About Us" },
  { href: "/contact", title: "Contact Us" },
] as const satisfies readonly HeaderItem[];
