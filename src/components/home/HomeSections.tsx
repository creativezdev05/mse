import Link from "next/link";
import { Photo } from "@/components/content/Blocks";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  contactDetails,
  contactPage,
  home,
  rates,
  serviceOptions,
} from "@/data/content";
import { areaLinks } from "@/data/menus";
import { AreaTicker } from "@/components/home/AreaTicker";
import { IntroLead } from "@/components/home/IntroLead";
import { IntroStats } from "@/components/home/IntroStats";
import { TrustCards } from "@/components/home/TrustCards";
import { PointList } from "@/components/home/PointList";
import { StatCounters } from "@/components/home/StatCounters";
import { ForgedLine } from "@/components/ui/ForgedLine";
import { motion, AnimatePresence } from "motion/react";
import ConstructionGallery from "@/components/home/ConstructionGallery";
import "@/styles/home.css";

const cardImage = "(min-width: 80rem) 28vw, (min-width: 48rem) 45vw, 100vw";

export function HomeSections() {
  return (
    <>
      <section className="band intro-band" aria-labelledby="home-intro-title">
        <div className="layout-shell-wide intro-stage">
          <IntroLead id="home-intro-title">{home.intro.lead}</IntroLead>
          <IntroStats stats={home.intro.stats} />
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="home-excellence-title">
        <div className="layout-shell-wide split">
          <div className="cluster">
            <p className="type-label">{home.excellence.eyebrow}</p>
            <h2 id="home-excellence-title"><ForgedLine text={home.excellence.title} /></h2>
            {home.excellence.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link href={home.excellence.cta.href} className="link">
              {home.excellence.cta.label}
            </Link>
          </div>
            <PointList>
            {home.excellence.points.map((point) => (
              <li key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </li>
            ))}
          </PointList>
        </div>
      </section>

      <ConstructionGallery
        items={home.services.items}
      />

      <section className="band band-muted" aria-labelledby="home-trust-title">
        <div className="layout-shell-wide split align-start">
          <div className="cluster">
            <p className="type-label">{home.trust.eyebrow}</p>
            <h2 id="home-trust-title"><ForgedLine text={home.trust.title} /></h2>
            <p>{home.trust.body}</p>
          </div>
          <TrustCards items={home.trust.items} />
        </div>
      </section>

      <section className="band" aria-labelledby="home-experts-title">
        <div className="layout-shell-wide cluster-lg">
          <div className="split align-start">
            <Photo
              src={home.experts.image.src}
              alt={home.experts.image.alt}
              sizes="(min-width: 48rem) 46vw, 100vw"
              className="photo-tall"
            />
            <div className="cluster">
              <p className="type-label">{home.experts.eyebrow}</p>
              <h2 id="home-experts-title"><ForgedLine text={home.experts.title} /></h2>
              <p>{home.experts.body}</p>
              <p className="badge-line">{home.experts.badge}</p>
            </div>
          </div>
          <ul className="grid-2 card-grid">
            {home.experts.points.map((point) => (
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

      <section className="band band-muted" aria-labelledby="home-precision-title">
        <div className="layout-shell-wide split align-start">
          <div className="cluster">
            <p className="type-label">{home.precision.eyebrow}</p>
            <h2 id="home-precision-title"><ForgedLine text={home.precision.title} /></h2>
            <p>{home.precision.body}</p>
            <h3>Where the work sits</h3>
            <PointList>
              {home.precision.expertise.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </PointList>
            <Link href={home.precision.cta.href} className="link">
              {home.precision.cta.label}
            </Link>
          </div>
          <div className="stack">
            {home.precision.images.map((image) => (
              <Photo key={image.src} src={image.src} alt={image.alt} sizes="(min-width: 48rem) 40vw, 100vw" className="photo-wide" />
            ))}
            <article className="card card-body">
              <h3>{home.precision.note.title}</h3>
              <p>{home.precision.note.text}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="home-projects-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <p className="type-label">{home.projects.eyebrow}</p>
            <h2 id="home-projects-title"><ForgedLine text={home.projects.title} /></h2>
            <p>{home.projects.body}</p>
          </div>
          <ul className="grid-3 card-grid">
            {home.projects.items.map((item) => (
              <li key={item.title}>
                <article className="card media-card">
                  <Photo src={item.image.src} alt={item.image.alt} sizes={cardImage} className="photo-wide" />
                  <div className="card-body">
                    <p className="type-label">{item.place}</p>
                    <h3>{item.title}</h3>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="home-logs-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="home-logs-title"><ForgedLine text={home.logs.title} /></h2>
            <p>{home.logs.body}</p>
          </div>
          <ul className="grid-3 card-grid">
            {home.logs.items.map((item) => (
              <li key={item.image.src}>
                <article className="card media-card">
                  <Photo src={item.image.src} alt={item.image.alt} sizes={cardImage} className="photo-wide" />
                  <div className="card-body">
                    <p className="type-label">
                      {item.place} · {item.date}
                    </p>
                    <h3>{item.text}</h3>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="home-steps-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="home-steps-title"><ForgedLine text={home.steps.title} /></h2>
            <p>{home.steps.body}</p>
          </div>
          <ol className="step-list">
            {home.steps.items.map((step, index) => (
              <li key={step.title}>
                <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="path-list">
            {home.steps.paths.map((path) => (
              <li key={path.href}>
                <Link href={path.href} className="link">
                  {path.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="home-offices-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <p className="type-label">Studios</p>
            <h2 id="home-offices-title"><ForgedLine text="Two addresses in Lahore" /></h2>
          </div>
          <div className="grid-2">
            {contactDetails.offices.map((office) => (
              <article key={office.name} className="card card-body">
                <h3>{office.name}</h3>
                <address>
                  <p>{office.address}</p>
                  <p>
                    <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
                  </p>
                  <p>{office.hours}</p>
                  <p>{contactDetails.closed}</p>
                </address>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="home-faq-title">
        <div className="layout-shell layout-narrow-block">
          <h2 id="home-faq-title"><ForgedLine text={home.faq.title} /></h2>
          <div className="faq-list">
            {home.faq.items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="home-offer-title">
        <div className="layout-shell-wide split align-start">
          <div className="cluster">
            <p className="type-label">{home.offer.eyebrow}</p>
            <h2 id="home-offer-title"><ForgedLine text={home.offer.title} /></h2>
            <p>{home.offer.body}</p>
            <Link href={home.offer.cta.href} className="btn btn-primary">
              {home.offer.cta.label}
            </Link>
          </div>
          <Photo
            src={home.offer.image.src}
            alt={home.offer.image.alt}
            sizes="(min-width: 48rem) 46vw, 100vw"
            className="photo-tall"
          />
        </div>
      </section>

      <section className="band" aria-labelledby="home-studio-title">
        <div className="layout-shell-wide studio">
          <div className="stack">
            {home.studio.left.map((image) => (
              <Photo key={image.src} src={image.src} alt={image.alt} sizes="(min-width: 80rem) 22vw, 100vw" className="photo-tall" />
            ))}
          </div>
          <div className="cluster studio-copy">
            <h2 id="home-studio-title"><ForgedLine text={home.studio.title} /></h2>
            <h3>{home.studio.subtitle}</h3>
            <p>{home.studio.body}</p>
            <Link href={home.studio.cta.href} className="link">
              {home.studio.cta.label}
            </Link>
          </div>
          <div className="stack">
            {home.studio.right.map((image) => (
              <Photo key={image.src} src={image.src} alt={image.alt} sizes="(min-width: 80rem) 22vw, 100vw" className="photo-tall" />
            ))}
          </div>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="home-reviews-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="home-reviews-title"><ForgedLine text={home.reviews.title} /></h2>
            <p>{home.reviews.body}</p>
          </div>
          <ul className="grid-3 card-grid">
            {home.reviews.items.map((item) => (
              <li key={item.name}>
                <blockquote className="card card-body">
                  <p>{item.quote}</p>
                  <footer>
                    <cite>{item.name}</cite>
                    <p>{item.context}</p>
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="home-inquiry-title">
        <div className="layout-shell-wide split align-start">
          <Photo
            src={home.inquiry.image.src}
            alt={home.inquiry.image.alt}
            sizes="(min-width: 48rem) 46vw, 100vw"
            className="photo-tall"
          />
          <div className="cluster">
            <h2 id="home-inquiry-title"><ForgedLine text={home.inquiry.title} /></h2>
            <p>{home.inquiry.body}</p>
            <ContactForm
              services={serviceOptions}
              submitLabel={contactPage.submitLabel}
              successMessage={contactPage.success}
              failureMessage={contactPage.failure}
            />
          </div>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="home-writing-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <p className="type-label">{home.writing.eyebrow}</p>
            <h2 id="home-writing-title"><ForgedLine text={home.writing.title} /></h2>
            <p>{home.writing.body}</p>
          </div>
          <ul className="grid-3 card-grid">
            {home.writing.items.map((item) => (
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

      <section className="band" aria-labelledby="home-boq-title">
        <div className="layout-shell-wide split align-start">
          <div className="cluster">
            <h2 id="home-boq-title"><ForgedLine text={home.boq.title} /></h2>
            <p>{home.boq.body}</p>
            <PointList>
              {home.boq.points.map((point) => (
                <li key={point}>
                  <p>{point}</p>
                </li>
              ))}
            </PointList>
          </div>
          <div className="card card-body">
            <h3>A specimen list</h3>
            <ul className="specimen">
              {rates.specimen.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="band band-inverse" aria-labelledby="home-coverage-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="home-coverage-title"><ForgedLine text={home.coverage.title} /></h2>
            <p>{home.coverage.body}</p>
          </div>
          <StatCounters stats={home.coverage.stats} />
        </div>
      </section>

      <section className="band" aria-labelledby="home-rates-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="home-rates-title"><ForgedLine text={home.ratesIntro.title} /></h2>
            <p>{home.ratesIntro.body}</p>
            <p>{rates.note}</p>
          </div>
          <ul className="grid-4 card-grid">
            {rates.cards.map((card) => (
              <li key={card.kicker}>
                <article className="card card-body">
                  <p className="type-label">{card.kicker}</p>
                  <h3>{card.title}</h3>
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
          <p className="band-more">
            <Link href="/cost-and-rates" className="link">
              Cost and rates
            </Link>
          </p>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="home-compare-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="home-compare-title"><ForgedLine text={home.compare.title} /></h2>
            <p>{home.compare.body}</p>
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
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="home-areas-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="home-areas-title"><ForgedLine text={home.societies.title} /></h2>
            <p>{home.societies.body}</p>
          </div>
          <AreaTicker areas={areaLinks} />
        </div>
      </section>
    </>
  );
}
