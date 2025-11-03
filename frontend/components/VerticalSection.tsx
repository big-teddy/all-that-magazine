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
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-serif text-4xl lg:text-5xl font-black">{title}</h2>
        <Link
          href={`/${slug}`}
          className="text-lg font-medium hover:underline inline-flex items-center gap-2 group"
        >
          전체 보기
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Hero Article (6 columns) */}
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ArticleCard article={heroArticle} variant="hero" />
        </motion.div>

        {/* Thumbnail Articles (6 columns) */}
        <motion.div
          className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {thumbnailArticles.slice(0, 4).map((article, index) => (
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
