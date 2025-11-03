'use client';

import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <div className="mb-32 lg:mb-48">
      <motion.div
        className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      />
    </div>
  );
}
