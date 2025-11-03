# UI/UX Implementation Code Examples

## Quick Reference: Specific Line Changes

### 1. HEADER BUTTON TOUCH TARGETS (30 minutes)

**File:** `/frontend/components/Header.tsx`

**Current (Line 91-101):**
```tsx
<motion.button
  onClick={() => setIsSearchOpen(!isSearchOpen)}
  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
  aria-label="검색"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</motion.button>
```

**Recommended (add focus ring + touch target):**
```tsx
<motion.button
  onClick={() => setIsSearchOpen(!isSearchOpen)}
  className="p-3 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
  aria-label="검색 열기"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</motion.button>
```

**Changes:**
- `p-2` → `p-3` (increases from 28px to 36px touch target)
- Add `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`
- Add descriptive aria-label "검색 열기" (instead of just "검색")

**Same for mobile menu button (Line 113-129).**

---

### 2. GLOBAL FOCUS RING STYLES (30 minutes)

**File:** `/frontend/app/globals.css`

**Add after line 71:**
```css
@layer components {
  /* Keyboard focus indicators */
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    @apply outline-none ring-2 ring-offset-2 ring-black;
  }

  /* Increase ring offset for better visibility */
  [role="menuitem"]:focus-visible,
  [role="tab"]:focus-visible {
    @apply ring-offset-4;
  }
}
```

---

### 3. ARTICLE CARD HOVER CONSISTENCY (1 hour)

**File:** `/frontend/components/ArticleCard.tsx`

**Current (Line 141-142 - thumbnail variant):**
```tsx
<motion.div
  className="w-full h-full"
  whileHover={{ scale: 1.08 }}
  transition={{ duration: 0.4 }}
>
```

**Should be (match hero variant):**
```tsx
<motion.div
  className="w-full h-full"
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.4 }}
>
```

**Rationale:** Consistency across all card types - use 1.05 scale for all.

---

### 4. RESPONSIVE TYPOGRAPHY (1-2 hours)

**File:** `/frontend/components/ArticleContent.tsx`

**Current (Line 61):**
```tsx
<div
  className="article-prose-content prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-p:mb-6 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg max-w-none mb-16"
  dangerouslySetInnerHTML={{ __html: content }}
/>
```

**Recommended (add responsive prose sizing):**
```tsx
<div
  className="article-prose-content prose prose-sm sm:prose-base lg:prose-lg prose-headings:font-serif prose-headings:font-bold prose-headings:mb-6 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg max-w-none mb-16"
  dangerouslySetInnerHTML={{ __html: content }}
/>
```

**Changes:**
- `prose-lg` → `prose prose-sm sm:prose-base lg:prose-lg` (responsive sizing)
- Add `prose-headings:mb-6` (consistent heading margin)

**File:** `/frontend/app/[vertical]/page.tsx`

**Line 79 - Hero title too large:**
```tsx
{/* Current */}
<h1 className="font-serif text-5xl lg:text-7xl font-black mb-6">

{/* Recommended */}
<h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-black mb-6">
```

---

### 5. VERTICAL PAGE GRID RESPONSIVENESS (1 hour)

**File:** `/frontend/app/[vertical]/page.tsx`

**Line 100-102 - Featured article grid:**
```tsx
{/* Current */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

{/* Recommended */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
```

**Line 102 - Image aspect ratio:**
```tsx
{/* Current */}
<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">

{/* Recommended */}
<div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden">
```

**Line 153 - Article grid:**
```tsx
{/* Current */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

{/* Already correct, no change needed */}
```

---

### 6. FEATURED SECTION MOBILE IMPROVEMENTS (1 hour)

**File:** `/frontend/components/FeaturedSection.tsx`

**Line 50:**
```tsx
{/* Current */}
<motion.div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"

{/* Recommended - same, already optimized */}
```

**However, add description subtitle at Line 46:**
```tsx
{/* Current */}
<motion.div
  className="flex items-center justify-between mb-10"
  initial={{ opacity: 0, x: -20 }}
  animate={inView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.6 }}
>
  <h2 className="font-serif text-3xl lg:text-5xl font-black">주요 기사</h2>
</motion.div>

{/* Recommended */}
<motion.div
  className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4"
  initial={{ opacity: 0, x: -20 }}
  animate={inView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.6 }}
>
  <div>
    <h2 className="font-serif text-3xl lg:text-5xl font-black">주요 기사</h2>
    <p className="text-gray-600 text-sm mt-2">편집팀이 선별한 주목할 만한 기사들</p>
  </div>
</motion.div>
```

---

### 7. HERO SECTION MOBILE HEIGHT (1 hour)

**File:** `/frontend/components/HeroSection.tsx`

**Line 22:**
```tsx
{/* Current */}
<section className="relative h-[80vh] min-h-[600px] max-h-[900px] mb-20 lg:mb-32 overflow-hidden">

{/* Recommended */}
<section className="relative h-[75vh] sm:h-[80vh] min-h-[500px] sm:min-h-[600px] max-h-[900px] mb-16 sm:mb-20 lg:mb-32 overflow-hidden">
```

**Changes:**
- Mobile: 75vh, 500px min (less whitespace on small screens)
- Tablet/Desktop: 80vh, 600px min (more breathing room)
- Bottom margin: 16px → 20px → 32px (responsive spacing)

---

### 8. NEWSLETTER FORM MOBILE PADDING (30 minutes)

**File:** `/frontend/components/NewsletterSection.tsx`

**Lines 54-62:**
```tsx
{/* Current */}
<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl">
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="이메일 주소를 입력하세요"
    required
    disabled={status === 'loading'}
    className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all disabled:opacity-50"
  />

  <button
    type="submit"
    disabled={status === 'loading'}
    className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
  >
```

**Recommended:**
```tsx
<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl">
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="이메일 주소를 입력하세요"
    required
    disabled={status === 'loading'}
    className="flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/15 focus:ring-4 focus:ring-white/30 transition-all disabled:opacity-50"
  />

  <button
    type="submit"
    disabled={status === 'loading'}
    className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-h-[44px] sm:min-h-auto"
  >
```

**Changes:**
- Input: `px-6 py-4` → `px-4 py-3 sm:px-6 sm:py-4` (less padding on mobile)
- Button: Same responsive padding, add `min-h-[44px]` for mobile touch target
- Input focus: Add `focus:ring-4 focus:ring-white/30`

---

### 9. ARTICLE PAGE HERO HEIGHT (1 hour)

**File:** `/frontend/app/[vertical]/[slug]/page.tsx`

**Line 52:**
```tsx
{/* Current */}
<div className="relative h-[60vh] min-h-[500px] max-h-[700px] mb-12">

{/* Recommended */}
<div className="relative h-[70vh] sm:h-[60vh] min-h-[400px] sm:min-h-[500px] max-h-[700px] mb-8 sm:mb-12">
```

**Line 71 - Content padding bottom:**
```tsx
{/* Current */}
<div className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12 lg:pb-16">

{/* Recommended */}
<div className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-8 sm:pb-12 lg:pb-16">
```

---

### 10. HOMEPAGE SECTION SPACING (30 minutes)

**File:** `/frontend/app/page.tsx`

**Line 46 - Container max-width consistency:**
```tsx
{/* Current - good */}
<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

{/* Already correct - keep as is */}
```

**Line 59 - Spacing between sections:**
```tsx
{/* Current */}
<div className="mt-20 lg:mt-32" />

{/* Recommended - remove this div, add spacing to component instead */}
{/* Remove line 59 entirely, then modify components: */}
```

In `/frontend/components/VerticalSection.tsx` - add spacing wrapper:
```tsx
export default function VerticalSection({ title, slug, articles }: Props) {
  // ... rest of component

  return (
    {/* Wrap section with spacing */}
    <section ref={ref} className="mt-16 sm:mt-20 lg:mt-32">
      {/* existing content */}
    </section>
  );
}
```

---

## NEW COMPONENTS TO CREATE

### 1. HeroSkeleton.tsx (for loading state)

**File:** `/frontend/components/HeroSkeleton.tsx`

```tsx
'use client';

import { motion } from 'framer-motion';

export default function HeroSkeleton() {
  return (
    <section className="relative h-[75vh] sm:h-[80vh] min-h-[500px] sm:min-h-[600px] max-h-[900px] mb-16 sm:mb-20 lg:mb-32 overflow-hidden bg-gray-200">
      {/* Background shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
        animate={{ x: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Content area skeleton */}
      <div className="relative h-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-8 sm:pb-12 lg:pb-16">
        <div className="max-w-4xl w-full space-y-6">
          {/* Badge skeleton */}
          <motion.div
            className="h-8 w-32 bg-gray-300 rounded-full"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Title skeleton (3 lines) */}
          <div className="space-y-3">
            <motion.div
              className="h-12 w-full bg-gray-300 rounded"
              animate={{ opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="h-12 w-3/4 bg-gray-300 rounded"
              animate={{ opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Excerpt skeleton (2 lines) */}
          <div className="space-y-2">
            <motion.div
              className="h-5 w-full bg-gray-300 rounded"
              animate={{ opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="h-5 w-2/3 bg-gray-300 rounded"
              animate={{ opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
          </div>

          {/* CTA button skeleton */}
          <motion.div
            className="h-10 w-40 bg-gray-300 rounded-lg"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </section>
  );
}
```

### 2. Pagination.tsx (for vertical pages)

**File:** `/frontend/components/Pagination.tsx`

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  totalItems,
  itemsPerPage,
}: Props) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-16 space-y-6">
      {/* Results count */}
      <p className="text-center text-sm text-gray-600">
        <span className="font-semibold">{startItem}</span>
        {' '}부터{' '}
        <span className="font-semibold">{endItem}</span>
        {' '}까지{' '}
        <span className="font-semibold">{totalItems}</span>
        {' '}개 중
      </p>

      {/* Pagination buttons */}
      <div className="flex justify-center items-center gap-2 flex-wrap">
        {/* Previous */}
        {currentPage > 1 && (
          <Link
            href={`${baseUrl}?page=${currentPage - 1}`}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            이전
          </Link>
        )}

        {/* Page numbers */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <motion.div key={pageNum}>
              {currentPage === pageNum ? (
                <button
                  disabled
                  className="px-4 py-2 rounded-lg bg-black text-white font-semibold"
                >
                  {pageNum}
                </button>
              ) : (
                <Link
                  href={`${baseUrl}?page=${pageNum}`}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  {pageNum}
                </Link>
              )}
            </motion.div>
          );
        })}

        {/* Next */}
        {currentPage < totalPages && (
          <Link
            href={`${baseUrl}?page=${currentPage + 1}`}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            다음
          </Link>
        )}
      </div>
    </div>
  );
}
```

---

## SUMMARY CHECKLIST

- [ ] Update Header.tsx button touch targets (p-2 → p-3)
- [ ] Add global focus ring styles to globals.css
- [ ] Standardize ArticleCard hover scale to 1.05
- [ ] Add responsive prose sizing (prose-sm sm:prose-base lg:prose-lg)
- [ ] Add md: breakpoints to all grid layouts
- [ ] Fix hero section heights with responsive values
- [ ] Update newsletter form padding (px-4 py-3 sm:px-6 sm:py-4)
- [ ] Create HeroSkeleton.tsx component
- [ ] Create Pagination.tsx component
- [ ] Add image captions to ArticleContent
- [ ] Test on multiple devices (375px, 430px, 768px, 1024px)
- [ ] Verify all buttons have focus rings
- [ ] Verify all touch targets are 44px minimum
- [ ] Test keyboard navigation (Tab key)
- [ ] Run accessibility audit (Lighthouse)

