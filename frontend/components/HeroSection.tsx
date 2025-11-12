'use client';

import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Article } from '@/lib/types';
import { getVerticalColor } from '@/lib/utils';

interface Props {
  article: Article;
}

export default function HeroSection({ article }: Props) {
  const vertical = article.verticals.nodes[0];
  const { featuredImage, customExcerpt, readTime, isPremium } = article.articleFields;

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Enhanced 3D Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(8px)"]);

  const href = `/${vertical.slug}/${article.slug}`;
  const imageUrl = featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=900&fit=crop';
  const imageAlt = featuredImage?.node?.altText || article.title;

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] mb-32 lg:mb-48 overflow-hidden">
      {/* Background Image with Enhanced 3D Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale, filter: blur }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
          loading="eager"
        />
        {/* Gradient Overlay - stronger for better text contrast */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30"
          style={{ opacity }}
        />
      </motion.div>

      {/* Content - Oversized Typography */}
      <div className="relative h-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20 lg:pb-32">
        <div className="max-w-6xl">
          {/* Vertical Badge */}
          <motion.div
            className="mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className={`inline-block px-5 py-2.5 rounded-full text-sm lg:text-base font-bold bg-white border-2 ${getVerticalColor(vertical.slug)} uppercase tracking-wider`}>
              {vertical.name}
            </span>
          </motion.div>

          {/* Title - Oversized, Dramatic with Kinetic Typography */}
          <Link href={href}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[96px] xl:text-[120px] font-black text-white mb-8 lg:mb-12 cursor-pointer leading-[0.95] tracking-tighter">
              {article.title.split(' ').map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4 lg:mr-8">
                  {word.split('').map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      className="inline-block hover:text-gray-200 transition-colors"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.3 + (wordIndex * 0.1) + (charIndex * 0.02),
                        ease: "easeOut"
                      }}
                      whileHover={{
                        y: -10,
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>
          </Link>

          {/* Excerpt - Elegant, spacious */}
          <motion.p
            className="text-xl lg:text-3xl text-gray-100 mb-10 lg:mb-12 max-w-3xl line-clamp-2 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {customExcerpt}
          </motion.p>

          {/* Meta & CTA - Clean, minimal */}
          <motion.div
            className="flex flex-wrap items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex items-center gap-6 text-white/90 text-base lg:text-lg">
              <span className="font-medium">{readTime}분 읽기</span>
              {isPremium && (
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-metallic-champagne-gold via-metallic-rose-gold to-metallic-champagne-gold text-white text-sm font-bold rounded-full shadow-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 10px 25px rgba(201, 176, 55, 0.3)',
                      '0 15px 35px rgba(201, 176, 55, 0.5)',
                      '0 10px 25px rgba(201, 176, 55, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  ★ 프리미엄
                </motion.span>
              )}
            </div>

            <Link
              href={href}
              className="group inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold text-base lg:text-lg hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              기사 읽기
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Refined */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-white/60"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
