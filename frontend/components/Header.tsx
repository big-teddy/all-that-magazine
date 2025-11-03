import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-black hover:text-gray-600 transition-colors">
            ALL THAT
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/wellness"
              className="text-lg font-medium hover:text-wellness transition-colors"
            >
              Wellness
            </Link>
            <Link
              href="/lifestyle"
              className="text-lg font-medium hover:text-lifestyle transition-colors"
            >
              Lifestyle
            </Link>
            <Link
              href="/tech"
              className="text-lg font-medium hover:text-tech transition-colors"
            >
              Tech
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium px-4 py-2 border-2 border-brand-black rounded-lg hover:bg-brand-black hover:text-brand-white transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
