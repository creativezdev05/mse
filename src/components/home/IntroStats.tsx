"use client";

import { useRevealOnScroll } from "@/components/home/useRevealOnScroll";

type IntroStat = {
  value: string;
  label: string;
};

type IntroStatsProps = {
  stats: readonly IntroStat[];
};

export function IntroStats({ stats }: IntroStatsProps) {
  const ref = useRevealOnScroll<HTMLUListElement>();

  return (
    <ul className="intro-stats" ref={ref}>
      {stats.map((item) => (
        <li key={item.label} className="intro-stat">
          <div className="intro-stat-face">
            <p className="stat-value">{item.value}</p>
            <p className="stat-label">{item.label}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
