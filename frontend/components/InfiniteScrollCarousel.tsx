'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { getVerticalColor } from '@/lib/utils';

interface Props {
  articles: Article[];
  title?: string;
}

/**
 * Infinite Scroll Carousel - Luxury magazine style
 * Auto-scrolling horizontal carousel with mouse interaction
 */
export default function InfiniteScrollCarousel({ articles, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const velocityRef = useRef(1); // Auto-scroll speed

  // Duplicate articles for seamless loop
  const duplicatedArticles = [...articles, ...articles, ...articles];

  useAnimationFrame(() => {
    if (isPaused) return;

    setScrollX((prev) => {
      const newX = prev + velocityRef.current;
      const maxScroll = (articles.length * 400); // Card width * article count

      // Reset when scrolled through one set
      if (newX >= maxScroll) {
        return 0;
      }

      return newX;
    });
  });

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section className="mb-32 lg:mb-48 overflow-hidden">
      {/* Title */}
      {title && (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="font-serif text-4xl lg:text-[64px] font-black tracking-tight">
            {title}
          </h2>
        </div>
      )}

      {/* Carousel */}
      <motion.div
        ref={containerRef}
        className="flex gap-6 py-4"
        style={{ x: -scrollX }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {duplicatedArticles.map((article, index) => (
          <CarouselCard key={`${article.id}-${index}`} article={article} />
        ))}
      </motion.div>

      {/* Scroll hint */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <p className="text-sm text-gray-500 text-center">
          마우스를 올려 스크롤을 멈추세요
        </p>
      </div>
    </section>
  );
}

interface CarouselCardProps {
  article: Article;
}

function CarouselCard({ article }: CarouselCardProps) {
  const vertical = article.verticals.nodes[0];
  const { featuredImage, readTime, isPremium } = article.articleFields;
  const href = `/${vertical.slug}/${article.slug}`;
  const imageUrl = featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=1000&fit=crop';
  const imageAlt = featuredImage?.node?.altText || article.title;

  return (
    <Link href={href} className="group block flex-shrink-0">
      <motion.div
        className="w-[320px] lg:w-[380px]"
        whileHover={{ scale: 1.02, y: -8 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="380px"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-sm border ${getVerticalColor(vertical.slug)}`}>
              {vertical.name}
            </span>
            {isPremium && (
              <span className="inline-block px-2 py-1 rounded-full text-xs font-bold bg-yellow-400/95 text-black">
                ★
              </span>
            )}
          </div>

          {/* Read time on hover */}
          <div className="absolute bottom-4 right-4 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            {readTime}분
          </div>
        </div>

        {/* Content */}
        <h3 className="font-serif text-2xl lg:text-3xl font-black mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors leading-tight">
          {article.title}
        </h3>

        {/* Read more */}
        <motion.div
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 group-hover:text-black group-hover:gap-3 transition-all"
        >
          <span>더 읽기</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </motion.div>
    </Link>
  );
}
