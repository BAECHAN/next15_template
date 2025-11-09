'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePost } from '@/app/(main)/posts/_common/posts.queries';
import {
  createPostSchema,
  type CreatePostFormData,
} from '@/app/(main)/posts/_CreatePostForm/model/createPostForm.schema';

/**
 * CreatePostForm 컴포넌트 전용 hook
 *
 * 게시글 작성 폼의 비즈니스 로직을 관리합니다.
 */
export function useCreatePostForm() {
  const router = useRouter();
  const createPost = useCreatePost();

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      body: '',
      userId: 1,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await createPost.mutateAsync({
        title: data.title.trim(),
        body: data.body.trim(),
        userId: data.userId,
      });
      router.push('/posts');
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      // 에러는 상위로 전파하여 ErrorBoundary에서 처리
      throw error;
    }
  });

  return {
    form,
    handleSubmit,
    isSubmitting: createPost.isPending,
  };
}
