'use client';

import { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';
import StaggerReveal from './animations/StaggerReveal';

interface Props {
  articles: Article[];
}

export default function MasonryGrid({ articles }: Props) {
  if (articles.length === 0) return null;

  // Dynamic grid sizing based on position
  const getGridSpan = (index: number) => {
    // First article - large featured
    if (index === 0) {
      return 'md:col-span-8 md:row-span-2';
    }
    // Every 5th article after first - medium featured
    if ((index - 1) % 5 === 0 && index > 0) {
      return 'md:col-span-6 md:row-span-2';
    }
    // Regular articles
    return 'md:col-span-4 md:row-span-1';
  };

  return (
    <StaggerReveal
      stagger={0.1}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]"
    >
      {articles.map((article, index) => (
        <div
          key={article.id}
          className={`${getGridSpan(index)} rounded-xl overflow-hidden group`}
        >
          <ArticleCard
            article={article}
            variant={index === 0 ? 'hero' : 'thumbnail'}
          />
        </div>
      ))}
    </StaggerReveal>
  );
}
