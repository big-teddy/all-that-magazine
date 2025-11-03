import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { getVerticalColor } from '@/lib/utils';

interface Props {
  articles: Article[];
}

export default function FeaturedSection({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <section className="mb-20 lg:mb-32">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-serif text-3xl lg:text-5xl font-black">Featured Stories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => {
          const vertical = article.verticals.nodes[0];
          const { featuredImage, customExcerpt, readTime, isPremium } = article.articleFields;
          const href = `/${vertical.slug}/${article.slug}`;
          const imageUrl = featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop';
          const imageAlt = featuredImage?.node?.altText || article.title;

          return (
            <Link
              key={article.id}
              href={href}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] mb-5 rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                {/* Vertical Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-white border-2 ${getVerticalColor(vertical.slug)}`}>
                    {vertical.name}
                  </span>
                </div>

                {/* Premium Badge */}
                {isPremium && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-400 text-black">
                      ★ Premium
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-3 group-hover:text-gray-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {customExcerpt}
                </p>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{readTime} min read</span>
                  <span>•</span>
                  <span className="group-hover:text-black transition-colors">Read more →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
