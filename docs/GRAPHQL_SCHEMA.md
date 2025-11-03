# GraphQL Schema & API Documentation for Cursor AI

## Overview

Complete GraphQL schema documentation for All That Magazine's WordPress backend. This document provides all queries, types, and testing procedures needed to build the Next.js frontend data layer.

---

## GraphQL Endpoint

```
Production: https://wp.allthatmagazine.com/graphql
Development: http://localhost/wp-graphql/
```

### Authentication (Future)

```
Currently: Public read-only access
Future: JWT tokens for authenticated requests

Headers:
{
  "Authorization": "Bearer <jwt_token>",
  "Content-Type": "application/json"
}
```

---

## Core Types

### Article Type

```graphql
type Article {
  id: ID!
  databaseId: Int!
  title: String
  slug: String!
  content: String
  excerpt: String
  date: String
  modified: String
  status: String
  author: Author
  verticals: VerticalConnection
  categories: CategoryConnection
  featuredImage: MediaItem
  articleFields: ArticleFields
  seo: SEO
}
```

### ArticleFields Type (ACF)

```graphql
type ArticleFields {
  featuredImage: MediaItem
  customExcerpt: String
  readTime: Int
  isPremium: Boolean
  authorBio: String
}
```

### Vertical Type (Taxonomy)

```graphql
type Vertical {
  id: ID!
  databaseId: Int!
  name: String
  slug: String!
  description: String
  count: Int
  verticalColor: String
}
```

### Author Type

```graphql
type Author {
  id: ID!
  databaseId: Int!
  name: String
  firstName: String
  lastName: String
  email: String
  description: String
  avatar: Avatar
  posts: PostConnection
}
```

### Avatar Type

```graphql
type Avatar {
  url: String
  size: Int
}
```

### MediaItem Type

```graphql
type MediaItem {
  id: ID!
  databaseId: Int!
  sourceUrl: String
  altText: String
  title: String
  caption: String
  mediaDetails: MediaDetails
  mimeType: String
}
```

### MediaDetails Type

```graphql
type MediaDetails {
  width: Int
  height: Int
  file: String
  sizes: [MediaSize]
}
```

### SEO Type (Rank Math)

```graphql
type SEO {
  title: String
  metaDesc: String
  focusKeywords: [String]
  canonical: String
  opengraphTitle: String
  opengraphDescription: String
  opengraphImage: MediaItem
  twitterTitle: String
  twitterDescription: String
  twitterImage: MediaItem
}
```

### Connection Types

```graphql
type ArticleConnection {
  edges: [ArticleEdge]
  nodes: [Article]
  pageInfo: PageInfo
}

type ArticleEdge {
  node: Article
  cursor: String
}

type VerticalConnection {
  edges: [VerticalEdge]
  nodes: [Vertical]
}

type PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor: String
  endCursor: String
  total: Int
}
```

---

## Complete Queries

### 1. Get All Articles

**Use Case:** Homepage - fetch recent articles from all verticals

```graphql
query GetAllArticles($first: Int = 10, $after: String) {
  articles(
    first: $first
    after: $after
    where: {
      orderby: { field: DATE, order: DESC }
      status: PUBLISH
    }
  ) {
    edges {
      cursor
      node {
        id
        databaseId
        title
        slug
        excerpt
        date
        modified
        author {
          node {
            id
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
            verticalColor
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
      total
    }
  }
}
```

**Variables:**
```json
{
  "first": 10,
  "after": null
}
```

---

### 2. Get Articles by Vertical

**Use Case:** Vertical landing pages (wellness, lifestyle, tech)

```graphql
query GetArticlesByVertical($vertical: String!, $first: Int = 10, $after: String) {
  articles(
    first: $first
    after: $after
    where: {
      taxQuery: {
        taxArray: [
          {
            taxonomy: VERTICAL
            terms: [$vertical]
            field: SLUG
          }
        ]
      }
      orderby: { field: DATE, order: DESC }
      status: PUBLISH
    }
  ) {
    edges {
      cursor
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
    pageInfo {
      hasNextPage
      endCursor
      total
    }
  }
}
```

**Variables:**
```json
{
  "vertical": "wellness",
  "first": 10,
  "after": null
}
```

---

### 3. Get Single Article by Slug

**Use Case:** Single article page

```graphql
query GetArticleBySlug($slug: ID!) {
  articleBy(slug: $slug) {
    id
    databaseId
    title
    slug
    content
    excerpt
    date
    modified
    author {
      node {
        id
        name
        firstName
        lastName
        description
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
        description
        verticalColor
      }
    }
    categories {
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
        title
        caption
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
    seo {
      title
      metaDesc
      focusKeywords
      canonical
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
      }
      twitterTitle
      twitterDescription
      twitterImage {
        sourceUrl
      }
    }
  }
}
```

**Variables:**
```json
{
  "slug": "mindfulness-practices-for-busy-professionals"
}
```

---

### 4. Get Related Articles

**Use Case:** "Related Articles" section on single article page

```graphql
query GetRelatedArticles(
  $vertical: String!
  $excludeId: Int!
  $first: Int = 3
) {
  articles(
    first: $first
    where: {
      taxQuery: {
        taxArray: [
          {
            taxonomy: VERTICAL
            terms: [$vertical]
            field: SLUG
          }
        ]
      }
      notIn: [$excludeId]
      orderby: { field: DATE, order: DESC }
      status: PUBLISH
    }
  ) {
    edges {
      node {
        id
        databaseId
        title
        slug
        date
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
          isPremium
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "vertical": "wellness",
  "excludeId": 123,
  "first": 3
}
```

---

### 5. Get All Verticals

**Use Case:** Navigation menu, metadata

```graphql
query GetAllVerticals {
  verticals(first: 100) {
    nodes {
      id
      databaseId
      name
      slug
      description
      count
      verticalColor
    }
  }
}
```

---

### 6. Search Articles

**Use Case:** Search functionality

```graphql
query SearchArticles($search: String!, $first: Int = 20) {
  articles(
    first: $first
    where: {
      search: $search
      orderby: { field: RELEVANCE, order: DESC }
      status: PUBLISH
    }
  ) {
    edges {
      node {
        id
        title
        slug
        excerpt
        date
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
    pageInfo {
      hasNextPage
      total
    }
  }
}
```

**Variables:**
```json
{
  "search": "mindfulness meditation",
  "first": 20
}
```

---

### 7. Get Article Slugs (for Static Generation)

**Use Case:** Next.js generateStaticParams

```graphql
query GetArticleSlugs($first: Int = 100, $after: String) {
  articles(
    first: $first
    after: $after
    where: {
      status: PUBLISH
    }
  ) {
    edges {
      node {
        slug
        verticals {
          nodes {
            slug
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

---

### 8. Get Premium Articles Count

**Use Case:** Analytics, admin dashboard

```graphql
query GetPremiumArticlesCount {
  articles(
    first: 1
    where: {
      metaQuery: {
        metaArray: [
          {
            key: "is_premium"
            value: "1"
            compare: EQUAL_TO
          }
        ]
      }
    }
  ) {
    pageInfo {
      total
    }
  }
}
```

---

### 9. Get Articles by Author

**Use Case:** Author archive pages

```graphql
query GetArticlesByAuthor($authorId: Int!, $first: Int = 10) {
  articles(
    first: $first
    where: {
      author: $authorId
      orderby: { field: DATE, order: DESC }
      status: PUBLISH
    }
  ) {
    edges {
      node {
        id
        title
        slug
        date
        excerpt
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
    pageInfo {
      hasNextPage
      total
    }
  }
}
```

---

### 10. Get Recent Articles (Simplified)

**Use Case:** Sidebar, "Latest Articles" widget

```graphql
query GetRecentArticles($first: Int = 5) {
  articles(
    first: $first
    where: {
      orderby: { field: DATE, order: DESC }
      status: PUBLISH
    }
  ) {
    nodes {
      id
      title
      slug
      date
      verticals {
        nodes {
          name
          slug
        }
      }
      articleFields {
        featuredImage {
          sourceUrl(size: THUMBNAIL)
        }
        readTime
      }
    }
  }
}
```

---

## Error Handling

### Common Errors

**1. Article Not Found:**
```json
{
  "data": {
    "articleBy": null
  }
}
```

**2. Invalid Taxonomy Term:**
```json
{
  "errors": [
    {
      "message": "Invalid term slug provided",
      "extensions": {
        "category": "user"
      }
    }
  ]
}
```

**3. Rate Limiting (Future):**
```json
{
  "errors": [
    {
      "message": "Rate limit exceeded",
      "extensions": {
        "code": "RATE_LIMIT_EXCEEDED"
      }
    }
  ]
}
```

### Error Handling in Next.js

```typescript
// lib/wordpress.ts
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    const data = await client.request<T>(query, variables);
    return data;
  } catch (error) {
    if (error instanceof ClientError) {
      console.error('GraphQL errors:', error.response.errors);
      console.error('Request:', error.request);
      
      // Handle specific error types
      if (error.response.errors?.[0]?.extensions?.code === 'RATE_LIMIT_EXCEEDED') {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
    }
    
    console.error('GraphQL Error:', error);
    throw error;
  }
}
```

---

## Testing GraphQL Queries

### Using GraphiQL IDE

**Access WordPress GraphiQL:**
```
URL: https://wp.allthatmagazine.com/wp-admin/admin.php?page=graphiql-ide
Login: WordPress admin credentials required
```

**Test Query:**
1. Paste query in left panel
2. Add variables in bottom panel
3. Click "Play" button
4. View results in right panel

**Example Test:**
```graphql
# Query
query TestQuery {
  articles(first: 1) {
    nodes {
      title
      slug
    }
  }
}

# Expected Result
{
  "data": {
    "articles": {
      "nodes": [
        {
          "title": "Test Article",
          "slug": "test-article"
        }
      ]
    }
  }
}
```

### Using cURL

```bash
curl -X POST https://wp.allthatmagazine.com/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { articles(first: 1) { nodes { title slug } } }"
  }'
```

### Using Postman

**Setup:**
1. Method: POST
2. URL: https://wp.allthatmagazine.com/graphql
3. Headers: Content-Type: application/json
4. Body (raw JSON):
```json
{
  "query": "query GetArticles { articles(first: 5) { nodes { title slug } } }"
}
```

---

## Performance Optimization

### Query Complexity

**Good Practice:**
```graphql
# Request only needed fields
query GetArticleCard {
  articles(first: 10) {
    nodes {
      id
      title
      slug
      articleFields {
        featuredImage {
          sourceUrl
        }
        readTime
      }
    }
  }
}
```

**Avoid:**
```graphql
# Don't request all fields when not needed
query GetEverything {
  articles(first: 100) {
    nodes {
      id
      title
      content  # Large field
      excerpt
      author {
        node {
          posts {  # Nested query
            nodes {
              title
              content  # Expensive
            }
          }
        }
      }
    }
  }
}
```

### Pagination Best Practices

**Cursor-based Pagination (Recommended):**
```graphql
query GetArticlesWithPagination($first: Int!, $after: String) {
  articles(first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        title
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

**Usage in Next.js:**
```typescript
async function loadMoreArticles(cursor: string | null) {
  const data = await fetchGraphQL(GET_ARTICLES, {
    first: 10,
    after: cursor,
  });
  return data;
}
```

### Caching Strategy

**Next.js ISR (Incremental Static Regeneration):**
```typescript
// app/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

// This automatically caches GraphQL responses
```

**Client-side Caching (Optional - Future):**
```typescript
// Using SWR or React Query
import useSWR from 'swr';

function useArticles() {
  const { data, error } = useSWR(
    '/api/articles',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 60000, // 60 seconds
    }
  );
  
  return { articles: data, error, loading: !data && !error };
}
```

---

## Fragments (Reusable Queries)

```graphql
# Define common fragments
fragment ArticleCardFields on Article {
  id
  databaseId
  title
  slug
  date
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

# Use in queries
query GetAllArticles {
  articles(first: 10) {
    nodes {
      ...ArticleCardFields
    }
  }
}
```

---

## TypeScript Integration

### Generate Types from Schema

**Using graphql-codegen (Optional):**

```bash
npm install -D @graphql-codegen/cli @graphql-codegen/typescript
```

**codegen.yml:**
```yaml
schema: https://wp.allthatmagazine.com/graphql
documents: './lib/queries.ts'
generates:
  ./lib/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
```

**Run:**
```bash
npx graphql-codegen
```

### Manual Type Definitions

```typescript
// lib/types.ts
export interface Article {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  verticals: {
    nodes: Vertical[];
  };
  articleFields: ArticleFields;
}

export interface ArticleFields {
  featuredImage: MediaItem;
  customExcerpt: string;
  readTime: number;
  isPremium: boolean;
  authorBio: string;
}

export interface Vertical {
  id: string;
  name: string;
  slug: string;
  verticalColor?: string;
}

export interface MediaItem {
  sourceUrl: string;
  altText: string;
  mediaDetails: {
    width: number;
    height: number;
  };
}
```

---

## Webhooks (Future Enhancement)

**Trigger Next.js Revalidation on Content Update:**

```php
// WordPress: functions.php or custom plugin
add_action('save_post_article', 'trigger_nextjs_revalidation', 10, 2);

function trigger_nextjs_revalidation($post_id, $post) {
    if ($post->post_status !== 'publish') return;
    
    $nextjs_url = 'https://allthatmagazine.com/api/revalidate';
    $secret = get_option('nextjs_revalidate_secret');
    
    // Get article slug and vertical
    $slug = $post->post_name;
    $verticals = get_the_terms($post_id, 'vertical');
    $vertical = $verticals ? $verticals[0]->slug : '';
    
    // Trigger revalidation
    wp_remote_post($nextjs_url, array(
        'body' => json_encode(array(
            'secret' => $secret,
            'path' => "/{$vertical}/{$slug}",
        )),
        'headers' => array('Content-Type' => 'application/json'),
    ));
}
```

---

## Query Testing Checklist

```
□ All queries return expected data structure
□ Pagination works (first, after parameters)
□ Filtering by vertical returns correct articles
□ Single article query handles non-existent slugs
□ Related articles exclude current article
□ Premium flag correctly identifies gated content
□ Featured images return proper URLs
□ Author information populates
□ SEO metadata available
□ Performance acceptable (<500ms for most queries)
```

---

## GraphQL Best Practices

### DO:
✅ Request only fields you need
✅ Use pagination for lists
✅ Implement error handling
✅ Cache responses appropriately
✅ Use fragments for repeated patterns
✅ Validate query performance
✅ Document queries with comments
✅ Type your responses (TypeScript)

### DON'T:
❌ Request all fields by default
❌ Fetch large lists without pagination
❌ Ignore error responses
❌ Over-fetch data "just in case"
❌ Nest queries more than 3 levels deep
❌ Make queries from client side (use server components)
❌ Hardcode GraphQL endpoint in multiple places
❌ Skip TypeScript type safety

---

## Monitoring & Debugging

### Enable GraphQL Query Logging

```php
// WordPress: wp-config.php
define('GRAPHQL_DEBUG', true);
```

### Monitor Query Performance

```typescript
// lib/wordpress.ts
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const startTime = Date.now();
  
  try {
    const data = await client.request<T>(query, variables);
    const duration = Date.now() - startTime;
    
    if (duration > 1000) {
      console.warn(`Slow query (${duration}ms):`, query.substring(0, 100));
    }
    
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
}
```

---

**End of GraphQL Schema Documentation**

Cursor AI: Use this document to implement all data fetching logic in Next.js with proper types, error handling, and performance optimization.
