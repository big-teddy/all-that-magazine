import type { Metadata } from 'next';
import { Playfair_Display, Lora, Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReadingProgress from '@/components/ReadingProgress';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
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
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'All That Magazine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All That Magazine | 프리미엄 매거진',
    description: '웰니스·라이프스타일·테크 분야의 프리미엄 콘텐츠',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${playfair.variable} ${lora.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-brand-warm-white text-brand-navy">
        <ReadingProgress />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
