"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const imageSize = { width: 941, height: 647 };
const trackDuration = 3.2;
const trackLoops = [
  {
    count: 80,
    path: "M 200 518 C 270 518 330 518 360 525 C 393 532 410 550 407 572 C 404 594 383 609 353 615 C 303 622 86 622 37 614 C 12 610 1 594 4 570 C 7 548 17 533 42 525 C 75 517 130 518 200 518 Z",
    belt: "M 200 507 C 268 507 334 508 366 517 C 405 526 421 549 417 573 C 413 602 386 617 355 623 C 302 629 80 629 34 622 C 4 618 -5 596 -1 568 C 3 540 14 522 39 515 C 77 506 133 507 200 507 Z M 200 529 C 265 529 325 529 354 533 C 382 538 395 553 395 572 C 394 589 375 598 350 604 C 300 611 83 611 40 606 C 22 604 17 590 18 570 C 20 551 25 539 46 536 C 80 529 136 529 200 529 Z",
  },
  {
    count: 42,
    path: "M 480 521 C 514 519 541 526 557 539 C 575 553 582 570 575 586 C 567 600 547 606 522 605 L 402 599 C 391 596 384 583 389 564 C 395 545 404 530 421 525 C 438 519 457 520 480 521 Z",
    belt: "M 480 512 C 515 511 544 518 563 533 C 582 548 589 573 580 591 C 571 608 550 615 519 613 L 399 607 C 389 603 379 585 382 562 C 385 538 397 521 418 514 C 438 509 458 511 480 512 Z M 480 529 C 514 529 538 534 553 545 C 570 557 576 574 569 586 C 562 598 544 600 519 598 L 402 593 C 392 591 387 581 395 563 C 400 547 410 534 423 529 C 441 524 459 528 480 529 Z",
  },
];

export function ScrollCrane() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const craneProgress = useMotionValue(0);
  const lastDirection = useRef<"down" | "up" | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined || latest === previous) return;

    const direction = latest > previous ? "down" : "up";
    if (direction === lastDirection.current) return;

    lastDirection.current = direction;
    const destination = direction === "down" ? 1 : 0;
    if (reduceMotion) {
      craneProgress.set(destination);
      return;
    }

    animate(craneProgress, destination, {
      duration: 2.1,
      ease: [0.22, 1, 0.36, 1],
    });
  });

  const boomAngle = useTransform(craneProgress, [0, 1], [-12, 24]);
  const stickAngle = useTransform(craneProgress, [0, 1], [-7, 17]);
  const bucketAngle = useTransform(craneProgress, [0, 1], [0, -15]);
  const motionStyle = (angle: typeof boomAngle) => (reduceMotion ? undefined : { rotate: angle });

  return (
    <div className="scroll-crane-rail" ref={railRef} aria-hidden="true">
      <div className="scroll-crane-pin">
        <div className="scroll-crane-shift">
          <div className="scroll-crane">
            <Image
              src="/images/yard/crawler-body.png"
              alt=""
              {...imageSize}
              sizes="14rem"
              className="scroll-crane-photo scroll-crane-body"
            />

            <div className="scroll-crane-tracks-layer">
              <Image
                src="/images/yard/crawler_tracks.png"
                alt=""
                {...imageSize}
                sizes="14rem"
                className="scroll-crane-photo scroll-crane-part"
              />
              <svg
                className="scroll-crane-tread-motion"
                viewBox="0 0 941 647"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {!reduceMotion && (
                  <g>
                    <defs>
                      <linearGradient id="crawler-tread-metal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#9b8967" />
                        <stop offset="0.45" stopColor="#62543d" />
                        <stop offset="1" stopColor="#302a20" />
                      </linearGradient>
                      <clipPath id="crawler-far-track-visible">
                        <rect x="418" y="490" width="240" height="160" />
                      </clipPath>
                    </defs>
                    {[trackLoops[1], trackLoops[0]].map(({ belt, count, path }, layerIndex) => (
                      <g
                        key={`track-loop-${layerIndex}`}
                        transform={layerIndex === 0 ? "translate(48.5 0) scale(0.88 1)" : undefined}
                        clipPath={layerIndex === 0 ? "url(#crawler-far-track-visible)" : undefined}
                      >
                        <path d={belt} fill="#241f19" fillRule="evenodd" />
                        {Array.from({ length: count }, (_, index) => (
                          <g key={`tread-${layerIndex}-${index}`}>
                            <path
                              d="M -5.3 -5.4 L -4 -6.2 H 4 L 5.3 -5.4 V 5.4 L 4 6.2 H -4 L -5.3 5.4 Z"
                              fill="url(#crawler-tread-metal)"
                              stroke="#211d17"
                              strokeWidth="1.2"
                            />
                            <path
                              d="M 0 -5.5 V 5.5"
                              fill="none"
                              stroke="#b09b72"
                              strokeWidth="1.2"
                              opacity="0.68"
                            />
                            <path
                              d="M -4.3 -3.8 V 3.8 M 4.3 -3.8 V 3.8"
                              fill="none"
                              stroke="#302a20"
                              strokeWidth="0.7"
                            />
                            <animateMotion
                              path={path}
                              dur={`${trackDuration}s`}
                              begin={`${(-trackDuration * index) / count}s`}
                              repeatCount="indefinite"
                              rotate="auto"
                            />
                          </g>
                        ))}
                      </g>
                    ))}
                  </g>
                )}
              </svg>
            </div>

            <motion.div className="scroll-crane-boom-layer" style={motionStyle(boomAngle)}>
              <Image
                src="/images/yard/crawler-boom.png"
                alt=""
                {...imageSize}
                sizes="14rem"
                className="scroll-crane-photo scroll-crane-part"
              />

              <motion.div className="scroll-crane-stick-layer" style={motionStyle(stickAngle)}>
                <Image
                  src="/images/yard/crawler-stick.png"
                  alt=""
                  {...imageSize}
                  sizes="14rem"
                  className="scroll-crane-photo scroll-crane-part"
                />

                <motion.div className="scroll-crane-bucket-layer" style={motionStyle(bucketAngle)}>
                  <Image
                    src="/images/yard/crawler-bucket.png"
                    alt=""
                    {...imageSize}
                    sizes="14rem"
                    className="scroll-crane-photo scroll-crane-part"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
