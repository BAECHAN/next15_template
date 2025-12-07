'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePost } from '@/app/(main)/posts/_common/api/posts.queries';
import {
  createPostSchema,
  type CreatePostFormData,
} from '@/app/(main)/posts/_features/create-post/model/createPostForm.schema';

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
      // 폼에 에러 설정
      const errorMessage =
        error instanceof Error ? error.message : '게시글 작성에 실패했습니다. 다시 시도해주세요.';
      form.setError('root', {
        type: 'manual',
        message: errorMessage,
      });
    }
  });

  return {
    form,
    handleSubmit,
    isSubmitting: createPost.isPending,
  };
}
