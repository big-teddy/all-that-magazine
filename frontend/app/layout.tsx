import type { Metadata } from 'next';
import { Playfair_Display, Lora, Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  title: 'All That Magazine - Premium Wellness Lifestyle Tech',
  description: 'Explore wellness, lifestyle, and technology through in-depth articles and exclusive insights.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'All That Magazine',
    title: 'All That Magazine',
    description: 'Premium Wellness Lifestyle Tech',
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
    title: 'All That Magazine',
    description: 'Premium Wellness Lifestyle Tech',
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
