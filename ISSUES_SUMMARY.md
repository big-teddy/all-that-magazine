# All That Magazine - Issues Summary

## Quick Stats
- **Total Issues:** 8
- **Critical:** 3
- **High:** 3
- **Medium:** 2
- **Build Status:** ✅ Passes
- **Estimated Fix Time:** 3-4 days

---

## CRITICAL ISSUES (Fix Before Launch)

| # | Issue | File | Impact | Time |
|---|-------|------|--------|------|
| 1 | Missing OG Image Asset | `/frontend/public/` | Social shares broken | 1 hr |
| 2 | Search TODO (not implemented) | `Header.tsx:33` | Users can't search | 1 day |
| 3 | Newsletter TODO (not implemented) | `NewsletterSection.tsx:13` | Lost subscriber data | 1 day |

---

## HIGH PRIORITY ISSUES

| # | Issue | File | Impact | Time |
|---|-------|------|--------|------|
| 4 | Paywall Button Not Functional | `Paywall.tsx:13` | Can't access premium content | 30 min |
| 5 | Subscribe Buttons Not Wired | `Header.tsx:104,195` | Users can't subscribe | 30 min |
| 6 | No Dynamic Article Metadata | `[slug]/page.tsx` | Poor SEO, broken social shares | 4 hrs |

---

## MEDIUM PRIORITY ISSUES

| # | Issue | File | Impact | Difficulty |
|---|-------|------|--------|------------|
| 7 | Keyboard Navigation Missing | `Header.tsx` | Can't close modals with Escape | Low |
| 8 | XSS Risk (No HTML Sanitization) | `ArticleContent.tsx:62` | Security vulnerability | Medium |

---

## What's Working Well ✅

### Performance
- First Load JS: **146KB** (excellent)
- Image optimization: **Properly configured**
- Code splitting: **Implemented correctly**

### Code Quality
- TypeScript: **Strict mode enabled**
- Error handling: **Global error boundary present**
- Responsive design: **Properly implemented**
- Accessibility: **4 ARIA labels in place**

### Architecture
- Component structure: **Clean and modular**
- Data fetching: **GraphQL with error handling**
- Styling: **Tailwind CSS properly configured**
- Animations: **Framer Motion optimized**

---

## Action Items

### Before Deployment (4 hrs work)
```
- [ ] Add og-image.jpg to /frontend/public/
- [ ] Add generateMetadata to article page
- [ ] Wire up subscribe button onClick handlers
- [ ] Fix Paywall button onClick
```

### Backend Work Required (3-4 days)
```
- [ ] Search API endpoint
- [ ] Newsletter signup endpoint
- [ ] Email service integration
- [ ] Subscription/payment system
- [ ] HTML sanitization middleware
```

### Post-Launch (Week 1)
```
- [ ] Dynamic OG image generation
- [ ] Analytics integration
- [ ] Sentry error tracking
- [ ] Email automation
```

---

## Files Most Critical to Update

1. **`/frontend/app/layout.tsx`** - Add OG image, fix favicon reference
2. **`/frontend/app/[vertical]/[slug]/page.tsx`** - Add generateMetadata
3. **`/frontend/components/Header.tsx`** - Wire up subscribe button
4. **`/frontend/components/Paywall.tsx`** - Add onClick handler
5. **`/frontend/components/ArticleContent.tsx`** - Add DOMPurify sanitization

---

## Code Snippets to Copy/Paste

### 1. Add Escape Key Handler
```tsx
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };
  
  if (isSearchOpen || isMobileMenuOpen) {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }
}, [isSearchOpen, isMobileMenuOpen]);
```

### 2. Fix Subscribe Button
```tsx
// In Header.tsx, replace motion.button with:
import { useRouter } from 'next/navigation';

const router = useRouter();

<motion.button
  onClick={() => router.push('/subscribe')}
  className="hidden md:block text-sm font-medium px-4 py-2 border-2 border-brand-black rounded-lg..."
>
  구독하기
</motion.button>
```

### 3. Add Article Metadata
```tsx
// At top of [slug]/page.tsx
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const data = await fetchGraphQL<SingleArticleResponse>(GET_ARTICLE_BY_SLUG, {
    slug: params.slug,
  });
  
  const article = data.articleBy;
  const vertical = article.verticals.nodes[0];
  
  return {
    title: article.title,
    description: article.articleFields.customExcerpt,
    openGraph: {
      title: article.title,
      description: article.articleFields.customExcerpt,
      images: [{
        url: article.articleFields.featuredImage?.node?.sourceUrl || '/og-image.jpg',
        width: 1200,
        height: 630,
      }],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${vertical.slug}/${article.slug}`,
    },
  };
}
```

### 4. Sanitize HTML Content
```tsx
// Install: npm install isomorphic-dompurify
import DOMPurify from 'isomorphic-dompurify';

<div
  className="article-prose-content..."
  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
/>
```

---

## Testing Checklist

- [ ] Build completes without errors
- [ ] Search opens modal (doesn't crash)
- [ ] Newsletter form shows loading state
- [ ] Subscribe button navigates to /subscribe
- [ ] Paywall button navigates to /subscribe
- [ ] OG image shows in Twitter card preview
- [ ] Article metadata unique per page
- [ ] Escape key closes modals
- [ ] All images load (no 404s)
- [ ] Mobile menu works
- [ ] Dark mode text readable

---

## References

- Full report: `QUALITY_CHECK_REPORT.md`
- Build output: `npm run build`
- TypeScript check: `npx tsc --noEmit`
