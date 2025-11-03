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
            sizes="(max-width: 1024px) 100vw, 1024px"
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
