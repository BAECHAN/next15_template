import { AsyncBoundary } from '@/components/elements/async-boundary/AsyncBoundary';
import { PostList } from './_PostList/ui/PostList';
import { cn } from '@/lib/utils';

export default function PostListPage() {
  return (
    <div className={cn('max-w-[1200px] mx-auto p-8')}>
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">게시글 목록</h1>
        <p className="text-base text-gray-600">게시글을 조회하고 관리합니다</p>
      </header>
      <main className="w-full">
        <AsyncBoundary>
          <PostList />
        </AsyncBoundary>
      </main>
    </div>
  );
}
