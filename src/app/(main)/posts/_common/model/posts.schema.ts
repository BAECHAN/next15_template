import { z } from 'zod';

/**
 * Post 기본 스키마
 *
 * id는 optional로 정의하되, API 응답에서는 항상 존재합니다.
 */
export const postSchema = z.object({
  id: z.number().optional(), // JSONPlaceholder에서 자동 생성
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

export type Post = z.infer<typeof postSchema>;

/**
 * API 응답용 Post 타입 (id가 항상 존재)
 */
export type PostResponse = Post & { id: number };

export type CreatePostDTO = Omit<Post, 'id'>;

export type UpdatePostDTO = Partial<Omit<Post, 'id'>>;
