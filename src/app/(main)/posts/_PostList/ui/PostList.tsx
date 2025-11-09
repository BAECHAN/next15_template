'use client';

import { Button } from '@/components/atoms/Button';
import { usePosts } from '@/app/(main)/posts/_common/posts.queries';
import { usePostList } from '@/app/(main)/posts/_PostList/hooks/usePostList';
import { TEXTS } from '@/lib/constants/texts';

export function PostList() {
  const { data: posts } = usePosts();
  const { handleDelete, deletingId, isDeleting } = usePostList();

  if (!posts || posts.length === 0) {
    return (
      <div className="p-8 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-600">게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.body}</p>
              <p className="text-sm text-gray-400 mt-2">User ID: {post.userId}</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(post.id)}
              disabled={deletingId === post.id || isDeleting}
            >
              {deletingId === post.id ? TEXTS.buttons.deleteLoading : TEXTS.buttons.delete}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
