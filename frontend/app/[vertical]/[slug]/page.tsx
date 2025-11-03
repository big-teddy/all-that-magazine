import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchGraphQL } from '@/lib/wordpress';
import { GET_ARTICLE_BY_SLUG, GET_RELATED_ARTICLES } from '@/lib/queries';
import { SingleArticleResponse, ArticlesResponse } from '@/lib/types';
import { formatDate, getVerticalColor } from '@/lib/utils';
import RelatedArticles from '@/components/RelatedArticles';
import Paywall from '@/components/Paywall';
import ShareButtons from '@/components/ShareButtons';
import ArticleContent from '@/components/ArticleContent';

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
    <>
      {/* Hero Section with Featured Image */}
      <div className="relative h-[60vh] min-h-[500px] max-h-[700px] mb-12">
        {article.articleFields.featuredImage?.node ? (
          <>
            <Image
              src={article.articleFields.featuredImage.node.sourceUrl}
              alt={article.articleFields.featuredImage.node.altText || article.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
        )}

        {/* Article Header */}
        <div className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12 lg:pb-16">
          <div>
            {/* Vertical Badge */}
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold bg-white border-2 ${getVerticalColor(vertical.slug)}`}>
                {vertical.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <time dateTime={article.date} className="text-sm font-medium">
                {formatDate(article.date)}
              </time>
              <span className="text-sm font-medium">{article.articleFields.readTime} min read</span>
              {isPremium && (
                <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                  ★ Premium
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Custom Excerpt */}
        {article.articleFields.customExcerpt && (
          <p className="text-xl lg:text-2xl text-gray-700 mb-12 leading-relaxed font-serif italic border-l-4 border-black pl-6">
            {article.articleFields.customExcerpt}
          </p>
        )}

        {/* Content with Lightbox */}
        <ArticleContent content={article.content} />

        {/* Paywall for Premium Content */}
        {isPremium && <Paywall />}

        {/* Share Buttons */}
        <ShareButtons
          title={article.title}
          description={article.articleFields.customExcerpt || undefined}
        />

        {/* Author Bio */}
        {article.articleFields.authorBio && (
          <div className="bg-gray-50 rounded-2xl p-8 mb-16">
            <h3 className="font-serif text-2xl font-bold mb-4">About the Author</h3>
            <div
              className="prose prose-gray"
              dangerouslySetInnerHTML={{ __html: article.articleFields.authorBio }}
            />
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <RelatedArticles articles={relatedArticles} />
          </div>
        )}
      </article>
    </>
  );
}
