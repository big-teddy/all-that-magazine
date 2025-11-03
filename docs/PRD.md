# All That Magazine - Product Requirements Document (PRD)

## Project Overview

**Product Name:** All That Magazine  
**Type:** Premium Headless WordPress + Next.js Magazine  
**Target Market:** Korean + Global audience  
**Verticals:** Wellness, Lifestyle, Tech  
**Timeline:** 12 weeks to MVP launch  
**Budget:** ₩1.5M-2M (first year)

---

## Strategic Positioning

### Vision
Premium multi-vertical magazine combining Korean wellness insights with global lifestyle and technology coverage, positioned between mass-market digital magazines and luxury print publications.

### Target Audience
- **Age:** 25-40 years
- **Income:** Middle to upper-middle class (professional)
- **Mindset:** Globally minded, digitally native, values quality content
- **Location:** Primary Korea, Secondary Global
- **Device:** 90% mobile-first

### Differentiation
1. **Multi-vertical Integration:** Seamless content across Wellness + Lifestyle + Tech (vs. single-category competitors)
2. **Bold Minimalism Design:** 2024-2025 award-winning aesthetic (vs. cluttered news sites)
3. **Korean Payment Native:** Kakao Pay + Naver Pay (vs. international credit card only)
4. **Premium Positioning:** Subscription-worthy quality (vs. ad-dependent free content)
5. **Headless Architecture:** Modern tech stack enabling future expansion (vs. legacy WordPress themes)

---

## Technical Architecture

### Stack
```
Backend:
- WordPress 6.4+ (Headless CMS)
- WPGraphQL (API)
- Advanced Custom Fields (Content structure)
- Hostinger Premium (₩50k/year hosting)

Frontend:
- Next.js 14 App Router
- TypeScript (strict mode)
- Tailwind CSS
- Vercel (free → ₩250k/year as scale)

Payments:
- Paid Memberships Pro (free)
- WooCommerce + Korea for WooCommerce (₩250k-500k)
- Kakao Pay + Naver Pay + NHN KCP
```

### Why Headless?
1. **Performance:** SSG/ISR = instant page loads
2. **Flexibility:** WordPress = editor-friendly, Next.js = developer-friendly
3. **Scalability:** Add mobile apps later without backend changes
4. **Modern Stack:** React ecosystem = better developer experience
5. **Future-proof:** No migration needed as we grow

---

## Content Structure

### Custom Post Type: Article
```
Fields:
- title (string, required)
- content (rich text, required)
- featured_image (image, required)
- custom_excerpt (textarea, 200 chars, required)
- vertical (taxonomy: wellness|lifestyle|tech, required)
- read_time (number, auto-calculated)
- is_premium (boolean, default false)
- author_bio (rich text)
- published_date (datetime, auto)
- updated_date (datetime, auto)

Meta:
- SEO title (string)
- SEO description (string, 160 chars)
- Open Graph image (image)
```

### Taxonomy: Vertical
```
Terms:
1. Wellness
   - Color: #4CAF50 (green)
   - Slug: wellness
   
2. Lifestyle  
   - Color: #9C27B0 (purple)
   - Slug: lifestyle
   
3. Tech
   - Color: #2196F3 (blue)
   - Slug: tech

Future expansion ready:
- Beauty (4th vertical)
- Food/Table (5th vertical)
- Space/Design (6th vertical)
```

### Categories (within verticals)
```
Wellness:
- Mental Health
- Fitness
- Nutrition
- Sleep & Recovery
- Mindfulness

Lifestyle:
- Culture
- Travel
- Interviews
- Trends
- Entertainment

Tech:
- Wearables
- Apps
- AI & Wellness
- Gadgets
- Innovation
```

---

## User Flows

### Reader Journey (Non-Member)
```
1. Land on homepage
   → See 3 vertical sections (1 hero + 4 thumbnails each)
   
2. Click article
   → Read first 3 paragraphs
   → Hit paywall ("Subscribe to continue")
   
3. Click Subscribe
   → See 3 tiers (Free, Plus ₩9,900/month, Premium ₩24,900/month)
   → Choose tier
   
4. Payment
   → Kakao Pay / Naver Pay / Credit Card
   → Instant access
   
5. Read unlimited
   → No ads
   → Premium badge
```

### Editor Journey (Admin)
```
1. Login to WordPress
   → wp.allthatmagazine.com/wp-admin
   
2. Create Article
   → Articles → Add New
   → Fill title, content, featured image
   → Select vertical (wellness/lifestyle/tech)
   → Choose categories
   → Set "Premium Content" toggle
   → Publish
   
3. Article appears
   → GraphQL API updates
   → Next.js ISR regenerates (60s)
   → Live on site
```

---

## Membership Tiers

### Free Tier
```
Price: ₩0
Access:
- 5 articles per month
- Newsletter subscription
- Basic archives (6+ months old)
- Read-only community

Goal: Build email list, SEO
Conversion target: 10-15% to Plus
```

### Plus Tier (Most Popular)
```
Price: ₩9,900/month or ₩99,000/year (16% discount)
Access:
- Unlimited articles
- Ad-free experience
- Full archives
- Exclusive weekly newsletter
- Premium multimedia
- Comment privileges
- Mobile app access (future)

Goal: Primary revenue driver
Target: 60-70% of paid subscribers
```

### Premium Tier
```
Price: ₩24,900/month or ₩249,000/year (16% discount)
Access:
- All Plus features
- 24-48h early access
- Exclusive investigative reports
- Members-only events
- Direct journalist Q&A
- Downloadable PDFs
- Priority support
- Gift subscriptions (2)

Goal: Super-fans + professionals
Target: 20-30% of paid subscribers
```

---

## Design Requirements (Bold Minimalism)

### Typography
```
Headlines: 
- Font: Playfair Display (Google Fonts, free)
- Weight: 900 (Black)
- Size: 48px-72px (desktop), 32px-48px (mobile)
- Line height: 1.1-1.2
- Letter spacing: -0.02em

Body:
- Font: Inter (Google Fonts, free)
- Weight: 400 (Regular)
- Size: 18px (desktop), 16px (mobile)
- Line height: 1.7
- Letter spacing: 0

Scale: Perfect Fourth (1.333 ratio)
- 12px (caption)
- 16px (small)
- 18px (base)
- 24px (h4)
- 32px (h3)
- 43px (h2)
- 57px (h1)
```

### Colors
```
Brand:
- Black: #000000 (primary text)
- White: #FFFFFF (background)
- Neutral: #E5E1DA (subtle backgrounds)

Verticals:
- Wellness: #4CAF50 (green-500)
- Lifestyle: #9C27B0 (purple-600)
- Tech: #2196F3 (blue-500)

Semantic:
- Success: #10B981
- Error: #EF4444
- Warning: #F59E0B
- Info: #3B82F6

Usage:
- 60% white space / neutral
- 30% imagery / content
- 10% accent colors (vertical-specific)
```

### Layout
```
Grid: 12-column CSS Grid
Gap: 30px (desktop), 20px (mobile)
Max width: 1440px
Breakpoints:
- Mobile: 320px-767px
- Tablet: 768px-1023px
- Desktop: 1024px+

Spacing scale (Tailwind):
- 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px

White space principle:
- Minimum 40% of any layout should be empty
- Generous padding around content blocks
- Never cramped or cluttered
```

### Components
```
Header:
- Logo (left)
- Navigation: Wellness | Lifestyle | Tech (center)
- Search + Login (right)
- Sticky on scroll
- Mobile: Hamburger menu

Article Card (Hero):
- Large image (16:9 aspect ratio)
- Vertical badge (top-left with color)
- Title (Playfair Display, 36-48px)
- Excerpt (2-3 lines)
- Read time + Premium badge
- Hover: Scale 1.05 + shadow

Article Card (Thumbnail):
- Small image (4:3 aspect ratio)
- Vertical badge
- Title (Playfair Display, 24px)
- Read time
- Compact layout

Footer:
- Logo + tagline
- Vertical links
- Social media
- Newsletter signup
- Legal (Privacy, Terms)
```

---

## Performance Requirements

### Core Web Vitals
```
LCP (Largest Contentful Paint): < 2.5s
INP (Interaction to Next Paint): < 200ms
CLS (Cumulative Layout Shift): < 0.1

Google PageSpeed Insights:
- Mobile: 85+ score
- Desktop: 95+ score
```

### Technical Implementation
```
Images:
- Next.js Image component (automatic optimization)
- WebP format (80% quality)
- Lazy loading (below fold)
- Responsive srcset

Fonts:
- next/font/google (automatic optimization)
- Subset: latin + korean
- Display: swap
- Preload critical fonts

Caching:
- ISR: Revalidate every 60 seconds
- Static pages: CDN cached forever
- API: GraphQL responses cached

Bundle:
- Code splitting (automatic Next.js)
- Tree shaking
- Minification
- Compression (gzip/brotli)
```

---

## SEO Strategy

### Technical SEO
```
✅ Semantic HTML5
✅ Structured data (JSON-LD)
   - Article schema
   - Organization schema
   - BreadcrumbList schema
✅ XML sitemap (auto-generated)
✅ Robots.txt
✅ Canonical URLs
✅ Open Graph tags
✅ Twitter Cards
✅ Mobile-friendly (responsive)
✅ Fast loading (Core Web Vitals)
✅ HTTPS only
```

### Content SEO
```
Metadata:
- Title: 50-60 characters, keyword-front-loaded
- Description: 150-160 characters, compelling CTA
- H1: One per page, matches title
- H2-H6: Hierarchical structure

Internal linking:
- Related articles (3-5 per article)
- Vertical landing pages
- Category pages
- Author pages

External linking:
- Credible sources for claims
- Nofollow on sponsored/affiliate
- Open in new tab
```

---

## Accessibility (WCAG 2.2 Level AA)

### Requirements
```
Color contrast:
- Text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI elements: 3:1 minimum

Typography:
- Minimum 16px body text
- Readable fonts (Inter)
- Line height 1.5+ for body text
- No text in images (unless alt text)

Navigation:
- Keyboard accessible (tab order)
- Skip to content link
- Focus indicators (2px outline)
- ARIA labels where needed

Images:
- Descriptive alt text (all images)
- Decorative images: alt=""
- Complex images: long descriptions

Forms:
- Labels for all inputs
- Error messages clear
- Required fields indicated
- Help text where needed

Media:
- Captions for videos
- Transcripts for audio
- Pause/stop controls
```

---

## Security Requirements

### Authentication
```
- JWT tokens (httpOnly cookies)
- Secure session storage
- CSRF protection (nonces)
- Rate limiting (login attempts)
- Password requirements (12+ chars, mixed)
- 2FA option (future)
```

### Data Protection
```
- HTTPS everywhere (forced)
- Environment variables for secrets
- Database credentials secured
- API keys in .env only
- No sensitive data in client code
- Regular security audits
```

### WordPress Hardening
```
- Wordfence Security plugin
- Disable file editing (define('DISALLOW_FILE_EDIT', true))
- Limit login attempts
- Strong admin passwords
- Regular updates (core, plugins, themes)
- Daily backups (offsite storage)
- Database prefix changed from wp_
```

---

## Analytics & Monitoring

### Metrics to Track
```
Traffic:
- Page views
- Unique visitors
- Sessions
- Bounce rate
- Time on page
- Traffic sources

Engagement:
- Articles per session
- Return visitor rate
- Newsletter signups
- Social shares
- Comments (future)

Business:
- Subscription conversions (Free → Plus → Premium)
- MRR (Monthly Recurring Revenue)
- Churn rate
- LTV (Lifetime Value)
- CAC (Customer Acquisition Cost)

Technical:
- Core Web Vitals
- Error rates
- API response times
- Uptime percentage
```

### Tools
```
- Google Analytics 4 (free)
- Vercel Analytics (included)
- WordPress admin stats
- Stripe/Kakao Pay dashboards (revenue)
```

---

## Launch Phases

### Phase 0: Setup (Week 1)
```
□ Hostinger configured
□ WordPress installed (wp.allthatmagazine.com)
□ Cursor AI environment ready
□ All documentation complete
```

### Phase 1: WordPress Backend (Week 2-3)
```
□ Auto-setup plugin created
□ Custom post type (article) registered
□ Taxonomy (vertical) configured
□ ACF fields created
□ WPGraphQL tested
□ 3 sample articles published (1 per vertical)
```

### Phase 2: Next.js Frontend (Week 4-7)
```
□ Project initialized
□ GraphQL client configured
□ Homepage built (3 vertical sections)
□ Article pages (single + archive)
□ Vertical landing pages
□ Header + Footer components
□ Design system implemented
□ Mobile responsive
□ Performance optimized (85+ mobile score)
```

### Phase 3: Membership & Payments (Week 8-9)
```
□ NextAuth.js configured
□ Login/Register pages
□ Paywall component
□ Korea for WooCommerce installed
□ Kakao Pay / Naver Pay configured
□ 3-tier membership levels set
□ Payment flow tested
```

### Phase 4: Content & Testing (Week 10-11)
```
□ 15-20 articles published (5-7 per vertical)
□ Images optimized
□ SEO metadata complete
□ 24-point launch checklist
□ Beta user testing (5-10 users)
□ Bug fixes
```

### Phase 5: Launch (Week 12)
```
□ DNS configured (allthatmagazine.com → Vercel)
□ SSL verified
□ Final backups
□ Monitoring enabled
□ Soft launch (email list)
□ Social media announcement
□ 72-hour intensive monitoring
```

---

## Success Criteria (End of Week 12)

### Technical
```
✅ Site loading < 2.5s (LCP)
✅ Mobile PageSpeed 85+
✅ Zero critical bugs
✅ 99.9% uptime
✅ All payment flows working
✅ GraphQL API stable
```

### Content
```
✅ 15-20 published articles
✅ All 3 verticals represented
✅ High-quality imagery
✅ SEO metadata complete
✅ No Lorem Ipsum anywhere
```

### Business
```
✅ 3-tier membership live
✅ Kakao Pay + Naver Pay working
✅ At least 1 paid subscriber (test)
✅ Newsletter signup functional
✅ Analytics tracking conversions
```

### User Experience
```
✅ Mobile-first responsive
✅ Intuitive navigation
✅ Fast interactions
✅ Accessible (WCAG AA)
✅ No broken links
✅ Beautiful design (Bold Minimalism)
```

---

## Future Roadmap (Post-Launch)

### Month 2-3
```
- Comment system
- Author pages
- Search functionality
- Related articles algorithm
- Newsletter automation
```

### Month 4-6
```
- 4th vertical (Beauty or Food)
- Member dashboard
- Bookmarks/favorites
- Mobile app (React Native)
- Advanced analytics
```

### Month 7-12
```
- 5th-6th verticals
- Live events/webinars
- Podcast integration
- Community forum
- API for partners
```

---

## Risk Mitigation

### Technical Risks
```
Risk: WordPress API down
Mitigation: ISR caching, fallback content, uptime monitoring

Risk: Payment gateway failure
Mitigation: Multiple gateways, error handling, support contact

Risk: Performance degradation
Mitigation: Regular monitoring, CDN, image optimization, code splitting

Risk: Security breach
Mitigation: Wordfence, regular updates, backups, security audits
```

### Business Risks
```
Risk: Low conversion rates
Mitigation: A/B testing, user feedback, pricing experiments

Risk: High churn
Mitigation: Quality content, exclusive features, engagement metrics

Risk: Competition
Mitigation: Unique positioning, multi-vertical, Korean payment native
```

---

## Budget Breakdown (First Year)

### Development Tools
```
Cursor Pro: $20/month × 12 = ₩320,000
Claude Pro: $20/month × 12 = ₩320,000
```

### Hosting & Infrastructure
```
Hostinger Premium: ₩50,000/year
Vercel: ₩0 (free) → ₩250,000 (when traffic grows)
```

### WordPress Plugins & Services
```
Korea for WooCommerce: ₩250,000-500,000 (one-time)
WooCommerce Subscriptions: $199/year = ₩265,000
WP Rocket (optional): €99/year = ₩140,000
```

### Total First Year
```
Minimum: ₩1,205,000
Realistic: ₩1,500,000-2,000,000
(excludes content production costs)
```

---

## Key Contacts & Resources

### Hostinger
```
Dashboard: hpanel.hostinger.com
WordPress: wp.allthatmagazine.com/wp-admin
FTP: (check Hostinger dashboard)
```

### Development
```
GitHub: (to be created)
Vercel: vercel.com
Cursor AI: cursor.sh
```

### Payments
```
Korea for WooCommerce: contact@greys.co
Kakao Pay: business.kakaopay.com
Naver Pay: admin.pay.naver.com
NHN KCP: admin.kcp.co.kr
```

### Resources
```
WordPress Codex: developer.wordpress.org
Next.js Docs: nextjs.org/docs
WPGraphQL: wpgraphql.com
Tailwind CSS: tailwindcss.com
shadcn/ui: ui.shadcn.com
```

---

## Appendix: Key Decisions Log

### Why Headless?
Traditional WordPress would be faster to launch (8 weeks vs 12 weeks), but Headless provides:
- 2x better performance (SSG vs PHP rendering)
- Future-proof architecture (mobile apps, multiple frontends)
- Modern developer experience (React vs PHP)
- Better security (API-only backend)
Decision: Worth the extra 4 weeks.

### Why Hostinger vs SiteGround?
SiteGround is faster (300ms vs 450ms TTFB) but 3x more expensive (₩160k vs ₩50k/year). For Headless architecture where WordPress is just an API, Hostinger's performance is sufficient. Most users hit Vercel's CDN anyway.
Decision: Hostinger Premium. Upgrade to SiteGround if backend becomes bottleneck.

### Why 3 Tiers vs 2 Tiers?
Psychological pricing research shows 3 tiers convert better:
- Free: Builds list, reduces barrier
- Plus: "Most popular" nudge, targets majority (60-70%)
- Premium: Anchoring effect makes Plus seem reasonable
Decision: 3 tiers (Free, Plus ₩9,900, Premium ₩24,900).

### Why Korean Payment Integration?
Credit cards alone = 70% cart abandonment in Korea. Kakao Pay (36.5M users) + Naver Pay (largest share) are expected by Korean users. ₩500k investment pays for itself with first 10-20 subscribers.
Decision: Mandatory, not optional.

---

**End of PRD**

This document is the single source of truth for All That Magazine.
All Cursor AI prompts should reference this PRD for context and requirements.
