'use client';

import { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Props {
  content: string;
}

export default function ArticleContent({ content }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    // Parse content to extract images
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const imgElements = doc.querySelectorAll('img');

    const extractedImages = Array.from(imgElements).map((img) => ({
      src: img.src,
      alt: img.alt || 'Article image',
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
  }, [content]);

  return (
    <>
      <div
        className="article-prose-content prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-p:mb-6 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg max-w-none mb-16"
        dangerouslySetInnerHTML={{ __html: content }}
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
