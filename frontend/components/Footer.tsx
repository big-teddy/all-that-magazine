'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative mt-32 lg:mt-48 overflow-hidden">
      {/* Glassmorphism background */}
      <div className="glass border-t border-gray-300/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
            {/* Logo & Tagline */}
            <motion.div
              className="col-span-1 md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="font-serif text-3xl lg:text-4xl font-black inline-flex mb-6 brand-logo group">
                {'ALL THAT'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </Link>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                프리미엄 웰니스 · 라이프스타일 · 테크 매거진
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                삶의 모든 순간을 더 풍요롭게 만드는 큐레이션된 인사이트
              </p>
            </motion.div>

          {/* Verticals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-serif font-bold text-xl mb-6">카테고리</h3>
              <ul className="space-y-3">
                {[
                  { href: '/wellness', label: '웰니스', color: 'hover:text-wellness' },
                  { href: '/lifestyle', label: '라이프스타일', color: 'hover:text-lifestyle' },
                  { href: '/tech', label: '테크', color: 'hover:text-tech' }
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={`text-gray-700 ${link.color} transition-all duration-300 hover:translate-x-2 inline-block font-medium`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-serif font-bold text-xl mb-6">정보</h3>
              <ul className="space-y-3">
                {[
                  { href: '/about', label: '소개' },
                  { href: '/subscribe', label: '구독' },
                  { href: '/contact', label: '문의' },
                  { href: '/privacy', label: '개인정보처리방침' },
                  { href: '/terms', label: '이용약관' }
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-700 hover:text-brand-black transition-all duration-300 hover:translate-x-2 inline-block font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom section with copyright and social */}
          <motion.div
            className="border-t border-gray-300/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-gray-600 text-sm text-english">
              &copy; {new Date().getFullYear()} All That Magazine. All rights reserved.
            </p>

            {/* Social links placeholder */}
            <div className="flex items-center gap-4">
              <motion.a
                href="#"
                className="text-gray-600 hover:text-brand-black transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/><circle cx="18.406" cy="5.594" r="1.44"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-brand-black transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-brand-black transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
