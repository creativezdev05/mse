import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ForgedLine } from "@/components/ui/ForgedLine";
import { brand } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design system",
};

const swatches = [
  { name: "Canvas", hex: "#E3E6EA", token: "var(--color-canvas)" },
  { name: "Surface", hex: "#F3F5F7", token: "var(--color-surface)" },
  { name: "Muted", hex: "#D5DAE0", token: "var(--color-surface-muted)" },
  { name: "Ink", hex: "#1A1F24", token: "var(--color-ink)" },
  { name: "Body", hex: "#434B53", token: "var(--color-ink-muted)" },
  { name: "Accent", hex: "#FFAA1D", token: "var(--color-accent)" },
] as const;

const radii = [
  { name: "2px", token: "var(--radius-sm)" },
  { name: "6px", token: "var(--radius-md)" },
  { name: "10px", token: "var(--radius-lg)" },
] as const;

export default function DesignSystemPage() {
  return (
    <main className="section-tight">
      <div className="layout-shell-wide flex flex-col gap-14">
        <div className="flex max-w-3xl flex-col gap-4">
          <p className="type-label">Design system preview</p>
          <p className="type-display">{brand.name}</p>
          <p>
            Space Grotesk for headings, the homepage display, the MSE
            wordmark, body text, navigation, and buttons.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="type-label">Heading hierarchy</p>
            <h1><ForgedLine text="Display heading" /></h1>
            <h2><ForgedLine text="Section heading" /></h2>
            <h3>Subheading</h3>
            <p>
              Body text stays in Space Grotesk, in a cool neutral tone, at a
              comfortable reading size.
            </p>
            <p className="type-nav">Navigation text</p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="type-label">Button states</p>
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button className="is-sample-hover">Hover</Button>
                <Button className="is-sample-focus">Focus</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="type-label">Radii</p>
              <ul className="flex flex-wrap gap-4">
                {radii.map((radius) => (
                  <li key={radius.name} className="flex flex-col gap-2">
                    <div
                      className="h-16 w-24 border border-line bg-surface-muted"
                      style={{ borderRadius: radius.token }}
                    />
                    <span className="type-label">{radius.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <p className="type-label">Breakpoints</p>
              <p>
                48rem switches the header from the menu to the inline row.
                80rem widens the page gutter.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="type-label">Color palette</p>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {swatches.map((swatch) => (
              <li key={swatch.name} className="flex flex-col gap-2">
                <div
                  className="h-16 border border-line"
                  style={{ backgroundColor: swatch.token }}
                />
                <span className="type-label">{swatch.name}</span>
                <span className="text-sm text-ink-muted">{swatch.hex}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProjectCard
            eyebrow="Eyebrow"
            title="Architectural card"
            description="A flat surface with the photograph flush to the top edge."
            location="Sample location"
            type="Sample type"
            href="/projects"
            linkLabel="View details"
          />
          <ProjectCard
            eyebrow="Eyebrow"
            title="Second card"
            description="The same treatment, ready for a project photograph."
            location="Sample location"
            type="Sample type"
            href="/projects"
            linkLabel="View details"
          />
        </div>
      </div>
    </main>
  );
}
