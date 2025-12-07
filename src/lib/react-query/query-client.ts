'use client';

import { QueryClient } from '@tanstack/react-query';

/**
 * React Query QueryClient 인스턴스
 *
 * 기본 설정:
 * - staleTime: 60초 (1분간 데이터를 fresh로 유지)
 * - gcTime: 5분 (캐시된 데이터를 5분간 유지)
 * - retry: 1회 (실패 시 1번만 재시도)
 * - refetchOnWindowFocus: false (윈도우 포커스 시 자동 refetch 비활성화)
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분
      gcTime: 5 * 60 * 1000, // 5분 (이전 cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
