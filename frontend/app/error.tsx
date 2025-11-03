'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h2 className="font-serif text-4xl font-black mb-4">
        오류가 발생했습니다
      </h2>
      <p className="text-gray-600 mb-8">
        {error.message || '예상치 못한 오류가 발생했습니다'}
      </p>
      <button
        onClick={reset}
        className="bg-brand-black text-brand-white py-3 px-8 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
