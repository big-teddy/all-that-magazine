'use client';

import { motion } from 'framer-motion';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
  title: string;
  description?: string;
}

export default function ShareButtons({ title, description }: Props) {
  const pathname = usePathname();
  const url = `https://all-that-magazine.vercel.app${pathname}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('링크가 복사되었습니다!', {
        duration: 2000,
        position: 'bottom-center',
        style: {
          background: '#000',
          color: '#fff',
          fontWeight: 600,
          padding: '12px 24px',
          borderRadius: '8px',
        },
      });
    } catch (error) {
      toast.error('링크 복사에 실패했습니다.');
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="border-t border-gray-200 pt-8 mb-12">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-gray-600">이 글을 공유하세요:</span>
        <div className="flex gap-3">
          {/* Twitter */}
          <TwitterShareButton
            url={url}
            title={title}
            hashtags={['AllThat', 'Magazine']}
          >
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="cursor-pointer"
            >
              <TwitterIcon size={40} round />
            </motion.div>
          </TwitterShareButton>

          {/* Facebook */}
          <FacebookShareButton
            url={url}
            hashtag="#AllThatMagazine"
          >
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="cursor-pointer"
            >
              <FacebookIcon size={40} round />
            </motion.div>
          </FacebookShareButton>

          {/* LinkedIn */}
          <LinkedinShareButton
            url={url}
            title={title}
            summary={description}
            source="All That Magazine"
          >
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="cursor-pointer"
            >
              <LinkedinIcon size={40} round />
            </motion.div>
          </LinkedinShareButton>

          {/* Copy Link Button */}
          <motion.button
            onClick={handleCopyLink}
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="링크 복사"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
