import { BandBlinds } from "@/components/layout/BandBlinds";
import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Photo } from "@/components/content/Blocks";
import { ForgedLine } from "@/components/ui/ForgedLine";
import { aboutPage, contactDetails } from "@/data/content";

export const metadata: Metadata = {
  title: aboutPage.meta.title,
  description: aboutPage.meta.description,
};

export default function AboutPage() {
  return (
    <main>
      <PageIntro eyebrow={aboutPage.intro.eyebrow} title={aboutPage.intro.title} lede={aboutPage.intro.lede} />
      <div className="layout-shell-wide page-banner">
        <Photo
          src={aboutPage.intro.banner.src}
          alt={aboutPage.intro.banner.alt}
          sizes="(min-width: 80rem) 90rem, 100vw"
          className="photo-wide"
        />
      </div>

      <section className="band band-muted" aria-label="Studio facts">
        <BandBlinds />
        <div className="layout-shell-wide split align-start">
          <Photo
            src={aboutPage.portrait.src}
            alt={aboutPage.portrait.alt}
            sizes="(min-width: 48rem) 46vw, 100vw"
            className="photo-tall"
          />
          <ul className="stat-grid">
            {aboutPage.facts.map((fact) => (
              <li key={fact.label}>
                <p className="stat-value">{fact.value}</p>
                <p className="stat-label">{fact.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="about-founder-title">
        <BandBlinds />
        <div className="layout-shell-wide split align-start">
          <Photo
            src={aboutPage.founder.image.src}
            alt={aboutPage.founder.image.alt}
            sizes="(min-width: 48rem) 40vw, 100vw"
            className="photo-tall"
          />
          <blockquote className="cluster">
            <p className="intro-lead">{aboutPage.founder.quote}</p>
            <footer>
              <cite>{aboutPage.founder.name}</cite>
              <p>{aboutPage.founder.role}</p>
            </footer>
            <ul className="point-list" aria-labelledby="about-founder-title">
              {aboutPage.founder.points.map((point) => (
                <li key={point}>
                  <p>{point}</p>
                </li>
              ))}
            </ul>
          </blockquote>
        </div>
        <h2 id="about-founder-title" className="visually-hidden">
          {aboutPage.founder.name}
        </h2>
      </section>

      <section className="band band-muted" aria-labelledby="about-story-title">
        <BandBlinds />
        <div className="layout-shell-wide split align-start">
          <div className="cluster">
            <h2 id="about-story-title"><ForgedLine text={aboutPage.story.title} /></h2>
            {aboutPage.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ol className="timeline">
            {aboutPage.timeline.map((item) => (
              <li key={item.year}>
                <p className="type-label">{item.year}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band" aria-labelledby="about-principles-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="about-principles-title"><ForgedLine text={aboutPage.principles.title} /></h2>
          </div>
          <ul className="grid-3 card-grid">
            {aboutPage.principles.items.map((item) => (
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

      <section className="band band-inverse" aria-labelledby="about-warranty-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="about-warranty-title"><ForgedLine text={aboutPage.warranty.title} /></h2>
          </div>
          <ul className="grid-3 card-grid">
            {aboutPage.warranty.items.map((item) => (
              <li key={item.title}>
                <article>
                  <p className="stat-value">
                    {item.value}
                    <span className="stat-label"> {item.unit}</span>
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="about-team-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="about-team-title"><ForgedLine text={aboutPage.team.title} /></h2>
          </div>
          <ul className="grid-4 card-grid">
            {aboutPage.team.people.map((person) => (
              <li key={person.name}>
                <article className="card media-card">
                  <Photo
                    src={person.image.src}
                    alt={person.image.alt}
                    sizes="(min-width: 80rem) 22vw, (min-width: 48rem) 45vw, 100vw"
                    className="photo-tall"
                  />
                  <div className="card-body">
                    <h3>{person.name}</h3>
                    <p className="type-label">{person.role}</p>
                    <p>{person.text}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="about-offices-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="about-offices-title"><ForgedLine text="The two studios" /></h2>
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
                  <p>
                    <a href={contactDetails.emailHref}>{contactDetails.email}</a>
                  </p>
                  <p>{office.hours}</p>
                </address>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="about-reviews-title">
        <BandBlinds />
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="about-reviews-title"><ForgedLine text="Notes from owners" /></h2>
          </div>
          <ul className="grid-3 card-grid">
            {aboutPage.reviews.map((item) => (
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

      <section className="band band-muted" aria-labelledby="about-close-title">
        <BandBlinds />
        <div className="layout-shell-wide cluster">
          <h2 id="about-close-title"><ForgedLine text={aboutPage.close.title} /></h2>
          <p className="page-lede">{aboutPage.close.body}</p>
          <Link href={aboutPage.close.cta.href} className="btn btn-primary">
            {aboutPage.close.cta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
