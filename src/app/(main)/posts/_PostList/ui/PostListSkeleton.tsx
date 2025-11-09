import { Skeleton } from '@/components/atoms/skeleton/Skeleton';

export function PostListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 mb-3">
                <Skeleton className="w-1 h-12 rounded-full flex-shrink-0 mt-1" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex items-center gap-2 mt-4">
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Skeleton className="h-9 w-16 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
