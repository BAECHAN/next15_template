import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from '@/lib/api/client';
import type {
  PostResponse,
  CreatePostDTO,
  UpdatePostDTO,
} from '@/app/(main)/posts/_common/model/posts.schema';

/**
 * Posts API 엔드포인트
 */
export const POSTS_ENDPOINT = '/posts';

// 타입 재export (하위 호환성)
export type Post = PostResponse;
export type {
  CreatePostDTO,
  UpdatePostDTO,
  CreatePostDTO as CreatePostDto,
  UpdatePostDTO as UpdatePostDto,
};

/**
 * Posts API 서비스
 */
export const POSTS_API = {
  /**
   * 모든 게시글 조회
   */
  getAll: (): Promise<Post[]> => {
    return apiGet<Post[]>(POSTS_ENDPOINT);
  },

  /**
   * 특정 게시글 조회
   */
  getById: (id: number | string): Promise<Post> => {
    return apiGet<Post>(`${POSTS_ENDPOINT}/${id}`);
  },

  /**
   * 게시글 생성
   */
  create: (data: CreatePostDTO): Promise<Post> => {
    return apiPost<Post>(POSTS_ENDPOINT, data);
  },

  /**
   * 게시글 수정 (전체)
   */
  update: (id: number | string, data: UpdatePostDTO): Promise<Post> => {
    return apiPut<Post>(`${POSTS_ENDPOINT}/${id}`, data);
  },

  /**
   * 게시글 수정 (부분)
   */
  patch: (id: number | string, data: UpdatePostDTO): Promise<Post> => {
    return apiPatch<Post>(`${POSTS_ENDPOINT}/${id}`, data);
  },

  /**
   * 게시글 삭제
   */
  delete: (id: number | string): Promise<void> => {
    return apiDelete<void>(`${POSTS_ENDPOINT}/${id}`);
  },
};
