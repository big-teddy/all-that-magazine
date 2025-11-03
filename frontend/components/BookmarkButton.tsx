'use client';

import { motion } from 'framer-motion';
import { useBookmarkStore } from '@/lib/stores/bookmark-store';
import toast from 'react-hot-toast';

interface Props {
  slug: string;
  title: string;
  className?: string;
}

export default function BookmarkButton({ slug, title, className = '' }: Props) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();
  const bookmarked = isBookmarked(slug);

  const handleToggle = () => {
    if (bookmarked) {
      removeBookmark(slug);
      toast.success('북마크에서 제거되었습니다', {
        icon: '📑',
        duration: 2000,
      });
    } else {
      addBookmark(slug);
      toast.success('북마크에 추가되었습니다', {
        icon: '🔖',
        duration: 2000,
      });
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`group relative p-3 rounded-xl transition-all ${
        bookmarked
          ? 'bg-yellow-400 text-black'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={bookmarked ? '북마크 제거' : '북마크 추가'}
    >
      <motion.div
        animate={bookmarked ? { rotate: [0, -10, 10, -10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <svg
          className="w-5 h-5"
          fill={bookmarked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={bookmarked ? 0 : 2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </motion.div>

      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {bookmarked ? '북마크 제거' : '북마크 추가'}
      </span>
    </motion.button>
  );
}
