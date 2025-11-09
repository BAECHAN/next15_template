import { AsyncBoundary } from '@/components/elements/async-boundary/AsyncBoundary';
import { PostList } from './_PostList/ui/PostList';
import { cn } from '@/lib/utils';

export default function PostListPage() {
  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30')}>
      <div className={cn('max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8')}>
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                게시글 목록
              </h1>
              <p className="text-base text-gray-600 mt-1">게시글을 조회하고 관리합니다</p>
            </div>
          </div>
        </header>
        <main className="w-full">
          <AsyncBoundary>
            <PostList />
          </AsyncBoundary>
        </main>
      </div>
    </div>
  );
}
