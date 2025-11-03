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
