'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface Props {
  onResult: (transcript: string) => void;
  className?: string;
}

export default function VoiceSearch({ onResult, className = '' }: Props) {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    // Check for browser support
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error('브라우저가 음성 인식을 지원하지 않습니다', {
        icon: '🎤',
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast.success('듣고 있습니다...', {
        icon: '🎤',
        duration: 2000,
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      toast.success(`검색: "${transcript}"`, {
        icon: '✓',
      });
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      console.error('Speech recognition error:', event.error);

      let errorMessage = '음성 인식 오류가 발생했습니다';
      if (event.error === 'no-speech') {
        errorMessage = '음성이 감지되지 않았습니다';
      } else if (event.error === 'network') {
        errorMessage = '네트워크 오류가 발생했습니다';
      }

      toast.error(errorMessage, {
        icon: '❌',
      });
    };

    recognition.start();
  };

  return (
    <motion.button
      onClick={startListening}
      disabled={isListening}
      className={`p-2 rounded-lg transition-colors ${
        isListening
          ? 'bg-red-500 text-white'
          : 'hover:bg-gray-100'
      } ${className}`}
      whileHover={!isListening ? { scale: 1.05 } : {}}
      whileTap={{ scale: 0.95 }}
      animate={isListening ? { scale: [1, 1.1, 1] } : {}}
      transition={isListening ? { repeat: Infinity, duration: 1 } : {}}
      aria-label="음성 검색"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    </motion.button>
  );
}
