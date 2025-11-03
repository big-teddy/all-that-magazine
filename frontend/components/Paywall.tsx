export default function Paywall() {
  return (
    <div className="relative mt-12">
      <div className="bg-gradient-to-t from-brand-white to-transparent absolute -top-32 left-0 right-0 h-32" />

      <div className="bg-white border-2 border-gray-900 rounded-lg p-8 max-w-md mx-auto text-center shadow-xl">
        <h3 className="font-serif text-2xl font-black mb-4">
          Continue Reading
        </h3>
        <p className="text-gray-600 mb-6">
          This is premium content. Subscribe to access the full article.
        </p>
        <button className="w-full bg-brand-black text-brand-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Subscribe Now
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Starting at ₩9,900/month
        </p>
      </div>
    </div>
  );
}
