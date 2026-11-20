import type { RouteHref } from "@/lib/site";

export type PageMeta = {
  title: string;
  description: string;
};

export type ServiceOption = {
  value: string;
  label: string;
};

export const serviceOptions = [
  { value: "grey-structure", label: "Grey structure" },
  { value: "complete-home", label: "Complete home" },
  { value: "commercial", label: "Commercial building" },
  { value: "renovation", label: "Renovation" },
  { value: "drawings", label: "Drawings and approvals" },
] as const satisfies readonly ServiceOption[];

export const contactDetails = {
  phone: "+92 42 000 0000",
  phoneHref: "tel:+92420000000",
  email: "studio@mse.example",
  emailHref: "mailto:studio@mse.example",
  hours: "Monday to Saturday, 9am to 6pm",
  closed: "Sunday closed",
  map: {
    src: "/images/contact-banner.webp",
    alt: "A studio desk with floor plans, a house model, a laptop, and a phone",
  },
  offices: [
    {
      name: "Gulberg studio",
      address: "18-B, Block F, Gulberg III, Lahore",
      coverage: "Canal belt, Model Town, Garden Town, and the inner city",
      hours: "Monday to Saturday, 9am to 6pm",
    },
    {
      name: "Johar Town desk",
      address: "42, Civic Centre, Johar Town, Lahore",
      coverage: "Township, Wapda Town, and the Raiwind road schemes",
      hours: "Monday to Saturday, 9am to 6pm",
    },
  ],
} as const;

export const rates = {
  note: "Placeholder figures for layout only. The figure in your written schedule replaces these.",
  cards: [
    {
      kicker: "Grey structure",
      title: "Footing to roof slab",
      price: "Rs 2,900–3,200",
      unit: "per sq ft",
      points: [
        "Foundation, damp-proof course, and the concrete frame",
        "Brick walls, lintels, and plaster",
        "Conduits set before the walls close",
        "Quantities taken from your drawings",
      ],
    },
    {
      kicker: "Complete home",
      title: "Ready to move in",
      price: "From your schedule",
      unit: "item by item",
      points: [
        "Floors, woodwork, paint, kitchen, and baths",
        "Each finish named before work starts",
        "The same contract as the grey structure",
        "A written finishing warranty",
      ],
    },
    {
      kicker: "Renovation",
      title: "After we see the house",
      price: "Quoted on site",
      unit: "no blind price",
      points: [
        "Kitchen, baths, a full floor, or the front",
        "The visit comes before the numbers",
        "An itemised list from what we find",
        "No price before the site is opened",
      ],
    },
    {
      kicker: "Commercial",
      title: "Plazas, offices, clinics",
      price: "From a schedule",
      unit: "drawn, then priced",
      points: [
        "Shops, offices, and mixed-use floors",
        "Priced from the drawings, not a slogan",
        "Gulberg, DHA, and the main roads",
        "A named site lead on the job",
      ],
    },
  ],
  rows: [
    {
      plot: "5 marla",
      grey: "Rs 85–105 lakh",
      finish: "Set in the schedule",
      note: "Selective, on settled streets",
    },
    {
      plot: "10 marla",
      grey: "Rs 160–195 lakh",
      finish: "Set in the schedule",
      note: "The usual family house",
    },
    {
      plot: "1 kanal",
      grey: "Rs 280–340 lakh",
      finish: "Set in the schedule",
      note: "Depends on basement and span",
    },
    {
      plot: "Commercial floor",
      grey: "By covered area",
      finish: "Set in the schedule",
      note: "Frontage and height change the frame",
    },
  ],
  comparison: {
    caption: "What to compare before you sign a house contract",
    columns: ["Check", "Ask to see", "Why it matters"],
    rows: [
      ["Written schedule", "Quantities, brands, and rates", "Stops quiet swaps and surprise bills"],
      ["A live site", "A house under way this month", "The work, not a rendering"],
      ["A named lead", "The engineer on your plot", "Someone is there on ordinary days"],
      ["Warranty on paper", "Structure and finish, in the contract", "A promise you can point to later"],
      ["Stage payments", "Pay after photos of that stage", "You do not fund work that is not there"],
    ],
  },
  specimen: [
    "Reinforcement: Grade-60, named before the pour",
    "Cement: one brand, written in the schedule",
    "Bricks: first quality, counted from the drawings",
    "Concrete: the mix ratio for footings and slabs",
    "Termite treatment: included, not added later",
    "Damp-proofing: specified, not left to the mason",
  ],
} as const;

type Cta = { href: RouteHref; label: string };

export const home = {
  meta: {
    title: "MSE",
    description:
      "MSE builds houses and commercial floors in Lahore, from the footing to a finished home, on a written schedule.",
  } satisfies PageMeta,
  intro: {
    lead: "MSE builds in Lahore from the open plot to the day the gate closes. Grey structure and complete homes, on 5 marla plots through to kanal houses, with the quantities written down before the first footing.",
    stats: [
      { value: "Lahore", label: "Studios in Gulberg and Johar Town" },
      { value: "Two contracts", label: "Grey structure, or the whole house" },
      { value: "Written", label: "Brands and quantities before work" },
      { value: "On the plot", label: "A site lead from dig to keys" },
    ],
  },
  excellence: {
    eyebrow: "The practice",
    title: "A house, built in an order you can follow",
    body: [
      "We plan, draw, and build houses and small commercial floors across Lahore. The work is ordinary in the best sense: levels taken, steel checked, walls set out, and a finish that matches the drawing you signed.",
      "Owners stay in the decisions that matter. Materials are named. Payments follow the stage on the ground, not a date on a calendar.",
    ],
    points: [
      { title: "On the agreed week", text: "The schedule is part of the contract, and a late stage is talked about before it slips." },
      { title: "A known standard", text: "Cement, steel, and brick are the brands in the schedule, not whatever arrived cheapest." },
      { title: "Your plan, kept", text: "Rooms, the front, and the way you live in the house are settled before the frame goes up." },
      { title: "A quieter site", text: "Waste is sorted, water is watched, and the street is left as we found it at the end of the day." },
    ],
    cta: { href: "/about", label: "About MSE" } satisfies Cta,
  },
  services: {
    eyebrow: "Services",
    title: "What we take on, from the drawing to the keys",
    items: [
      {
        title: "Architectural drawings",
        text: "Plans and a front elevation fitted to the plot and the society rules.",
        image: { src: "/images/service-architecture.webp", alt: "Rolled drawings and a floor plan on a desk, with a white house model beside them" },
      },
      {
        title: "Structure and services",
        text: "The frame, and the routes for water and power, drawn before the walls close.",
        image: { src: "/images/service-grey-structure.webp", alt: "Concrete columns with steel cages rising from a new ground-floor slab" },
      },
      {
        title: "Interiors",
        text: "Kitchens, baths, ceilings, and joinery, drawn before they are built.",
        image: { src: "/images/service-interior.webp", alt: "A finished living room with a sofa, wood floor, and daylight from a large window" },
      },
      {
        title: "Complete homes",
        text: "A house handed over ready to live in, under one contract.",
        image: { src: "/images/home-cta.webp", alt: "A finished two-storey house at sunset, with the rooms lit and the garden in front" },
      },
      {
        title: "Residential building",
        text: "Family houses on urban plots, from the boundary to the gate.",
        image: { src: "/images/services-banner.webp", alt: "Masons in hard hats laying a red brick wall, with a concrete frame behind them" },
      },
      {
        title: "Commercial floors",
        text: "Shops, offices, and mixed-use buildings sized for the street.",
        image: { src: "/images/service-commercial.webp", alt: "A finished commercial block with a glass shopfront and a timber screen" },
      },
    ],
  },
  trust: {
    eyebrow: "Why owners stay",
    title: "The promises that are written into the job",
    body: "The work is judged after handover, not on the day the contract is signed. These four lines are in the paperwork.",
    items: [
      { title: "Finishing warranty", text: "Five years on workmanship and the finishes we installed." },
      { title: "Structural guarantee", text: "Fifteen years on the columns, beams, slabs, and foundation." },
      { title: "After the keys", text: "A number you can still call when a door drops or a tap weeps." },
      { title: "Paid by stage", text: "Money moves when that part of the house is standing, with photos." },
    ],
  },
  experts: {
    image: {
      src: "/images/home-why-us.webp",
      alt: "A site engineer in a hard hat checking a floor plan on a tablet in front of a house frame",
    },
    badge: "A named lead on every plot",
    eyebrow: "The site team",
    title: "People who are on the job, not only on the letterhead",
    body: "Drawings, structure, and the build sit with one team. The person who walks the plot is the person who answers when you call.",
    points: [
      { title: "Built to stay", text: "Mixes, cover, and curing are treated as the work, not as extras." },
      { title: "Told in plain words", text: "You hear what changed, what it costs, and what it does to the week." },
    ],
  },
  precision: {
    eyebrow: "The work itself",
    title: "From the grey structure to a house you can lock",
    body: "Construction is the centre of the practice. Design, structure, and finishes are sequenced so the expensive mistakes happen on paper, not in the wall.",
    expertise: [
      { title: "Houses", text: "Family homes and small terraces, planned for the way the plot faces the street." },
      { title: "Commercial", text: "Offices, clinics, and shop floors with a frame that can take the use." },
      { title: "Yards and sheds", text: "Simple industrial shells where span and drainage matter more than a front." },
      { title: "The ground around", text: "Boundary walls, levels, and the services that have to meet the street." },
    ],
    cta: { href: "/projects", label: "All projects" } satisfies Cta,
    images: [
      { src: "/images/home-about.webp", alt: "A two-storey concrete house shell with scaffolding, brick stacks, and sand in the yard" },
      { src: "/images/service-grey-structure.webp", alt: "Steel cages standing on concrete columns across an open ground floor" },
      { src: "/images/home-process.webp", alt: "A multi-storey concrete frame at sunset, with tower cranes and a mixer truck on the site" },
    ],
    note: { title: "One contract", text: "From the first line on the drawing to the last coat, under the same name." },
  },
  projects: {
    eyebrow: "Recent plots",
    title: "Houses we are in the middle of",
    body: "A short set of jobs across Lahore. Each card is a real stage of work, not a finished rendering.",
    items: [
      { place: "Gulberg III", title: "10 marla, frame up", image: { src: "/images/home-about.webp", alt: "A two-storey house frame with scaffolding and materials stacked in the yard" } },
      { place: "DHA Phase 6", title: "1 kanal, brickwork", image: { src: "/images/services-banner.webp", alt: "A crew laying brick on a low wall, with column steel and a frame behind" } },
      { place: "Johar Town", title: "5 marla, plaster", image: { src: "/images/service-renovation.webp", alt: "A room with one wall still in brick and the next wall freshly plastered" } },
      { place: "Bahria Town", title: "Basement wall", image: { src: "/images/home-process.webp", alt: "A concrete building frame under cranes, with blocks and steel in the foreground" } },
      { place: "Model Town", title: "Front rebuilt", image: { src: "/images/home-cta.webp", alt: "A completed house front at sunset, with glass, stone, and a lit porch" } },
    ],
  },
  logs: {
    title: "Notes from the sites",
    body: "Dated photographs from houses under way. Each card shows only the stage in that picture.",
    items: [
      { place: "Lake City", date: "12 Mar", text: "Boundary walls and a cleared plot", image: { src: "/images/home-about.webp", alt: "A house shell on a cleared yard, with brick pallets and a sand pile" } },
      { place: "Lake City", date: "2 Apr", text: "Brickwork up to the lintels", image: { src: "/images/services-banner.webp", alt: "Masons setting red bricks along a wall, with a wheelbarrow of mortar nearby" } },
      { place: "DHA Phase 5", date: "18 Apr", text: "Room walls on the ground floor", image: { src: "/images/service-renovation.webp", alt: "Ground-floor rooms with exposed brick, fresh plaster, and a ladder" } },
      { place: "Johar Town", date: "9 May", text: "Stone soling and conduits", image: { src: "/images/service-grey-structure.webp", alt: "A ground slab with column steel, loose rebar, and aggregate beside the pour" } },
      { place: "Gulberg", date: "21 May", text: "Ground-floor slab poured", image: { src: "/images/home-process.webp", alt: "A concrete frame rising above stacked blocks and steel on the site" } },
      { place: "DHA Phase 7", date: "3 Jun", text: "Basement wall plastered", image: { src: "/images/service-finishing.webp", alt: "A painter rolling a fresh coat onto an interior wall" } },
    ],
  },
  steps: {
    title: "How a house is built, in the order we write down",
    body: "Eleven stages, each one in the schedule before work starts. You pay for a stage after it is photographed.",
    items: [
      { title: "Visit and levels", text: "We walk the plot, note the access, and record the ground against the neighbours." },
      { title: "Plans and the front", text: "Floor plans and an elevation drawn to the plot and the society rules." },
      { title: "Structure and schedule", text: "The frame is designed, and every item is listed with a quantity and a brand." },
      { title: "Approval", text: "Drawings go to the society or the authority that has to sign them." },
      { title: "Dig, footing, damp course", text: "The ground is opened, the footing is cast, and a damp course is laid." },
      { title: "The concrete frame", text: "Columns, beams, and slabs, with the steel grade named in the schedule." },
      { title: "Walls and lintels", text: "Brickwork, with a lintel over every opening." },
      { title: "Pipes and conduits", text: "Water, waste, and power routes go in before the plaster." },
      { title: "Plaster", text: "Walls and ceilings. This is the end of the grey structure." },
      { title: "Finishes", text: "Floors, joinery, paint, kitchen, and baths, each line in the schedule." },
      { title: "Keys", text: "A joint walk-through, then the keys, then help with the completion paper." },
    ],
    paths: [
      { href: "/services", label: "Grey structure" },
      { href: "/cost-and-rates", label: "Complete home" },
      { href: "/contact", label: "Building from abroad" },
    ] satisfies readonly Cta[],
  },
  faq: {
    title: "Questions owners ask before they sign",
    items: [
      { q: "What should I compare?", a: "A written schedule, a house you can visit, a guarantee on paper, and an office you can walk into." },
      { q: "What does grey structure cost?", a: "The placeholder band is Rs 2,900–3,200 per sq ft. The number that binds us is the one in your schedule." },
      { q: "Do you handle society approval?", a: "Yes. Drawings, submission, and the completion paper are part of the job when the plot needs them." },
      { q: "What is actually warranted?", a: "Fifteen years on the structure and five years on the finishes we installed, both written in the contract." },
      { q: "Can you build if I live abroad?", a: "Yes. Stages are approved against the schedule, with dated photos at each one." },
      { q: "How long does a house take?", a: "It is written before we start, with grey structure and finishes listed as separate stretches of time." },
    ],
  },
  offer: {
    eyebrow: "The full job",
    title: "Design, frame, and finish under one roof",
    body: "From the first plan to the last coat, the same people stay on the job. You are not passed from a drawing office to a contractor you have never met.",
    cta: { href: "/contact", label: "Work with us" } satisfies Cta,
    image: {
      src: "/images/home-process.webp",
      alt: "Tower cranes over a concrete building frame at the end of the day",
    },
  },
  studio: {
    title: "MSE",
    subtitle: "A building practice for plots that already have an address.",
    body: "We draw the house, engineer the frame, and stay for the finishes. The standard does not change between the first footing and the day you move in.",
    cta: { href: "/about", label: "About us" } satisfies Cta,
    left: [
      { src: "/images/home-about.webp", alt: "Scaffolding around a two-storey concrete house, with bricks waiting in the yard" },
      { src: "/images/home-why-us.webp", alt: "An engineer comparing a tablet drawing with the house frame behind him" },
    ],
    right: [
      { src: "/images/service-finishing.webp", alt: "A finisher painting an interior wall beside a ladder and a paint tray" },
      { src: "/images/home-cta.webp", alt: "The finished house at dusk, porch lights on and the lawn in front" },
    ],
  },
  reviews: {
    title: "What owners say after the dust settles",
    body: "Short notes from houses we have finished or are still on. Names here are placeholders.",
    items: [
      { quote: "They sent a photo every Friday without being asked. The schedule matched the walls I saw when I flew in.", name: "H. Qureshi", context: "10 marla, Johar Town, living in Manchester" },
      { quote: "The steel brand on the gate was the steel brand in the paper. That was the whole decision.", name: "S. Dar", context: "1 kanal grey structure, DHA" },
      { quote: "The front was rebuilt without turning the lane into a yard. The neighbours noticed, which is the test.", name: "A. Malik", context: "Renovation, Model Town" },
    ],
  },
  inquiry: {
    title: "Tell us about the plot",
    body: "A name, a number, and which part of the work you want. We reply with a range, not a guess dressed up as a quote.",
    image: {
      src: "/images/home-cta.webp",
      alt: "A completed modern house at sunset, ready to be lived in",
    },
  },
  writing: {
    eyebrow: "In writing",
    title: "Nothing important is left for the site to decide",
    body: "Architecture, structure, building, and interiors sit in one contract. The schedule is agreed before a brick is laid.",
    items: [
      { title: "Grey structure", text: "Rs 2,900–3,200 per sq ft as a placeholder. The binding rate is in your schedule." },
      { title: "House construction", text: "Plot sizes across Lahore. Five marla only where the street can take the site." },
      { title: "Commercial", text: "Plazas, offices, clinics. Priced from a drawing, not a rate card." },
      { title: "Renovation", text: "Kitchen, baths, a floor, or the elevation. We look first, then we price." },
      { title: "Architectural design", text: "Plans, a front, and the papers the society asks for." },
      { title: "Interior design", text: "Kitchens, joinery, and ceilings, drawn before they are ordered." },
      { title: "Structural drawings", text: "A stamped set for the authority that has to approve the frame." },
    ],
  },
  boq: {
    title: "The schedule is the contract",
    body: "A single lump sum hides the steel, the cement, and the brick. We close that gap before anyone digs. You hold a list: every material named, every quantity taken from your drawings, every rate written down.",
    points: [
      "Brands and grades are fixed before you sign, so the site cannot quietly trade down.",
      "Quantities come from the drawings, not from a guess at the plot size.",
      "The list you sign is the list we build to, through to the keys.",
    ],
  },
  coverage: {
    title: "Two studios, and the societies between them",
    body: "Gulberg and Johar Town put a project lead within a short drive of the plots we take. The same paperwork is used in every society.",
    stats: [
      { value: "2009", label: "First houses in Lahore" },
      { value: "4.8", label: "Placeholder rating" },
      { value: "180+", label: "Houses and floors" },
      { value: "5 yr", label: "Finish warranty" },
      { value: "15 yr", label: "Structure guarantee" },
      { value: "2", label: "Studios in the city" },
    ],
  },
  ratesIntro: {
    title: "One published band, and everything else from your own list",
    body: "We publish a grey-structure range and refuse invented numbers for the rest. Turnkey, commercial, and renovation depend on the drawing, the materials, and the plot.",
  },
  compare: {
    title: "How to compare builders before you sign",
    body: "Ignore the single per-foot number until you have seen these five things. We put all five on the table for every house.",
  },
  societies: {
    title: "Where we are building",
    body: "Choose an area for the kind of approval, the current grey-structure band, and what the sites look like now.",
  },
} as const;

export const servicesPage = {
  meta: {
    title: "Services",
    description:
      "Drawings, grey structure, complete homes, interiors, and commercial floors by MSE in Lahore.",
  } satisfies PageMeta,
  intro: {
    eyebrow: "Services",
    title: "The work, from a sketch to a finished room",
    lede: "MSE draws and builds houses and small commercial floors in Lahore. You can hire the drawings, the grey structure, or the whole house through to the keys.",
    banner: {
      src: "/images/services-banner.webp",
      alt: "A masonry crew laying brick on a residential site, with the concrete frame rising behind them",
    },
  },
  values: [
    { title: "A clear conversation", text: "You hear what the plot can take, and what it will cost to change your mind later." },
    { title: "A full set of papers", text: "Sketch, working drawings, and the sheets the society actually asks for." },
    { title: "More than one kind of job", text: "Houses, a shop floor, a renovation, and the rooms inside them." },
    { title: "Someone on the site", text: "The drawing office does not vanish once the footing is poured." },
    { title: "Licensed where it counts", text: "Architects and engineers who can sign the submission in their own name." },
    { title: "A long memory", text: "Details from older houses come back when a new plot has the same problem." },
  ],
  sketches: {
    eyebrow: "Drawn first",
    title: "A line for every part that will be built",
    items: [
      { title: "Apartment", text: "Compact plans where storage and light have to be earned.", image: { src: "/images/service-architecture.webp", alt: "A floor plan spread on a desk with a pencil, a scale, and a house model" } },
      { title: "Office", text: "Floors that can take desks, a waiting room, and a stair that works.", image: { src: "/images/service-commercial.webp", alt: "A glass-fronted commercial building with timber screens and a paved forecourt" } },
      { title: "Shop", text: "A front that opens to the street and a depth that can still be a room.", image: { src: "/images/service-finishing.webp", alt: "An interior being painted, with a ladder, roller, and paint bucket on the floor" } },
      { title: "House", text: "Family plans, a front, and a roof that belongs to the street.", image: { src: "/images/home-cta.webp", alt: "A finished two-storey house with a balcony, stone pier, and warm interior light" } },
    ],
  },
  offers: {
    title: "What the construction side covers",
    items: [
      { title: "Architectural designs", text: "Plans and elevations that can be approved, then built without a second guess." },
      { title: "Grey structure", text: "Everything that holds the house up and keeps the weather out, before the finishes." },
      { title: "Turnkey building", text: "One team from the dig to a house you can lock and live in." },
      { title: "Structural drawings", text: "The frame, sized and drawn, once the plans have settled." },
      { title: "Interior design", text: "Rooms arranged so the joinery, light, and storage are decided before they are ordered." },
    ],
  },
  philosophy: {
    title: "A plain idea of quality",
    columns: [
      { title: "Recognition", items: ["A quiet front that still reads as a house", "Joinery that closes after a year", "A stair people use without thinking"] },
      { title: "Method", items: ["Draw, then price, then dig", "Name the material before it is ordered", "Photograph the stage before the next payment"] },
      { title: "Years", items: ["First houses on Lahore plots", "A second studio, closer to the new schemes", "The same warranty, written the same way"] },
    ],
  },
  sides: {
    title: "Inside the house and on the street",
    lede: "The rooms and the front are designed together, so the elevation is not a costume pulled over a plan.",
    interior: {
      title: "Interior",
      text: "Kitchens, baths, wardrobes, and ceilings. Drawn, then built, then checked against the drawing.",
      image: { src: "/images/service-interior.webp", alt: "A furnished living room with wood flooring, a sofa, and a window onto trees" },
    },
    exterior: {
      title: "Exterior",
      text: "The gate, the front, the shade, and the way the house meets the footpath.",
      image: { src: "/images/home-cta.webp", alt: "The street front of a finished house at sunset, with steps up to a wood door" },
    },
  },
} as const;

export const areasPage = {
  meta: {
    title: "Areas",
    description:
      "MSE builds in Gulberg, DHA, Johar Town, Bahria, Model Town, and newer Lahore schemes.",
  } satisfies PageMeta,
  intro: {
    eyebrow: "Areas",
    title: "The parts of Lahore we actually work in",
    lede: "Two studios, and the societies a short drive from them. Approval, access, and the kind of house change from one area to the next. The paperwork does not.",
    banner: {
      src: "/images/areas-banner.webp",
      alt: "An aerial view of a wide residential boulevard lined with modern houses and palms",
    },
  },
  note: "Placeholder areas for the layout. Each card is a group of neighbourhoods, not a separate company.",
} as const;

export const costPage = {
  meta: {
    title: "Cost & Rates",
    description:
      "Placeholder construction rates for grey structure, complete homes, renovation, and commercial work in Lahore.",
  } satisfies PageMeta,
  intro: {
    eyebrow: "Cost & rates",
    title: "A range you can read, and a schedule that replaces it",
    lede: "These figures are placeholders so the page has a shape. A real price is an itemised list taken from your drawings, after we have seen the plot.",
    banner: {
      src: "/images/cost-banner.webp",
      alt: "Floor plans on a desk with a calculator, a hard hat, a pencil, and a scale",
    },
  },
  materials: {
    src: "/images/cost-materials.webp",
    alt: "Cement bags, red bricks, steel bars, and a pile of aggregate ready for a job",
  },
  tableCaption: "Placeholder cost bands by plot size",
} as const;

export const aboutPage = {
  meta: {
    title: "About Us",
    description:
      "MSE is a Lahore building practice for houses and small commercial floors, with studios in Gulberg and Johar Town.",
  } satisfies PageMeta,
  intro: {
    eyebrow: "About us",
    title: "A building practice that stays for the warranty",
    lede: "MSE started on Lahore plots and stayed there. Drawings, the frame, and the finishes are still done by the same studio, with two addresses you can walk into.",
    banner: {
      src: "/images/about-banner.webp",
      alt: "Four people in hard hats and high-visibility vests looking over a concrete frame",
    },
  },
  portrait: {
    src: "/images/about-mission.webp",
    alt: "A finished two-storey house with a timber screen, glass balcony, and a planted front garden",
  },
  facts: [
    { value: "2009", label: "First houses" },
    { value: "180+", label: "Plots delivered" },
    { value: "2", label: "Studios" },
    { value: "15 yr", label: "On the structure" },
  ],
  founder: {
    name: "Studio lead",
    role: "Founder, MSE",
    quote: "A builder should still answer the phone after the keys are handed over. The warranty is that sentence, written down.",
    image: {
      src: "/images/about-story.webp",
      alt: "A handshake over floor plans, with a house model and a hard hat on the desk",
    },
    points: [
      "On the major plots in person",
      "Both studios are walk-in on weekdays",
      "Owners abroad get the same Friday note",
    ],
  },
  story: {
    title: "From one desk to two addresses",
    paragraphs: [
      "The first jobs were houses on plots the owner already held. The offer was simple: build it the way you would want your own house built, and put the promise in the contract.",
      "Families sent their cousins. A few of those houses are now being opened up again, twenty years of weather later, for a new kitchen or a new front.",
      "The second desk opened so the newer schemes were not a long drive from the person running the job. The standard of the paper did not change with the postcode.",
    ],
  },
  timeline: [
    { year: "2009", title: "First plots", text: "Houses in the established neighbourhoods. The warranty is written from the start." },
    { year: "2014", title: "Gulberg studio", text: "A room on a street we were already building, so owners could walk in." },
    { year: "2018", title: "Johar Town desk", text: "A second address, closer to the schemes south of the canal." },
    { year: "2021", title: "Owners abroad", text: "Friday photos and a call at the owner's hour, for the same stages as a local client." },
    { year: "2024", title: "The long guarantee", text: "Fifteen years on the frame, written the same way on every new contract." },
    { year: "Now", title: "Still on the plot", text: "New houses, and a few of the early ones coming back for a careful repair." },
  ],
  principles: {
    title: "What the years are actually for",
    items: [
      { title: "Warranty, contractual", text: "Five years on finishes and fifteen on the structure. Not a sentence at the end of a meeting." },
      { title: "Time, written", text: "A week-by-week schedule. Payments follow the stage, not the calendar." },
      { title: "A Friday note", text: "A short account from the site, sent whether or not you asked that week." },
      { title: "Signed drawings", text: "The people who draw the house can put their name on the submission." },
      { title: "Two doors", text: "Gulberg and Johar Town. A lead is rarely more than a short drive from the plot." },
      { title: "The same standard abroad", text: "If you live in another city, the photos and the stages do not get thinner." },
    ],
  },
  warranty: {
    title: "What the paper actually covers",
    items: [
      { value: "5", unit: "years", title: "Finishes", text: "Workmanship, fittings, and the materials we supplied. A defect that is ours is put right." },
      { value: "15", unit: "years", title: "Structure", text: "Columns, beams, slabs, and the foundation. The steel grade in the schedule is the steel in the wall." },
      { value: "After", unit: "handover", title: "A number that still works", text: "Guidance once you have moved in. We do not disappear with the scaffolding." },
    ],
  },
  team: {
    title: "Who you will actually meet",
    people: [
      { name: "Studio lead", role: "Founder", text: "On the major plots, and in the Gulberg studio through the week.", image: { src: "/images/about-banner.webp", alt: "Site leads in hard hats reviewing a concrete building frame" } },
      { name: "Overseas desk", role: "Owners abroad", text: "The first call if you are not in Lahore, at an hour that suits you.", image: { src: "/images/about-story.webp", alt: "A client and a site lead shaking hands over a set of drawings" } },
      { name: "Architecture", role: "Drawings", text: "Plans, fronts, and submissions that have to pass the first time.", image: { src: "/images/service-architecture.webp", alt: "Architectural drawings and a scale model of a house on a studio desk" } },
      { name: "Structure", role: "Engineers", text: "The frame, drawn and checked before the steel is cut.", image: { src: "/images/service-grey-structure.webp", alt: "Concrete columns with steel cages on a new structural slab" } },
    ],
  },
  reviews: [
    { quote: "I approved each stage from another country. The Friday note was short and it matched the house.", name: "N. Rahman", context: "Complete home, Bahria Town" },
    { quote: "They would not give me a finish price until the schedule existed. That was the right refusal.", name: "F. Iqbal", context: "Grey structure, DHA" },
    { quote: "The lane was swept. It sounds small. It is how you know who is running the site.", name: "L. Sheikh", context: "Renovation, Gulberg" },
  ],
  close: {
    title: "If the plot is already yours, start there",
    body: "A visit, a written schedule, and a warranty you can keep. Gulberg and Johar Town, on weekdays.",
    cta: { href: "/contact", label: "Contact the studio" } satisfies Cta,
  },
} as const;

export const contactPage = {
  meta: {
    title: "Contact Us",
    description:
      "Write to MSE, or visit the Gulberg studio and the Johar Town desk. Placeholder phone and email.",
  } satisfies PageMeta,
  intro: {
    eyebrow: "Contact",
    title: "Start with the plot, not with a brochure",
    lede: "Grey structure, a complete home, or a renovation. Two studios inside Lahore. One written schedule, and one warranty.",
  },
  stats: [
    { value: "24 hr", label: "A reply on weekdays" },
    { value: "Free", label: "First look at the plot" },
    { value: "2", label: "Studios you can visit" },
  ],
  formTitle: "Send a note",
  formLede: "Name, phone, email, the service, and a few lines about the plot. We answer with a range and a next step.",
  submitLabel: "Send message",
  methods: [
    { step: "01", title: "A message", text: "Plot size, society, and the kind of work. A range comes back within a weekday." },
    { step: "02", title: "A phone call", text: "Monday to Saturday, 9am to 6pm. A person answers, not a menu." },
    { step: "03", title: "A visit", text: "Bring the plot papers to either studio. The first reading is free." },
  ],
  path: {
    title: "From the first note to a start on site",
    items: [
      { title: "The note", text: "You send the plot and what you want. We answer with a range and the questions that matter." },
      { title: "The visit", text: "We walk the ground, check access and the rules, and write what we saw." },
      { title: "The drawing", text: "Plans and a front, agreed before anyone submits them." },
      { title: "The contract", text: "An itemised list, stage payments, and then the dig." },
    ],
  },
  success: "Message received. A project lead will call the number you left.",
  failure: "The message did not go through. Call the studio, or try again.",
} as const;
