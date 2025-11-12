'use client';

import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (variant === 'hero') {
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="group relative"
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
      >
        {/* Glassmorphism overlay on hover */}
        <motion.div
          className="absolute -inset-4 glass rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          initial={false}
        />
        <Link href={href} className="block relative">
          {/* Image - Larger aspect ratio for hero */}
          <div className="relative aspect-[4/3] mb-6 lg:mb-8 rounded-xl overflow-hidden">
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
                loading="lazy"
                quality={85}
              />
            </motion.div>

            {/* Dark overlay on hover for better badge visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badges */}
            <div className="absolute top-4 lg:top-6 left-4 lg:left-6 flex gap-2">
              <motion.span
                className={`inline-block px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-bold bg-white border-2 ${getVerticalColor(vertical.slug)}`}
                whileHover={{ scale: 1.05 }}
                style={{ transform: 'translateZ(20px)' }}
              >
                {vertical.name}
              </motion.span>
              {isPremium && (
                <motion.span
                  className="inline-block px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-bold bg-gradient-to-r from-metallic-champagne-gold via-metallic-rose-gold to-metallic-champagne-gold text-white shadow-lg"
                  style={{ transform: 'translateZ(20px)' }}
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(201, 176, 55, 0.3)' }}
                >
                  ★ 프리미엄
                </motion.span>
              )}
            </div>

            {/* Read time indicator on hover */}
            <div className="absolute bottom-4 lg:bottom-6 right-4 lg:right-6 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {readTime}분 읽기
            </div>
          </div>

          {/* Content with Kinetic Typography */}
          <h3
            className="font-serif text-3xl lg:text-[48px] font-black mb-4 lg:mb-6 leading-[1.1] tracking-tight"
            style={{ transform: 'translateZ(30px)' }}
          >
            {article.title.split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-2 lg:mr-3">
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    className="inline-block group-hover:text-gray-600 transition-colors"
                    whileHover={{
                      y: -3,
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h3>

          <motion.p
            className="text-lg lg:text-xl text-gray-700 mb-4 lg:mb-6 line-clamp-2 leading-relaxed"
            style={{ transform: 'translateZ(20px)' }}
          >
            {customExcerpt}
          </motion.p>

          {/* Read more link */}
          <motion.div
            className="inline-flex items-center gap-2 text-sm lg:text-base font-medium group-hover:gap-4 transition-all"
            style={{ transform: 'translateZ(10px)' }}
            whileHover={{ x: 5 }}
          >
            <span>더 읽기</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      className="group relative p-4 rounded-xl transition-all duration-300"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Glassmorphism background on hover */}
      <motion.div
        className="absolute inset-0 glass rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        initial={false}
      />
      <Link href={href} className="block relative">
        {/* Horizontal layout for compact, elegant presentation */}
        <div className="flex gap-5">
          {/* Image */}
          <div className="relative aspect-square w-28 lg:w-32 flex-shrink-0 rounded-lg overflow-hidden">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 112px, 128px"
                loading="lazy"
                quality={75}
              />
            </motion.div>
            {isPremium && (
              <div className="absolute top-2 right-2">
                <motion.span
                  className="inline-block px-1.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-metallic-champagne-gold to-metallic-rose-gold text-white shadow-md"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                >
                  ★
                </motion.span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center py-1">
            {/* Vertical badge */}
            <div className="mb-2">
              <motion.span
                className={`inline-block text-xs font-bold uppercase tracking-wider ${getVerticalColor(vertical.slug)}`}
                style={{ transform: 'translateZ(10px)' }}
              >
                {vertical.name}
              </motion.span>
            </div>

            {/* Title with Kinetic Typography */}
            <h3
              className="font-serif text-xl lg:text-2xl font-black mb-2 line-clamp-2 leading-tight"
              style={{ transform: 'translateZ(20px)' }}
            >
              {article.title.split(' ').map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-1.5">
                  {word.split('').map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      className="inline-block group-hover:text-gray-600 transition-colors"
                      whileHover={{
                        y: -2,
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h3>

            {/* Meta */}
            <motion.div
              className="flex items-center gap-2 text-xs lg:text-sm text-gray-500 mt-auto"
              style={{ transform: 'translateZ(10px)' }}
            >
              <span>{readTime}분</span>
              <span>•</span>
              <span className="group-hover:text-black transition-colors">읽기 →</span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
