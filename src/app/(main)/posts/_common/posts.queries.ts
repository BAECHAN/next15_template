'use client';

import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { POSTS_API, type CreatePostDTO, type UpdatePostDTO } from './posts.api';

/**
 * Posts Query Keys
 *
 * Posts 도메인 전용 쿼리 키를 관리합니다.
 */
export const POSTS_QUERY_KEYS = {
  all: ['posts'] as const,
  listAll: () => [...POSTS_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: string) => [...POSTS_QUERY_KEYS.listAll(), { filters }] as const,
  detailAll: () => [...POSTS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number | string) => [...POSTS_QUERY_KEYS.detailAll(), id] as const,
} as const;

/**
 * 모든 게시글 조회 (Suspense 지원)
 */
export function usePosts() {
  return useSuspenseQuery({
    queryKey: POSTS_QUERY_KEYS.listAll(),
    queryFn: () => POSTS_API.getAll(),
  });
}

/**
 * 특정 게시글 조회 (Suspense 지원)
 */
export function usePost(id: number | string) {
  return useSuspenseQuery({
    queryKey: POSTS_QUERY_KEYS.detail(id),
    queryFn: () => POSTS_API.getById(id),
  });
}

/**
 * 게시글 생성 Mutation
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostDTO) => POSTS_API.create(data),
    onSuccess: () => {
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEYS.listAll() });
    },
  });
}

/**
 * 게시글 수정 Mutation
 */
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdatePostDTO }) =>
      POSTS_API.update(id, data),
    onSuccess: (_, variables) => {
      // 해당 게시글과 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEYS.listAll() });
    },
  });
}

/**
 * 게시글 삭제 Mutation
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => POSTS_API.delete(id),
    onSuccess: () => {
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEYS.listAll() });
    },
  });
}
