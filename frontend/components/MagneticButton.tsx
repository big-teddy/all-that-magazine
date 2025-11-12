'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

/**
 * Magnetic Button - Award-winning interaction pattern
 * Button follows cursor with smooth spring physics
 */
export default function MagneticButton({ children, className = '', onClick, href }: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Magnetic strength (max 20px movement)
    const magneticStrength = 0.3;
    setPosition({
      x: deltaX * magneticStrength,
      y: deltaY * magneticStrength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ x: position.x, y: position.y }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          }}
          className={className}
        >
          {children}
        </motion.a>
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
