'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-black hover:text-gray-600 transition-colors z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ALL THAT
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/wellness"
              className="text-lg font-medium hover:text-wellness transition-colors"
            >
              Wellness
            </Link>
            <Link
              href="/lifestyle"
              className="text-lg font-medium hover:text-lifestyle transition-colors"
            >
              Lifestyle
            </Link>
            <Link
              href="/tech"
              className="text-lg font-medium hover:text-tech transition-colors"
            >
              Tech
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Subscribe Button - Desktop */}
            <button className="hidden md:block text-sm font-medium px-4 py-2 border-2 border-brand-black rounded-lg hover:bg-brand-black hover:text-brand-white transition-colors">
              Subscribe
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <form onSubmit={handleSearch} className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  autoFocus
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors text-lg"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <nav className="px-4 py-6 space-y-4">
              <Link
                href="/wellness"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium hover:text-wellness transition-colors py-2"
              >
                Wellness
              </Link>
              <Link
                href="/lifestyle"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium hover:text-lifestyle transition-colors py-2"
              >
                Lifestyle
              </Link>
              <Link
                href="/tech"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium hover:text-tech transition-colors py-2"
              >
                Tech
              </Link>
              <button className="w-full text-sm font-medium px-4 py-3 border-2 border-brand-black rounded-lg hover:bg-brand-black hover:text-brand-white transition-colors mt-4">
                Subscribe
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
