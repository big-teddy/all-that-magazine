import { fetchGraphQL } from '@/lib/wordpress';
import { GET_ARTICLES_BY_VERTICAL } from '@/lib/queries';
import { ArticlesResponse, Article } from '@/lib/types';
import HeroSection from '@/components/HeroSection';
import BentoGrid from '@/components/BentoGrid';
import InfiniteScrollCarousel from '@/components/InfiniteScrollCarousel';
import VerticalSection from '@/components/VerticalSection';
import NewsletterSection from '@/components/NewsletterSection';
import SectionDivider from '@/components/SectionDivider';
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
    getArticlesByVertical('wellness', 10),
    getArticlesByVertical('lifestyle', 10),
    getArticlesByVertical('tech', 10),
  ]);

  // Get hero article (first wellness article)
  const heroArticle = wellnessArticles[0];

  // Bento grid - dynamic mix from all verticals
  const bentoArticles: Article[] = [
    lifestyleArticles[0],
    techArticles[0],
    wellnessArticles[1],
    lifestyleArticles[1],
    techArticles[1],
    wellnessArticles[2],
    lifestyleArticles[2],
  ].filter(Boolean);

  // Carousel articles - latest from all categories
  const carouselArticles: Article[] = [
    ...wellnessArticles.slice(3, 6),
    ...lifestyleArticles.slice(3, 6),
    ...techArticles.slice(3, 6),
  ].filter(Boolean);

  return (
    <>
      {/* Hero Section - Full viewport immersive experience */}
      {heroArticle && <HeroSection article={heroArticle} />}

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">

        {/* Bento Grid - Modern asymmetric layout */}
        {bentoArticles.length >= 6 && (
          <ScrollReveal>
            <BentoGrid articles={bentoArticles} />
          </ScrollReveal>
        )}

        {/* Section Divider */}
        <SectionDivider />

        {/* Wellness Section with refined spacing */}
        <ScrollReveal delay={0.1}>
          <VerticalSection
            title="웰니스"
            slug="wellness"
            articles={wellnessArticles.slice(6, 10)}
          />
        </ScrollReveal>

        <div className="mt-32 lg:mt-48" />

        {/* Lifestyle Section */}
        <ScrollReveal delay={0.1}>
          <VerticalSection
            title="라이프스타일"
            slug="lifestyle"
            articles={lifestyleArticles.slice(6, 10)}
          />
        </ScrollReveal>
      </div>

      {/* Infinite Scroll Carousel - Full width */}
      {carouselArticles.length > 0 && (
        <ScrollReveal>
          <InfiniteScrollCarousel
            articles={carouselArticles}
            title="최신 기사"
          />
        </ScrollReveal>
      )}

      {/* Continue with regular layout */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="my-32 lg:my-48">
          <ScrollReveal delay={0.1}>
            <NewsletterSection />
          </ScrollReveal>
        </div>

        {/* Tech Section */}
        <ScrollReveal delay={0.1}>
          <VerticalSection
            title="테크"
            slug="tech"
            articles={techArticles.slice(6, 10)}
          />
        </ScrollReveal>

        {/* Bottom spacing */}
        <div className="mb-20 lg:mb-32" />
      </div>
    </>
  );
}
