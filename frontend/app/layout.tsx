import type { Metadata } from 'next';
import { Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ViewTransitions } from 'next-view-transitions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReadingProgress from '@/components/ReadingProgress';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

// Korean-optimized serif font for headings
const notoSerif = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
});

// Korean-optimized sans-serif font for body text
const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'All That Magazine | 프리미엄 웰니스·라이프스타일·테크 매거진',
  description: '웰니스, 라이프스타일, 기술 분야의 큐레이션된 프리미엄 콘텐츠. 한국과 글로벌 독자를 위한 깊이 있는 인사이트와 독점 스토리.',
  keywords: ['웰니스', '라이프스타일', '테크', '매거진', 'wellness', 'lifestyle', 'technology', 'magazine'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'All That Magazine',
    title: 'All That Magazine | 프리미엄 웰니스·라이프스타일·테크',
    description: '웰니스, 라이프스타일, 기술 분야의 큐레이션된 프리미엄 콘텐츠',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All That Magazine | 프리미엄 매거진',
    description: '웰니스·라이프스타일·테크 분야의 프리미엄 콘텐츠',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="ko" className={`${notoSerif.variable} ${notoSans.variable}`}>
        <head>
          {/* Preconnect to external domains for faster loading */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://images.unsplash.com" />
        </head>
        <body className="font-sans antialiased bg-brand-warm-white text-brand-navy" style={{ fontFamily: 'var(--font-sans)' }}>
          {/* Skip to main content for keyboard users */}
          <a href="#main-content" className="skip-link">
            본문으로 바로가기
          </a>
          <CustomCursor />
          <ReadingProgress />
          <Header />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  );
}
