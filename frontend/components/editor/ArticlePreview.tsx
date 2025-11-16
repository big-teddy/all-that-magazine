'use client';

import Image from 'next/image';
import { CreateArticleData } from '@/lib/wordpress-api';

interface ArticlePreviewProps {
  data: CreateArticleData & { featuredImageUrl?: string };
}

export default function ArticlePreview({ data }: ArticlePreviewProps) {
  const { title, content, vertical, customExcerpt, readTime, isPremium, authorBio, featuredImageUrl } = data;

  // Vertical colors
  const verticalColors = {
    wellness: 'bg-sage-green text-white',
    lifestyle: 'bg-coral text-white',
    tech: 'bg-electric-blue text-white',
  };

  const verticalLabels = {
    wellness: 'WELLNESS',
    lifestyle: 'LIFESTYLE',
    tech: 'TECH',
  };

  return (
    <div className="bg-warm-white min-h-full">
      {/* Preview Header */}
      <div className="bg-gray-900 text-white py-3 px-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">실시간 미리보기</p>
          <p className="text-xs text-gray-400">
            {title ? `${title.length}자` : '제목 없음'}
          </p>
        </div>
      </div>

      {/* Article Preview */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={featuredImageUrl}
              alt={title || 'Preview'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}

        {/* Vertical Badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider ${verticalColors[vertical]}`}>
            {verticalLabels[vertical]}
          </span>
          {isPremium && (
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold premium-badge-gradient-sm">
              ★ PREMIUM
            </span>
          )}
          {readTime > 0 && (
            <span className="text-sm text-gray-500">
              {readTime}분 읽기
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-deep-navy mb-6 leading-tight">
          {title || '제목을 입력하세요'}
        </h1>

        {/* Excerpt */}
        {customExcerpt && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-gray-300 pl-6 italic">
            {customExcerpt}
          </p>
        )}

        {/* Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-sage-green via-coral to-electric-blue mb-8 rounded-full" />

        {/* Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-deep-navy prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-6
            prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-8
            prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-electric-blue prose-a:no-underline hover:prose-a:underline
            prose-strong:text-deep-navy prose-strong:font-bold
            prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
            prose-li:text-gray-700 prose-li:mb-2
            prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
            prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
          "
          dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400">본문을 작성하세요...</p>' }}
        />

        {/* Author Bio */}
        {authorBio && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                About the Author
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {authorBio}
              </p>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
