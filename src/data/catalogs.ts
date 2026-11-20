import { areaLinks, majorServiceLinks, rateLinks, workServiceLinks } from "@/data/menus";

export type CatalogPoint = {
  title: string;
  text: string;
};

export type CatalogFigure = {
  label: string;
  value: string;
};

export type CatalogEntry = {
  slug: string;
  name: string;
  description: string;
  eyebrow: string;
  lede: string;
  image: { src: string; alt: string };
  paragraphs: readonly string[];
  points: readonly CatalogPoint[];
  figures: readonly CatalogFigure[];
};

type CatalogCopy = Omit<CatalogEntry, "slug" | "name">;

function catalog<const T extends readonly { slug: string; title: string }[]>(
  links: T,
  copy: Record<T[number]["slug"], CatalogCopy>,
): CatalogEntry[] {
  return links.map((link) => {
    const slug = link.slug as T[number]["slug"];

    return {
      slug,
      name: link.title,
      ...copy[slug],
    };
  });
}

export function bySlug(entries: readonly CatalogEntry[], slug: string) {
  return entries.find((entry) => entry.slug === slug);
}

const areaCopy = {
  gulberg: {
    description: "House building and renovation on the canal side of Lahore.",
    eyebrow: "Lahore",
    lede: "Older plots, mature trees, and streets that were not planned for a building site.",
    image: {
      src: "/images/area-card-2.webp",
      alt: "A tree-lined street of modern houses, with a stone front and a black gate",
    },
    paragraphs: [
      "Gulberg houses sit close to their neighbours. Access for a mixer, a place to stack brick, and a front that still belongs on the street are decided before the dig.",
      "Many of the jobs here are new houses on old plots, or a front and a floor opened up in a house that is already lived in.",
    ],
    points: [
      { title: "Access", text: "The lane decides when materials can arrive, and where the waste leaves." },
      { title: "The front", text: "Setbacks and the street trees shape the elevation more than a catalogue does." },
    ],
    figures: [
      { label: "Usual plots", value: "10 marla to 2 kanal" },
      { label: "Studio", value: "Gulberg III" },
    ],
  },
  dha: {
    description: "Houses in DHA Lahore, from the drawing through society approval.",
    eyebrow: "Lahore",
    lede: "A DHA house has to pass the society before it can pass as a house.",
    image: {
      src: "/images/area-card-1.webp",
      alt: "Modern houses with glass balconies and black gates along a planted street",
    },
    paragraphs: [
      "Plans, the front, and the structure are drawn to the phase rules. Submission and the completion paper sit in the same job as the build.",
      "Phases differ. A corner in Phase 6 is not a renovated house in an earlier phase, and the schedule says which one it is.",
    ],
    points: [
      { title: "Approval", text: "Drawings go in under the names that the society will accept." },
      { title: "The frame", text: "Basements and long spans are priced from the drawing, not from the plot size." },
    ],
    figures: [
      { label: "Usual plots", value: "10 marla and 1 kanal" },
      { label: "Paper", value: "Society submission included" },
    ],
  },
  "johar-town": {
    description: "Residential construction in Johar Town, close to the MSE desk.",
    eyebrow: "Lahore",
    lede: "The Johar Town desk is in the civic centre, a short drive from the plots we are already on.",
    image: {
      src: "/images/area-card-3.webp",
      alt: "A row of terraced houses with timber screens and black gates under a grey sky",
    },
    paragraphs: [
      "Blocks differ in width and in how the services arrive. We measure the plot before the plan is promised.",
      "Five and ten marla houses are the usual work, with a named lead who can be on the site the same day.",
    ],
    points: [
      { title: "The desk", text: "Walk in with the plot papers. The first reading is part of the visit." },
      { title: "Neighbours", text: "Shared walls and finished houses next door change how the footing is dug." },
    ],
    figures: [
      { label: "Usual plots", value: "5 and 10 marla" },
      { label: "Desk", value: "Civic Centre" },
    ],
  },
  "bahria-town": {
    description: "House construction in Bahria Town, including owners who live away.",
    eyebrow: "Lahore",
    lede: "Society rules, longer drives, and clients who often see the house in photographs first.",
    image: {
      src: "/images/area-card-4.webp",
      alt: "A residential street at dusk, porch lights on and trees along the pavement",
    },
    paragraphs: [
      "The schedule is written before work starts, and each stage is photographed before the next payment.",
      "Owners abroad get the same Friday note as a client who can drive over.",
    ],
    points: [
      { title: "Bylaws", text: "Height, the front, and the boundary are checked against the society before the dig." },
      { title: "Distance", text: "The lead is assigned so the plot is not a once-a-week visit." },
    ],
    figures: [
      { label: "Usual plots", value: "10 marla and 1 kanal" },
      { label: "Updates", value: "Dated photos each stage" },
    ],
  },
  "lake-city": {
    description: "New houses on Lake City plots, from the boundary wall onward.",
    eyebrow: "Lahore",
    lede: "Open ground, new roads, and a schedule that starts with the soil rather than a neighbour’s wall.",
    image: {
      src: "/images/areas-banner.webp",
      alt: "An aerial view of a wide residential boulevard lined with modern houses and palms",
    },
    paragraphs: [
      "Levels, the approach for trucks, and the society’s building line are recorded on the first visit.",
      "Grey structure is the common first contract. Finishes are priced only after they are specified.",
    ],
    points: [
      { title: "The ground", text: "Fill and the water table are looked at before a basement is drawn." },
      { title: "The rate", text: "The published band is a placeholder. The schedule is the price." },
    ],
    figures: [
      { label: "Usual start", value: "Grey structure" },
      { label: "Plots", value: "10 marla upward" },
    ],
  },
  "model-town": {
    description: "New houses and renovations in Model Town.",
    eyebrow: "Lahore",
    lede: "Settled streets, finished neighbours, and houses that are often altered rather than begun.",
    image: {
      src: "/images/area-card-1.webp",
      alt: "Finished two-storey houses set back from a quiet street, with gardens at the gates",
    },
    paragraphs: [
      "A renovation starts with what is already standing. We open the house, then we price it.",
      "A new house on an old plot still has to live with the trees and the lane.",
    ],
    points: [
      { title: "Renovation", text: "Kitchens, baths, and fronts are itemised after the visit." },
      { title: "The lane", text: "The site is kept small enough that the street still works." },
    ],
    figures: [
      { label: "Common work", value: "Alteration and new build" },
      { label: "Nearby", value: "Garden Town, Faisal Town" },
    ],
  },
  "bahria-orchard": {
    description: "Houses in Bahria Orchard, built to the society line and a written schedule.",
    eyebrow: "Lahore",
    lede: "A newer Bahria sector, with the same paperwork as the rest of the town.",
    image: {
      src: "/images/area-card-4.webp",
      alt: "Evening light on a new street of houses, with lamps lit along the road",
    },
    paragraphs: [
      "Plot sizes are regular. The variables are the soil, the basement, and how much of the finish is in the first contract.",
      "We do not publish a turnkey number for Orchard. The finishes are listed, then priced.",
    ],
    points: [
      { title: "One standard", text: "The steel, the cement, and the brick are the brands in the schedule." },
      { title: "Stages", text: "Payment follows the photograph of that stage." },
    ],
    figures: [
      { label: "Contract", value: "Grey structure or complete" },
      { label: "Society", value: "Bahria rules" },
    ],
  },
  "paragon-city": {
    description: "House construction in Paragon City and the newer schemes nearby.",
    eyebrow: "Lahore",
    lede: "Wide roads, new plots, and a first visit that is mostly about levels and access.",
    image: {
      src: "/images/area-card-3.webp",
      alt: "A long street of new houses with boundary walls, gates, and young trees",
    },
    paragraphs: [
      "The boundary, the service connections, and the building line are confirmed before the footing is drawn.",
      "These schemes suit a grey-structure contract first, with finishes added when the owner has chosen them.",
    ],
    points: [
      { title: "First visit", text: "Soil, access, and the society sheet, written down." },
      { title: "Later finishes", text: "Named only when there is a specification to price." },
    ],
    figures: [
      { label: "Start", value: "Boundary and frame" },
      { label: "Nearby", value: "Al Kabir, Valencia" },
    ],
  },
} satisfies Record<(typeof areaLinks)[number]["slug"], CatalogCopy>;

const majorCopy = {
  residential: {
    description: "Family houses in Lahore, from the plot survey to the keys.",
    eyebrow: "Services",
    lede: "A house on a plot the owner already holds. Plans, the frame, and, when you want it, the finishes.",
    image: {
      src: "/images/home-about.webp",
      alt: "A two-storey house under construction, with scaffolding and brick stacked in the yard",
    },
    paragraphs: [
      "Residential work is the centre of the studio. The plot is measured, the plan is drawn to the society, and the schedule names every material before the dig.",
      "You can stop at the grey structure or continue through floors, joinery, and paint under the same contract.",
    ],
    points: [
      { title: "The plan", text: "Rooms, the stair, and the front are settled before the steel is cut." },
      { title: "The build", text: "One site lead from the footing to the day the gate closes." },
      { title: "The paper", text: "Stage payments, a five-year finish warranty, and fifteen years on the frame." },
    ],
    figures: [
      { label: "Plots", value: "5 marla to 2 kanal" },
      { label: "Contracts", value: "Grey structure or complete" },
    ],
  },
  commercial: {
    description: "Shops, offices, and small commercial floors in Lahore.",
    eyebrow: "Services",
    lede: "A frame sized for the use, and a front that has to work on the street.",
    image: {
      src: "/images/service-commercial.webp",
      alt: "A finished commercial building with a glass front and timber screens",
    },
    paragraphs: [
      "Commercial jobs are plazas, clinics, and office floors. The span, the stair, and the services are drawn before a lump sum is offered.",
      "The price comes from that drawing. A rate card cannot see the frontage or the height.",
    ],
    points: [
      { title: "The use", text: "Shops, offices, and mixed floors are planned for the load they will carry." },
      { title: "The street", text: "The ground floor is drawn for access, signage, and the building line." },
      { title: "The contract", text: "Quantities from the drawings, with a named lead on the site." },
    ],
    figures: [
      { label: "Work", value: "Plazas, offices, clinics" },
      { label: "Price", value: "From the drawing" },
    ],
  },
  renovation: {
    description: "Alterations to houses already standing in Lahore.",
    eyebrow: "Services",
    lede: "We look at the house before we price it. Kitchens, baths, a floor, or the front.",
    image: {
      src: "/images/service-renovation.webp",
      alt: "A room mid-renovation, with exposed brick, fresh plaster, and a ladder",
    },
    paragraphs: [
      "A renovation is not a new house with the roof left on. The visit finds what the walls are doing, and the schedule is written from that.",
      "There is no price on the phone. The list comes after the site is opened.",
    ],
    points: [
      { title: "The visit", text: "Structure, damp, and services are noted before any number is offered." },
      { title: "The scope", text: "Kitchen, baths, a storey, or only the street front." },
      { title: "The neighbours", text: "The work is planned so the lane still functions." },
    ],
    figures: [
      { label: "Price", value: "After the visit" },
      { label: "Typical", value: "Kitchen, bath, front" },
    ],
  },
} satisfies Record<(typeof majorServiceLinks)[number]["slug"], CatalogCopy>;

const workCopy = {
  "grey-structure": {
    description: "Grey structure in Lahore, from the footing to plaster.",
    eyebrow: "The work",
    lede: "Foundation, frame, walls, conduits, and plaster. The finishes stay out of this contract.",
    image: {
      src: "/images/service-grey-structure.webp",
      alt: "Concrete columns and steel cages on a new grey-structure slab",
    },
    paragraphs: [
      "Grey structure ends when the walls and ceilings are plastered. Floors, joinery, and fittings are a later list, priced on their own.",
      "The placeholder band is Rs 2,900–3,200 per sq ft. The number that binds the job is the one in your schedule.",
    ],
    points: [
      { title: "In the contract", text: "Footings, damp course, frame, brick, conduits, and plaster." },
      { title: "Named", text: "Steel grade, cement brand, and brick quality are written before the pour." },
    ],
    figures: [
      { label: "Placeholder band", value: "Rs 2,900–3,200 / sq ft" },
      { label: "Ends at", value: "Plaster" },
    ],
  },
  turnkey: {
    description: "A complete house in Lahore under one contract.",
    eyebrow: "The work",
    lede: "Grey structure and the finishes, handed over ready to lock.",
    image: {
      src: "/images/home-cta.webp",
      alt: "A finished two-storey house at sunset, handed over ready to live in",
    },
    paragraphs: [
      "Turnkey means the same team stays from the dig through the kitchen and the paint. It does not mean a single guessed number.",
      "Finishes are named, brand by brand, before they are ordered. The warranty on that work is five years, in the contract.",
    ],
    points: [
      { title: "One team", text: "Design, frame, and finish are not handed to a stranger at plaster." },
      { title: "Specified", text: "Floors, wood, paint, and fittings are lines in the schedule." },
    ],
    figures: [
      { label: "Price", value: "Item by item" },
      { label: "Warranty", value: "5 years on finishes" },
    ],
  },
  "architectural-design": {
    description: "House plans and elevations for Lahore plots.",
    eyebrow: "The work",
    lede: "A plan and a front that can be approved, then built without a second guess.",
    image: {
      src: "/images/service-architecture.webp",
      alt: "Architectural drawings and a scale model of a house on a studio desk",
    },
    paragraphs: [
      "The drawing starts from the plot: width, the face to the street, and the rules of that society.",
      "You can take the drawings alone, or continue into the build with the same studio.",
    ],
    points: [
      { title: "The set", text: "Plans, a section, and the elevation the society asks to see." },
      { title: "Then", text: "The structure is drawn once the rooms have settled." },
    ],
    figures: [
      { label: "Delivered", value: "Plans and the front" },
      { label: "Next", value: "Approval or the build" },
    ],
  },
  "structural-drawings": {
    description: "Structural drawings for houses and small commercial floors.",
    eyebrow: "The work",
    lede: "The frame, sized and drawn, after the plans have stopped moving.",
    image: {
      src: "/images/service-grey-structure.webp",
      alt: "A structural frame of concrete columns with reinforcement still exposed",
    },
    paragraphs: [
      "Columns, beams, and slabs are drawn to the house you actually approved, not to a typical span.",
      "The set is what the authority and the site both build from. The steel in the schedule matches the steel on the drawing.",
    ],
    points: [
      { title: "After the plan", text: "Structure waits until the rooms are agreed." },
      { title: "On site", text: "The drawing is the one the lead checks at the pour." },
    ],
    figures: [
      { label: "Covers", value: "Frame and foundation" },
      { label: "Used for", value: "Approval and the build" },
    ],
  },
  "interior-design": {
    description: "Interiors for houses and small commercial rooms in Lahore.",
    eyebrow: "The work",
    lede: "Kitchens, baths, joinery, and ceilings, drawn before they are ordered.",
    image: {
      src: "/images/service-interior.webp",
      alt: "A finished living room with a sofa, wood floor, and a window onto trees",
    },
    paragraphs: [
      "The interior is designed with the plan, so the elevation is not a costume over rooms that do not fit.",
      "Each finish is a line. Nothing is chosen on the day the carpenter arrives.",
    ],
    points: [
      { title: "Drawn first", text: "Layouts, materials, and the lighting are agreed on paper." },
      { title: "Then built", text: "The same studio can install what it drew." },
    ],
    figures: [
      { label: "Rooms", value: "Kitchen, bath, joinery" },
      { label: "Order", value: "Draw, then price" },
    ],
  },
} satisfies Record<(typeof workServiceLinks)[number]["slug"], CatalogCopy>;

const rateCopy = {
  "grey-structure": {
    description: "Placeholder grey-structure rate for houses in Lahore.",
    eyebrow: "Cost & rates",
    lede: "A published band for the frame and plaster. Your schedule replaces it.",
    image: {
      src: "/images/cost-materials.webp",
      alt: "Cement bags, bricks, aggregate, and steel bars stacked on a site",
    },
    paragraphs: [
      "The band is Rs 2,900–3,200 per square foot of covered area. Soil, a basement, and the span move the real figure.",
      "Every quantity is taken from your drawings. Brands are named before anyone digs.",
    ],
    points: [
      { title: "Included", text: "Footing, damp course, frame, walls, conduits, and plaster." },
      { title: "Not included", text: "Floors, joinery, kitchen, baths, and paint." },
    ],
    figures: [
      { label: "Band", value: "Rs 2,900–3,200 / sq ft" },
      { label: "Binds when", value: "The schedule is signed" },
    ],
  },
  "five-marla": {
    description: "Placeholder cost band for a 5 marla house in Lahore.",
    eyebrow: "Cost & rates",
    lede: "A compact house. The grey structure is estimated, and the finishes wait for a specification.",
    image: {
      src: "/images/area-card-3.webp",
      alt: "A compact row of modern houses along a residential street",
    },
    paragraphs: [
      "The placeholder for grey structure on a 5 marla house is Rs 85–105 lakh, depending on covered area and the ground.",
      "We take 5 marla plots where the street can hold the site. The finish cost is not guessed in advance.",
    ],
    points: [
      { title: "Grey structure", text: "Rs 85–105 lakh as a placeholder range." },
      { title: "Finishes", text: "Itemised after the specification is chosen." },
    ],
    figures: [
      { label: "Grey structure", value: "Rs 85–105 lakh" },
      { label: "Where", value: "Settled streets" },
    ],
  },
  "ten-marla": {
    description: "Placeholder cost band for a 10 marla house in Lahore.",
    eyebrow: "Cost & rates",
    lede: "The usual family house. Covered area, not the plot stamp, sets the grey structure.",
    image: {
      src: "/images/area-card-1.webp",
      alt: "Two-storey houses with balconies on a finished residential street",
    },
    paragraphs: [
      "A 10 marla grey structure sits in a placeholder band of Rs 160–195 lakh. A basement or a long front moves it.",
      "Turnkey is priced only when floors, wood, and the kitchen are named.",
    ],
    points: [
      { title: "Grey structure", text: "Rs 160–195 lakh as a placeholder range." },
      { title: "What changes it", text: "Covered area, soil, and whether there is a basement." },
    ],
    figures: [
      { label: "Grey structure", value: "Rs 160–195 lakh" },
      { label: "Finishes", value: "From the schedule" },
    ],
  },
  "one-kanal": {
    description: "Placeholder cost band for a 1 kanal house in Lahore.",
    eyebrow: "Cost & rates",
    lede: "A large house. The frame is priced from the drawing, especially where the spans are long.",
    image: {
      src: "/images/about-mission.webp",
      alt: "A large two-storey house with a timber screen, glass balcony, and a planted front",
    },
    paragraphs: [
      "The placeholder grey structure for a 1 kanal house is Rs 280–340 lakh. Basements and double-height rooms sit at the top of that band or outside it.",
      "We do not fold the finishes into that number.",
    ],
    points: [
      { title: "Grey structure", text: "Rs 280–340 lakh as a placeholder range." },
      { title: "Check", text: "Ask to see a kanal house at the same stage before you compare a rate." },
    ],
    figures: [
      { label: "Grey structure", value: "Rs 280–340 lakh" },
      { label: "Varies with", value: "Basement and span" },
    ],
  },
  turnkey: {
    description: "How a complete house is priced, without a single invented total.",
    eyebrow: "Cost & rates",
    lede: "Turnkey is a list. The total is the sum of lines you have already seen.",
    image: {
      src: "/images/home-cta.webp",
      alt: "A finished two-storey house at sunset, ready to hand over",
    },
    paragraphs: [
      "There is no honest per-foot rate for a finished house until the finishes exist as a specification.",
      "Grey structure can use the published band. Everything after plaster is an item: tile, wood, paint, kitchen, and baths.",
    ],
    points: [
      { title: "First", text: "The frame is priced from the drawings." },
      { title: "Then", text: "Each finish is named and rated before it is ordered." },
    ],
    figures: [
      { label: "Frame", value: "Published band" },
      { label: "Finish", value: "Line by line" },
    ],
  },
  renovation: {
    description: "Renovation pricing after a site visit, not from a rate card.",
    eyebrow: "Cost & rates",
    lede: "No figure before we have seen the house.",
    image: {
      src: "/images/service-renovation.webp",
      alt: "A room mid-renovation, with exposed brick on one wall and fresh plaster on the next",
    },
    paragraphs: [
      "A kitchen, a bath, a floor, or a front each starts with the visit. The list is written from what is there.",
      "A published range would only hide the condition of the house.",
    ],
    points: [
      { title: "Visit", text: "Structure, damp, and services are noted first." },
      { title: "Then the list", text: "You see each item before work starts." },
    ],
    figures: [
      { label: "Price", value: "After the visit" },
      { label: "Scope", value: "Only what is listed" },
    ],
  },
} satisfies Record<(typeof rateLinks)[number]["slug"], CatalogCopy>;

export const areas = catalog(areaLinks, areaCopy);
export const majorServices = catalog(majorServiceLinks, majorCopy);
export const workServices = catalog(workServiceLinks, workCopy);
export const rateTopics = catalog(rateLinks, rateCopy);

export function majorService(slug: (typeof majorServiceLinks)[number]["slug"]) {
  const entry = bySlug(majorServices, slug);

  if (!entry) {
    throw new Error(`Missing service: ${slug}`);
  }

  return entry;
}
