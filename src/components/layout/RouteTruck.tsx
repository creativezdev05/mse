"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const roadView = { width: 1200, height: 160 };
const roadPath =
  "M 0 80 C 280 78 520 82 760 80 C 980 78.5 1100 81 1200 80";
const driveMs = 750;

const drumPeriod = 16;
const drumRibs = Array.from({ length: 9 }, (_, row) => {
  const slope = -0.62;
  const thick = 8;
  const yTop = -8;
  const yBot = 92;
  const xAtCenter = 78 + (row - 4) * (drumPeriod / -slope);
  const xBand = xAtCenter - thick / slope;
  const xAt = (x0: number, y: number) => x0 + (y - 42) / slope;
  const top = yTop.toFixed(1);
  const bot = yBot.toFixed(1);
  return `M ${xAt(xAtCenter, yTop).toFixed(1)} ${top} L ${xAt(xBand, yTop).toFixed(1)} ${top} L ${xAt(xBand, yBot).toFixed(1)} ${bot} L ${xAt(xAtCenter, yBot).toFixed(1)} ${bot} Z`;
});

function CementTruck() {
  return (
    <svg className="build-truck-svg" viewBox="0 0 176 88" aria-hidden="true">
      <defs>
        <clipPath id="route-drum-clip">
          <ellipse cx="78" cy="42" rx="36" ry="18.5" />
        </clipPath>
      </defs>
      <g className="build-truck-dust">
        <ellipse cx="16" cy="74" rx="10" ry="2.4" />
        <ellipse cx="6" cy="76" rx="5" ry="1.6" />
      </g>
      <g className="build-truck-wheel">
        <circle cx="44" cy="70" r="11" />
        <circle cx="44" cy="70" r="4.6" />
        <path d="M44 65.6 V74.4 M39.6 70 H48.4" />
      </g>
      <g className="build-truck-wheel">
        <circle cx="132" cy="70" r="11" />
        <circle cx="132" cy="70" r="4.6" />
        <path d="M132 65.6 V74.4 M127.6 70 H136.4" />
      </g>
      <path className="build-truck-chassis" d="M24 60 H152" />
      <path className="build-truck-chute" d="M22 50 L34 40 H46" />
      <g className="build-truck-drum">
        <ellipse className="build-truck-drum-body" cx="78" cy="42" rx="36" ry="18.5" />
        <g clipPath="url(#route-drum-clip)">
          <g className="build-truck-roll">
            {drumRibs.map((d, row) => (
              <path key={row} className="build-truck-stripe" d={d} />
            ))}
          </g>
        </g>
        <ellipse className="build-truck-drum-cap" cx="46" cy="42" rx="7" ry="15" />
        <ellipse className="build-truck-drum-cap build-truck-drum-nose" cx="108" cy="42" rx="6" ry="14" />
      </g>
      <path className="build-truck-cab" d="M114 60 V30 Q114 22 124 22 H142 L158 38 V60 Z" />
      <path className="build-truck-window" d="M124 26 H140 L150 37 H124 Z" />
      <path className="build-truck-door" d="M134 28 V56" />
      <rect className="build-truck-light" x="154" y="44" width="7" height="5.5" rx="1" />
    </svg>
  );
}

function samePage(path: string, search: string) {
  const current =
    window.location.pathname.length > 1
      ? window.location.pathname.replace(/\/+$/, "")
      : window.location.pathname;

  return path === current && search === window.location.search;
}

function navigationTarget(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") {
    return null;
  }

  if (anchor.hasAttribute("download")) {
    return null;
  }

  const raw = anchor.getAttribute("href");

  if (!raw || raw.startsWith("#") || /^(mailto:|tel:|sms:|javascript:)/i.test(raw)) {
    return null;
  }

  let url: URL;

  try {
    url = new URL(raw, window.location.href);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) {
    return null;
  }

  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;

  if (samePage(path, url.search)) {
    return null;
  }

  return { path, href: `${path}${url.search}${url.hash}` };
}

type Placed = {
  x: number;
  y: number;
  angle: number;
};

function placeTruck(roadLine: SVGPathElement, rail: HTMLElement, truck: HTMLElement, value: number) {
  const length = roadLine.getTotalLength();
  const clamped = Math.min(1, Math.max(0, value));
  const distance = length * clamped;
  const span = Math.min(28, length / 16);
  const point = roadLine.getPointAtLength(distance);
  const before = roadLine.getPointAtLength(Math.max(0, distance - span));
  const after = roadLine.getPointAtLength(Math.min(length, distance + span));
  const width = rail.clientWidth;
  const height = rail.clientHeight;

  if (!width || !height || !length) {
    return null;
  }

  const screenX = (pointX: number) => (pointX / roadView.width) * width;
  const screenY = (pointY: number) => (pointY / roadView.height) * height;
  let x = screenX(point.x);
  let y = screenY(point.y);
  let dx = screenX(after.x) - screenX(before.x);
  let dy = screenY(after.y) - screenY(before.y);
  const magnitude = Math.hypot(dx, dy) || 1;
  dx /= magnitude;
  dy /= magnitude;

  if (value > 1 || value < 0) {
    const extra = (value - clamped) * width;
    x += dx * extra;
    y += dy * extra;
  }

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  truck.style.transform = `translate(${x}px, ${y}px) translate(-50%, -92%) rotate(${angle}deg)`;

  return { x, y, angle } satisfies Placed;
}

function exhaustPoint(truck: HTMLElement, placed: Placed, across: number, up: number) {
  const width = truck.offsetWidth;
  const height = truck.offsetHeight;
  const radians = (placed.angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const localX = (across - 0.5) * width;
  const localY = (up - 0.92) * height;

  return {
    x: placed.x + localX * cos - localY * sin,
    y: placed.y + localX * sin + localY * cos,
  };
}

function spawnPuff(layer: HTMLElement, x: number, y: number, kind: "smoke" | "dust") {
  const puff = document.createElement("span");
  const smoke = kind === "smoke";
  const size = smoke ? 16 + Math.random() * 22 : 6 + Math.random() * 8;

  puff.className = smoke ? "route-puff" : "route-puff is-dust";
  puff.style.width = `${size}px`;
  puff.style.height = `${size}px`;
  puff.style.left = `${x}px`;
  puff.style.top = `${y}px`;
  puff.style.setProperty("--dx", `${-(smoke ? 12 : 5) - Math.random() * (smoke ? 26 : 12)}px`);
  puff.style.setProperty("--dy", `${-(smoke ? 3 : 0) - Math.random() * (smoke ? 10 : 4)}px`);
  layer.appendChild(puff);
  puff.addEventListener("animationend", () => puff.remove(), { once: true });
}

export function RouteTruck() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const plumeRef = useRef<HTMLDivElement>(null);
  const running = useRef(false);
  const pendingPath = useRef<string | null>(null);
  const startedAt = useRef(0);
  const navigateTimer = useRef(0);
  const revealTimer = useRef(0);
  const safetyTimer = useRef(0);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (running.current || event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const target = navigationTarget(anchor);

      if (!target) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      event.preventDefault();
      running.current = true;
      pendingPath.current = target.path;
      startedAt.current = performance.now();
      setActive(true);
      window.clearTimeout(navigateTimer.current);
      window.clearTimeout(revealTimer.current);
      window.clearTimeout(safetyTimer.current);
      navigateTimer.current = window.setTimeout(() => {
        router.push(target.href);
      }, 400);
      safetyTimer.current = window.setTimeout(() => {
        setActive(false);
        running.current = false;
        pendingPath.current = null;
      }, 5000);
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(navigateTimer.current);
      window.clearTimeout(revealTimer.current);
      window.clearTimeout(safetyTimer.current);
    };
  }, [router]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const path =
      window.location.pathname.length > 1
        ? window.location.pathname.replace(/\/+$/, "")
        : window.location.pathname;

    running.current = true;
    pendingPath.current = path;
    startedAt.current = performance.now();
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) {
      return;
    }

    // The page segment hydrates after this layout effect. Putting inert on
    // <main> before that is reported as a hydration mismatch.
    const frame = document.getElementById("site-frame");
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    frame?.setAttribute("inert", "");

    return () => {
      document.body.style.overflow = previous;
      frame?.removeAttribute("inert");
    };
  }, [active]);

  useEffect(() => {
    if (!active || !pendingPath.current) {
      return;
    }

    const path = () =>
      window.location.pathname.length > 1
        ? window.location.pathname.replace(/\/+$/, "")
        : window.location.pathname;

    if (path() === pendingPath.current && performance.now() - startedAt.current > 400) {
      const elapsed = performance.now() - startedAt.current;
      const wait = Math.max(0, driveMs - elapsed);
      window.clearTimeout(revealTimer.current);
      revealTimer.current = window.setTimeout(() => {
        setActive(false);
        window.clearTimeout(safetyTimer.current);
        window.setTimeout(() => {
          running.current = false;
          pendingPath.current = null;
        }, 220);
      }, wait);
      return;
    }

    const watch = window.setInterval(() => {
      if (!running.current || !pendingPath.current) {
        return;
      }

      if (path() !== pendingPath.current) {
        return;
      }

      if (performance.now() - startedAt.current < 400) {
        return;
      }

      const elapsed = performance.now() - startedAt.current;
      const wait = Math.max(0, driveMs - elapsed);
      window.clearTimeout(revealTimer.current);
      revealTimer.current = window.setTimeout(() => {
        setActive(false);
        window.clearTimeout(safetyTimer.current);
        window.setTimeout(() => {
          running.current = false;
          pendingPath.current = null;
        }, 220);
      }, wait);
      window.clearInterval(watch);
    }, 40);

    return () => window.clearInterval(watch);
  }, [active]);

  useLayoutEffect(() => {
    if (!active) {
      return;
    }

    const stage = stageRef.current;
    const roadLine = roadRef.current;
    const truck = truckRef.current;
    const plumes = plumeRef.current;

    if (!stage || !roadLine || !truck || !plumes) {
      return;
    }

    plumes.replaceChildren();
    truck.dataset.driving = "true";
    const started = performance.now();
    const inset = stage.clientWidth
      ? Math.min(0.3, truck.offsetWidth / 2 / stage.clientWidth)
      : 0.12;
    const departAt = inset;
    const arriveAt = 1 - inset;
    let frame = 0;
    let previous = started;
    let smokeClock = 0;
    let dustClock = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / driveMs);
      const placed = placeTruck(roadLine, stage, truck, departAt + t * (arriveAt - departAt));
      const delta = now - previous;
      previous = now;

      if (placed && t > 0.02 && t < 0.98) {
        smokeClock += delta;
        dustClock += delta;
        const exhaust = exhaustPoint(truck, placed, 0.06, 0.34);
        const wheels = exhaustPoint(truck, placed, 0.22, 0.9);

        if (smokeClock >= 18) {
          smokeClock = 0;
          spawnPuff(plumes, exhaust.x, exhaust.y, "smoke");
          spawnPuff(plumes, exhaust.x - 10, exhaust.y + 6, "smoke");
        }

        if (dustClock >= 26) {
          dustClock = 0;
          spawnPuff(plumes, wheels.x, wheels.y, "dust");
        }
      }

      if (t < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    placeTruck(roadLine, stage, truck, departAt);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      truck.dataset.driving = "false";
      plumes.replaceChildren();
    };
  }, [active]);

  return (
    <div className="route-drive" data-run={active ? "true" : "false"} aria-hidden={active ? undefined : true}>
      {active ? <p className="visually-hidden">Loading the next page</p> : null}
      <div className="route-stage" ref={stageRef}>
        <svg className="build-road route-road" viewBox={`0 0 ${roadView.width} ${roadView.height}`} preserveAspectRatio="none" aria-hidden="true">
          <path className="build-road-bed" d={roadPath} />
          <path className="build-road-pave" d={roadPath} />
          <path ref={roadRef} className="build-road-dash route-road-dash" d={roadPath} />
        </svg>
        <div className="route-plumes" ref={plumeRef} />
        <div className="build-truck route-truck" data-driving="false" ref={truckRef}>
          <span className="route-exhaust" aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index} />
            ))}
          </span>
          <CementTruck />
        </div>
      </div>
    </div>
  );
}
