'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface Props {
  content: string;
}

export default function TableOfContents({ content }: Props) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse content to extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');

    const extractedHeadings: Heading[] = Array.from(headingElements).map((heading, index) => {
      const id = `heading-${index}`;
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.substring(1));
      return { id, text, level };
    });

    setHeadings(extractedHeadings);

    // Add IDs to actual headings in the DOM
    const articleContent = document.querySelector('.article-prose-content');
    if (articleContent) {
      const actualHeadings = articleContent.querySelectorAll('h2, h3');
      actualHeadings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
    }

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
      }
    );

    if (articleContent) {
      const actualHeadings = articleContent.querySelectorAll('h2, h3');
      actualHeadings.forEach((heading) => observer.observe(heading));
    }

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <motion.nav
      className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-serif text-xl font-bold mb-4">목차</h3>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id} style={{ paddingLeft: (heading.level - 2) * 16 }}>
              <a
                href={`#${heading.id}`}
                className={`block text-sm transition-colors hover:text-brand-black ${
                  activeId === heading.id
                    ? 'text-brand-black font-medium'
                    : 'text-gray-600'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-4 w-full bg-brand-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        ↑ 맨 위로
      </motion.button>
    </motion.nav>
  );
}
