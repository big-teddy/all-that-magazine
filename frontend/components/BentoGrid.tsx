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
 * Bento Grid - Modern asymmetric card layout inspired by Apple & Vogue
 * Dynamic card sizes create visual interest and hierarchy
 */
export default function BentoGrid({ articles }: Props) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  if (articles.length < 6) return null;

  // Bento layout pattern: varying card sizes
  const bentoPattern = [
    { span: 'col-span-12 lg:col-span-8', aspect: 'aspect-[16/10]', size: 'large' },      // Featured - 8 cols
    { span: 'col-span-12 lg:col-span-4', aspect: 'aspect-square', size: 'medium' },       // Square - 4 cols
    { span: 'col-span-12 lg:col-span-4', aspect: 'aspect-[4/5]', size: 'medium' },        // Tall - 4 cols
    { span: 'col-span-12 lg:col-span-4', aspect: 'aspect-[4/5]', size: 'medium' },        // Tall - 4 cols
    { span: 'col-span-12 lg:col-span-4', aspect: 'aspect-square', size: 'medium' },       // Square - 4 cols
    { span: 'col-span-12 lg:col-span-6', aspect: 'aspect-[4/3]', size: 'medium' },        // Wide - 6 cols
    { span: 'col-span-12 lg:col-span-6', aspect: 'aspect-[4/3]', size: 'medium' },        // Wide - 6 cols
  ];

  return (
    <section ref={ref} className="mb-32 lg:mb-48">
      <div className="grid grid-cols-12 gap-4 lg:gap-6">
        {articles.slice(0, 7).map((article, index) => {
          const pattern = bentoPattern[index];
          if (!pattern) return null;

          return (
            <BentoCard
              key={article.id}
              article={article}
              pattern={pattern}
              index={index}
              inView={inView}
            />
          );
        })}
      </div>
    </section>
  );
}

interface BentoCardProps {
  article: Article;
  pattern: { span: string; aspect: string; size: string };
  index: number;
  inView: boolean;
}

function BentoCard({ article, pattern, index, inView }: BentoCardProps) {
  const vertical = article.verticals.nodes[0];
  const { featuredImage, customExcerpt, readTime, isPremium } = article.articleFields;
  const href = `/${vertical.slug}/${article.slug}`;
  const imageUrl = featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=900&fit=crop';
  const imageAlt = featuredImage?.node?.altText || article.title;

  const isLarge = pattern.size === 'large';

  return (
    <motion.div
      className={pattern.span}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link href={href} className="group block h-full">
        <div className={`relative ${pattern.aspect} w-full rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-100`}>
          {/* Image with advanced hover effects */}
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover brightness-95 group-hover:brightness-100 transition-all duration-700"
              sizes={isLarge ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          </motion.div>

          {/* Gradient overlay - stronger on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />

          {/* Content overlay */}
          <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              <motion.span
                className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-sm border ${getVerticalColor(vertical.slug)}`}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {vertical.name}
              </motion.span>
              {isPremium && (
                <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-400/95 text-black backdrop-blur-sm">
                  ★ 프리미엄
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className={`font-serif font-black text-white mb-3 line-clamp-${isLarge ? '3' : '2'} group-hover:text-gray-100 transition-colors leading-tight ${
              isLarge ? 'text-3xl lg:text-[56px]' : 'text-2xl lg:text-4xl'
            }`}>
              {article.title}
            </h3>

            {/* Excerpt - only for large cards */}
            {isLarge && customExcerpt && (
              <p className="text-white/90 text-base lg:text-lg mb-4 line-clamp-2 leading-relaxed">
                {customExcerpt}
              </p>
            )}

            {/* Meta info */}
            <div className="flex items-center justify-between text-white/80">
              <span className="text-sm font-medium">{readTime}분 읽기</span>

              {/* Read more arrow */}
              <motion.div
                className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <span>읽기</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
