import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, Photo } from "@/components/content/Blocks";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactDetails, contactPage, serviceOptions } from "@/data/content";
import { areaLinks } from "@/data/menus";
import { ForgedLine } from "@/components/ui/ForgedLine";

export const metadata: Metadata = {
  title: contactPage.meta.title,
  description: contactPage.meta.description,
};

export default function ContactPage() {
  return (
    <main>
      <PageIntro eyebrow={contactPage.intro.eyebrow} title={contactPage.intro.title} lede={contactPage.intro.lede} />
      <div className="layout-shell-wide page-banner">
        <Photo
          src={contactDetails.map.src}
          alt={contactDetails.map.alt}
          sizes="(min-width: 80rem) 90rem, 100vw"
          className="photo-wide"
        />
      </div>

      <section className="band band-muted" aria-label="Reply times">
        <div className="layout-shell-wide">
          <ul className="stat-grid">
            {contactPage.stats.map((item) => (
              <li key={item.label}>
                <p className="stat-value">{item.value}</p>
                <p className="stat-label">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="contact-form-title">
        <div className="layout-shell-wide split align-start">
          <div className="cluster">
            <h2 id="contact-form-title"><ForgedLine text={contactPage.formTitle} /></h2>
            <p>{contactPage.formLede}</p>
            <ContactForm
              services={serviceOptions}
              submitLabel={contactPage.submitLabel}
              successMessage={contactPage.success}
              failureMessage={contactPage.failure}
            />
          </div>
          <div className="map-block cluster">
            <address>
              <p>{contactDetails.offices[0].address}</p>
              <p>{contactDetails.offices[1].address}</p>
              <p>
                <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
              </p>
              <p>
                <a href={contactDetails.emailHref}>{contactDetails.email}</a>
              </p>
              <p>{contactDetails.hours}</p>
            </address>
          </div>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="contact-offices-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="contact-offices-title"><ForgedLine text="Both studios" /></h2>
          </div>
          <div className="grid-2">
            {contactDetails.offices.map((office) => (
              <article key={office.name} className="card card-body">
                <h3>{office.name}</h3>
                <p>{office.coverage}</p>
                <address>
                  <p>{office.address}</p>
                  <p>
                    <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
                  </p>
                  <p>
                    <a href={contactDetails.emailHref}>{contactDetails.email}</a>
                  </p>
                  <p>{office.hours}</p>
                  <p>{contactDetails.closed}</p>
                </address>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="contact-methods-title">
        <div className="layout-shell-wide">
          <h2 id="contact-methods-title" className="visually-hidden">
            Ways to reach the studio
          </h2>
          <ol className="grid-3 card-grid">
            {contactPage.methods.map((method) => (
              <li key={method.step} className="card card-body">
                <p className="step-index">{method.step}</p>
                <h3>{method.title}</h3>
                <p>{method.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band-muted" aria-labelledby="contact-path-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="contact-path-title"><ForgedLine text={contactPage.path.title} /></h2>
          </div>
          <ol className="step-list">
            {contactPage.path.items.map((item, index) => (
              <li key={item.title}>
                <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band" aria-labelledby="contact-areas-title">
        <div className="layout-shell-wide">
          <div className="band-head">
            <h2 id="contact-areas-title"><ForgedLine text="Societies we already work in" /></h2>
          </div>
          <ul className="chip-list">
            {areaLinks.map((area) => (
              <li key={area.slug}>
                <Link href={`/areas/${area.slug}`}>{area.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
