"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

type GalleryItem = {
  title: string;
  text: string;
  image: {
    src: string;
    alt: string;
  };
};

interface ConstructionGalleryProps {
  items: readonly GalleryItem[];
}

type Slot = "left" | "center" | "right";

const slotMotion: Record<
  Slot,
  { x: string; rotateY: number; scale: number; zIndex: number; opacity: number }
> = {
  left: {
    x: "-58%",
    rotateY: 28,
    scale: 0.72,
    zIndex: 1,
    opacity: 0.78,
  },
  center: {
    x: "0%",
    rotateY: 0,
    scale: 1.2,
    zIndex: 3,
    opacity: 1,
  },
  right: {
    x: "58%",
    rotateY: -28,
    scale: 0.72,
    zIndex: 1,
    opacity: 0.78,
  },
};

const smooth = {
  type: "spring" as const,
  stiffness: 90,
  damping: 20,
  mass: 0.85,
};

export default function ConstructionGallery({
  items,
}: ConstructionGalleryProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);
  const dragging = useRef(false);
  const moved = useRef(false);

  const count = items.length;

  useEffect(() => {
    if (count < 2 || paused) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActive((currentIndex) => (currentIndex + 1) % count);
      }
    }, 4200);

    return () => window.clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;

  const wrap = (index: number) => ((index % count) + count) % count;
  const leftIndex = wrap(active - 1);
  const rightIndex = wrap(active + 1);
  const current = items[active];

  const slots: { index: number; slot: Slot }[] = [
    { index: leftIndex, slot: "left" },
    { index: active, slot: "center" },
    { index: rightIndex, slot: "right" },
  ];

  const goTo = (index: number) => {
    setActive(wrap(index));
  };

  const step = (direction: 1 | -1) => {
    setActive((currentIndex) => wrap(currentIndex + direction));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    dragging.current = true;
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    if (Math.abs(e.clientX - startX.current) > 8) {
      moved.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    dragging.current = false;
    const delta = e.clientX - startX.current;

    if (delta <= -56) {
      step(1);
      return;
    }

    if (delta >= 56) {
      step(-1);
    }
  };

  return (
    <section className="construction-gallery">
      <div className="construction-gallery-heading">
        <h2>Our Services</h2>
        <p>What we take on, from the drawing to the keys</p>
      </div>

      <div
        className="coverflow-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <button
          type="button"
          className="coverflow-nav coverflow-nav-prev"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            step(-1);
          }}
          aria-label="Previous project"
        >
          ‹
        </button>

        <div className="coverflow-track">
          <AnimatePresence initial={false}>
            {slots.map(({ index, slot }) => {
              const item = items[index];
              const pose = slotMotion[slot];
              const cardKey =
                count < 3 ? `${item.title}-${slot}` : item.title;

              return (
                <motion.button
                  type="button"
                  key={cardKey}
                  className={`coverflow-card is-${slot}`}
                  initial={{
                    opacity: 0,
                    scale: 0.72,
                    x: slot === "left" ? "-72%" : "72%",
                    rotateY: slot === "left" ? 34 : -34,
                  }}
                  animate={pose}
                  exit={{
                    opacity: 0,
                    scale: 0.72,
                    transition: { duration: 0.2 },
                  }}
                  transition={smooth}
                  style={{ transformPerspective: 1200 }}
                  onClick={() => {
                    if (moved.current) return;

                    if (slot === "center") return;

                    goTo(index);
                  }}
                  aria-label={
                    slot === "center"
                      ? `Current project ${item.title}`
                      : `Show ${item.title}`
                  }
                  aria-current={slot === "center" ? "true" : undefined}
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 70vw, 42vw"
                    draggable={false}
                    priority={slot === "center"}
                  />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="coverflow-nav coverflow-nav-next"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            step(1);
          }}
          aria-label="Next project"
        >
          ›
        </button>
      </div>

      <div className="coverflow-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            className="coverflow-copy"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <h3>{current.title}</h3>
            <p>{current.text}</p>
          </motion.div>
        </AnimatePresence>

        <div className="coverflow-meta">
          <span>DRAG OR USE ARROWS</span>
          <span>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
