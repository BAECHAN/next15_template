import { AsyncBoundary } from '@/components/elements/async-boundary/AsyncBoundary';
import { PostList } from './_PostList/ui/PostList';
import { PostListSkeleton } from './_PostList/ui/PostListSkeleton';

export default function PostListPage() {
  return (
    <AsyncBoundary loadingFallback={<PostListSkeleton count={3} />}>
      <PostList />
    </AsyncBoundary>
  );
}
