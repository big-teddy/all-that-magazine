# All That Magazine - Frontend

Next.js 14 frontend for All That Magazine, a premium headless WordPress magazine.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript (strict mode)
- ✅ Tailwind CSS (Bold Minimalism design)
- ✅ GraphQL integration with WordPress backend
- ✅ ISR (Incremental Static Regeneration)
- ✅ Responsive design (mobile-first)
- ✅ Image optimization with Next/Image

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: GraphQL (graphql-request)
- **Fonts**: Playfair Display (headlines) + Inter (body)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your WordPress GraphQL endpoint:

```env
WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=your-secret-key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage (3 verticals)
│   ├── [vertical]/
│   │   ├── page.tsx           # Vertical landing page
│   │   └── [slug]/
│   │       └── page.tsx       # Single article page
│   ├── globals.css            # Global styles
│   ├── error.tsx              # Error boundary
│   ├── loading.tsx            # Loading state
│   └── not-found.tsx          # 404 page
├── components/                # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ArticleCard.tsx        # Hero + thumbnail variants
│   ├── VerticalSection.tsx    # Homepage vertical sections
│   ├── Paywall.tsx
│   └── RelatedArticles.tsx
├── lib/                       # Utilities
│   ├── wordpress.ts           # GraphQL client
│   ├── queries.ts             # GraphQL queries
│   ├── types.ts               # TypeScript interfaces
│   └── utils.ts               # Helper functions
├── public/                    # Static assets
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

## Routes

- `/` - Homepage (3 vertical sections)
- `/wellness` - Wellness articles
- `/lifestyle` - Lifestyle articles
- `/tech` - Tech articles
- `/[vertical]/[slug]` - Single article page

## Design System

### Typography

- **Headlines**: Playfair Display (900)
- **Body**: Inter (400)
- **Scale**: Perfect Fourth (1.333 ratio)

### Colors

- **Wellness**: `#4CAF50` (Green)
- **Lifestyle**: `#9C27B0` (Purple)
- **Tech**: `#2196F3` (Blue)
- **Brand Black**: `#000000`
- **Brand White**: `#FFFFFF`
- **Brand Neutral**: `#E5E1DA`

### Layout Principles

- 60% white space
- 30% content
- 10% accent colors
- Mobile-first responsive design

## Components

### ArticleCard

Displays article preview with two variants:
- `hero` - Large card for featured articles
- `thumbnail` - Compact card for grid layouts

### VerticalSection

Homepage section component showing 1 hero article + 4 thumbnails per vertical.

### Paywall

Premium content gate component for paid subscribers.

## GraphQL Queries

All GraphQL queries are defined in `lib/queries.ts`:

- `GET_ALL_ARTICLES` - Fetch all articles with pagination
- `GET_ARTICLES_BY_VERTICAL` - Filter by vertical (wellness/lifestyle/tech)
- `GET_ARTICLE_BY_SLUG` - Single article by slug
- `GET_RELATED_ARTICLES` - Related articles by vertical
- `GET_ALL_VERTICALS` - All vertical taxonomy terms

## Performance

- **ISR**: Pages revalidate every 60 seconds
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Code Splitting**: Automatic with Next.js App Router
- **Font Optimization**: next/font/google for zero layout shift

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

```bash
vercel --prod
```

### Manual Deployment

```bash
npm run build
npm start
```

## Development Tips

### Testing GraphQL Queries

Test queries in WordPress GraphQL IDE:
`https://wp.allthatmagazine.com/wp-admin/admin.php?page=graphiql-ide`

### Debugging

- Check WordPress GraphQL endpoint is accessible
- Verify ACF fields have `show_in_graphql` enabled
- Ensure articles have all required fields (featured image, custom excerpt)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Requirements

- Node.js 18+
- WordPress backend with WPGraphQL
- Required WordPress plugins:
  - WPGraphQL
  - WPGraphQL for ACF
  - Advanced Custom Fields

## License

GPL v2 or later

---

**All That Magazine** - Premium Wellness Lifestyle Tech
