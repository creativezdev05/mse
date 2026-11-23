import Image from "next/image";
import Link from "next/link";

type Area = {
  slug: string;
  title: string;
};

const locationLogos: Record<string, string> = {
  dha: "/images/locations/DHA Lahore logo vector.svg",
  "bahria-town": "/images/locations/bahria-town-seeklogo.png",
  "lake-city": "/images/locations/Lake_City_Lahore_idOAHjF67e_0.png",
  "bahria-orchard": "/images/locations/Logo_Bahria Orchard_Bahria Orchard.png",
};

const pinOrder = ["gulberg", "johar-town", "model-town", "paragon-city"];
const logoOrder = ["dha", "bahria-town", "lake-city", "bahria-orchard"];

function tickerOrder(areas: readonly Area[]) {
  const bySlug = new Map(areas.map((area) => [area.slug, area]));
  const logos = logoOrder.flatMap((slug) => {
    const area = bySlug.get(slug);
    return area ? [area] : [];
  });
  const pins = pinOrder.flatMap((slug) => {
    const area = bySlug.get(slug);
    return area ? [area] : [];
  });
  const ordered: Area[] = [];
  const count = Math.max(logos.length, pins.length);

  for (let index = 0; index < count; index += 1) {
    const logo = logos[index];
    const pin = pins[index];
    if (logo) ordered.push(logo);
    if (pin) ordered.push(pin);
  }

  for (const area of areas) {
    if (!ordered.some((item) => item.slug === area.slug)) ordered.push(area);
  }

  return ordered;
}

function AreaPin() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0" />
    </svg>
  );
}

export function AreaTicker({ areas }: { areas: readonly Area[] }) {
  const ordered = tickerOrder(areas);
  const loop = [...ordered, ...ordered];

  return (
    <div className="logo-ticker">
      <ul className="logo-ticker-track">
        {loop.map((area, index) => {
          const duplicate = index >= ordered.length;
          const logo = locationLogos[area.slug];
          return (
            <li key={`${area.slug}-${index}`} aria-hidden={duplicate || undefined}>
              <Link href={`/areas/${area.slug}`} tabIndex={duplicate ? -1 : undefined}>
                {logo ? (
                  <span className="logo-ticker-mark">
                    <Image
                      src={encodeURI(logo)}
                      alt=""
                      width={160}
                      height={48}
                      unoptimized
                      loading="eager"
                      style={{
                        width: "auto",
                        height: "2.15rem",
                        maxWidth: "7.5rem",
                        objectFit: "contain",
                        objectPosition: "left center",
                      }}
                    />
                    <span>{area.title}</span>
                  </span>
                ) : (
                  <span className="logo-ticker-mark">
                    <AreaPin />
                    <span>{area.title}</span>
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
