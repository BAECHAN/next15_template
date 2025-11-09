'use client';

import { useState } from 'react';
import { useDeletePost } from '@/app/(main)/posts/_common/posts.queries';

/**
 * PostList 컴포넌트 전용 hook
 *
 * 게시글 목록의 비즈니스 로직을 관리합니다.
 */
export function usePostList() {
  const deletePost = useDeletePost();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deletePost.mutateAsync(id);
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      throw error;
    } finally {
      setDeletingId(null);
    }
  };

  return {
    handleDelete,
    deletingId,
    isDeleting: deletePost.isPending,
  };
}
