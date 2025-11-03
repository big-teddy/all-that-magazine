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
