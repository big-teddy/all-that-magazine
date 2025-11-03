'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface Props {
  title: string;
  slug: string;
  articles: Article[];
}

export default function VerticalSection({ title, slug, articles }: Props) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  if (articles.length === 0) return null;

  const [heroArticle, ...thumbnailArticles] = articles;

  return (
    <section ref={ref}>
      {/* Section Header - Oversized, Editorial Style */}
      <motion.div
        className="flex items-end justify-between mb-12 lg:mb-16 pb-6 border-b-2 border-black"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-serif text-5xl lg:text-[72px] font-black tracking-tight leading-none">
          {title}
        </h2>
        <Link
          href={`/${slug}`}
          className="text-base lg:text-lg font-medium hover:gap-3 inline-flex items-center gap-2 group pb-1"
        >
          <span className="group-hover:underline">전체 보기</span>
          <motion.svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </Link>
      </motion.div>

      {/* Asymmetric Grid Layout */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Hero Article (7 columns for asymmetry) */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ArticleCard article={heroArticle} variant="hero" />
        </motion.div>

        {/* Thumbnail Articles (5 columns) */}
        <motion.div
          className="lg:col-span-5 grid grid-cols-1 gap-8 lg:gap-10"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {thumbnailArticles.slice(0, 3).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <ArticleCard article={article} variant="thumbnail" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
