"use client";

import { useRevealOnScroll } from "@/components/home/useRevealOnScroll";

type TrustItem = {
  title: string;
  text: string;
};

type TrustCardsProps = {
  items: readonly TrustItem[];
};

export function TrustCards({ items }: TrustCardsProps) {
  const ref = useRevealOnScroll<HTMLUListElement>();

  return (
    <ul className="grid-2 card-grid trust-cards" ref={ref}>
      {items.map((item) => (
        <li key={item.title} className="trust-card">
          <article className="card card-body">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
