"use client";

import { Shovel } from "lucide-react";
import { useEffect, useRef } from "react";

const DROP_LIMIT = 36;

function spawnCement(layer: HTMLElement, x: number, y: number) {
  const count = 5 + Math.floor(Math.random() * 3);

  for (let index = 0; index < count; index += 1) {
    const drop = document.createElement("span");
    const size = 3 + Math.random() * 5;
    const dx = (Math.random() - 0.4) * 22;
    const dy = 8 + Math.random() * 22;

    drop.className = index % 3 === 0 ? "cement-drop is-heavy" : "cement-drop";
    drop.style.width = `${size}px`;
    drop.style.height = `${size * 0.86}px`;
    drop.style.left = `${x + (Math.random() - 0.5) * 8}px`;
    drop.style.top = `${y + Math.random() * 4}px`;
    drop.style.setProperty("--dx", `${dx}px`);
    drop.style.setProperty("--dy", `${dy}px`);
    drop.style.animationDelay = `${index * 28}ms`;
    layer.appendChild(drop);

    const remove = () => drop.remove();
    drop.addEventListener("animationend", remove, { once: true });
    window.setTimeout(remove, 980);
  }

  while (layer.childElementCount > DROP_LIMIT) {
    layer.firstElementChild?.remove();
  }
}

export function TrowelCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!finePointer.matches) {
      return;
    }

    const cursor = cursorRef.current;
    const drops = dropsRef.current;

    if (!cursor || !drops) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const place = (x: number, y: number, target: EventTarget | null) => {
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      cursor.classList.add("is-on");
      cursor.classList.toggle(
        "is-loaded",
        target instanceof Element && Boolean(target.closest("a, button, [role='button']")),
      );
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) {
        return;
      }

      place(event.clientX, event.clientY, event.target);
      cursor.classList.add("is-press");

      if (!reduced) {
        spawnCement(drops, event.clientX, event.clientY);
      }
    };

    const onMove = (event: PointerEvent) => {
      place(event.clientX, event.clientY, event.target);
    };

    const onUp = () => {
      cursor.classList.remove("is-press");
    };

    const onLeave = (event: PointerEvent) => {
      if (event.relatedTarget) {
        return;
      }

      cursor.classList.remove("is-on", "is-press", "is-loaded");
    };

    document.documentElement.classList.add("shovel-active");
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("shovel-active");
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div className="cement-layer" ref={dropsRef} aria-hidden="true" />
      <div className="shovel-cursor" ref={cursorRef} aria-hidden="true">
        <svg className="shovel-cement" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="shovel-cement-fill" x1="6" y1="13" x2="5" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#e7e2d8" />
              <stop offset="0.45" stopColor="#c3beb4" />
              <stop offset="1" stopColor="#8e8981" />
            </linearGradient>
          </defs>
          <path
            fill="url(#shovel-cement-fill)"
            d="M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z"
          />
          <path
            fill="#f3efe7"
            d="M5.2 16.15c.2-1.55 1.25-2.45 2.45-2.2 1.2.25 1.9 1.45 1.35 2.55-.45.95-1.7 1.35-2.55.85-.7-.4-1.15-.75-1.25-1.2z"
          />
        </svg>
        <Shovel size={22} strokeWidth={1.75} aria-hidden="true" />
      </div>
    </>
  );
}
