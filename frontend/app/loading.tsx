import HeroSkeleton from '@/components/skeletons/HeroSkeleton';
import ArticleCardSkeleton from '@/components/skeletons/ArticleCardSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <HeroSkeleton />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Section Skeleton */}
        <section className="mb-20 lg:mb-32">
          <div className="h-12 bg-gray-200 rounded w-64 mb-10 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <ArticleCardSkeleton key={i} variant="thumbnail" />
            ))}
          </div>
        </section>

        {/* Vertical Section Skeleton */}
        <section className="mb-20">
          <div className="h-12 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <ArticleCardSkeleton variant="hero" />
            </div>
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <ArticleCardSkeleton key={i} variant="thumbnail" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
