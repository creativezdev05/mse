

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

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

export default function ConstructionGallery({
  items,
}: ConstructionGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const startX = useRef(0);
  const startRotation = useRef(0);
  const dragging = useRef(false);

  const count = items.length;
  const angle = 360 / Math.max(count, 1);
  const radius = Math.max(170, count * 65);
  const turn = ((-rotation % 360) + 360) % 360;
  const frontIndex = count === 0 ? 0 : Math.round(turn / angle) % count;

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    startX.current = e.clientX;
    startRotation.current = rotation;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragging.current) return;

    const movement = e.clientX - startX.current;
    setRotation(startRotation.current + movement * 0.35);
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  const nextImage = () => {
    if (selected === null) return;
    setSelected((selected + 1) % count);
  };

  const previousImage = () => {
    if (selected === null) return;
    setSelected((selected - 1 + count) % count);
  };

  return (
    <section className="construction-gallery">

      <div className="construction-gallery-heading">
        <span>OUR WORK / PORTFOLIO</span>
        <h2>Selected Projects.</h2>
        <p>
          Explore our residential and commercial developments.
        </p>
      </div>

      <div
        className="barrel-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <motion.div
          className="barrel-track"
          animate={{ rotateY: rotation }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          {items.map((item, index) => (
            <motion.button
              type="button"
              key={item.title}
              className={`barrel-card${index === frontIndex ? "" : " is-side"}`}
              style={{
                transform: `
                  rotateY(${index * angle}deg)
                  translateZ(${radius}px)
                `,
              }}
              onClick={() => {
                if (!dragging.current) {
                  setSelected(index);
                }
              }}
              whileHover={index === frontIndex ? { scale: 1.04 } : undefined}
              aria-label={`View ${item.title}`}
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 768px) 65vw, 35vw"
                draggable={false}
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div className="barrel-caption">
        <span>DRAG TO EXPLORE</span>
        <span>{String(count).padStart(2, "0")} PROJECTS</span>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelected(null)}
              aria-label="Close gallery"
            >
              ×
            </button>

            <button
              className="lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
              aria-label="Previous image"
            >
              ‹
            </button>

            <motion.div
              className="lightbox-content"
              key={selected}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-image">
                <Image
                  src={items[selected].image.src}
                  alt={items[selected].image.alt}
                  fill
                  sizes="90vw"
                  priority
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div className="lightbox-info">
                <h3>{items[selected].title}</h3>
                <p>{items[selected].text}</p>
                <span>
                  {selected + 1} / {count}
                </span>
              </div>
            </motion.div>

            <button
              className="lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
