'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showEllipsis = totalPages > 7;

  if (showEllipsis) {
    // Always show first page
    pages.push(1);

    // Show ellipsis or pages around current
    if (currentPage > 3) {
      pages.push('...');
    }

    // Show 2 pages before and after current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Show ellipsis or last pages
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    pages.push(totalPages);
  } else {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  return (
    <nav className="flex items-center justify-center gap-2 my-12" aria-label="페이지 네비게이션">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}/page/${currentPage - 1}`}
          className="px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-black transition-colors font-medium"
        >
          ← 이전
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-400 font-medium cursor-not-allowed">
          ← 이전
        </span>
      )}

      {/* Page numbers */}
      <div className="flex gap-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;
          const href = pageNumber === 1 ? basePath : `${basePath}/page/${pageNumber}`;

          return (
            <Link
              key={pageNumber}
              href={href}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-black text-white'
                  : 'border-2 border-gray-300 hover:border-black'
              }`}
            >
              <motion.span whileHover={!isActive ? { scale: 1.05 } : {}} whileTap={{ scale: 0.95 }}>
                {pageNumber}
              </motion.span>
            </Link>
          );
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}/page/${currentPage + 1}`}
          className="px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-black transition-colors font-medium"
        >
          다음 →
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-400 font-medium cursor-not-allowed">
          다음 →
        </span>
      )}
    </nav>
  );
}
