'use client';

import { useState, useEffect, useMemo } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Props {
  content: string;
}

export default function ArticleContent({ content }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);

  // Sanitize HTML content to prevent XSS attacks
  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 's', 'b', 'i',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li',
        'a', 'img',
        'blockquote', 'pre', 'code',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'div', 'span',
      ],
      ALLOWED_ATTR: [
        'href', 'target', 'rel',
        'src', 'alt', 'title', 'width', 'height',
        'class', 'id',
      ],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    });
  }, [content]);

  useEffect(() => {
    // Parse content to extract images
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedContent, 'text/html');
    const imgElements = doc.querySelectorAll('img');

    const extractedImages = Array.from(imgElements).map((img) => ({
      src: img.src,
      alt: img.alt || '기사 이미지',
    }));

    setImages(extractedImages);

    // Add click handlers to images after content is mounted
    const handleImageClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const imgSrc = (target as HTMLImageElement).src;
        const index = extractedImages.findIndex((img) => img.src === imgSrc);
        if (index !== -1) {
          setCurrentImageIndex(index);
          setIsOpen(true);
        }
      }
    };

    const contentElement = document.querySelector('.article-prose-content');
    if (contentElement) {
      contentElement.addEventListener('click', handleImageClick as EventListener);

      // Add cursor pointer to images
      const imgs = contentElement.querySelectorAll('img');
      imgs.forEach((img) => {
        (img as HTMLElement).style.cursor = 'pointer';
      });

      return () => {
        contentElement.removeEventListener('click', handleImageClick);
      };
    }
  }, [sanitizedContent]);

  return (
    <>
      <div
        className="article-prose-content prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-p:mb-6 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg max-w-none mb-16"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {images.length > 0 && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={currentImageIndex}
          slides={images}
          carousel={{
            finite: images.length <= 1,
          }}
          controller={{
            closeOnBackdropClick: true,
          }}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
          }}
        />
      )}
    </>
  );
}
