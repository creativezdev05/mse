import { BandBlinds } from "@/components/layout/BandBlinds";
import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Photo } from "@/components/content/Blocks";
import { costPage, rates } from "@/data/content";
import { rateLinks } from "@/data/menus";
import { ForgedLine } from "@/components/ui/ForgedLine";

export const metadata: Metadata = {
  title: costPage.meta.title,
  description: costPage.meta.description,
};

export default function CostAndRatesPage() {
  return (
    <main>
      <PageIntro eyebrow={costPage.intro.eyebrow} title={costPage.intro.title} lede={costPage.intro.lede} />
      <div className="layout-shell-wide page-banner">
        <Photo
          src={costPage.intro.banner.src}
          alt={costPage.intro.banner.alt}
          sizes="(min-width: 80rem) 90rem, 100vw"
          className="photo-wide"
        />
      </div>

      <section className="band" aria-label="Rate categories">
        <BandBlinds />
        <div className="layout-shell-wide">
          <ul className="chip-list">
            {rateLinks.map((item) => (
              <li key={item.slug}>
                <Link href={`/cost-and-rates/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-muted" aria-label="Rate cards">
        <BandBlinds />
        <div className="layout-shell-wide">
          <p className="band-head">{rates.note}</p>
          <ul className="grid-4 card-grid">
            {rates.cards.map((card) => (
              <li key={card.kicker}>
                <article className="card card-body">
                  <p className="type-label">{card.kicker}</p>
                  <h2><ForgedLine text={card.title} /></h2>
                  <p className="price">
                    {card.price} <span>{card.unit}</span>
                  </p>
                  <ul className="specimen">
                    {card.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="cost-table-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="cost-table-title"><ForgedLine text="Bands by plot" /></h2>
          </div>
          <div className="table-scroll">
            <table>
              <caption>{costPage.tableCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">Plot</th>
                  <th scope="col">Grey structure</th>
                  <th scope="col">Finishes</th>
                  <th scope="col">Note</th>
                </tr>
              </thead>
              <tbody>
                {rates.rows.map((row) => (
                  <tr key={row.plot}>
                    <th scope="row">{row.plot}</th>
                    <td>{row.grey}</td>
                    <td>{row.finish}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="cost-compare-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="cost-compare-title"><ForgedLine text="Before you compare a rate" /></h2>
          </div>
          <div className="table-scroll">
            <table>
              <caption>{rates.comparison.caption}</caption>
              <thead>
                <tr>
                  {rates.comparison.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rates.comparison.rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="cost-specimen-title">
        <BandBlinds />
        <div className="layout-shell-wide split align-start">
          <div className="cluster">
            <h2 id="cost-specimen-title"><ForgedLine text="What the schedule names" /></h2>
            <Photo
              src={costPage.materials.src}
              alt={costPage.materials.alt}
              sizes="(min-width: 48rem) 46vw, 100vw"
              className="photo-wide"
            />
            <p>Every line below is a placeholder for the item that will be written against your drawings.</p>
            <Link href="/contact" className="btn btn-primary">
              Ask for a schedule
            </Link>
          </div>
          <ul className="card card-body specimen">
            {rates.specimen.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
