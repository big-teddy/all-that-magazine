import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchGraphQL } from '@/lib/wordpress';
import { GET_ARTICLES_BY_VERTICAL } from '@/lib/queries';
import { ArticlesResponse, VerticalSlug } from '@/lib/types';
import { getVerticalColor } from '@/lib/utils';
import ArticleCard from '@/components/ArticleCard';

const VALID_VERTICALS: VerticalSlug[] = ['wellness', 'lifestyle', 'tech'];

const VERTICAL_INFO = {
  wellness: {
    title: 'Wellness',
    description: 'Discover mindfulness, nutrition, fitness, and holistic health practices for a balanced life.',
    gradient: 'from-green-600 to-teal-600',
  },
  lifestyle: {
    title: 'Lifestyle',
    description: 'Explore design, culture, travel, and personal growth stories that inspire.',
    gradient: 'from-purple-600 to-pink-600',
  },
  tech: {
    title: 'Tech',
    description: 'Stay ahead with insights on innovation, AI, productivity, and digital transformation.',
    gradient: 'from-blue-600 to-cyan-600',
  },
};

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

  const data = await fetchGraphQL<{vertical: ArticlesResponse}>(GET_ARTICLES_BY_VERTICAL, {
    vertical: params.vertical,
    first: 20,
  });

  const articles = data.vertical.articles.edges.map(edge => edge.node);
  const verticalInfo = VERTICAL_INFO[params.vertical as VerticalSlug];

  if (articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-4xl font-black mb-4">
          {verticalInfo.title}
        </h1>
        <p className="text-lg text-gray-600">
          No articles found in this vertical yet.
        </p>
      </div>
    );
  }

  const [featuredArticle, ...restArticles] = articles;
  const featuredImage = featuredArticle.articleFields.featuredImage?.node?.sourceUrl ||
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop';

  return (
    <>
      {/* Hero Header */}
      <div className={`relative bg-gradient-to-br ${verticalInfo.gradient} text-white py-20 lg:py-32 mb-16`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl lg:text-7xl font-black mb-6">
              {verticalInfo.title}
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
              {verticalInfo.description}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-32 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Featured Article */}
        <div className="mb-20 lg:mb-32">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-8">Featured Story</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={featuredImage}
                alt={featuredArticle.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Content */}
            <div>
              <div className="mb-4">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${getVerticalColor(params.vertical)}`}>
                  {verticalInfo.title}
                </span>
              </div>

              <h3 className="font-serif text-3xl lg:text-5xl font-black mb-6 leading-tight">
                {featuredArticle.title}
              </h3>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {featuredArticle.articleFields.customExcerpt}
              </p>

              <div className="flex items-center gap-6 mb-8 text-gray-500">
                <span>{featuredArticle.articleFields.readTime} min read</span>
                {featuredArticle.articleFields.isPremium && (
                  <span className="text-yellow-600 font-bold">★ Premium</span>
                )}
              </div>

              <a
                href={`/${params.vertical}/${featuredArticle.slug}`}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all transform hover:scale-105"
              >
                Read Article
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* All Articles Grid */}
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-8">Latest Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="thumbnail"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
