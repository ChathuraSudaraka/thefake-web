const base = import.meta.env.BASE_URL;

const modelists = [
  {
    name: "Ghost",
    color: "brown",
    rotation: "md:rotate-[-8deg] rotate-0",
    desc: "Hide as a prop. Mimic its sound.",
    tag: "Stealth",
  },
  {
    name: "Hunter",
    color: "red",
    rotation: "md:rotate-[8deg] rotate-0",
    desc: "Track ghosts by ear. Shoot on sight.",
    tag: "Action",
  },
  {
    name: "Co-op Hunt",
    color: "blue",
    rotation: "md:rotate-[-8deg] rotate-0",
    desc: "Team up. Cover every exit.",
    tag: "Team",
  },
  {
    name: "Blackout",
    color: "black",
    rotation: "md:rotate-[8deg] rotate-0",
    desc: "Lights off. Trust only your ears.",
    tag: "Survival",
  },
  {
    name: "Overtime",
    color: "orange",
    rotation: "md:rotate-[-8deg] rotate-0",
    desc: "Last ghost standing wins.",
    tag: "Endgame",
  },
  {
    name: "Spectator",
    color: "white",
    rotation: "md:rotate-[8deg] rotate-0",
    desc: "Watch. Whisper. Survive vicariously.",
    tag: "Observer",
  },
];

const mechanicsList = [
  { label: "Players", amount: "2–16" },
  { label: "Maps", amount: "8+" },
  { label: "Weapons", amount: "12+" },
  { label: "Modes", amount: "6" },
  { label: "Props", amount: "200+" },
];

const cards = [
  {
    src: `${base}videos/f1.mp4`,
    rotation: "rotate-z-[-10deg]",
    name: "Madison",
    img: `${base}images/p1.png`,
    translation: "translate-y-[-5%]",
  },
  {
    src: `${base}videos/f2.mp4`,
    rotation: "rotate-z-[4deg]",
    name: "Alexander",
    img: `${base}images/p2.png`,
  },
  {
    src: `${base}videos/f3.mp4`,
    rotation: "rotate-z-[-4deg]",
    name: "Andrew",
    img: `${base}images/p3.png`,
    translation: "translate-y-[-5%]",
  },
  {
    src: `${base}videos/f4.mp4`,
    rotation: "rotate-z-[4deg]",
    name: "Bryan",
    img: `${base}images/p4.png`,
    translation: "translate-y-[5%]",
  },
  {
    src: `${base}videos/f5.mp4`,
    rotation: "rotate-z-[-10deg]",
    name: "Chris",
    img: `${base}images/p5.png`,
  },
  {
    src: `${base}videos/f6.mp4`,
    rotation: "rotate-z-[4deg]",
    name: "Devante",
    img: `${base}images/p6.png`,
    translation: "translate-y-[5%]",
  },
  {
    src: `${base}videos/f7.mp4`,
    rotation: "rotate-z-[-3deg]",
    name: "Melisa",
    img: `${base}images/p7.png`,
    translation: "translate-y-[10%]",
  },
];

export { modelists, mechanicsList, cards };
