# Cursor AI Master Instructions for All That Magazine

## Project Context

You are helping build **All That Magazine** - a premium headless WordPress + Next.js magazine with three verticals (Wellness, Lifestyle, Tech) targeting Korean and global audiences.

---

## Core Project Information

**Tech Stack:**
- Backend: WordPress 6.4+ (Headless CMS)
- Frontend: Next.js 14 with App Router
- Styling: Tailwind CSS (Bold Minimalism aesthetic)
- API: WPGraphQL
- Hosting: Hostinger (WordPress) + Vercel (Next.js)
- Payments: Kakao Pay, Naver Pay, NHN KCP

**Key Design Principles:**
- Bold Minimalism (60% white space, 30% content, 10% bold accents)
- Mobile-first (90%+ Korean users on mobile)
- Typography: Playfair Display (headlines) + Inter (body)
- Color: Vertical-specific accents (Wellness green, Lifestyle purple, Tech blue)

---

## How to Use These Documents

### Document Structure

```
1. CURSOR_MASTER_INSTRUCTIONS.md (this file)
   → Overview and how to use Cursor AI

2. PRD.md
   → Complete product requirements
   → Single source of truth for all features

3. WORDPRESS_SETUP.md
   → WordPress backend setup specifications
   → Plugin generation instructions

4. NEXTJS_ARCHITECTURE.md
   → Next.js frontend complete architecture
   → All routes, components, and structure

5. DESIGN_SYSTEM.md
   → Bold Minimalism design specifications
   → Typography, colors, spacing, components

6. GRAPHQL_SCHEMA.md
   → All GraphQL queries and types
   → API documentation

7. DEPLOYMENT_GUIDE.md
   → Step-by-step deployment process
   → Hostinger + Vercel + DNS configuration
```

---

## Cursor AI Workflow

### Phase 1: Setup (Week 1)

**Step 1: Configure Cursor AI**
```
1. Copy this file's content to your project root as `.cursorrules`
2. Open Cursor AI in project folder
3. Cursor will automatically load these rules
```

**Step 2: Read Project Context**
```
Prompt: "Read PRD.md and summarize the key requirements for All That Magazine"

Expected: Cursor should understand:
- 3 verticals (Wellness, Lifestyle, Tech)
- Headless architecture
- Korean payment integration
- Bold Minimalism design
- 12-week timeline to MVP
```

### Phase 2: WordPress Backend (Week 2-3)

**Generating the Setup Plugin:**

```
Prompt: "Read WORDPRESS_SETUP.md and generate the complete WordPress setup plugin with all 7 files as specified. Create it as a zip-ready folder structure."

Cursor should create:
all-that-magazine-setup/
├── all-that-magazine-setup.php
├── includes/
│   ├── class-plugin-installer.php
│   ├── class-post-types.php
│   ├── class-taxonomies.php
│   ├── class-acf-fields.php
│   ├── class-settings.php
│   └── class-admin-page.php
└── README.md
```

**Testing the Plugin:**
```
Prompt: "Create test cases for the WordPress setup plugin to verify all functionality works correctly"

Should include:
- Custom post type registration test
- Taxonomy creation test
- ACF fields test
- GraphQL endpoint test
```

### Phase 3: Next.js Frontend (Week 4-7)

**Step 1: Project Initialization**
```
Prompt: "Read NEXTJS_ARCHITECTURE.md and initialize the Next.js project with all dependencies listed in package.json"

Cursor should run:
npx create-next-app@latest all-that-magazine-frontend --typescript --tailwind --app
npm install graphql-request graphql
```

**Step 2: Create Core Library Files**
```
Prompt: "Following NEXTJS_ARCHITECTURE.md, create all files in the lib/ folder: wordpress.ts, queries.ts, types.ts, and utils.ts"

Cursor should generate GraphQL client and all query definitions.
```

**Step 3: Build Homepage**
```
Prompt: "Create the homepage (app/page.tsx) with 3 vertical sections as specified in NEXTJS_ARCHITECTURE.md. Each section should show 1 hero article + 4 thumbnails."

Cursor should:
1. Fetch articles by vertical using GraphQL
2. Pass data to VerticalSection component
3. Implement ISR with revalidate: 60
```

**Step 4: Implement Design System**
```
Prompt: "Read DESIGN_SYSTEM.md and implement the complete Bold Minimalism design system in globals.css and tailwind.config.ts"

Cursor should configure:
- Typography scale (Perfect Fourth ratio)
- Color system (brand + verticals)
- Spacing scale (4px base)
- Component styles
```

**Step 5: Create Components**
```
Prompt: "Generate all components specified in NEXTJS_ARCHITECTURE.md: Header, Footer, ArticleCard (hero + thumbnail variants), VerticalSection, Paywall, RelatedArticles"

Each component should:
- Follow design system
- Use TypeScript
- Be mobile-responsive
- Include accessibility features
```

**Step 6: Article Pages**
```
Prompt: "Create the article page at app/[vertical]/[slug]/page.tsx following NEXTJS_ARCHITECTURE.md specifications"

Should include:
- Dynamic route handling
- GraphQL data fetching
- Featured image
- Full content rendering
- Related articles
- Author bio
- Paywall for premium content
```

### Phase 4: Design System Implementation (Ongoing)

**Typography:**
```
Prompt: "Implement the typography system from DESIGN_SYSTEM.md with Playfair Display and Inter fonts using next/font/google"

Check:
- Font weights correct (400, 700, 900)
- Typography scale matches Perfect Fourth
- Line heights appropriate (1.1 for headlines, 1.7 for body)
- Mobile font sizes adjusted (minimum 16px)
```

**Colors:**
```
Prompt: "Implement the color system from DESIGN_SYSTEM.md with CSS custom properties for brand colors and vertical-specific accents"

Verify:
- Wellness: #4CAF50
- Lifestyle: #9C27B0
- Tech: #2196F3
- WCAG AA contrast compliance
```

**Layout:**
```
Prompt: "Create the 12-column grid system specified in DESIGN_SYSTEM.md with responsive breakpoints"

Ensure:
- Mobile: stacked (12 columns)
- Tablet: 6+6 columns
- Desktop: flexible column spans
```

### Phase 5: Testing & Optimization (Week 10-11)

**Performance Testing:**
```
Prompt: "Analyze the current Next.js build and suggest optimizations to achieve 85+ mobile PageSpeed score"

Cursor should check:
- Image optimization (WebP, lazy loading)
- Font loading strategy
- Bundle size
- ISR configuration
```

**Security Review:**
```
Prompt: "Review all WordPress plugin code for security vulnerabilities following WordPress Coding Standards"

Must verify:
- SQL queries use $wpdb->prepare()
- All output escaped (esc_html, esc_attr, esc_url)
- Nonces implemented
- Capability checks present
- Input sanitization
```

**Accessibility Audit:**
```
Prompt: "Audit all components for WCAG 2.2 Level AA compliance per DESIGN_SYSTEM.md"

Check:
- Color contrast (4.5:1 minimum)
- Touch targets (44x44px minimum)
- Focus indicators
- Alt text on images
- Semantic HTML
```

---

## Common Prompting Patterns

### 1. Document-Driven Development

**Always reference the specific document:**
```
❌ Bad: "Create a homepage"
✅ Good: "Read NEXTJS_ARCHITECTURE.md and create the homepage (app/page.tsx) with 3 vertical sections as specified"
```

### 2. Step-by-Step Approach

**Break complex tasks into steps:**
```
Step 1: "Don't code yet. Read NEXTJS_ARCHITECTURE.md and explain your implementation plan for the article page."
Step 2: "Good. Now implement the plan."
Step 3: "Add error handling and loading states."
Step 4: "Optimize for performance."
```

### 3. Verification Requests

**Always verify against specifications:**
```
"Check if the ArticleCard component follows the specifications in DESIGN_SYSTEM.md"
"Verify the GraphQL queries match GRAPHQL_SCHEMA.md"
"Confirm the color system implements the 60-30-10 rule from DESIGN_SYSTEM.md"
```

### 4. Context Preservation

**Maintain context across conversations:**
```
"Continuing from our work on the homepage, now create the [vertical]/page.tsx files for each vertical"
"Based on the ArticleCard component we created, now implement the RelatedArticles component"
```

---

## Cursor AI Capabilities & Limitations

### What Cursor AI Can Do Well

✅ **Generate boilerplate code**
- React components with TypeScript
- GraphQL queries and types
- Tailwind CSS styling
- Next.js page routes

✅ **Follow specifications**
- Implement designs from detailed specs
- Create components matching design systems
- Generate code following coding standards

✅ **Refactor and optimize**
- Improve code structure
- Optimize performance
- Add TypeScript types
- Fix linting errors

✅ **Explain and document**
- Add code comments
- Generate documentation
- Explain complex logic
- Create README files

### What Requires Human Review

⚠️ **Security**
- WordPress SQL queries (must use $wpdb->prepare())
- Input validation and sanitization
- Authentication and authorization
- XSS and CSRF protection

⚠️ **Business Logic**
- Membership tier rules
- Payment flow logic
- Content gating decisions
- User permissions

⚠️ **Design Decisions**
- Color choices for new features
- Layout variations not in specs
- User experience edge cases
- Accessibility improvements

⚠️ **Architecture**
- Database schema changes
- API design decisions
- Performance optimization strategies
- Scaling considerations

---

## Code Quality Standards

### TypeScript

```typescript
// ✅ Good: Explicit types
interface ArticleCardProps {
  article: Article;
  variant: 'hero' | 'thumbnail';
}

// ❌ Bad: Any types
function ArticleCard(props: any) { }
```

### React Components

```typescript
// ✅ Good: Server component by default
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// ❌ Bad: Client component when not needed
'use client';
export default function Page() { }
```

### GraphQL Queries

```typescript
// ✅ Good: Request only needed fields
query GetArticleCard {
  articles {
    nodes {
      id
      title
      slug
    }
  }
}

// ❌ Bad: Request all fields
query GetEverything {
  articles {
    nodes {
      id
      title
      content  # Large, unnecessary
      # ... many more fields
    }
  }
}
```

### CSS/Tailwind

```tsx
// ✅ Good: Use design system tokens
<h1 className="font-serif text-4xl lg:text-5xl font-black">

// ❌ Bad: Arbitrary values
<h1 className="text-[47px] font-[923]">
```

---

## Error Handling Patterns

### Next.js Data Fetching

```typescript
// ✅ Good: Proper error handling
try {
  const data = await fetchGraphQL<ArticlesResponse>(query);
  return data.articles.edges.map(edge => edge.node);
} catch (error) {
  console.error('Failed to fetch articles:', error);
  return []; // Return empty array, not throw
}
```

### GraphQL Client

```typescript
// ✅ Good: Specific error messages
if (!endpoint) {
  throw new Error('WORDPRESS_GRAPHQL_ENDPOINT is not set');
}

// ❌ Bad: Generic errors
throw new Error('Something went wrong');
```

---

## Performance Guidelines

### Image Optimization

```tsx
// ✅ Good: Next.js Image with optimization
<Image
  src={imageUrl}
  alt={altText}
  width={1200}
  height={675}
  quality={80}
  priority={false}
  loading="lazy"
/>

// ❌ Bad: Regular img tag
<img src={imageUrl} alt={altText} />
```

### ISR Configuration

```typescript
// ✅ Good: Appropriate revalidation
export const revalidate = 60; // 1 minute for news

// ❌ Bad: Too aggressive
export const revalidate = 1; // Every second (expensive)
```

---

## Testing Checklist for Cursor AI

When generating code, automatically verify:

```
□ TypeScript types are explicit
□ Components are server components unless 'use client' needed
□ GraphQL queries request only needed fields
□ Images use Next.js Image component
□ Colors use Tailwind classes (not arbitrary values)
□ Spacing uses design system scale
□ Mobile responsive (320px minimum)
□ Accessibility attributes present
□ Error handling implemented
□ Loading states included
```

---

## Project-Specific Rules

### WordPress

```php
// ALWAYS use prepared statements
$wpdb->prepare("SELECT * FROM {$wpdb->posts} WHERE ID = %d", $id);

// ALWAYS escape output
echo esc_html($title);
echo esc_url($link);
echo esc_attr($attribute);

// ALWAYS verify nonces
wp_verify_nonce($_POST['nonce'], 'action_name');

// ALWAYS check capabilities
if (!current_user_can('manage_options')) {
    wp_die('Unauthorized');
}
```

### Next.js

```typescript
// ALWAYS use server components by default
// Only add 'use client' when necessary

// ALWAYS use environment variables
const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

// ALWAYS implement ISR
export const revalidate = 60;

// ALWAYS handle errors
try {
  // ... fetch data
} catch (error) {
  console.error(error);
  return defaultValue;
}
```

### Design System

```tsx
// ALWAYS use design system tokens
className="font-serif text-4xl font-black mb-6"

// NEVER use arbitrary values
className="text-[43px] mb-[23px]" // ❌

// ALWAYS follow 60-30-10 rule
// 60% white space, 30% content, 10% accent colors
```

---

## Deployment Checklist

Before deploying, verify:

```
Backend (WordPress):
□ All plugins updated
□ Security scan passed (Wordfence)
□ Backup created
□ GraphQL endpoint accessible
□ CORS headers configured
□ SSL certificate valid

Frontend (Next.js):
□ npm run build succeeds
□ No TypeScript errors
□ No ESLint errors
□ Environment variables set in Vercel
□ Images optimize correctly
□ PageSpeed score 85+ mobile
□ All routes load correctly
□ Error pages styled

DNS:
□ A record points to Vercel (76.76.21.21)
□ www CNAME to cname.vercel-dns.com
□ wp subdomain points to Hostinger
□ SSL certificates active (green lock)
```

---

## Getting Help from Cursor AI

### When Stuck

```
"I'm getting [error message]. Based on [document name], what should I check?"

Example:
"Images aren't loading. Based on NEXTJS_ARCHITECTURE.md, what should I check in next.config.mjs?"
```

### When Unclear

```
"Explain the [concept] from [document name] in simpler terms"

Example:
"Explain the ISR configuration from NEXTJS_ARCHITECTURE.md in simpler terms"
```

### When Optimizing

```
"Analyze [file/component] and suggest improvements based on [document name]"

Example:
"Analyze app/page.tsx and suggest performance improvements based on NEXTJS_ARCHITECTURE.md"
```

---

## Success Metrics

Track these throughout development:

**Week 2-3: WordPress Backend**
```
□ GraphQL query returns sample articles
□ Custom post type visible in admin
□ ACF fields appear on articles
□ Taxonomy terms created (wellness, lifestyle, tech)
```

**Week 7: Next.js Frontend**
```
□ Homepage displays 3 verticals
□ Article pages render correctly
□ Images load from WordPress
□ Mobile responsive verified
□ PageSpeed 85+ mobile
```

**Week 12: Launch**
```
□ DNS configured correctly
□ SSL certificates active
□ Payment flows working
□ Analytics tracking
□ No critical errors
□ 99%+ uptime
```

---

## Final Notes

### Philosophy

This project uses **document-driven development**:
1. Specifications exist before code
2. Code implements specifications exactly
3. Changes update documents first, then code
4. Cursor AI bridges documents to implementation

### Communication

When asking Cursor AI:
- **Reference documents**: "According to PRD.md..."
- **Be specific**: "Create the ArticleCard component with hero and thumbnail variants"
- **Verify output**: "Does this match DESIGN_SYSTEM.md?"

### Iteration

Development is iterative:
1. Generate initial implementation
2. Test against specs
3. Refine based on testing
4. Optimize for performance
5. Deploy and monitor

---

## Quick Reference

**Most Used Prompts:**

```bash
# Setup
"Read PRD.md and summarize the project requirements"

# WordPress
"Read WORDPRESS_SETUP.md and generate the setup plugin"

# Next.js
"Read NEXTJS_ARCHITECTURE.md and create [component/page]"

# Design
"Implement [component] following DESIGN_SYSTEM.md"

# Testing
"Review [file] for security issues and WCAG compliance"

# Optimization
"Analyze bundle size and suggest optimizations"
```

**Document Reading Order:**

```
1st: PRD.md (understand requirements)
2nd: Specific doc for current task
3rd: DESIGN_SYSTEM.md (for styling)
4th: GRAPHQL_SCHEMA.md (for data)
```

---

**End of Master Instructions**

Save this file as `.cursorrules` in your project root.
Cursor AI will automatically load these instructions and follow them throughout development.

Good luck building All That Magazine! 🚀
