import { Link } from 'next-view-transitions';

export default function Paywall() {
  return (
    <div className="relative mt-12">
      <div className="bg-gradient-to-t from-brand-white to-transparent absolute -top-32 left-0 right-0 h-32" />

      <div className="bg-white border-2 border-gray-900 rounded-lg p-8 max-w-md mx-auto text-center shadow-xl">
        <div className="mb-4 flex justify-center">
          <svg className="w-12 h-12 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-black mb-4">
          계속 읽기
        </h3>
        <p className="text-gray-600 mb-6">
          프리미엄 콘텐츠입니다. 구독하고 전체 기사를 읽어보세요.
        </p>
        <Link
          href="/subscribe"
          className="block w-full bg-brand-navy text-white py-3 px-6 rounded-lg font-bold hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          지금 구독하기
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          월 ₩9,900부터 • 7일 무료 체험
        </p>
      </div>
    </div>
  );
}
