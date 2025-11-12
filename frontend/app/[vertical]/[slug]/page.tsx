import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { fetchGraphQL } from '@/lib/wordpress';
import { GET_ARTICLE_BY_SLUG, GET_RELATED_ARTICLES } from '@/lib/queries';
import { SingleArticleResponse, ArticlesResponse } from '@/lib/types';
import { formatDate, getVerticalColor } from '@/lib/utils';
import RelatedArticles from '@/components/RelatedArticles';
import Paywall from '@/components/Paywall';
import ShareButtons from '@/components/ShareButtons';
import ArticleContent from '@/components/ArticleContent';
import TableOfContents from '@/components/TableOfContents';
import BookmarkButton from '@/components/BookmarkButton';
import FullscreenReader from '@/components/FullscreenReader';

export const revalidate = 60;

interface Props {
  params: {
    vertical: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const data = await fetchGraphQL<SingleArticleResponse>(GET_ARTICLE_BY_SLUG, {
      slug: params.slug,
    });

    const article = data.articleBy;

    if (!article) {
      return {
        title: '기사를 찾을 수 없습니다',
        description: '요청하신 기사를 찾을 수 없습니다.',
      };
    }

    const vertical = article.verticals.nodes[0];
    const verticalName = vertical.name;
    const imageUrl = article.articleFields.featuredImage?.node.sourceUrl || '';
    const excerpt = article.articleFields.customExcerpt || article.excerpt || '';
    const readTime = article.articleFields.readTime || 5;

    const metadata: Metadata = {
      title: `${article.title} | ${verticalName} | All That Magazine`,
      description: excerpt,
      keywords: [article.title, verticalName, '웰니스', '라이프스타일', '테크', 'All That Magazine'],
      authors: [{ name: 'All That Magazine' }],
      openGraph: {
        type: 'article',
        locale: 'ko_KR',
        url: `/${params.vertical}/${params.slug}`,
        title: article.title,
        description: excerpt,
        siteName: 'All That Magazine',
        publishedTime: article.date,
        ...(article.modified && { modifiedTime: article.modified }),
        authors: ['All That Magazine'],
        tags: [verticalName],
        images: imageUrl ? [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: excerpt,
        images: imageUrl ? [imageUrl] : undefined,
      },
      other: {
        'article:published_time': article.date,
        ...(article.modified && { 'article:modified_time': article.modified }),
        'article:section': verticalName,
        'article:tag': verticalName,
        'reading-time': `${readTime}분`,
      },
    };

    return metadata;
  } catch (error) {
    return {
      title: '기사를 찾을 수 없습니다 | All That Magazine',
      description: '요청하신 기사를 찾을 수 없습니다.',
    };
  }
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
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-display font-black text-white mb-6">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <time dateTime={article.date} className="text-sm font-medium">
                {formatDate(article.date)}
              </time>
              <span className="text-sm font-medium">{article.articleFields.readTime}분</span>
              {isPremium && (
                <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                  ★ 프리미엄
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content with Table of Contents */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-8">
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

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-16">
              <ShareButtons
                title={article.title}
                description={article.articleFields.customExcerpt || undefined}
              />
              <BookmarkButton
                slug={article.slug}
                title={article.title}
              />
              <FullscreenReader
                content={article.content}
                title={article.title}
              />
            </div>

            {/* Author Bio */}
            {article.articleFields.authorBio && (
              <div className="bg-gray-50 rounded-2xl p-8 mb-16">
                <h3 className="font-serif text-2xl font-bold mb-4">저자 소개</h3>
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

          {/* Table of Contents - Sidebar */}
          <aside className="lg:col-span-4">
            <TableOfContents content={article.content} />
          </aside>
        </div>
      </div>
    </>
  );
}
