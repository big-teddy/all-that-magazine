'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'next-view-transitions';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import { getVerticalColor } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  verticals: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  articleFields: {
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText?: string;
      };
    };
    customExcerpt: string;
    readTime: number;
    isPremium: boolean;
  };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [vertical, setVertical] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery] = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const params = new URLSearchParams({ q: debouncedQuery });
    if (vertical) params.append('vertical', vertical);

    fetch(`/api/search?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles?.edges) {
          setResults(data.articles.edges.map((edge: any) => edge.node));
        }
      })
      .catch((error) => console.error('Search error:', error))
      .finally(() => setIsLoading(false));
  }, [debouncedQuery, vertical]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pointer-events-none"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div
              className="w-full max-w-3xl bg-brand-warm-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="기사 검색..."
                    className="flex-1 text-2xl bg-transparent border-none outline-none font-serif font-bold placeholder-gray-400"
                    autoFocus
                  />
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Filter by Vertical */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setVertical('')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      vertical === '' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    전체
                  </button>
                  <button
                    onClick={() => setVertical('wellness')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      vertical === 'wellness' ? 'bg-wellness text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    웰니스
                  </button>
                  <button
                    onClick={() => setVertical('lifestyle')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      vertical === 'lifestyle' ? 'bg-lifestyle text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    라이프스타일
                  </button>
                  <button
                    onClick={() => setVertical('tech')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      vertical === 'tech' ? 'bg-tech text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    테크
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {isLoading ? (
                  <div className="p-12 text-center text-gray-500">
                    검색 중...
                  </div>
                ) : query.length < 2 ? (
                  <div className="p-12 text-center text-gray-500">
                    검색어를 2글자 이상 입력하세요
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-12 text-center text-gray-500">
                    검색 결과가 없습니다
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {results.map((result) => {
                      const verticalData = result.verticals.nodes[0];
                      const href = `/${verticalData.slug}/${result.slug}`;
                      const imageUrl = result.articleFields.featuredImage?.node.sourceUrl ||
                        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop';

                      return (
                        <Link
                          key={result.id}
                          href={href}
                          onClick={onClose}
                          className="flex gap-4 p-4 hover:bg-gray-50 transition-colors group"
                        >
                          {/* Image */}
                          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={result.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              sizes="96px"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${getVerticalColor(verticalData.slug)}`}>
                                {verticalData.name}
                              </span>
                              {result.articleFields.isPremium && (
                                <span className="text-yellow-600 text-xs font-bold">★</span>
                              )}
                            </div>
                            <h3 className="font-serif font-bold text-lg mb-1 line-clamp-2 group-hover:text-gray-600 transition-colors">
                              {result.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-1 mb-1">
                              {result.articleFields.customExcerpt}
                            </p>
                            <span className="text-xs text-gray-500">
                              {result.articleFields.readTime}분
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
