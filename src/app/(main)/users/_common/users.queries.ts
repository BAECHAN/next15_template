'use client';

import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { USERS_API, type CreateUserDto, type UpdateUserDto } from './users.api';

/**
 * Users Query Keys
 *
 * Users 도메인 전용 쿼리 키를 관리합니다.
 */
export const USERS_QUERY_KEYS = {
  all: ['users'] as const,
  listAll: () => [...USERS_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: string) => [...USERS_QUERY_KEYS.listAll(), { filters }] as const,
  detailAll: () => [...USERS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number | string) => [...USERS_QUERY_KEYS.detailAll(), id] as const,
} as const;

/**
 * 모든 사용자 조회 (Suspense 지원)
 */
export function useUsers() {
  return useSuspenseQuery({
    queryKey: USERS_QUERY_KEYS.listAll(),
    queryFn: () => USERS_API.getAll(),
  });
}

/**
 * 특정 사용자 조회 (Suspense 지원)
 */
export function useUser(id: number | string) {
  return useSuspenseQuery({
    queryKey: USERS_QUERY_KEYS.detail(id),
    queryFn: () => USERS_API.getById(id),
  });
}

/**
 * 사용자 생성 Mutation
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => USERS_API.create(data),
    onSuccess: () => {
      // 사용자 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.listAll() });
    },
  });
}

/**
 * 사용자 수정 Mutation
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateUserDto }) =>
      USERS_API.update(id, data),
    onSuccess: (_, variables) => {
      // 해당 사용자와 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.listAll() });
    },
  });
}

/**
 * 사용자 삭제 Mutation
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => USERS_API.delete(id),
    onSuccess: () => {
      // 사용자 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.listAll() });
    },
  });
}
