import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-neutral border-t border-gray-200 mt-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-serif text-2xl font-black inline-block mb-4 brand-logo">
              ALL THAT
            </Link>
            <p className="text-gray-600 mb-4">
              프리미엄 웰니스 · 라이프스타일 · 테크 매거진
            </p>
          </div>

          {/* Verticals */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">카테고리</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/wellness" className="text-gray-600 hover:text-wellness transition-colors">
                  웰니스
                </Link>
              </li>
              <li>
                <Link href="/lifestyle" className="text-gray-600 hover:text-lifestyle transition-colors">
                  라이프스타일
                </Link>
              </li>
              <li>
                <Link href="/tech" className="text-gray-600 hover:text-tech transition-colors">
                  테크
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">법적 정보</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-brand-black transition-colors">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-brand-black transition-colors">
                  문의
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-brand-black transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-brand-black transition-colors">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600 text-sm">
          <p className="text-english">&copy; {new Date().getFullYear()} All That Magazine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
