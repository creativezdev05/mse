"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: string;
  label: string;
};

type Parts = {
  target: number;
  decimals: number;
  suffix: string;
};

function partsOf(value: string): Parts | null {
  const match = value.match(/^(\d+(?:\.\d+)?)([\s\S]*)$/);
  if (!match) return null;
  const raw = match[1];
  return {
    target: Number(raw),
    decimals: raw.includes(".") ? (raw.split(".")[1]?.length ?? 0) : 0,
    suffix: match[2],
  };
}

function formatStat(parts: Parts, progress: number) {
  const current = parts.target * progress;
  const num =
    parts.decimals > 0 ? current.toFixed(parts.decimals) : String(Math.round(current));
  return `${num}${parts.suffix}`;
}

export function StatCounters({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [counting, setCounting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      setCounting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setCounting(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!counting) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = performance.now();
    const duration = 1600;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(1 - (1 - t) ** 3);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [counting]);

  return (
    <ul ref={ref} className={counting ? "stat-grid is-counter is-counting" : "stat-grid is-counter"}>
      {stats.map((item) => {
        const parts = partsOf(item.value);
        const shown = counting && parts ? formatStat(parts, progress) : item.value;
        return (
          <li key={item.label}>
            <p className="stat-value" aria-label={item.value}>
              <span aria-hidden="true">{shown}</span>
            </p>
            <p className="stat-label">{item.label}</p>
          </li>
        );
      })}
    </ul>
  );
}
