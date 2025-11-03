export default function ArticleCardSkeleton({ variant = 'thumbnail' }: { variant?: 'hero' | 'thumbnail' }) {
  if (variant === 'hero') {
    return (
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="aspect-video mb-6 rounded-lg bg-gray-200" />

        {/* Title skeleton */}
        <div className="space-y-3 mb-3">
          <div className="h-9 bg-gray-200 rounded w-4/5" />
          <div className="h-9 bg-gray-200 rounded w-3/5" />
        </div>

        {/* Excerpt skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-6 bg-gray-200 rounded w-full" />
          <div className="h-6 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Meta skeleton */}
        <div className="h-5 bg-gray-200 rounded w-32" />
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[4/3] mb-4 rounded-lg bg-gray-200" />

      {/* Category skeleton */}
      <div className="h-5 bg-gray-200 rounded w-20 mb-2" />

      {/* Title skeleton */}
      <div className="space-y-2 mb-2">
        <div className="h-7 bg-gray-200 rounded w-full" />
        <div className="h-7 bg-gray-200 rounded w-4/5" />
      </div>

      {/* Meta skeleton */}
      <div className="h-4 bg-gray-200 rounded w-24" />
    </div>
  );
}
