import { AsyncBoundary } from '@/components/elements/async-boundary/AsyncBoundary';
import { PostList } from '@/app/(main)/posts/_features/post-list/ui/PostList';
import { PostListSkeleton } from '@/app/(main)/posts/_features/post-list/ui/PostListSkeleton';

export default function PostListPage() {
  return (
    <AsyncBoundary loadingFallback={<PostListSkeleton count={3} />}>
      <PostList />
    </AsyncBoundary>
  );
}
