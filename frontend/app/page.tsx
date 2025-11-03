import { fetchGraphQL } from '@/lib/wordpress';
import { GET_ARTICLES_BY_VERTICAL } from '@/lib/queries';
import { ArticlesResponse, Article } from '@/lib/types';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import VerticalSection from '@/components/VerticalSection';
import NewsletterSection from '@/components/NewsletterSection';
import ScrollReveal from '@/components/animations/ScrollReveal';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

async function getArticlesByVertical(vertical: string, first: number = 5) {
  try {
    const data = await fetchGraphQL<{vertical: ArticlesResponse}>(GET_ARTICLES_BY_VERTICAL, {
      vertical,
      first,
    });
    return data.vertical.articles.edges.map(edge => edge.node);
  } catch (error) {
    console.error(`Error fetching ${vertical} articles:`, error);
    return [];
  }
}

export default async function HomePage() {
  const [wellnessArticles, lifestyleArticles, techArticles] = await Promise.all([
    getArticlesByVertical('wellness', 6),
    getArticlesByVertical('lifestyle', 6),
    getArticlesByVertical('tech', 6),
  ]);

  // Get hero article (first wellness article)
  const heroArticle = wellnessArticles[0];

  // Get featured articles (mix from all verticals)
  const featuredArticles: Article[] = [
    lifestyleArticles[0],
    techArticles[0],
    wellnessArticles[1],
  ].filter(Boolean);

  return (
    <>
      {/* Hero Section */}
      {heroArticle && <HeroSection article={heroArticle} />}

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Stories */}
        {featuredArticles.length > 0 && (
          <ScrollReveal>
            <FeaturedSection articles={featuredArticles} />
          </ScrollReveal>
        )}

        {/* Wellness Section */}
        <ScrollReveal delay={0.1}>
          <VerticalSection
            title="웰니스"
            slug="wellness"
            articles={wellnessArticles.slice(2)}
          />
        </ScrollReveal>

        <div className="mt-20 lg:mt-32" />

        {/* Lifestyle Section */}
        <ScrollReveal delay={0.2}>
          <VerticalSection
            title="라이프스타일"
            slug="lifestyle"
            articles={lifestyleArticles.slice(1)}
          />
        </ScrollReveal>

        {/* Newsletter Section */}
        <ScrollReveal delay={0.1}>
          <NewsletterSection />
        </ScrollReveal>

        {/* Tech Section */}
        <ScrollReveal delay={0.2}>
          <VerticalSection
            title="테크"
            slug="tech"
            articles={techArticles.slice(1)}
          />
        </ScrollReveal>
      </div>
    </>
  );
}
