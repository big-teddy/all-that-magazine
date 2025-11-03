import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { getVerticalColor } from '@/lib/utils';

interface Props {
  article: Article;
  variant: 'hero' | 'thumbnail';
}

export default function ArticleCard({ article, variant }: Props) {
  const vertical = article.verticals.nodes[0];
  const { featuredImage, customExcerpt, readTime, isPremium } = article.articleFields;

  const href = `/${vertical.slug}/${article.slug}`;

  // Fallback image if no featured image
  const imageUrl = featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop';
  const imageAlt = featuredImage?.node?.altText || article.title;

  if (variant === 'hero') {
    return (
      <Link
        href={href}
        className="group block"
      >
        <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-white border-2 ${getVerticalColor(vertical.slug)}`}>
              {vertical.name}
            </span>
          </div>
        </div>

        <h3 className="font-serif text-3xl lg:text-4xl font-black mb-3 group-hover:text-gray-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-lg text-gray-600 mb-4 line-clamp-2">
          {customExcerpt}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{readTime} min read</span>
          {isPremium && <span className="text-yellow-600">★ Premium</span>}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block"
    >
      <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
        />
      </div>

      <div className="mb-2">
        <span className={`inline-block text-sm font-medium ${getVerticalColor(vertical.slug)}`}>
          {vertical.name}
        </span>
      </div>

      <h3 className="font-serif text-xl lg:text-2xl font-bold mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
        {article.title}
      </h3>

      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span>{readTime} min</span>
        {isPremium && <span className="text-yellow-600">★</span>}
      </div>
    </Link>
  );
}
