import { z } from 'zod';
import { postSchema } from '@/app/(main)/posts/_common/model/posts.schema';
import { TEXTS } from '@/lib/constants/texts';

/**
 * 게시글 작성 폼 스키마
 *
 * Post 스키마를 기반으로 폼 검증 규칙을 추가합니다.
 */
export const createPostSchema = postSchema.omit({ id: true }).extend({
  title: z
    .string()
    .min(10, TEXTS.formValidation.titleMinLength(10))
    .max(100, TEXTS.formValidation.titleMaxLength(100)),
  body: z
    .string()
    .min(100, TEXTS.formValidation.bodyMinLength(100))
    .max(1000, TEXTS.formValidation.bodyMaxLength(1000)),
  userId: z.number().min(1, TEXTS.formValidation.userIdMin),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;
