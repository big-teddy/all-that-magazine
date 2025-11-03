'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  categories: { slug: string; name: string; count: number }[];
  onFilterChange: (slug: string) => void;
  activeCategory: string;
}

/**
 * Category Filter - Interactive filtering with smooth animations
 * Inspired by Vogue Korea's navigation system
 */
export default function CategoryFilter({ categories, onFilterChange, activeCategory }: Props) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="mb-16 lg:mb-24">
      <div className="flex flex-wrap gap-3 lg:gap-4">
        {/* All button */}
        <FilterButton
          slug="all"
          name="전체"
          count={categories.reduce((sum, cat) => sum + cat.count, 0)}
          isActive={activeCategory === 'all'}
          isHovered={hoveredCategory === 'all'}
          onClick={() => onFilterChange('all')}
          onHoverStart={() => setHoveredCategory('all')}
          onHoverEnd={() => setHoveredCategory(null)}
        />

        {/* Category buttons */}
        {categories.map((category) => (
          <FilterButton
            key={category.slug}
            slug={category.slug}
            name={category.name}
            count={category.count}
            isActive={activeCategory === category.slug}
            isHovered={hoveredCategory === category.slug}
            onClick={() => onFilterChange(category.slug)}
            onHoverStart={() => setHoveredCategory(category.slug)}
            onHoverEnd={() => setHoveredCategory(null)}
          />
        ))}
      </div>
    </div>
  );
}

interface FilterButtonProps {
  slug: string;
  name: string;
  count: number;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function FilterButton({
  slug,
  name,
  count,
  isActive,
  isHovered,
  onClick,
  onHoverStart,
  onHoverEnd
}: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={`relative px-6 lg:px-8 py-3 lg:py-4 rounded-full font-medium text-sm lg:text-base transition-colors ${
        isActive
          ? 'text-white'
          : 'text-gray-700 hover:text-black'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          slug === 'all'
            ? 'bg-black'
            : slug === 'wellness'
            ? 'bg-wellness'
            : slug === 'lifestyle'
            ? 'bg-lifestyle'
            : 'bg-tech'
        }`}
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Border on hover (when not active) */}
      {!isActive && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {name}

        {/* Count badge */}
        <motion.span
          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
            isActive ? 'bg-white/20' : 'bg-gray-100'
          }`}
          animate={{ scale: isActive || isHovered ? 1 : 0.9 }}
        >
          {count}
        </motion.span>
      </span>

      {/* Active indicator line */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-white rounded-full"
            initial={{ scaleX: 0, x: '-50%' }}
            animate={{ scaleX: 1, x: '-50%' }}
            exit={{ scaleX: 0, x: '-50%' }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
