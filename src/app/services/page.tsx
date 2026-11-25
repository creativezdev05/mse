import { BandBlinds } from "@/components/layout/BandBlinds";
import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Photo } from "@/components/content/Blocks";
import { servicesPage } from "@/data/content";
import { serviceGroups } from "@/data/menus";
import { ForgedLine } from "@/components/ui/ForgedLine";

export const metadata: Metadata = {
  title: servicesPage.meta.title,
  description: servicesPage.meta.description,
};

export default function ServicesPage() {
  return (
    <main>
      <PageIntro eyebrow={servicesPage.intro.eyebrow} title={servicesPage.intro.title} lede={servicesPage.intro.lede} />
      <div className="layout-shell-wide page-banner">
        <Photo
          src={servicesPage.intro.banner.src}
          alt={servicesPage.intro.banner.alt}
          sizes="(min-width: 80rem) 90rem, 100vw"
          className="photo-wide"
        />
      </div>

      <section className="band" aria-label="Service categories">
        <BandBlinds />
        <div className="layout-shell-wide grid-2">
          {serviceGroups.map((group) => (
            <div key={group.label} className="cluster">
              <h2><ForgedLine text={group.label} /></h2>
              <ul className="specimen">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="band band-muted" aria-label="How the studio works">
        <BandBlinds />
        <div className="layout-shell-wide">
          <ul className="grid-3 card-grid">
            {servicesPage.values.map((item) => (
              <li key={item.title}>
                <article className="card card-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="services-sketch-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <p className="type-label">{servicesPage.sketches.eyebrow}</p>
            <h2 id="services-sketch-title"><ForgedLine text={servicesPage.sketches.title} /></h2>
          </div>
          <ul className="grid-4 card-grid">
            {servicesPage.sketches.items.map((item) => (
              <li key={item.title}>
                <article className="card media-card">
                  <Photo
                    src={item.image.src}
                    alt={item.image.alt}
                    sizes="(min-width: 80rem) 22vw, (min-width: 48rem) 45vw, 100vw"
                    className="photo-wide"
                  />
                  <div className="card-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="services-offer-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="services-offer-title"><ForgedLine text={servicesPage.offers.title} /></h2>
          </div>
          <ul className="grid-3 card-grid">
            {servicesPage.offers.items.map((item) => (
              <li key={item.title}>
                <article className="card card-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="services-philosophy-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="services-philosophy-title"><ForgedLine text={servicesPage.philosophy.title} /></h2>
          </div>
          <div className="grid-3">
            {servicesPage.philosophy.columns.map((column) => (
              <article key={column.title} className="card card-body">
                <h3>{column.title}</h3>
                <ul className="specimen">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="services-sides-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="services-sides-title"><ForgedLine text={servicesPage.sides.title} /></h2>
            <p>{servicesPage.sides.lede}</p>
          </div>
          <div className="grid-2">
            {([servicesPage.sides.interior, servicesPage.sides.exterior] as const).map((side) => (
              <article key={side.title} className="card media-card">
                <Photo
                  src={side.image.src}
                  alt={side.image.alt}
                  sizes="(min-width: 48rem) 46vw, 100vw"
                  className="photo-wide"
                />
                <div className="card-body">
                  <h3>{side.title}</h3>
                  <p>{side.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
