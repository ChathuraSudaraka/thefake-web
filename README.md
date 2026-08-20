# TheFakes — Horror Coop Prop Hunt Experience

An immersive, award-winning-caliber web experience built for **"TheFakes"** — a horror coop prop hunt game where ghosts hide as everyday objects, hunters track by sound, and voice proximity chat betrays every breath.

Powered by **React 19**, **GSAP (ScrollTrigger & SplitText)**, **Vite**, and **Tailwind CSS 4**.

---

## 🎮 About The Game

**TheFakes** is an intense multiplayer horror experience powered by Unreal Engine 5:
- **Hide in Plain Sight**: Impersonate any prop in the haunted room with real-time physics.
- **Proximity Chat Betrayal**: Every sound through your real microphone reveals your location to coop hunters.
- **Dynamic Physics & Lighting**: High-fidelity UE5 horror atmosphere with procedural props.

---

## ✨ Features & Visual Interactions

- **Cinematic Hero**: Video backdrop with dynamic char-split typography and tilt scrub on scroll.
- **Interactive Donation Deck**: Tiered community backing grid ($5, $10, $25, Custom) with smooth hover/click spring physics and direct anchor navigation.
- **Proximity Text Reveal**: Kinetic message section with char & word SplitText scrub triggers.
- **Game Mode Showcase**: Scrub-driven horizontal slider showcasing gameplay modes and props.
- **Mechanics Grid**: Interactive breakdown of ghost count, hunter loadouts, and proximity voice nodes.
- **Pinned Video Feature**: Pinned video presentation spotlighting core Unreal Engine 5 gameplay mechanics.
- **Community Clips Deck**: Fan-spread deck displaying community highlight clips and hunter reactions.
- **Responsive Architecture**: Fluid scaling across Ultra-wide (2XL), Desktop, Tablet, and Mobile devices.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Component-driven UI & state management |
| **GSAP 3 + @gsap/react** | ScrollTrigger, SplitText, scrubbing, timeline sequencing & spring physics |
| **Tailwind CSS 4** | Custom horror design tokens, utility layers & layout engine |
| **Vite 6** | Lightning-fast development & optimized production build |
| **React Responsive** | Adaptive breakpoints for mobile, tablet, and desktop viewports |

---

## 📁 Project Structure

```
thefake-web/
├── public/
│   ├── images/         # Horror game assets, background textures, UI elements
│   └── videos/         # Atmospheric video backgrounds & gameplay clips
├── src/
│   ├── components/     # Modular UI components
│   │   ├── ClipPathTitle.jsx    # Polygon reveal title component
│   │   ├── GameplaySlider.jsx   # Horizontal interactive gameplay mode slider
│   │   ├── GameplayTitle.jsx    # Animated gameplay section header
│   │   ├── NavBar.jsx           # Fixed navbar with instant donation anchor button
│   │   └── VideoPinSection.jsx  # Pinned gameplay showcase video container
│   ├── sections/       # Core page sections
│   │   ├── HeroSection.jsx        # Landing cinematic with video & animated title
│   │   ├── DonationSection.jsx    # Community tier cards with custom amount input
│   │   ├── MessageSection.jsx     # Proximity audio lore & scrub-reveal typography
│   │   ├── GameplaySection.jsx    # Game modes & mechanics showcase
│   │   ├── MechanicsSection.jsx   # Rules, hunter specs & round stats
│   │   ├── FeaturesSection.jsx    # Core game features (UE5, Voice Chat, Physics)
│   │   ├── CommunitySection.jsx   # Community reactions & video clips deck
│   │   └── FooterSection.jsx      # Wishlist CTA, newsletter, and social channels
│   ├── constants/      # Game mechanics, tiers, and navigation constants
│   ├── App.jsx         # App root & GSAP plugin registration
│   ├── index.css       # Design tokens, custom dark horror palette & typography
│   └── main.jsx        # React DOM entry point
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ChathuraSudaraka/thefake-web.git
   cd thefake-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

---

## 📦 Available Scripts

```bash
# Start local Vite dev server with Hot Module Replacement (HMR)
npm run dev

# Compile production-ready bundle to /dist
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

---

## 🎨 Design System & Palette

- **Base Theme**: `#0f0d0e` (Deep Void Black)
- **Secondary Surfaces**: `#140e0c`, `#1e1210`, `#2a1e18` (Dark Brown & Red-Brown Tones)
- **Accents**: `#a89070` (Milk Yellow / Khaki), `#4a3425` (Warm Sienna)
- **Text**: `#ece8e1` (Milk White)
- **Typography**:
  - **Headings**: `Antonio` (Condensed bold display)
  - **Body / Paragraphs**: `Space Grotesk` (Modern geometric sans)

---

## 📄 License

This project is open-source and available under the **MIT License**.
