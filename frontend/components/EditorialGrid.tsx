'use client';

import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Article } from '@/lib/types';
import { getVerticalColor } from '@/lib/utils';

interface Props {
  articles: Article[];
}

/**
 * Editorial Grid - Asymmetric magazine-style layout
 * Inspired by 2025 luxury magazine trends with mismatched grids
 */
export default function EditorialGrid({ articles }: Props) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  if (articles.length < 4) return null;

  const [featured, large, ...small] = articles;

  return (
    <section ref={ref} className="mb-32 lg:mb-48">
      {/* Asymmetric Grid Layout */}
      <div className="grid grid-cols-12 gap-6 lg:gap-8">

        {/* Featured Article - Full Width with Oversized Typography */}
        <motion.div
          className="col-span-12"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <ArticleItem article={featured} layout="featured" />
        </motion.div>

        {/* Large Article - 7 columns */}
        <motion.div
          className="col-span-12 lg:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ArticleItem article={large} layout="large" />
        </motion.div>

        {/* Small Articles - 5 columns, stacked */}
        <div className="col-span-12 lg:col-span-5 space-y-6 lg:space-y-8">
          {small.slice(0, 2).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
            >
              <ArticleItem article={article} layout="small" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ArticleItemProps {
  article: Article;
  layout: 'featured' | 'large' | 'small';
}

function ArticleItem({ article, layout }: ArticleItemProps) {
  const vertical = article.verticals.nodes[0];
  const { featuredImage, customExcerpt, readTime, isPremium } = article.articleFields;
  const href = `/${vertical.slug}/${article.slug}`;
  const imageUrl = featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=900&fit=crop';
  const imageAlt = featuredImage?.node?.altText || article.title;

  // Layout configurations
  const configs = {
    featured: {
      imageAspect: 'aspect-[21/9]',
      titleSize: 'text-5xl lg:text-[80px]',
      excerptSize: 'text-xl lg:text-2xl',
      showExcerpt: true,
      imagePosition: 'top' as const,
    },
    large: {
      imageAspect: 'aspect-[3/2]',
      titleSize: 'text-4xl lg:text-5xl',
      excerptSize: 'text-lg lg:text-xl',
      showExcerpt: true,
      imagePosition: 'top' as const,
    },
    small: {
      imageAspect: 'aspect-video',
      titleSize: 'text-2xl lg:text-3xl',
      excerptSize: 'text-base',
      showExcerpt: false,
      imagePosition: 'left' as const,
    },
  };

  const config = configs[layout];

  if (layout === 'small') {
    // Horizontal layout for small articles
    return (
      <Link href={href} className="group block">
        <div className="flex gap-4 lg:gap-6">
          {/* Image */}
          <div className={`relative ${config.imageAspect} w-2/5 flex-shrink-0 rounded-lg overflow-hidden`}>
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 40vw, 300px"
              />
            </motion.div>

            {isPremium && (
              <div className="absolute top-2 right-2">
                <span className="inline-block px-2 py-1 rounded-full text-xs font-bold bg-yellow-400 text-black">
                  ★
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center py-2">
            <div className="mb-2">
              <span className={`text-xs lg:text-sm font-bold uppercase tracking-wider ${getVerticalColor(vertical.slug)}`}>
                {vertical.name}
              </span>
            </div>

            <h3 className={`font-serif ${config.titleSize} font-black mb-2 line-clamp-3 group-hover:text-gray-600 transition-colors leading-[1.2]`}>
              {article.title}
            </h3>

            <div className="text-sm text-gray-500 mt-auto">
              {readTime}분
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Vertical layout for featured and large articles
  return (
    <Link href={href} className="group block">
      {/* Image */}
      <div className={`relative ${config.imageAspect} mb-6 lg:mb-8 rounded-lg overflow-hidden`}>
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
            sizes={layout === 'featured' ? '100vw' : '(max-width: 768px) 100vw, 60vw'}
            priority={layout === 'featured'}
          />
        </motion.div>

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 flex gap-2">
          <span className={`inline-block px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-bold bg-white border-2 ${getVerticalColor(vertical.slug)}`}>
            {vertical.name}
          </span>
          {isPremium && (
            <span className="inline-block px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-bold bg-yellow-400 text-black">
              ★ 프리미엄
            </span>
          )}
        </div>

        {/* Read time - Bottom right */}
        <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {readTime}분 읽기
        </div>
      </div>

      {/* Content */}
      <div>
        <h2 className={`font-serif ${config.titleSize} font-black mb-4 lg:mb-6 group-hover:text-gray-600 transition-colors leading-[1.1] tracking-tight`}>
          {article.title}
        </h2>

        {config.showExcerpt && customExcerpt && (
          <p className={`${config.excerptSize} text-gray-700 mb-4 line-clamp-2 leading-relaxed`}>
            {customExcerpt}
          </p>
        )}

        {/* Read more link */}
        <motion.div
          className="inline-flex items-center gap-2 text-sm lg:text-base font-medium group-hover:gap-4 transition-all"
          whileHover={{ x: 5 }}
        >
          <span>더 읽기</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>
    </Link>
  );
}
