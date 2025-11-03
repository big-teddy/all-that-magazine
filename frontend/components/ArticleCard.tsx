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
        className="group"
      >
        <Link href={href} className="block">
          <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </motion.div>
            <div className="absolute top-4 left-4">
              <motion.span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-white border-2 ${getVerticalColor(vertical.slug)}`}
                whileHover={{ scale: 1.1 }}
                style={{ transform: 'translateZ(20px)' }}
              >
                {vertical.name}
              </motion.span>
            </div>
            {isPremium && (
              <div className="absolute top-4 right-4">
                <motion.span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-black"
                  animate={{ rotate: [0, -2, 2, -2, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                  style={{ transform: 'translateZ(20px)' }}
                >
                  ★ 프리미엄
                </motion.span>
              </div>
            )}
          </div>

          <motion.h3
            className="font-serif text-3xl lg:text-section font-black mb-3 group-hover:text-gray-600 transition-colors"
            style={{ transform: 'translateZ(30px)' }}
          >
            {article.title}
          </motion.h3>

          <motion.p
            className="text-lg text-gray-600 mb-4 line-clamp-2"
            style={{ transform: 'translateZ(20px)' }}
          >
            {customExcerpt}
          </motion.p>

          <motion.div
            className="flex items-center gap-4 text-sm text-gray-500"
            style={{ transform: 'translateZ(10px)' }}
          >
            <span>{readTime}분</span>
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
      className="group"
    >
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
            />
          </motion.div>
          {isPremium && (
            <div className="absolute top-3 right-3">
              <motion.span
                className="inline-block px-2 py-1 rounded-full text-xs font-bold bg-yellow-400 text-black"
                style={{ transform: 'translateZ(15px)' }}
              >
                ★
              </motion.span>
            </div>
          )}
        </div>

        <div className="mb-2">
          <motion.span
            className={`inline-block text-sm font-medium ${getVerticalColor(vertical.slug)}`}
            style={{ transform: 'translateZ(10px)' }}
          >
            {vertical.name}
          </motion.span>
        </div>

        <motion.h3
          className="font-serif text-xl lg:text-2xl font-bold mb-2 group-hover:text-gray-600 transition-colors line-clamp-2"
          style={{ transform: 'translateZ(20px)' }}
        >
          {article.title}
        </motion.h3>

        <motion.div
          className="flex items-center gap-3 text-sm text-gray-500"
          style={{ transform: 'translateZ(10px)' }}
        >
          <span>{readTime}분</span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
