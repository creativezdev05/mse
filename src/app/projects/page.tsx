import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { routeByHref } from "@/lib/site";

const route = routeByHref("/projects");

export const metadata: Metadata = {
  title: route.title,
};

export default function ProjectsPage() {
  return <PageShell title={route.title} />;
}
