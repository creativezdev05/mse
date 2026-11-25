"use client";

import gsap from "gsap";
import {
  ArrowRight,
  BrickWall,
  Columns3,
  PencilRuler,
  House,
  PaintRoller,
  Play,
  Shovel,
} from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ForgedHeroTitle, splitForged } from "@/components/ui/ForgedLine";
import { quoteLink } from "@/lib/site";

const journeyImages = [
  "/images/journey/01-plan.webp",
  "/images/journey/02-foundation.webp",
  "/images/journey/03-structure.webp",
  "/images/journey/04-masonry.webp",
  "/images/journey/06-finishing.webp",
  "/images/journey/08-complete.webp",
] as const;

const milestones = [
  { label: "Plan", icon: PencilRuler },
  { label: "Foundation", icon: Shovel },
  { label: "Structure", icon: Columns3 },
  { label: "Masonry", icon: BrickWall },
  { label: "Finishing", icon: PaintRoller },
  { label: "Complete", icon: House },
] as const;

const beats = [
  {
    image: 0,
    milestone: 0,
    kicker: "01  /  Plan",
    title: "From Plot to Perfect Home.",
    description: "Complete construction, end-to-end in Lahore.",
  },
  {
    image: 1,
    milestone: 1,
    kicker: "02  /  Foundation",
    title: "Groundwork for Strength.",
    description: "Excavation and RCC footings for a lasting structure.",
  },
  {
    image: 2,
    milestone: 2,
    kicker: "03  /  Structure",
    title: "A Solid Framework.",
    description: "RCC columns and beams that stand the test of time.",
  },
  {
    image: 3,
    milestone: 3,
    kicker: "04  /  Masonry",
    title: "Walls that Define Home.",
    description: "Quality brickwork for strength, comfort and durability.",
  },
  {
    image: 4,
    milestone: 4,
    kicker: "05  /  Finishing",
    title: "Details that Bring it to Life.",
    description: "Plastering, fittings and fixtures for a refined finish.",
  },
  {
    image: 5,
    milestone: 5,
    kicker: "06  /  Complete",
    title: "A Home Ready for You.",
    description: "From construction to handover, with complete peace of mind.",
    finale: true,
  },
] as const;

const fade = "power2.inOut";
const rise = "power2.out";
const brickRows = 10;
const brickCols = 6;
const roadView = { width: 1200, height: 160 };
const roadPath =
  "M 0 80 C 200 74 340 86 520 80 C 700 74 860 88 1040 81 C 1120 78 1160 82 1200 80";
const hop = 2.4;
const lap = 0.28;
const bucketUp = { y: 0, rotation: -128 };
const bucketDown = { y: 0, rotation: 12 };
const heroBucketUp = 0;
const heroBucketDown = 16;
const milestoneInset = 0.08;
const craneImageSize = { width: 941, height: 647 };

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
        <clipPath id="build-drum-clip">
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
        <g clipPath="url(#build-drum-clip)">
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

function SiteExcavator() {
  return (
    <svg className="build-crane" viewBox="0 0 132 86" aria-hidden="true">
      <g className="build-crane-track">
        <rect x="8" y="58" width="54" height="16" rx="8" />
        <circle cx="20" cy="66" r="4.2" />
        <circle cx="35" cy="66" r="4.2" />
        <circle cx="50" cy="66" r="4.2" />
      </g>
      <path className="build-crane-body" d="M12 58 V42 H46 L58 52 V58 Z" />
      <path className="build-crane-cab" d="M30 42 V22 H54 L62 34 V52 H46 Z" />
      <path className="build-crane-window" d="M34 26 H50 L55 34 H34 Z" />
      <path className="build-crane-boom" d="M48 34 L66 46" />
      <g className="build-crane-bucket">
        <path className="build-crane-stick" d="M66 46 L74 70" />
        <path className="build-crane-jaw" d="M60 60 H88 L90 72 L78 82 H66 L56 72 Z" />
        <path className="build-crane-teeth" d="M64 82 L65 88 M74 82 L74 89 M84 82 L83 88" />
        <path className="build-crane-load" d="M64 66 H84 L82 76 H66 Z" />
        <path className="build-crane-pour" pathLength={1} d="M86 74 C92 84 84 96 74 104" />
      </g>
      <g className="build-crane-spill">
        <circle className="build-crane-drop" cx="78" cy="86" r="2.4" />
        <circle className="build-crane-drop" cx="70" cy="92" r="1.8" />
        <circle className="build-crane-drop" cx="84" cy="94" r="2" />
      </g>
    </svg>
  );
}

function HeroCraneArtwork() {
  return (
    <div className="build-crane-artwork" aria-hidden="true">
      <Image
        src="/images/yard/crawler-body.png"
        alt=""
        {...craneImageSize}
        sizes="5rem"
        className="build-crane-layer-image build-crane-body-image"
      />
      <div className="build-crane-tracks-layer">
        <Image
          src="/images/yard/crawler_tracks.png"
          alt=""
          {...craneImageSize}
          sizes="5rem"
          className="build-crane-layer-image"
        />
      </div>
      <div className="build-crane-boom-layer">
        <Image
          src="/images/yard/crawler-boom.png"
          alt=""
          {...craneImageSize}
          sizes="5rem"
          className="build-crane-layer-image"
        />
        <div className="build-crane-stick-layer">
          <Image
            src="/images/yard/crawler-stick.png"
            alt=""
            {...craneImageSize}
            sizes="5rem"
            className="build-crane-layer-image"
          />
          <div className="build-crane-bucket-travel-layer">
            <div className="build-crane-bucket-action">
              <Image
                src="/images/yard/crawler-bucket.png"
                alt=""
                {...craneImageSize}
                sizes="5rem"
                className="build-crane-layer-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroTitleWall() {
  return (
    <span className="home-hero-title-fill" aria-hidden="true">
      <span className="wall-bricks">
        {Array.from({ length: brickRows }, (_, row) => {
          const count = brickCols + (row % 2);

          return (
            <span
              className="wall-course"
              data-offset={row % 2 === 1 ? "true" : "false"}
              key={row}
            >
              {Array.from({ length: count }, (_, col) => (
                <span className="wall-brick" data-tone={(row + col) % 5} key={col}>
                  <span className="wall-brick-face" />
                </span>
              ))}
            </span>
          );
        })}
      </span>
      <span className="wall-coat wall-plaster" />
      <span className="wall-sheen wall-sheen-plaster" />
      <span className="wall-coat wall-paint" />
      <span className="wall-sheen wall-sheen-paint" />
    </span>
  );
}

const milestoneEntryBeat = [0, 1, 2, 3, 4, 5] as const;

export function HomeHero() {
  const rootRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const wallTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const cardFlipDirectionRef = useRef(1);
  const goToMilestoneRef = useRef<(milestone: number) => void>(() => {});

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const frames = Array.from(root.querySelectorAll<HTMLElement>(".home-hero-frame"));
    const motions = frames.map(
      (frame) => frame.querySelector<HTMLElement>(".home-hero-frame-motion")!,
    );
    const marks = Array.from(root.querySelectorAll<HTMLElement>(".build-mark"));
    const fills = marks.map((mark) => mark.querySelector<HTMLElement>(".build-mark-fill")!);
    const rail = root.querySelector<HTMLElement>(".build-rail");
    const roadLine = root.querySelector<SVGPathElement>(".build-road-pave");
    const linkFill = root.querySelector<HTMLElement>(".build-link-fill");
    const truck = root.querySelector<HTMLElement>(".build-truck");
    const wheels = Array.from(root.querySelectorAll<SVGGElement>(".build-truck-wheel"));
    const crane = root.querySelector<HTMLElement>(".build-crane-rig");
    const craneBoom = root.querySelector<HTMLElement>(".build-crane-boom-layer");
    const craneStick = root.querySelector<HTMLElement>(".build-crane-stick-layer");
    const craneBucketTravel = root.querySelector<HTMLElement>(".build-crane-bucket-travel-layer");
    const craneBucketAction = root.querySelector<HTMLElement>(".build-crane-bucket-action");
    const bucket = root.querySelector<SVGGElement>(".build-crane-bucket");
    const pour = root.querySelector<SVGPathElement>(".build-crane-pour");
    const load = root.querySelector<SVGPathElement>(".build-crane-load");
    const drops = Array.from(root.querySelectorAll<SVGCircleElement>(".build-crane-drop"));
    const glow = root.querySelector<HTMLElement>(".home-hero-glow");
    const kicker = root.querySelector<HTMLElement>("[data-copy='kicker']");
    const title = root.querySelector<HTMLElement>("[data-copy='title']");
    const description = root.querySelector<HTMLElement>("[data-copy='description']");
    const live = root.querySelector<HTMLElement>("[data-copy='live']");

    if (
      !rail ||
      !roadLine ||
      !linkFill ||
      !truck ||
      !crane ||
      !craneBoom ||
      !craneStick ||
      !craneBucketTravel ||
      !craneBucketAction ||
      !bucket ||
      !pour ||
      !load ||
      !glow ||
      !kicker ||
      !title ||
      !description ||
      !live
    ) {
      root.dataset.heroStage = "missing";
      return;
    }

    root.dataset.heroStage = "setup";

    const progress = { value: 0 };
    const roadLength = roadLine.getTotalLength();
    const roadStops = milestones.map((_, index) => {
      const targetX =
        (milestoneInset + ((index + 0.5) / milestones.length) * (1 - milestoneInset * 2)) *
        roadView.width;
      let low = 0;
      let high = roadLength;

      for (let step = 0; step < 22; step += 1) {
        const mid = (low + high) / 2;

        if (roadLine.getPointAtLength(mid).x < targetX) {
          low = mid;
        } else {
          high = mid;
        }
      }

      return roadLength ? (low + high) / 2 / roadLength : index / (milestones.length - 1);
    });
    progress.value = roadStops[0] ?? 0;

    const placeTruck = (value: number) => {
      const length = roadLine.getTotalLength();
      const clamped = Math.min(1, Math.max(0, value));
      const distance = length * clamped;
      const span = Math.min(28, length / 16);
      const point = roadLine.getPointAtLength(distance);
      const before = roadLine.getPointAtLength(Math.max(0, distance - span));
      const after = roadLine.getPointAtLength(Math.min(length, distance + span));
      const width = rail.clientWidth;
      const height = rail.clientHeight;

      if (!width || !height) {
        return;
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
      const firstStop = roadStops[0] ?? 0;
      const lastStop = roadStops[roadStops.length - 1] ?? 1;
      const travel = Math.min(1, Math.max(0, (clamped - firstStop) / (lastStop - firstStop || 1)));

      gsap.set(truck, {
        x,
        y,
        xPercent: -50,
        yPercent: -92,
        rotation: angle,
        transformOrigin: "50% 92%",
      });
      gsap.set(crane, {
        x,
        xPercent: -80,
        y: 0,
        rotation: 0,
      });
      gsap.set(craneBoom, { rotation: -12 + travel * 36 });
      gsap.set(craneStick, { rotation: -7 + travel * 24 });
      gsap.set(craneBucketTravel, { rotation: -15 * travel });
      gsap.set(wheels, { rotation: length * value * 4 });
    };

    const syncRoad = () => {
      placeTruck(progress.value);
      const start = roadStops[0] ?? 0;
      const end = roadStops[roadStops.length - 1] ?? 1;
      const span = end - start || 1;
      const amount = (progress.value - start) / span;
      gsap.set(linkFill, { scaleX: Math.min(1, Math.max(0, amount)) });
    };

    try {
      gsap.set(wheels[0], { svgOrigin: "44 70" });
      gsap.set(wheels[1], { svgOrigin: "132 70" });
      gsap.set(bucket, { svgOrigin: "66 46", ...bucketUp });
      gsap.set(craneBucketAction, {
        transformOrigin: "91.5% 58%",
        rotation: heroBucketUp,
      });
      gsap.set(truck, { opacity: 1 });
      gsap.set(crane, { opacity: 1 });
      gsap.set(craneBucketAction, { rotation: heroBucketUp });
      gsap.set(pour, { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 });
      gsap.set(fills, { scaleY: 0, transformOrigin: "50% 0%" });
      syncRoad();
      root.dataset.heroStage = "placed";
    } catch (error) {
      root.dataset.heroStage = error instanceof Error ? error.message : "setup-failed";
    }

    const copyBlock = root.querySelector<HTMLElement>(".home-hero-copy");
    const copy = [kicker, title, description];
    const lastImage = journeyImages.length - 1;
    let shownBeat = 0;
    let wallStarted = false;
    let prepareWallForFlip: (() => void) | null = null;
    let pendingMilestoneLines: string[] | null = null;
    let copyTimeline: gsap.core.Timeline | null = null;

    if (!copyBlock) {
      return;
    }

    const setCopyText = (element: HTMLElement, value: string) => {
      const forged = element.querySelector("[data-forge='iron']");

      if (forged) {
        const parts = splitForged(value);

        element.querySelectorAll<HTMLElement>("[data-forge='base']").forEach((node) => {
          node.textContent = parts.base;
        });
        element.querySelectorAll<HTMLElement>("[data-forge='iron']").forEach((node) => {
          node.textContent = parts.iron;
        });
        element.querySelector("[data-copy-text]")?.parentElement?.setAttribute("data-read", value);
        return;
      }

      const texts = element.querySelectorAll<HTMLElement>("[data-copy-text]");

      if (texts.length) {
        texts.forEach((text) => {
          text.textContent = value;
          text.parentElement?.setAttribute("data-read", value);
        });
        return;
      }

      element.textContent = value;
    };

    const startWall = () => {
      wallTimelineRef.current?.restart();
    };

    const flipCard = (lines: string[]) => {
      cardFlipDirectionRef.current *= -1;
      const direction = cardFlipDirectionRef.current;
      const flip = gsap.timeline();

      flip
        .to(
          copyBlock,
          { rotationY: direction * 90, opacity: 0, duration: 0.24, ease: "power2.in" },
        )
        .call(() => {
          copy.forEach((element, line) => setCopyText(element, lines[line]));
          prepareWallForFlip?.();
        })
        .set(copyBlock, { rotationY: -direction * 90 })
        .to(copyBlock, { rotationY: 0, opacity: 1, duration: 0.28, ease: "power2.out" })
        .call(startWall);
      return flip;
    };

    const showMilestone = (lines: string[]) => {
      copyTimeline = flipCard(lines);
    };

    const setMilestone = (active: number) => {
      marks.forEach((mark, index) => {
        mark.dataset.state = index < active ? "complete" : index === active ? "active" : "idle";
        const item = mark.closest("li");

        if (!item) {
          return;
        }

        if (index === active) {
          item.setAttribute("aria-current", "step");
        } else {
          item.removeAttribute("aria-current");
        }
      });
    };

    const writeBeat = (index: number, animate: boolean) => {
      const beat = beats[index];
      const lines = [beat.kicker, beat.title, beat.description];
      live.textContent = `${beat.kicker}. ${beat.title} ${beat.description}`;
      copyTimeline?.kill();

      if (!animate || index === shownBeat) {
        copy.forEach((element, line) => {
          setCopyText(element, lines[line]);
        });
        gsap.set(copy, { opacity: 1, y: 0 });
        gsap.set(copyBlock, { rotationY: 0, opacity: 1 });

        if (!wallStarted) {
          wallStarted = true;
          startWall();
        }

        shownBeat = index;
        return;
      }

      shownBeat = index;
      gsap.set(copy, { opacity: 1, y: 0 });
      gsap.set(copyBlock, { rotationY: 0, opacity: 1 });
      wallStarted = true;
      const wallIsComplete = wallTimelineRef.current?.progress() === 1;

      if (wallIsComplete) {
        showMilestone(lines);
      } else {
        pendingMilestoneLines = lines;
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let travelTween: gsap.core.Timeline | null = null;
    let jumping = false;

    const showBeatImage = (image: number, duration = 0) => {
      frames.forEach((frame, index) => {
        gsap.to(frame, {
          opacity: index === image ? 1 : 0,
          duration,
          ease: fade,
          overwrite: "auto",
        });
      });
      gsap.to(glow, {
        opacity: image === lastImage ? 0.42 : 0,
        duration,
        ease: "sine.out",
        overwrite: "auto",
      });
    };

    if (reduced) {
      const closing = beats.length - 1;
      writeBeat(closing, false);
      frames.forEach((frame, index) => {
        gsap.set(frame, { opacity: index === lastImage ? 1 : 0 });
      });
      gsap.set(motions, { scale: 1, yPercent: 0 });
      progress.value = roadStops[roadStops.length - 1] ?? 1;
      syncRoad();
      gsap.set(fills, { scaleY: 1, transformOrigin: "50% 0%" });
      gsap.set(truck, { opacity: 1 });
      gsap.set(crane, { opacity: 1 });
      gsap.set(glow, { opacity: 0.35 });
      marks.forEach((mark, index) => {
        mark.dataset.state = "complete";
        const item = mark.closest("li");

        if (!item) {
          return;
        }

        if (index === marks.length - 1) {
          item.setAttribute("aria-current", "step");
        } else {
          item.removeAttribute("aria-current");
        }
      });

      const onResize = () => syncRoad();
      window.addEventListener("resize", onResize);
      goToMilestoneRef.current = (milestoneIndex: number) => {
        const beatIndex = milestoneEntryBeat[milestoneIndex] ?? 0;
        const beat = beats[beatIndex];
        writeBeat(beatIndex, false);
        showBeatImage(beat.image);
        progress.value = roadStops[milestoneIndex] ?? 1;
        syncRoad();
        gsap.set(fills, {
          scaleY: (index: number) => (index <= milestoneIndex ? 1 : 0),
          transformOrigin: "50% 0%",
        });
        setMilestone(milestoneIndex);
        gsap.set(bucket, { ...bucketUp });
        gsap.set(craneBucketAction, { rotation: heroBucketUp });
      };

      return () => {
        goToMilestoneRef.current = () => {};
        window.removeEventListener("resize", onResize);
      };
    }

    const context = gsap.context(() => {
      const courses = Array.from(copyBlock.querySelectorAll<HTMLElement>(".wall-course"));
      const drop = Math.max(copyBlock.clientHeight, 240);
      const bricks = courses.flatMap((course, row) => {
        const courseBricks = Array.from(course.querySelectorAll<HTMLElement>(".wall-brick"));

        return courseBricks.map((brick, col) => ({
          el: brick,
          x: 0,
          y: -drop,
          rotation: 0,
          delay: col * 0.11 + row * 0.012,
          restX: 0,
          restY: 0,
          restR: 0,
        }));
      });
      prepareWallForFlip = () => {
        gsap.set(copyBlock, { "--plaster": -0.24, "--paint": -0.32 });
        gsap.set(
          bricks.map((brick) => brick.el),
          {
            x: 0,
            y: -drop,
            rotation: 0,
          },
        );
      };
      const wallTimeline = gsap.timeline({ paused: true });
      wallTimelineRef.current = wallTimeline;
      wallTimeline.set(copyBlock, { "--plaster": -0.24, "--paint": -0.32 }, 0);

      if (bricks.length) {
        wallTimeline.set(
          bricks.map((brick) => brick.el),
          {
            x: (index: number) => bricks[index].x,
            y: (index: number) => bricks[index].y,
            rotation: (index: number) => bricks[index].rotation,
          },
          0,
        );
        bricks.forEach((brick) => {
          wallTimeline.to(
            brick.el,
            {
              x: brick.restX,
              y: brick.restY,
              rotation: brick.restR,
              duration: 0.55,
              ease: "power2.in",
            },
            brick.delay,
          );
        });
      }

      wallTimeline.to(copyBlock, { "--plaster": 1.22, duration: 1.2, ease: fade }, 2.05);
      wallTimeline.to(copyBlock, { "--paint": 1.22, duration: 1.25, ease: fade }, 3.35);
      wallTimeline.eventCallback("onComplete", () => {
        const lines = pendingMilestoneLines;
        pendingMilestoneLines = null;

        if (lines) {
          showMilestone(lines);
        }
      });

      const timeline = gsap.timeline({ repeat: -1 });
      timelineRef.current = timeline;

      timeline.set(frames[0], { opacity: 1 });
      timeline.set(frames.slice(1), { opacity: 0 });
      timeline.set(motions[0], { scale: 1.035, yPercent: 0 });
      timeline.set(glow, { opacity: 0 });
      timeline.set(fills.slice(1), { scaleY: 0, transformOrigin: "50% 0%" }, 0);
      timeline.set(truck, { opacity: 1 }, 0);
      timeline.call(syncRoad, undefined, 0);
      timeline.call(() => setMilestone(0), undefined, 0);

      const driveTo = (milestone: number, at: string) => {
        timeline.set(bucket, { ...bucketUp }, at);
        timeline.set(craneBucketAction, { rotation: heroBucketUp }, at);
        timeline.call(() => {
          truck.dataset.driving = "true";
        }, undefined, at);
        timeline.to(
          progress,
          {
            value: roadStops[milestone] ?? milestone / (milestones.length - 1),
            duration: hop,
            ease: "power1.inOut",
            onUpdate: syncRoad,
          },
          at,
        );
        timeline.call(() => {
          truck.dataset.driving = "false";
        }, undefined, `${at}+=${hop}`);
      };

      const pourPhase = (index: number, at: string) => {
        timeline.call(() => setMilestone(index), undefined, at);
        timeline.to(bucket, { ...bucketDown, duration: 0.5, ease: "power2.in" }, at);
        timeline.to(
          craneBucketAction,
          { rotation: heroBucketDown, duration: 0.5, ease: "power2.in" },
          at,
        );
        timeline.to(
          pour,
          { opacity: 1, strokeDashoffset: 0, duration: 0.34, ease: "power1.out" },
          `${at}+=0.32`,
        );
        timeline.to(load, { opacity: 0, duration: 0.3, ease: "power1.out" }, `${at}+=0.36`);
        drops.forEach((drop, dropIndex) => {
          timeline.fromTo(
            drop,
            { y: -6, opacity: 0 },
            {
              y: 16,
              opacity: 1,
              duration: 0.4,
              ease: "power1.in",
              immediateRender: false,
            },
            `${at}+=${0.36 + dropIndex * 0.05}`,
          );
        });
        timeline.to(
          fills[index],
          { scaleY: 1, duration: 0.85, ease: "power1.inOut" },
          `${at}+=0.38`,
        );
        timeline.to(pour, { opacity: 0, duration: 0.2, ease: "power1.in" }, `${at}+=1.22`);
        timeline.to(drops, { opacity: 0, duration: 0.18 }, `${at}+=1.18`);
        timeline.to(load, { opacity: 1, duration: 0.24, ease: "power1.out" }, `${at}+=1.28`);
        timeline.to(bucket, { ...bucketUp, duration: 0.48, ease: "power2.out" }, `${at}+=1.24`);
        timeline.to(
          craneBucketAction,
          { rotation: heroBucketUp, duration: 0.48, ease: "power2.out" },
          `${at}+=1.24`,
        );
        timeline.set(drops, { y: 0 }, `${at}+=1.75`);
      };

      beats.forEach((beat, index) => {
        const label = `beat-${index}`;
        timeline.addLabel(label, index === 0 ? 0 : ">");
        timeline.call(() => writeBeat(index, index !== 0), undefined, label);

        timeline.to({}, { duration: 5.5 }, label);

        if (index === 0) {
          pourPhase(0, label);
          return;
        }

        const previous = beats[index - 1];
        const incoming = frames[beat.image];
        const outgoing = frames[previous.image];
        const incomingMotion = motions[beat.image];
        const outgoingMotion = motions[previous.image];

        if (beat.image !== previous.image) {
          timeline.to(incoming, { opacity: 1, duration: 1.75, ease: fade }, label);
          timeline.to(outgoing, { opacity: 0, duration: 1.75, ease: fade }, label);
          timeline.fromTo(
            incomingMotion,
            { scale: 1.05, yPercent: 1 },
            { scale: 1.03, yPercent: 0, duration: 1.75, ease: rise },
            label,
          );
          timeline.to(
            outgoingMotion,
            { scale: 1.06, yPercent: -1.1, duration: 1.75, ease: fade },
            label,
          );
        }

        if (beat.milestone !== previous.milestone) {
          driveTo(beat.milestone, label);
          pourPhase(beat.milestone, `${label}+=${hop}`);
        }

        if (beat.image === lastImage && previous.image !== lastImage) {
          timeline.fromTo(
            glow,
            { opacity: 0 },
            { opacity: 0.95, duration: 1.45, ease: "sine.inOut" },
            `${label}+=0.7`,
          );
          timeline.to(glow, { opacity: 0.42, duration: 1.7, ease: "sine.out" }, `${label}+=2.15`);
        }

        if ("finale" in beat && beat.finale) {
          timeline.to(
            incomingMotion,
            { scale: 1.065, yPercent: -0.4, duration: 4.8, ease: "power1.out" },
            label,
          );
          return;
        }

        const driftAt = beat.image === previous.image ? label : `${label}+=1.75`;
        timeline.to(
          incomingMotion,
          { scale: 1.02, yPercent: -0.75, duration: 3.25, ease: "none" },
          driftAt,
        );
      });

      timeline.addLabel("loop");
      timeline.call(() => writeBeat(0, true), undefined, "loop");
      timeline.to(frames[lastImage], { opacity: 0, duration: 1.6, ease: fade }, "loop");
      timeline.to(frames[0], { opacity: 1, duration: 1.6, ease: fade }, "loop");
      timeline.to(motions[0], { scale: 1.035, yPercent: 0, duration: 1.6, ease: fade }, "loop");
      timeline.call(() => {
        truck.dataset.driving = "true";
      }, undefined, "loop");
      timeline.to(fills, { scaleY: 0, duration: 0.7, ease: fade }, "loop");
      timeline.set(bucket, { ...bucketUp }, "loop");
      timeline.set(craneBucketAction, { rotation: heroBucketUp }, "loop");
      timeline.set(pour, { opacity: 0, strokeDashoffset: 1 }, "loop");
      timeline.set(load, { opacity: 1 }, "loop");
      timeline.set(drops, { opacity: 0, y: 0 }, "loop");
      timeline.to(glow, { opacity: 0, duration: 0.7, ease: "sine.out" }, "loop");
      timeline.to(
        progress,
        {
          value: 1 + lap,
          duration: 1.3,
          ease: "power1.in",
          onUpdate: syncRoad,
          onComplete: () => {
            progress.value = -lap;
            syncRoad();
          },
        },
        "loop",
      );
      timeline.to(
        progress,
        {
          value: roadStops[0] ?? 0,
          duration: 1.3,
          ease: "power1.out",
          onUpdate: syncRoad,
        },
        "loop+=1.32",
      );
      timeline.call(() => {
        truck.dataset.driving = "false";
        setMilestone(0);
      }, undefined, "loop+=2.62");

      const poursOnArrival = (beatIndex: number) => {
        const previous = beats[beatIndex - 1];
        return beatIndex === 0 || beats[beatIndex].milestone !== previous?.milestone;
      };

      const settleAt = (beatIndex: number) => {
        const labelTime = timeline.labels[`beat-${beatIndex}`] ?? 0;

        if (beatIndex === 0) {
          return labelTime;
        }

        return labelTime + (poursOnArrival(beatIndex) ? hop : 1.75);
      };

      goToMilestoneRef.current = (milestoneIndex: number) => {
        const beatIndex = milestoneEntryBeat[milestoneIndex];

        if (beatIndex === undefined) {
          return;
        }

        const beat = beats[beatIndex];
        const filledThrough = poursOnArrival(beatIndex) ? milestoneIndex - 1 : milestoneIndex;
        travelTween?.kill();
        jumping = true;
        timeline.pause();
        truck.dataset.driving = "true";
        gsap.set(bucket, { ...bucketUp });
        gsap.set(craneBucketAction, { rotation: heroBucketUp });
        gsap.set(pour, { opacity: 0, strokeDashoffset: 1 });
        gsap.set(load, { opacity: 1 });
        gsap.set(drops, { opacity: 0, y: 0 });
        setMilestone(milestoneIndex);
        writeBeat(beatIndex, true);

        const distance = Math.abs((roadStops[milestoneIndex] ?? 0) - progress.value);
        const duration = gsap.utils.clamp(0.4, 1.15, 0.35 + distance * 2.4);
        const travel = gsap.timeline({
          onComplete: () => {
            jumping = false;
            truck.dataset.driving = "false";
            timeline.seek(settleAt(beatIndex), true);
            syncRoad();
            setMilestone(milestoneIndex);

            if (!document.hidden) {
              timeline.play();
            }
          },
        });
        travelTween = travel;
        travel.to(
          progress,
          {
            value: roadStops[milestoneIndex] ?? 0,
            duration,
            ease: "power2.inOut",
            onUpdate: syncRoad,
          },
          0,
        );
        frames.forEach((frame, index) => {
          travel.to(
            frame,
            {
              opacity: index === beat.image ? 1 : 0,
              duration: Math.min(duration, 0.8),
              ease: fade,
            },
            0,
          );
        });
        travel.to(
          glow,
          {
            opacity: beat.image === lastImage ? 0.42 : 0,
            duration: Math.min(duration, 0.7),
            ease: "sine.out",
          },
          0,
        );
        fills.forEach((fill, index) => {
          travel.to(
            fill,
            {
              scaleY: index <= filledThrough ? 1 : 0,
              duration: Math.min(duration, 0.55),
              ease: "power1.inOut",
            },
            0,
          );
        });
      };
    }, root);

    const onVisibility = () => {
      const hidden = document.hidden;
      root.toggleAttribute("data-paused", hidden);

      if (hidden) {
        timelineRef.current?.pause();
        wallTimelineRef.current?.pause();
        copyTimeline?.pause();
        return;
      }

      if (!jumping) {
        timelineRef.current?.play();
      }

      wallTimelineRef.current?.play();
      copyTimeline?.play();
    };

    const onResize = () => syncRoad();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);

    return () => {
      goToMilestoneRef.current = () => {};
      travelTween?.kill();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      root.removeAttribute("data-paused");
      timelineRef.current = null;
      wallTimelineRef.current = null;
      context.revert();
    };
  }, []);

  return (
    <section className="home-hero" aria-labelledby="home-hero-title" ref={rootRef}>
      <div className="home-hero-media" aria-hidden="true">
        {journeyImages.map((src, index) => (
          <div className="home-hero-frame" data-frame={index} key={src}>
            <div className="home-hero-frame-motion">
              <Image
                src={src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                quality={75}
                className="home-hero-image"
              />
            </div>
          </div>
        ))}
        <div className="home-hero-shade" />
        <div className="home-hero-glow" />
      </div>

      <div className="layout-shell-wide home-hero-content">
        <div className="home-hero-copy">
          <HeroTitleWall />
          <p className="home-hero-kicker" data-copy="kicker">
            <span className="hero-read" data-read={beats[0].kicker}>
              <span className="hero-read-face" data-copy-text>
                {beats[0].kicker}
              </span>
            </span>
          </p>
          <h1 id="home-hero-title" className="home-hero-title" data-copy="title">
            <span className="hero-read" data-read={beats[0].title}>
              <ForgedHeroTitle text={beats[0].title} />
            </span>
          </h1>
          <p className="home-hero-description" data-copy="description">
            <span className="hero-read" data-read={beats[0].description}>
              <span className="hero-read-face" data-copy-text>
                {beats[0].description}
              </span>
            </span>
          </p>
          <div className="home-hero-actions">
            <Button href={quoteLink.href} className="home-hero-quote">
              Get a Quote
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </Button>
            <button
              type="button"
              className="home-hero-watch"
              onClick={() => {
                timelineRef.current?.restart();
                wallTimelineRef.current?.restart();
              }}
            >
              <span className="home-hero-play" aria-hidden="true">
                <Play size={11} fill="currentColor" strokeWidth={1.75} />
              </span>
              <span className="home-hero-watch-label hero-read" data-read="Watch the progress">
                <span className="hero-read-face">Watch the progress</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="build-timeline-wrap">
          <div className="build-crane-rig">
            <div className="build-crane-animation-model" aria-hidden="true">
              <SiteExcavator />
            </div>
            <HeroCraneArtwork />
          </div>
          <div className="build-rail" aria-hidden="true">
            <svg
              className="build-road"
              viewBox={`0 0 ${roadView.width} ${roadView.height}`}
              preserveAspectRatio="none"
            >
              <path className="build-road-bed" d={roadPath} />
              <path className="build-road-pave" d={roadPath} />
              <path className="build-road-dash" d={roadPath} />
            </svg>
            <div className="build-truck" data-driving="false">
              <CementTruck />
            </div>
          </div>
          <div className="build-link" aria-hidden="true">
            <span className="build-link-track" />
            <span className="build-link-fill" />
          </div>
          <ol className="build-timeline">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;

              return (
                <li
                  className="build-milestone"
                  key={milestone.label}
                  aria-current={index === 0 ? "step" : undefined}
                >
                  <button
                    type="button"
                    className="build-milestone-button"
                    aria-label={`Show ${milestone.label}`}
                    onClick={() => goToMilestoneRef.current(index)}
                  >
                    <span className="build-mark-slot">
                      <span className="build-mark" data-state={index === 0 ? "active" : "idle"}>
                        <span className="build-mark-fill" />
                        <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                    </span>
                    <span className="build-label">{milestone.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
      </div>

      <p className="home-hero-live" data-copy="live" aria-live="polite">
        {beats[0].kicker}. {beats[0].title} {beats[0].description}
      </p>
    </section>
  );
}
