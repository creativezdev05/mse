"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const SKIP =
  ".home-hero, .intro-stats, .trust-cards, .shine-list, .footer-machines, .intro-band .intro-lead";

const GROUP = [
  ".card-grid",
  ".step-list",
  ".path-list",
  ".stat-grid",
  ".timeline",
  ".faq-list",
  ".split",
  ".studio",
  ".stack",
  ".grid-2",
  ".grid-3",
  ".grid-4",
  ".site-footer-grid",
  ".page-intro .cluster",
].join(",");

const SINGLE = [
  ".band-head",
  ".band-more",
  ".table-scroll",
  ".page-banner",
  ".logo-ticker",
  ".site-footer-bar",
].join(",");

const SHELL =
  ":scope > .layout-shell, :scope > .layout-shell-wide, :scope > .layout-shell-narrow";

const MAX_INDEX = 5;

function isElement(node: Element): node is HTMLElement {
  return node instanceof HTMLElement;
}

function skipped(el: Element) {
  return Boolean(el.closest(SKIP));
}

function expand(el: HTMLElement): HTMLElement[] {
  if (skipped(el) || el.matches(GROUP)) return [];
  if (!el.querySelector(SKIP) && !el.querySelector(GROUP)) return [el];
  return [...el.children].filter(isElement).flatMap(expand);
}

function insideClaimed(el: HTMLElement, claimed: Set<HTMLElement>) {
  let node: HTMLElement | null = el;
  while (node) {
    if (claimed.has(node)) return true;
    node = node.parentElement;
  }
  return false;
}

function containsClaimed(el: HTMLElement, claimed: Set<HTMLElement>) {
  for (const item of claimed) {
    if (item !== el && el.contains(item)) return true;
  }
  return false;
}

function collect(scope: ParentNode) {
  const claimed = new Set<HTMLElement>();
  const items: HTMLElement[] = [];

  const take = (nodes: HTMLElement[]) => {
    for (const node of nodes) {
      if (skipped(node) || claimed.has(node) || insideClaimed(node, claimed)) continue;
      claimed.add(node);
      items.push(node);
    }
  };

  for (const container of scope.querySelectorAll<HTMLElement>(GROUP)) {
    if (skipped(container) || insideClaimed(container, claimed)) continue;
    const children = [...container.children].filter(isElement).flatMap((child) => {
      if (child.matches(GROUP)) return [];
      return expand(child);
    });
    take(children);
  }

  take([...scope.querySelectorAll<HTMLElement>(SINGLE)].flatMap(expand));

  for (const section of scope.querySelectorAll<HTMLElement>("section.band, header.page-intro")) {
    if (skipped(section)) continue;
    for (const shell of section.querySelectorAll<HTMLElement>(SHELL)) {
      const children = [...shell.children].filter(isElement).flatMap((child) => {
        if (containsClaimed(child, claimed) || insideClaimed(child, claimed)) return [];
        return expand(child);
      });
      take(children);
    }
  }

  return items;
}

function belowFold(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return false;
  return rect.top >= window.innerHeight;
}

function reactHydrated(node: Element) {
  return Object.keys(node).some((key) => key.startsWith("__reactFiber$"));
}

export function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let waitFrame = 0;
    let stop = () => {};

    const start = () => {
      const items = [
        ...document.querySelectorAll<HTMLElement>("main"),
        ...document.querySelectorAll<HTMLElement>("footer.site-footer"),
      ].flatMap((scope) => collect(scope));

      const armed = items.filter(belowFold);
      let queued: HTMLElement[] = [];
      let waiting = false;
      let frame = 0;

      const flush = () => {
        const batch = queued.splice(0);
        const groups = new Map<HTMLElement, HTMLElement[]>();

        for (const item of batch) {
          if (!item.isConnected) continue;
          const owner = item.closest("section, header.page-intro, footer") ?? item.parentElement;
          if (!(owner instanceof HTMLElement)) continue;
          const list = groups.get(owner) ?? [];
          list.push(item);
          groups.set(owner, list);
        }

        for (const list of groups.values()) {
          list.sort((a, b) => {
            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();
            return ra.top - rb.top || ra.left - rb.left;
          });
          list.forEach((item, index) => {
            item.style.setProperty("--reveal-index", String(Math.min(index, MAX_INDEX)));
            item.classList.add("is-revealed");
          });
        }
      };

      const enqueue = (item: HTMLElement) => {
        queued.push(item);
        if (waiting) return;
        waiting = true;
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            waiting = false;
            frame = 0;
            flush();
          });
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const item = entry.target;
            if (!(item instanceof HTMLElement)) continue;
            observer.unobserve(item);
            enqueue(item);
          }
        },
        { rootMargin: "0px 0px -4% 0px", threshold: 0 },
      );

      for (const item of armed) {
        item.classList.add("reveal");
        observer.observe(item);
      }

      stop = () => {
        observer.disconnect();
        if (frame) cancelAnimationFrame(frame);
        queued = [];
        for (const item of armed) {
          if (!item.isConnected || item.classList.contains("is-revealed")) continue;
          item.classList.remove("reveal");
          item.style.removeProperty("--reveal-index");
        }
      };
    };

    const main = document.querySelector("main");

    if (main && reactHydrated(main)) {
      start();
    } else {
      let attempts = 0;
      const wait = () => {
        if (cancelled) return;
        const node = document.querySelector("main");
        if (node && reactHydrated(node)) {
          start();
          return;
        }
        attempts += 1;
        if (attempts > 240) return;
        waitFrame = requestAnimationFrame(wait);
      };
      waitFrame = requestAnimationFrame(wait);
    }

    return () => {
      cancelled = true;
      if (waitFrame) cancelAnimationFrame(waitFrame);
      stop();
    };
  }, [pathname]);

  return null;
}
