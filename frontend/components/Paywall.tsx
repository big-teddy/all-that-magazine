export default function Paywall() {
  return (
    <div className="relative mt-12">
      <div className="bg-gradient-to-t from-brand-white to-transparent absolute -top-32 left-0 right-0 h-32" />

      <div className="bg-white border-2 border-gray-900 rounded-lg p-8 max-w-md mx-auto text-center shadow-xl">
        <h3 className="font-serif text-2xl font-black mb-4">
          계속 읽기
        </h3>
        <p className="text-gray-600 mb-6">
          프리미엄 콘텐츠입니다. 구독하고 전체 기사를 읽어보세요.
        </p>
        <button className="w-full bg-brand-black text-brand-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
          지금 구독하기
        </button>
        <p className="text-sm text-gray-500 mt-4">
          월 ₩9,900부터
        </p>
      </div>
    </div>
  );
}
