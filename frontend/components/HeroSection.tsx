import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { getVerticalColor } from '@/lib/utils';

interface Props {
  article: Article;
}

export default function HeroSection({ article }: Props) {
  const vertical = article.verticals.nodes[0];
  const { featuredImage, customExcerpt, readTime, isPremium } = article.articleFields;

  const href = `/${vertical.slug}/${article.slug}`;
  const imageUrl = featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=900&fit=crop';
  const imageAlt = featuredImage?.node?.altText || article.title;

  return (
    <section className="relative h-[80vh] min-h-[600px] max-h-[900px] mb-20 lg:mb-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16 lg:pb-24">
        <div className="max-w-4xl">
          {/* Vertical Badge */}
          <div className="mb-6">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold bg-white border-2 ${getVerticalColor(vertical.slug)}`}>
              {vertical.name}
            </span>
          </div>

          {/* Title */}
          <Link href={href}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight hover:text-gray-200 transition-colors">
              {article.title}
            </h1>
          </Link>

          {/* Excerpt */}
          <p className="text-xl lg:text-2xl text-gray-200 mb-8 line-clamp-2 leading-relaxed">
            {customExcerpt}
          </p>

          {/* Meta & CTA */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4 text-white/90">
              <span className="text-sm font-medium">{readTime} min read</span>
              {isPremium && <span className="text-yellow-400 font-bold">★ Premium</span>}
            </div>

            <Link
              href={href}
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Read Article
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
