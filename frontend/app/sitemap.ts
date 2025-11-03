import { MetadataRoute } from 'next';
import { fetchGraphQL } from '@/lib/wordpress';
import { ArticlesResponse } from '@/lib/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://all-that-magazine.vercel.app';

// GraphQL query to get all published articles
const GET_ALL_ARTICLES_FOR_SITEMAP = `
  query GetAllArticlesForSitemap {
    articles(first: 1000, where: { status: PUBLISH }) {
      edges {
        node {
          slug
          date
          verticals {
            nodes {
              slug
            }
          }
        }
      }
    }
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch all articles from WordPress
    const data = await fetchGraphQL<ArticlesResponse>(GET_ALL_ARTICLES_FOR_SITEMAP, {});
    const articles = data.articles.edges.map(edge => edge.node);

    // Static pages
    const staticPages = [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/wellness`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/lifestyle`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/tech`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
    ];

    // Article pages
    const articlePages = articles.map((article) => {
      const vertical = article.verticals.nodes[0];
      return {
        url: `${SITE_URL}/${vertical.slug}/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    });

    return [...staticPages, ...articlePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least the static pages if article fetching fails
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/wellness`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/lifestyle`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/tech`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
    ];
  }
}
