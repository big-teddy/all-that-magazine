import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="font-serif text-6xl font-black mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        찾으시는 페이지가 존재하지 않습니다.
      </p>
      <Link
        href="/"
        className="inline-block bg-brand-black text-brand-white py-3 px-8 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
