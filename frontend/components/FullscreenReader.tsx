'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface Props {
  content: string;
  title: string;
}

export default function FullscreenReader({ content, title }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'f' || e.key === 'F') {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    // Prevent scrolling on body when fullscreen is active
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const fullscreenContent = (
    <AnimatePresence>
      {isFullscreen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-brand-warm-white overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header Bar */}
          <motion.div
            className="sticky top-0 z-10 bg-brand-warm-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl line-clamp-1">{title}</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">ESC로 나가기</span>
                <motion.button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="전체화면 종료"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="max-w-4xl mx-auto px-6 py-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-p:mb-6 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </motion.div>

          {/* Footer hint */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm">
            전체화면 읽기 모드
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsFullscreen(true)}
        className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        <span className="text-sm font-medium">전체화면으로 읽기</span>
        <span className="text-xs text-gray-500 group-hover:text-gray-700">F</span>
      </motion.button>

      {/* Portal for fullscreen content */}
      {mounted && createPortal(fullscreenContent, document.body)}
    </>
  );
}
