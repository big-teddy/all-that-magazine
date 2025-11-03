import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="font-serif text-6xl font-black mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-brand-black text-brand-white py-3 px-8 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
