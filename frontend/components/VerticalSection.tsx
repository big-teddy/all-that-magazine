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
