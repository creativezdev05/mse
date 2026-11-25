import { BandBlinds } from "@/components/layout/BandBlinds";
import Link from "next/link";
import { PageIntro, Photo } from "@/components/content/Blocks";
import type { CatalogEntry } from "@/data/catalogs";
import type { MenuLink } from "@/data/menus";
import { ForgedLine } from "@/components/ui/ForgedLine";

type CatalogViewProps = {
  entry: CatalogEntry;
  related: readonly MenuLink[];
  relatedLabel: string;
};

export function CatalogView({ entry, related, relatedLabel }: CatalogViewProps) {
  return (
    <main>
      <PageIntro eyebrow={entry.eyebrow} title={entry.name} lede={entry.lede} />

      <section className="band band-muted" aria-labelledby="catalog-story">
        <BandBlinds />
        <div className="layout-shell-wide split align-start">
          <Photo
            src={entry.image.src}
            alt={entry.image.alt}
            sizes="(min-width: 48rem) 46vw, 100vw"
            className="photo-tall"
          />
          <div className="cluster">
            <h2 id="catalog-story"><ForgedLine text="On this page" /></h2>
            {entry.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {entry.figures.length > 0 ? (
              <ul className="stat-grid stat-grid-4">
                {entry.figures.map((figure) => (
                  <li key={figure.label}>
                    <p className="stat-value">{figure.value}</p>
                    <p className="stat-label">{figure.label}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="catalog-points">
        <BandBlinds />
        <div className="layout-shell-wide">
          <h2 id="catalog-points" className="band-head">
            <ForgedLine text="What changes with this one" />
          </h2>
          <ul className="grid-3 card-grid">
            {entry.points.map((point) => (
              <li key={point.title}>
                <article className="card card-body">
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="band band-muted" aria-labelledby="catalog-related">
          <BandBlinds />
          <div className="layout-shell-wide">
            <h2 id="catalog-related" className="band-head">
              <ForgedLine text={relatedLabel} />
            </h2>
            <ul className="chip-list">
              {related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
