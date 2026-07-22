# NexCafe' - Design System & Aesthetic Documentation

Welcome to the design documentation for **NexCafe'**. This document outlines the typography, color palette, components, and layout structures that compose the premium aesthetic of the NexCafe' website.

---

## 1. Color Palette

The color system is designed to evoke a warm, organic, and premium dining experience, balancing dark forest tones with soft cream backdrops.

| Color Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| `cream` | `#f5f1e6` | Main background color (warm & inviting) |
| `cream-soft` | `#faf7ef` | Secondary background card color |
| `cream-deep` | `#ece5d3` | Subtle borders, dividers, and shadows |
| `forest` | `#4a6b3f` | Accent brand color (vegetal green) |
| `forest-deep` | `#2f3d2a` | Primary text and dark layout backdrops |
| `forest-ink` | `#1e2a18` | Footer and deep contrast layers |
| `gold` / `tan` | `#c9b98f` | Premium borders, icons, and interactive states |
| `sriracha` | `#d6483b` | Accent highlights (e.g., active states or alerts) |

---

## 2. Typography

We use Google Fonts to establish an elegant editorial contrast between modern condensed headings and highly readable sans-serif body text.

- **Primary Sans-Serif (Body & UI):** `Quicksand` (Weights: 300, 400, 500, 600, 700)
  - *Usage:* Body paragraphs, buttons, labels, forms.
- **Display Serif / Condensed (Headings):** `Bebas Neue`
  - *Usage:* Hero titles, section headings, numbers, receipts.
- **Decorative Cursive:** `Island Moments`
  - *Usage:* Logo branding, signature quotes, artistic highlights.
- **Sub-Headings:** `Istok Web`
  - *Usage:* Navbar links, category selections, form descriptors.

---

## 3. UI Component Specifications

### Buttons (`Button.tsx`)
- **Primary:** High-contrast warm emerald button with elegant thin gold borders.
- **Secondary:** Semi-transparent cream layout button with clean borders.
- **Glass:** Highly blurred frosted backdrop button (`backdrop-blur-md`) with soft border glow.
- **Animations:** Simplified hover state transitioning scale up (`1.025` / `1.06`) and increasing box-shadow and glow visibility smoothly via GSAP. No cursor-tracking or magnetic pull to keep it clean and robust.

### Navigation Headers (`Navbar.tsx` & `CompactNavbar.tsx`)
- **Top Header:** Transparent layout blending with the hero image, showcasing the brand logo in decorative cursive.
- **Compact Navbar:** Bottom-anchored glassmorphic control bar sliding up as you scroll down, providing instant access to Cart and Menu overlays.
- **Side Drawer Menu:** Sliding mobile drawer featuring a deep forest glass backdrop (`bg-[#131b10]/95 backdrop-blur-xl`), numbered navigation items, and contact details.

### Security / Trust Panels (`Checkout.tsx`)
- Frosted light-green notification boxes highlighting policy conditions, coupled with secure links (e.g., "Your Trust is what we want") downloading legal protections.

---

## 4. Layout & Motion Principles

1. **Responsiveness:** Fluid grid layouts scaling down from content max-width (`1440px`) to compact mobile viewports.
2. **Smooth Transitions:** Page navigation scroll locks, overlay animations using `AnimatePresence`, and spring animations for sliders (`damping: 26, stiffness: 220`).
3. **Optimized Loading:** Fonts are preloaded synchronously through HTML header tags to prevent FOUT (Flash of Unstyled Text) during paint.
