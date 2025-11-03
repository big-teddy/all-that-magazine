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
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-8">
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={reset}
        className="bg-brand-black text-brand-white py-3 px-8 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
