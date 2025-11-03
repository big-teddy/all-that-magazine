import { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface Props {
  articles: Article[];
}

export default function RelatedArticles({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <section className="border-t border-gray-200 pt-12 mt-12">
      <h2 className="font-serif text-3xl font-black mb-8">Related Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            variant="thumbnail"
          />
        ))}
      </div>
    </section>
  );
}
