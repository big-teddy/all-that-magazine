# Design System Specification for Cursor AI

## Overview

Complete design system for All That Magazine implementing Bold Minimalism aesthetic principles from 2024-2025 award-winning magazines. This document provides exact specifications for Cursor AI to generate consistent, professional-grade visual design.

---

## Design Philosophy: Bold Minimalism

### Core Principles

**60-30-10 Rule:**
- 60% white space / neutral backgrounds (calm, breathing room)
- 30% imagery / content (visual interest)
- 10% high-saturation accent colors (impact, hierarchy)

**Contrast is King:**
- Light body text (400 weight) vs Heavy headlines (900 weight)
- Small type sizes (16px) vs Enormous headlines (48-76px)
- Muted backgrounds (10-30% saturation) vs Bold accents (80-100% saturation)

**Strategic Simplicity:**
- Every element must earn its place
- Remove until it breaks, then add one thing back
- One bold element maximum per section

---

## Typography System

### Font Families

**Primary Headline Font: Playfair Display**
```css
font-family: 'Playfair Display', Georgia, serif;
```
- Google Fonts (free, 100% commercial use)
- Weights: 400 (Regular), 700 (Bold), 900 (Black)
- Usage: Headlines, display text, quotes
- Characteristics: High-contrast transitional serif, elegant, luxury feel
- Inspired by: Vogue, Harper's Bazaar, GT Super Display

**Primary Body Font: Inter**
```css
font-family: 'Inter', system-ui, sans-serif;
```
- Google Fonts (free)
- Weights: 400 (Regular), 500 (Medium), 700 (Bold)
- Usage: Body text, captions, UI elements
- Characteristics: Highly legible, designed for screens, modern
- Perfect for: Long-form reading, mobile optimization

### Font Loading (next/font/google)

```typescript
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});
```

### Typography Scale (Perfect Fourth - 1.333 ratio)

**Desktop Scale:**
```
12px (0.75rem)   - Caption, footnotes
14px (0.875rem)  - Small text
16px (1rem)      - Base size
18px (1.125rem)  - Body text (preferred)
24px (1.5rem)    - H4, subheadings
32px (2rem)      - H3
43px (2.667rem)  - H2
57px (3.556rem)  - H1
76px (4.741rem)  - Hero headlines
```

**Mobile Scale (smaller ratio 1.25):**
```
14px - Caption
16px - Base/Body
20px - H4
25px - H3
31px - H2
39px - H1
49px - Hero
```

### Typography Hierarchy Specifications

**Hero Headlines (H1):**
```css
font-family: var(--font-playfair);
font-weight: 900;
font-size: 3.556rem; /* 57px desktop */
line-height: 1.1;
letter-spacing: -0.02em;
margin-bottom: 1.5rem;

@media (max-width: 768px) {
  font-size: 2.441rem; /* 39px mobile */
}
```

**Section Headlines (H2):**
```css
font-family: var(--font-playfair);
font-weight: 700;
font-size: 2.667rem; /* 43px */
line-height: 1.2;
letter-spacing: -0.01em;
margin-bottom: 1rem;
```

**Subheadings (H3):**
```css
font-family: var(--font-playfair);
font-weight: 700;
font-size: 2rem; /* 32px */
line-height: 1.3;
margin-bottom: 0.75rem;
```

**Small Headings (H4):**
```css
font-family: var(--font-inter);
font-weight: 700;
font-size: 1.5rem; /* 24px */
line-height: 1.4;
margin-bottom: 0.5rem;
```

**Body Text:**
```css
font-family: var(--font-inter);
font-weight: 400;
font-size: 1.125rem; /* 18px desktop */
line-height: 1.7; /* 30.6px */
letter-spacing: 0;
margin-bottom: 1.5rem;

@media (max-width: 768px) {
  font-size: 1rem; /* 16px mobile - prevents iOS zoom */
}
```

**Captions:**
```css
font-family: var(--font-inter);
font-weight: 400;
font-size: 0.875rem; /* 14px */
line-height: 1.5;
color: #6B7280; /* gray-500 */
```

**Links:**
```css
font-family: var(--font-inter);
font-weight: 500;
text-decoration: underline;
text-decoration-thickness: 1px;
text-underline-offset: 2px;
transition: color 0.2s ease;

&:hover {
  color: currentColor;
  text-decoration-thickness: 2px;
}
```

---

## Color System

### Brand Colors (Primary)

```css
:root {
  /* Core Brand */
  --brand-black: #000000;
  --brand-white: #FFFFFF;
  --brand-neutral: #E5E1DA; /* Warm off-white */
  
  /* Vertical Colors */
  --wellness: #4CAF50;      /* green-500 */
  --wellness-light: #81C784; /* green-300 */
  --wellness-dark: #388E3C;  /* green-700 */
  
  --lifestyle: #9C27B0;      /* purple-600 */
  --lifestyle-light: #BA68C8; /* purple-300 */
  --lifestyle-dark: #7B1FA2;  /* purple-800 */
  
  --tech: #2196F3;          /* blue-500 */
  --tech-light: #64B5F6;     /* blue-300 */
  --tech-dark: #1976D2;      /* blue-700 */
  
  /* Semantic Colors */
  --success: #10B981; /* green-500 */
  --error: #EF4444;   /* red-500 */
  --warning: #F59E0B; /* amber-500 */
  --info: #3B82F6;    /* blue-500 */
  
  /* Neutral Grays */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
}
```

### Color Usage Guidelines

**Text Colors:**
```
Primary text: --brand-black (#000000)
Secondary text: --gray-600 (#4B5563)
Muted text: --gray-500 (#6B7280)
Disabled text: --gray-400 (#9CA3AF)
```

**Background Colors:**
```
Primary: --brand-white (#FFFFFF)
Subtle: --gray-50 (#F9FAFB)
Neutral: --brand-neutral (#E5E1DA)
```

**Accent Application (10% rule):**
- Use vertical colors ONLY for:
  * Vertical badges/tags
  * Category indicators
  * Accent borders (4px left border on cards)
  * Hover states on vertical-specific elements
  * Section dividers

**Never use accent colors for:**
- Large backgrounds (>20% of screen)
- Body text
- Entire cards or sections

### Color Saturation Levels

**Muted Base (20-40% saturation):**
```
Background tones: #F5F5F5 (very desaturated)
Subtle accents: rgba(76, 175, 80, 0.1) (10% opacity)
```

**Bold Accents (80-100% saturation):**
```
Vertical badges: Full saturation colors
Interactive elements: Full saturation on hover
```

---

## Spacing System

### Base Unit: 4px

```css
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
--spacing-20: 5rem;    /* 80px */
--spacing-24: 6rem;    /* 96px */
--spacing-32: 8rem;    /* 128px */
```

### Spacing Application

**Component Internal Spacing:**
```
Card padding: 24px (spacing-6)
Button padding: 12px 24px (spacing-3 spacing-6)
Input padding: 12px 16px
Section padding: 48px (spacing-12) mobile, 80px (spacing-20) desktop
```

**Section Spacing:**
```
Between sections: 80px (spacing-20) mobile, 120px (spacing-30) desktop
Between elements: 48px (spacing-12)
Between paragraphs: 24px (spacing-6)
```

**Grid Gaps:**
```
Article cards: 32px (spacing-8)
Thumbnail grid: 24px (spacing-6)
```

---

## Layout System

### Grid Structure

**12-Column Grid:**
```css
.magazine-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 30px; /* 2.5rem on desktop */
  max-width: 1440px; /* 8xl */
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  padding: 0 2rem;
  gap: 30px;
}
```

**Column Spans:**
```
Full width: span 12
Half: span 6
Third: span 4
Quarter: span 3
Two-thirds: span 8
```

**Homepage Layout Pattern:**
```
Desktop (1024px+):
- Hero article: 6 columns
- Thumbnails: 6 columns (2x2 grid)

Tablet (768px-1023px):
- Hero article: 12 columns
- Thumbnails: 6 columns each (2 columns)

Mobile (<768px):
- All articles: 12 columns (stacked)
```

### Container Widths

```css
--container-sm: 640px;   /* Small content */
--container-md: 768px;   /* Article text */
--container-lg: 1024px;  /* Standard pages */
--container-xl: 1280px;  /* Wide layouts */
--container-2xl: 1440px; /* Maximum width */
```

**Usage:**
```
Article content: max-w-3xl (768px)
Homepage: max-w-8xl (1440px)
About page: max-w-4xl (896px)
```

### Breakpoints

```css
/* Mobile first approach */
@media (min-width: 640px) {  /* sm: tablet portrait */
@media (min-width: 768px) {  /* md: tablet landscape */
@media (min-width: 1024px) { /* lg: desktop */
@media (min-width: 1280px) { /* xl: large desktop */
@media (min-width: 1536px) { /* 2xl: extra large */
```

---

## Component Specifications

### Article Cards

**Hero Card (Large Featured):**
```
Image aspect ratio: 16:9
Image size: 1200x675px minimum
Border radius: 8px (rounded-lg)
Hover effect: 
  - transform: scale(1.05)
  - transition: 300ms ease
  - shadow-xl

Badge position: top-left, 16px margin
Badge style: 
  - padding: 8px 16px
  - border-radius: 9999px (rounded-full)
  - border: 2px solid (vertical color)
  - background: white

Title size: 36-48px (text-3xl to text-4xl)
Title weight: 900 (font-black)
Title lines: max 3 lines (line-clamp-3)

Excerpt: 2-3 lines visible
Excerpt color: gray-600

Meta row spacing: 16px gap
```

**Thumbnail Card:**
```
Image aspect ratio: 4:3
Image size: 800x600px minimum
Border radius: 8px
Hover: scale(1.05), shadow-lg

Badge: inline-block, no background, just colored text

Title size: 20-24px (text-xl to text-2xl)
Title weight: 700 (font-bold)
Title lines: max 2 lines

No excerpt visible
Meta: compact (read time + premium icon only)
```

### Navigation Header

**Desktop Header:**
```
Height: 80px (5rem)
Position: sticky top-0
Background: rgba(255,255,255,0.95) with backdrop-blur
Border bottom: 1px solid gray-200
z-index: 50

Logo: 
  - font-serif (Playfair)
  - text-2xl (24px)
  - font-black (900)
  
Nav links:
  - text-lg (18px)
  - font-medium (500)
  - spacing: 32px gap
  - hover: color transition 200ms
```

**Mobile Header:**
```
Height: 64px (4rem)
Hamburger menu: 24x24px icon
Drawer menu: full-screen overlay
```

### Buttons

**Primary Button:**
```css
.btn-primary {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: var(--brand-black);
  color: var(--brand-white);
  border-radius: 8px;
  border: none;
  transition: background 200ms;
}

.btn-primary:hover {
  background: #374151; /* gray-700 */
}
```

**Secondary Button:**
```css
.btn-secondary {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: transparent;
  color: var(--brand-black);
  border: 2px solid var(--brand-black);
  border-radius: 8px;
  transition: all 200ms;
}

.btn-secondary:hover {
  background: var(--brand-black);
  color: var(--brand-white);
}
```

**Button Sizes:**
```
Small: py-2 px-4 text-sm
Medium: py-3 px-6 text-base
Large: py-4 px-8 text-lg
```

### Form Elements

**Text Input:**
```css
.input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-family: var(--font-inter);
  border: 2px solid var(--gray-300);
  border-radius: 8px;
  background: white;
  transition: border-color 200ms;
}

.input:focus {
  outline: none;
  border-color: var(--brand-black);
}
```

**Textarea:**
```css
.textarea {
  /* Same as input */
  min-height: 120px;
  resize: vertical;
}
```

### Paywall Component

```css
.paywall {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 384px; /* 24rem */
  background: linear-gradient(to bottom, transparent, white);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 48px;
}

.paywall-card {
  max-width: 448px; /* 28rem */
  background: white;
  border: 2px solid var(--brand-black);
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

---

## Imagery Guidelines

### Image Specifications

**Featured Images:**
```
Aspect ratio: 16:9 (homepage hero)
Minimum resolution: 1200x675px
Optimal resolution: 1920x1080px
Format: WebP (fallback JPEG)
Quality: 80%
```

**Thumbnail Images:**
```
Aspect ratio: 4:3
Minimum resolution: 800x600px
Optimal resolution: 1200x900px
Format: WebP
Quality: 75%
```

**Open Graph Images:**
```
Size: 1200x630px
Format: JPEG
Quality: 90%
```

### Image Treatment

**Photo Style:**
```
- Natural lighting preferred
- Authentic, candid moments
- No heavy filters
- Subtle color grading (warm or cool, not both)
- Professional but not sterile
```

**Overlay Treatment:**
```
Dark gradient for text readability:
background: linear-gradient(
  to bottom,
  rgba(0,0,0,0) 0%,
  rgba(0,0,0,0.4) 100%
);
```

### Next.js Image Component

```typescript
<Image
  src={imageUrl}
  alt={altText}
  width={1200}
  height={675}
  quality={80}
  priority={false} // true for above-fold
  loading="lazy"
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

---

## Animation & Interactions

### Transition Timing

```css
--transition-fast: 150ms;
--transition-base: 200ms;
--transition-slow: 300ms;

--easing: cubic-bezier(0.4, 0, 0.2, 1); /* ease-in-out */
```

### Hover States

**Article Cards:**
```css
.article-card {
  transition: transform 300ms ease, box-shadow 300ms ease;
}

.article-card:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.article-card img {
  transition: transform 300ms ease;
}

.article-card:hover img {
  transform: scale(1.1);
}
```

**Links:**
```css
.link {
  transition: color 200ms ease;
}

.link:hover {
  color: var(--gray-600);
}
```

**Buttons:**
```css
.button {
  transition: all 200ms ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.button:active {
  transform: translateY(0);
}
```

### Loading States

**Skeleton:**
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-200) 0%,
    var(--gray-100) 50%,
    var(--gray-200) 100%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Spinner:**
```css
.spinner {
  border: 3px solid var(--gray-200);
  border-top-color: var(--brand-black);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Accessibility

### Color Contrast

**WCAG 2.2 Level AA Requirements:**
```
Normal text: 4.5:1 minimum
Large text (18pt+ or 14pt bold+): 3:1 minimum
UI elements: 3:1 minimum

Our colors:
✅ Black on white: 21:1 (excellent)
✅ Gray-600 on white: 7.23:1 (excellent)
✅ Gray-500 on white: 4.61:1 (pass)
✅ Wellness on white: 3.14:1 (pass for large text)
```

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--brand-black);
  outline-offset: 2px;
}

/* Never remove outlines without replacement */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### Touch Targets

```
Minimum: 44x44px (iOS/Android standard)
Preferred: 48x48px
Buttons: min-height 48px, padding ensures target size
Links: min-height 44px with adequate padding
```

### Screen Reader Text

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Print Styles (Future Enhancement)

```css
@media print {
  /* Remove navigation, footers */
  header, footer, nav { display: none; }
  
  /* Ensure black text */
  * { color: black !important; }
  
  /* Remove shadows, gradients */
  * { box-shadow: none !important; }
  
  /* Page breaks */
  h1, h2, h3 { page-break-after: avoid; }
  p { page-break-inside: avoid; }
  
  /* Show link URLs */
  a[href]:after {
    content: " (" attr(href) ")";
  }
}
```

---

## Dark Mode (Future Enhancement)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --brand-black: #FFFFFF;
    --brand-white: #000000;
    --brand-neutral: #1F2937;
    
    --gray-50: #111827;
    --gray-100: #1F2937;
    /* ... inverse grays ... */
  }
  
  img {
    opacity: 0.9;
  }
}
```

---

## Design Tokens (CSS Variables)

### Complete Token Set

```css
:root {
  /* Typography */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 2.667rem;
  --text-4xl: 3.556rem;
  --text-5xl: 4.741rem;
  
  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
  
  /* Spacing (already defined above) */
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-base: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Z-index */
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-fixed: 30;
  --z-modal-backdrop: 40;
  --z-modal: 50;
  --z-popover: 60;
  --z-tooltip: 70;
}
```

---

## Implementation Checklist

**Typography:**
```
□ Google Fonts loaded (Playfair Display + Inter)
□ Font variables defined (--font-serif, --font-sans)
□ Typography scale implemented (Perfect Fourth)
□ Line heights optimized (1.7 for body, 1.1-1.2 for headlines)
□ Mobile font sizes adjusted (16px minimum)
```

**Colors:**
```
□ CSS custom properties defined
□ Vertical colors assigned (wellness, lifestyle, tech)
□ Gray scale complete (50-900)
□ Semantic colors defined (success, error, etc)
□ Color contrast meets WCAG AA
```

**Layout:**
```
□ 12-column grid system
□ Container max-widths set
□ Breakpoints defined (640, 768, 1024, 1280, 1536)
□ Spacing scale (4px base unit)
□ Section padding (48-120px)
```

**Components:**
```
□ Article cards (hero + thumbnail)
□ Navigation header (sticky)
□ Footer
□ Buttons (primary, secondary)
□ Form inputs
□ Paywall component
```

**Performance:**
```
□ Next.js Image component used everywhere
□ WebP format with JPEG fallback
□ Lazy loading enabled
□ Font preloading optimized
□ CSS custom properties for theming
```

**Accessibility:**
```
□ 4.5:1 contrast for body text
□ 3:1 contrast for large text
□ 44x44px minimum touch targets
□ Focus states visible
□ Semantic HTML
□ Alt text on all images
```

---

**End of Design System Specification**

Cursor AI: Use this document to implement consistent, professional Bold Minimalism design across all components and pages.
