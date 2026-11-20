export const brand = {
  name: "MSE",
} as const;

export const navigation = [
  { href: "/", title: "Home" },
  { href: "/projects", title: "Projects" },
  { href: "/services", title: "Services" },
  { href: "/areas", title: "Areas" },
  { href: "/cost-and-rates", title: "Cost & Rates" },
  { href: "/about", title: "About Us" },
  { href: "/contact", title: "Contact Us" },
] as const;

export type RouteHref = (typeof navigation)[number]["href"];

export { headerMenus as headerNavigation } from "@/data/menus";

export const quoteLink = {
  href: "/contact",
  title: "Get a Quote",
} as const satisfies { href: RouteHref; title: string };

/** Legal hrefs are placeholders until those pages exist. */
export const siteConfig = {
  description:
    "Residential and commercial construction in Lahore, from the footing to the finished house.",
  legal: [
    { href: "/privacy", title: "Privacy" },
    { href: "/terms", title: "Terms" },
  ],
} as const;

export function routeByHref(href: RouteHref) {
  const route = navigation.find((item) => item.href === href);

  if (!route) {
    throw new Error(`Unknown route: ${href}`);
  }

  return route;
}
