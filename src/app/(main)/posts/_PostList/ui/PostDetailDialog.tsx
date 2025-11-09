'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/atoms/dialog/Dialog';
import { Button } from '@/components/atoms/button/Button';
import { useDialogStack } from '@/components/atoms/dialog/hooks/useDialogStack';
import { usePostList } from '@/app/(main)/posts/_PostList/hooks/usePostList';
import { usePost } from '@/app/(main)/posts/_common/posts.queries';
import { TEXTS } from '@/lib/constants/texts';

interface PostDetailDialogProps {
  postId: number;
}

export function PostDetailDialog({ postId }: PostDetailDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { push, clear } = useDialogStack();
  const { data: post, isLoading } = usePost(postId, false); // 일반 Query 모드로 변경 (Suspense 제거)
  const { handleDelete, isDeleting } = usePostList();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // 현재 경로가 /posts/[id]가 아니면 다이얼로그를 표시하지 않음
  const isDialogOpen = pathname === `/posts/${postId}`;

  const handleClose = useCallback(() => {
    // Parallel Routes에서 다이얼로그를 닫기 위해 명시적으로 /posts로 이동
    router.push('/posts');
  }, [router]);

  // Dialog가 열릴 때 ESC 스택에 추가
  useEffect(() => {
    push(handleClose);
    return () => {
      clear();
    };
  }, [push, clear, handleClose]);

  // 삭제 확인 Dialog가 열릴 때 ESC 스택에 추가
  useEffect(() => {
    if (deleteDialogOpen) {
      const closeDeleteDialog = () => setDeleteDialogOpen(false);
      push(closeDeleteDialog);
      return () => {
        // 삭제 다이얼로그가 닫힐 때 스택에서 제거하지 않음 (pop이 이미 호출됨)
      };
    }
  }, [deleteDialogOpen, push]);

  if (!isDialogOpen) {
    return null;
  }

  if (isLoading || !post) {
    return (
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            router.push('/posts');
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>로딩 중...</DialogTitle>
          </DialogHeader>
          <div className="py-4">게시글을 불러오는 중입니다.</div>
        </DialogContent>
      </Dialog>
    );
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDelete(post.id);
      // 삭제 성공 시 다이얼로그 닫기
      setDeleteDialogOpen(false);
      handleClose();
    } catch (error) {
      console.error('삭제 실패:', error);
      // 에러 발생 시 삭제 확인 다이얼로그만 닫기
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            router.push('/posts');
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{post.title}</DialogTitle>
            <DialogDescription>User ID: {post.userId}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3">
              <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex-shrink-0 mt-1"></div>
              <div className="flex-1">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.body}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                User ID: {post.userId}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push('/posts');
              }}
            >
              닫기
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteClick}
              disabled={isDeleting || deleteDialogOpen}
            >
              {TEXTS.buttons.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>게시글 삭제</DialogTitle>
            <DialogDescription>
              정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteDialogOpen(false)}>
              취소
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? TEXTS.buttons.deleteLoading : TEXTS.buttons.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
