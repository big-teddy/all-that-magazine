export default function HeroSkeleton() {
  return (
    <section className="relative h-[80vh] min-h-[600px] max-h-[900px] mb-20 lg:mb-32 overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute inset-0 shimmer" />
      <div className="relative h-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16 lg:pb-24">
        <div className="max-w-4xl space-y-6">
          {/* Badge skeleton */}
          <div className="relative h-8 bg-gray-300 rounded-full w-24 overflow-hidden">
            <div className="absolute inset-0 shimmer" />
          </div>

          {/* Title skeleton */}
          <div className="space-y-4">
            <div className="relative h-12 bg-gray-300 rounded w-full overflow-hidden">
              <div className="absolute inset-0 shimmer" />
            </div>
            <div className="relative h-12 bg-gray-300 rounded w-4/5 overflow-hidden">
              <div className="absolute inset-0 shimmer" />
            </div>
            <div className="relative h-12 bg-gray-300 rounded w-3/5 overflow-hidden">
              <div className="absolute inset-0 shimmer" />
            </div>
          </div>

          {/* Excerpt skeleton */}
          <div className="space-y-3">
            <div className="relative h-7 bg-gray-300 rounded w-full overflow-hidden">
              <div className="absolute inset-0 shimmer" />
            </div>
            <div className="relative h-7 bg-gray-300 rounded w-2/3 overflow-hidden">
              <div className="absolute inset-0 shimmer" />
            </div>
          </div>

          {/* CTA skeleton */}
          <div className="relative h-12 bg-gray-300 rounded w-40 overflow-hidden">
            <div className="absolute inset-0 shimmer" />
          </div>
        </div>
      </div>
    </section>
  );
}
