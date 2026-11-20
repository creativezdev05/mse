import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { FooterMachines } from "@/components/layout/FooterMachines";
import { contactDetails } from "@/data/content";
import { brand, quoteLink, siteConfig } from "@/lib/site";

function filled(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await copyrightYear();
  const description =
    filled(siteConfig.description) ?? "Company description to be added";
  const contactLines = [
    { text: contactDetails.phone, href: contactDetails.phoneHref },
    { text: contactDetails.email, href: contactDetails.emailHref },
    { text: contactDetails.offices[0].address, href: undefined },
    { text: contactDetails.hours, href: undefined },
  ];

  return (
    <footer className="site-footer">
      <div className="layout-shell-wide site-footer-grid">
        <div className="site-footer-brand">
          <Link href="/" className="site-brand" aria-label={brand.name}>
            <BrandMark />
          </Link>
          <p className="site-footer-description">{description}</p>
          <Link href={quoteLink.href} className="btn btn-secondary">
            {quoteLink.title}
          </Link>
        </div>

        <address className="site-footer-contact" aria-labelledby="footer-contact">
          <h2 id="footer-contact" className="site-footer-heading">
            Contact
          </h2>
          <ul className="site-footer-list">
            {contactLines.map((item) => (
              <li key={item.text}>
                {item.href ? (
                  <a className="site-footer-link" href={item.href}>
                    {item.text}
                  </a>
                ) : (
                  <span className="site-footer-contact-line">{item.text}</span>
                )}
              </li>
            ))}
          </ul>
        </address>
      </div>

      <FooterMachines />

      <div className="site-footer-bar">
        <div className="layout-shell-wide site-footer-bar-inner">
          <p className="site-footer-copyright">
            © {year} {brand.name}. All rights reserved.
          </p>
          <nav className="site-footer-legal" aria-label="Legal">
            {siteConfig.legal.map((item) => (
              <a key={item.href} className="site-footer-link" href={item.href}>
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
