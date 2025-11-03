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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export default function FeaturedSection({ articles }: Props) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  if (articles.length === 0) return null;

  return (
    <section className="mb-20 lg:mb-32" ref={ref}>
      <motion.div
        className="flex items-center justify-between mb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-serif text-3xl lg:text-5xl font-black">주요 기사</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {articles.map((article) => {
          const vertical = article.verticals.nodes[0];
          const { featuredImage, customExcerpt, readTime, isPremium } = article.articleFields;
          const href = `/${vertical.slug}/${article.slug}`;
          const imageUrl = featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop';
          const imageAlt = featuredImage?.node?.altText || article.title;

          return (
            <motion.div key={article.id} variants={item}>
              <Link href={href} className="group block">
                {/* Image */}
                <div className="relative aspect-[4/3] mb-5 rounded-xl overflow-hidden bg-gray-100">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                  {/* Vertical Badge */}
                  <div className="absolute top-4 left-4">
                    <motion.span
                      className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-white border-2 ${getVerticalColor(vertical.slug)}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {vertical.name}
                    </motion.span>
                  </div>

                  {/* Premium Badge */}
                  {isPremium && (
                    <div className="absolute top-4 right-4">
                      <motion.span
                        className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-400 text-black"
                        animate={{ rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                      >
                        ★ 프리미엄
                      </motion.span>
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
                    <span>{readTime}분</span>
                    <span>•</span>
                    <motion.span
                      className="group-hover:text-black transition-colors inline-flex items-center gap-1"
                      whileHover={{ x: 5 }}
                    >
                      더 읽기 →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
