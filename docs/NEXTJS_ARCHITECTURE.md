# Next.js Architecture Specification for Cursor AI

## Overview

Complete specifications for building All That Magazine's Next.js 14 frontend with App Router, TypeScript, Tailwind CSS, and headless WordPress integration.

---

## Project Initialization

### Command Sequence

```bash
npx create-next-app@latest all-that-magazine-frontend --typescript --tailwind --app --no-src-dir
cd all-that-magazine-frontend
npm install graphql-request graphql
npm install -D @types/node
```

### package.json Dependencies

```json
{
  "name": "all-that-magazine-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "graphql": "^16.8.1",
    "graphql-request": "^6.1.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

---

## Folder Structure

```
all-that-magazine-frontend/
├── app/
│   ├── layout.tsx                    (root layout with fonts + metadata)
│   ├── page.tsx                      (homepage - 3 vertical sections)
│   ├── globals.css                   (Tailwind + custom styles)
│   ├── not-found.tsx                 (404 page)
│   ├── error.tsx                     (error boundary)
│   ├── loading.tsx                   (loading state)
│   ├── [vertical]/
│   │   ├── page.tsx                  (vertical landing: wellness/lifestyle/tech)
│   │   ├── [slug]/
│   │   │   └── page.tsx              (single article page)
│   │   └── loading.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── api/
│       └── revalidate/
│           └── route.ts              (on-demand ISR revalidation)
├── components/
│   ├── Header.tsx                    (site header with navigation)
│   ├── Footer.tsx                    (site footer)
│   ├── ArticleCard.tsx               (reusable article card)
│   ├── VerticalSection.tsx           (homepage vertical sections)
│   ├── Paywall.tsx                   (premium content gate)
│   ├── RelatedArticles.tsx           (related articles list)
│   └── LoadingSkeleton.tsx           (loading states)
├── lib/
│   ├── wordpress.ts                  (GraphQL client)
│   ├── queries.ts                    (all GraphQL queries)
│   ├── types.ts                      (TypeScript interfaces)
│   └── utils.ts                      (utility functions)
├── public/
│   ├── images/                       (static images)
│   └── fonts/                        (custom fonts if needed)
├── .env.local                        (environment variables)
├── .env.local.example                (env template)
├── next.config.mjs                   (Next.js configuration)
├── tailwind.config.ts                (Tailwind configuration)
├── tsconfig.json                     (TypeScript configuration)
└── README.md
```

---

## Configuration Files

### next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.allthatmagazine.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
```

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          white: '#FFFFFF',
          neutral: '#E5E1DA',
        },
        wellness: {
          DEFAULT: '#4CAF50',
          light: '#81C784',
          dark: '#388E3C',
        },
        lifestyle: {
          DEFAULT: '#9C27B0',
          light: '#BA68C8',
          dark: '#7B1FA2',
        },
        tech: {
          DEFAULT: '#2196F3',
          light: '#64B5F6',
          dark: '#1976D2',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Perfect Fourth scale (1.333 ratio)
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px - body text
        'xl': '1.5rem',      // 24px
        '2xl': '2rem',       // 32px
        '3xl': '2.667rem',   // 43px
        '4xl': '3.556rem',   // 57px
        '5xl': '4.741rem',   // 76px
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },
      maxWidth: {
        '8xl': '1440px',
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};

export default config;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### .env.local.example

```bash
# WordPress GraphQL Endpoint
WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Revalidation Secret (for on-demand ISR)
REVALIDATE_SECRET=your-secret-key-here
```

---

## Core Library Files

### lib/types.ts

```typescript
export interface Article {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  author: {
    node: {
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  verticals: {
    nodes: Vertical[];
  };
  articleFields: {
    featuredImage: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
    customExcerpt: string;
    readTime: number;
    isPremium: boolean;
    authorBio: string;
  };
}

export interface Vertical {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  verticalColor?: string;
}

export interface ArticleEdge {
  node: Article;
}

export interface ArticlesResponse {
  articles: {
    edges: ArticleEdge[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface SingleArticleResponse {
  articleBy: Article;
}

export interface VerticalsResponse {
  verticals: {
    nodes: Vertical[];
  };
}

export type VerticalSlug = 'wellness' | 'lifestyle' | 'tech';
```

### lib/wordpress.ts

```typescript
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT || '';

if (!endpoint) {
  throw new Error('WORDPRESS_GRAPHQL_ENDPOINT environment variable is not set');
}

export const client = new GraphQLClient(endpoint, {
  headers: {},
});

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    const data = await client.request<T>(query, variables);
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
}
```

### lib/queries.ts

```typescript
export const GET_ALL_ARTICLES = `
  query GetAllArticles($first: Int = 10, $after: String) {
    articles(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          databaseId
          title
          slug
          excerpt
          date
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          verticals {
            nodes {
              id
              name
              slug
            }
          }
          articleFields {
            featuredImage {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
            customExcerpt
            readTime
            isPremium
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_ARTICLES_BY_VERTICAL = `
  query GetArticlesByVertical($vertical: String!, $first: Int = 10) {
    articles(
      first: $first
      where: {
        taxQuery: {
          taxArray: [{
            taxonomy: VERTICAL
            terms: [$vertical]
            field: SLUG
          }]
        }
        orderby: { field: DATE, order: DESC }
      }
    ) {
      edges {
        node {
          id
          databaseId
          title
          slug
          excerpt
          date
          verticals {
            nodes {
              id
              name
              slug
            }
          }
          articleFields {
            featuredImage {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
            customExcerpt
            readTime
            isPremium
          }
        }
      }
    }
  }
`;

export const GET_ARTICLE_BY_SLUG = `
  query GetArticleBySlug($slug: ID!) {
    articleBy(slug: $slug) {
      id
      databaseId
      title
      slug
      content
      excerpt
      date
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      verticals {
        nodes {
          id
          name
          slug
        }
      }
      articleFields {
        featuredImage {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        customExcerpt
        readTime
        isPremium
        authorBio
      }
    }
  }
`;

export const GET_RELATED_ARTICLES = `
  query GetRelatedArticles($vertical: String!, $excludeId: Int!, $first: Int = 3) {
    articles(
      first: $first
      where: {
        taxQuery: {
          taxArray: [{
            taxonomy: VERTICAL
            terms: [$vertical]
            field: SLUG
          }]
        }
        notIn: [$excludeId]
        orderby: { field: DATE, order: DESC }
      }
    ) {
      edges {
        node {
          id
          title
          slug
          verticals {
            nodes {
              name
              slug
            }
          }
          articleFields {
            featuredImage {
              sourceUrl
              altText
            }
            customExcerpt
            readTime
          }
        }
      }
    }
  }
`;

export const GET_ALL_VERTICALS = `
  query GetAllVerticals {
    verticals {
      nodes {
        id
        name
        slug
        description
        count
      }
    }
  }
`;
```

### lib/utils.ts

```typescript
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function getVerticalColor(slug: string): string {
  const colors: Record<string, string> = {
    wellness: 'text-wellness border-wellness',
    lifestyle: 'text-lifestyle border-lifestyle',
    tech: 'text-tech border-tech',
  };
  return colors[slug] || 'text-brand-black border-brand-black';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}
```

---

## App Routes

### app/layout.tsx

```typescript
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'All That Magazine - Premium Wellness Lifestyle Tech',
  description: 'Explore wellness, lifestyle, and technology through in-depth articles and exclusive insights.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'All That Magazine',
    title: 'All That Magazine',
    description: 'Premium Wellness Lifestyle Tech',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'All That Magazine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All That Magazine',
    description: 'Premium Wellness Lifestyle Tech',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-brand-white text-brand-black">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### app/page.tsx (Homepage)

```typescript
import { fetchGraphQL } from '@/lib/wordpress';
import { GET_ARTICLES_BY_VERTICAL } from '@/lib/queries';
import { ArticlesResponse } from '@/lib/types';
import VerticalSection from '@/components/VerticalSection';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

async function getArticlesByVertical(vertical: string) {
  try {
    const data = await fetchGraphQL<ArticlesResponse>(GET_ARTICLES_BY_VERTICAL, {
      vertical,
      first: 5,
    });
    return data.articles.edges.map(edge => edge.node);
  } catch (error) {
    console.error(`Error fetching ${vertical} articles:`, error);
    return [];
  }
}

export default async function HomePage() {
  const [wellnessArticles, lifestyleArticles, techArticles] = await Promise.all([
    getArticlesByVertical('wellness'),
    getArticlesByVertical('lifestyle'),
    getArticlesByVertical('tech'),
  ]);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <VerticalSection
        title="Wellness"
        slug="wellness"
        articles={wellnessArticles}
      />
      
      <div className="mt-20 lg:mt-30" />
      
      <VerticalSection
        title="Lifestyle"
        slug="lifestyle"
        articles={lifestyleArticles}
      />
      
      <div className="mt-20 lg:mt-30" />
      
      <VerticalSection
        title="Tech"
        slug="tech"
        articles={techArticles}
      />
    </div>
  );
}
```

### app/[vertical]/page.tsx

```typescript
import { notFound } from 'next/navigation';
import { fetchGraphQL } from '@/lib/wordpress';
import { GET_ARTICLES_BY_VERTICAL } from '@/lib/queries';
import { ArticlesResponse, VerticalSlug } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';

const VALID_VERTICALS: VerticalSlug[] = ['wellness', 'lifestyle', 'tech'];

export const revalidate = 60;

export async function generateStaticParams() {
  return VALID_VERTICALS.map((vertical) => ({
    vertical,
  }));
}

interface Props {
  params: {
    vertical: string;
  };
}

export default async function VerticalPage({ params }: Props) {
  if (!VALID_VERTICALS.includes(params.vertical as VerticalSlug)) {
    notFound();
  }

  const data = await fetchGraphQL<ArticlesResponse>(GET_ARTICLES_BY_VERTICAL, {
    vertical: params.vertical,
    first: 20,
  });

  const articles = data.articles.edges.map(edge => edge.node);

  if (articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-4xl font-black mb-4 capitalize">
          {params.vertical}
        </h1>
        <p className="text-lg text-gray-600">
          No articles found in this vertical yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-5xl lg:text-6xl font-black mb-12 capitalize">
        {params.vertical}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            variant="thumbnail"
          />
        ))}
      </div>
    </div>
  );
}
```

### app/[vertical]/[slug]/page.tsx

```typescript
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchGraphQL } from '@/lib/wordpress';
import { GET_ARTICLE_BY_SLUG, GET_RELATED_ARTICLES } from '@/lib/queries';
import { SingleArticleResponse, ArticlesResponse } from '@/lib/types';
import { formatDate, getVerticalColor } from '@/lib/utils';
import RelatedArticles from '@/components/RelatedArticles';
import Paywall from '@/components/Paywall';

export const revalidate = 60;

interface Props {
  params: {
    vertical: string;
    slug: string;
  };
}

export default async function ArticlePage({ params }: Props) {
  let data: SingleArticleResponse;
  
  try {
    data = await fetchGraphQL<SingleArticleResponse>(GET_ARTICLE_BY_SLUG, {
      slug: params.slug,
    });
  } catch (error) {
    notFound();
  }

  const article = data.articleBy;
  
  if (!article) {
    notFound();
  }

  // Fetch related articles
  const vertical = article.verticals.nodes[0];
  const relatedData = await fetchGraphQL<ArticlesResponse>(GET_RELATED_ARTICLES, {
    vertical: vertical.slug,
    excludeId: article.databaseId,
    first: 3,
  });
  const relatedArticles = relatedData.articles.edges.map(edge => edge.node);

  const isPremium = article.articleFields.isPremium;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Vertical Badge */}
      <div className="mb-6">
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium border-2 ${getVerticalColor(vertical.slug)}`}>
          {vertical.name}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-serif text-4xl lg:text-5xl font-black mb-6 leading-tight">
        {article.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-6 mb-8 text-gray-600">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span>{article.articleFields.readTime} min read</span>
        {isPremium && (
          <span className="text-yellow-600 font-medium">★ Premium</span>
        )}
      </div>

      {/* Featured Image */}
      {article.articleFields.featuredImage && (
        <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden">
          <Image
            src={article.articleFields.featuredImage.sourceUrl}
            alt={article.articleFields.featuredImage.altText || article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Paywall for Premium Content */}
      {isPremium && <Paywall />}

      {/* Author Bio */}
      {article.articleFields.authorBio && (
        <div className="border-t border-gray-200 pt-8 mb-12">
          <h3 className="font-serif text-2xl font-bold mb-4">About the Author</h3>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: article.articleFields.authorBio }}
          />
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <RelatedArticles articles={relatedArticles} />
      )}
    </article>
  );
}
```

---

## Components

### components/Header.tsx

```typescript
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-black">
            ALL THAT
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/wellness"
              className="text-lg font-medium hover:text-wellness transition-colors"
            >
              Wellness
            </Link>
            <Link
              href="/lifestyle"
              className="text-lg font-medium hover:text-lifestyle transition-colors"
            >
              Lifestyle
            </Link>
            <Link
              href="/tech"
              className="text-lg font-medium hover:text-tech transition-colors"
            >
              Tech
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

### components/ArticleCard.tsx

```typescript
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { getVerticalColor } from '@/lib/utils';

interface Props {
  article: Article;
  variant: 'hero' | 'thumbnail';
}

export default function ArticleCard({ article, variant }: Props) {
  const vertical = article.verticals.nodes[0];
  const { featuredImage, customExcerpt, readTime, isPremium } = article.articleFields;

  const href = `/${vertical.slug}/${article.slug}`;

  if (variant === 'hero') {
    return (
      <Link
        href={href}
        className="group block"
      >
        <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
          <Image
            src={featuredImage.sourceUrl}
            alt={featuredImage.altText || article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-white border-2 ${getVerticalColor(vertical.slug)}`}>
              {vertical.name}
            </span>
          </div>
        </div>
        
        <h3 className="font-serif text-3xl lg:text-4xl font-black mb-3 group-hover:text-gray-600 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-lg text-gray-600 mb-4 line-clamp-2">
          {customExcerpt}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{readTime} min read</span>
          {isPremium && <span className="text-yellow-600">★ Premium</span>}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block"
    >
      <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden">
        <Image
          src={featuredImage.sourceUrl}
          alt={featuredImage.altText || article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="mb-2">
        <span className={`inline-block text-sm font-medium ${getVerticalColor(vertical.slug)}`}>
          {vertical.name}
        </span>
      </div>
      
      <h3 className="font-serif text-xl lg:text-2xl font-bold mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
        {article.title}
      </h3>
      
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span>{readTime} min</span>
        {isPremium && <span className="text-yellow-600">★</span>}
      </div>
    </Link>
  );
}
```

### components/VerticalSection.tsx

```typescript
import Link from 'next/link';
import { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface Props {
  title: string;
  slug: string;
  articles: Article[];
}

export default function VerticalSection({ title, slug, articles }: Props) {
  if (articles.length === 0) return null;

  const [heroArticle, ...thumbnailArticles] = articles;

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-4xl lg:text-5xl font-black">{title}</h2>
        <Link
          href={`/${slug}`}
          className="text-lg font-medium hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Hero Article (6 columns) */}
        <div className="lg:col-span-6">
          <ArticleCard article={heroArticle} variant="hero" />
        </div>

        {/* Thumbnail Articles (6 columns) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {thumbnailArticles.slice(0, 4).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="thumbnail"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### components/Paywall.tsx

```typescript
export default function Paywall() {
  return (
    <div className="bg-gradient-to-b from-transparent to-white absolute bottom-0 left-0 right-0 h-96 flex items-end justify-center pb-12">
      <div className="bg-white border-2 border-gray-900 rounded-lg p-8 max-w-md text-center shadow-xl">
        <h3 className="font-serif text-2xl font-black mb-4">
          Continue Reading
        </h3>
        <p className="text-gray-600 mb-6">
          This is premium content. Subscribe to access the full article.
        </p>
        <button className="w-full bg-brand-black text-brand-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Subscribe Now
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Starting at ₩9,900/month
        </p>
      </div>
    </div>
  );
}
```

---

## Performance Optimization

### Image Optimization

```typescript
// All images use Next.js Image component
<Image
  src={imageUrl}
  alt={altText}
  width={1200}
  height={630}
  quality={80}
  priority={false} // true only for above-fold images
  loading="lazy"
/>
```

### ISR Configuration

```typescript
// Page-level revalidation
export const revalidate = 60; // Revalidate every 60 seconds

// On-demand revalidation API route
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get('path');
  
  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, path });
  }

  return Response.json({ message: 'Missing path parameter' }, { status: 400 });
}
```

---

## Development Workflow

### 1. Start Development Server

```bash
npm run dev
# Opens http://localhost:3000
```

### 2. Test with Real Data

Ensure WordPress GraphQL endpoint is accessible:
```bash
curl https://wp.allthatmagazine.com/graphql -H "Content-Type: application/json" -d '{"query":"{ articles { edges { node { title } } } }"}'
```

### 3. Build for Production

```bash
npm run build
npm start
```

### 4. Deploy to Vercel

```bash
vercel --prod
```

---

## Error Handling

### Error Boundary (app/error.tsx)

```typescript
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h2 className="font-serif text-4xl font-black mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-8">
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={reset}
        className="bg-brand-black text-brand-white py-3 px-8 rounded-lg font-medium hover:bg-gray-800"
      >
        Try Again
      </button>
    </div>
  );
}
```

### Not Found (app/not-found.tsx)

```typescript
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="font-serif text-6xl font-black mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-brand-black text-brand-white py-3 px-8 rounded-lg font-medium hover:bg-gray-800"
      >
        Go Home
      </Link>
    </div>
  );
}
```

---

## Testing Checklist

```
□ Homepage loads with 3 vertical sections
□ Each section shows 1 hero + 4 thumbnails
□ Clicking article navigates to correct URL
□ Single article page displays full content
□ Vertical landing pages filter correctly
□ Images load with proper optimization
□ Mobile responsive (320px - 1440px)
□ Fonts load correctly (Playfair + Inter)
□ ISR revalidation works (60s)
□ Error states display properly
□ 404 page works
□ Loading states show
□ GraphQL errors handled gracefully
```

---

**End of Next.js Architecture Specification**

Cursor AI: Use this document to generate the complete Next.js frontend with all routes and components.
