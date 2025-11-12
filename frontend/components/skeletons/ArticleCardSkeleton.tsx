export default function ArticleCardSkeleton({ variant = 'thumbnail' }: { variant?: 'hero' | 'thumbnail' }) {
  if (variant === 'hero') {
    return (
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="relative aspect-video mb-6 rounded-lg bg-gray-200 overflow-hidden">
          <div className="absolute inset-0 shimmer" />
        </div>

        {/* Title skeleton */}
        <div className="space-y-3 mb-3">
          <div className="relative h-9 bg-gray-200 rounded w-4/5 overflow-hidden">
            <div className="absolute inset-0 shimmer" />
          </div>
          <div className="relative h-9 bg-gray-200 rounded w-3/5 overflow-hidden">
            <div className="absolute inset-0 shimmer" />
          </div>
        </div>

        {/* Excerpt skeleton */}
        <div className="space-y-2 mb-4">
          <div className="relative h-6 bg-gray-200 rounded w-full overflow-hidden">
            <div className="absolute inset-0 shimmer" />
          </div>
          <div className="relative h-6 bg-gray-200 rounded w-2/3 overflow-hidden">
            <div className="absolute inset-0 shimmer" />
          </div>
        </div>

        {/* Meta skeleton */}
        <div className="relative h-5 bg-gray-200 rounded w-32 overflow-hidden">
          <div className="absolute inset-0 shimmer" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] mb-4 rounded-lg bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>

      {/* Category skeleton */}
      <div className="relative h-5 bg-gray-200 rounded w-20 mb-2 overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>

      {/* Title skeleton */}
      <div className="space-y-2 mb-2">
        <div className="relative h-7 bg-gray-200 rounded w-full overflow-hidden">
          <div className="absolute inset-0 shimmer" />
        </div>
        <div className="relative h-7 bg-gray-200 rounded w-4/5 overflow-hidden">
          <div className="absolute inset-0 shimmer" />
        </div>
      </div>

      {/* Meta skeleton */}
      <div className="relative h-4 bg-gray-200 rounded w-24 overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
    </div>
  );
}
