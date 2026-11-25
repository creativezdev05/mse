import { BandBlinds } from "@/components/layout/BandBlinds";
import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Photo } from "@/components/content/Blocks";
import { areas } from "@/data/catalogs";
import { areasPage, contactDetails } from "@/data/content";
import { ForgedLine } from "@/components/ui/ForgedLine";

export const metadata: Metadata = {
  title: areasPage.meta.title,
  description: areasPage.meta.description,
};

export default function AreasPage() {
  return (
    <main>
      <PageIntro eyebrow={areasPage.intro.eyebrow} title={areasPage.intro.title} lede={areasPage.intro.lede} />
      <div className="layout-shell-wide page-banner">
        <Photo
          src={areasPage.intro.banner.src}
          alt={areasPage.intro.banner.alt}
          sizes="(min-width: 80rem) 90rem, 100vw"
          className="photo-wide"
        />
      </div>

      <section className="band band-muted" aria-label="Lahore areas">
        <BandBlinds />
        <div className="layout-shell-wide">
          <ul className="grid-3 card-grid">
            {areas.map((area) => (
              <li key={area.slug}>
                <Link href={`/areas/${area.slug}`} className="card media-card catalog-link">
                  <Photo
                    src={area.image.src}
                    alt={area.image.alt}
                    sizes="(min-width: 80rem) 30vw, (min-width: 48rem) 45vw, 100vw"
                    className="photo-wide"
                  />
                  <div className="card-body">
                    <h2><ForgedLine text={area.name} /></h2>
                    <p>{area.lede}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="band-more">{areasPage.note}</p>
        </div>
      </section>

      <section className="band" aria-labelledby="areas-offices-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="areas-offices-title"><ForgedLine text="Studios for these areas" /></h2>
          </div>
          <div className="grid-2">
            {contactDetails.offices.map((office) => (
              <article key={office.name} className="card card-body">
                <h3>{office.name}</h3>
                <p>{office.coverage}</p>
                <address>
                  <p>{office.address}</p>
                </address>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
