'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './query-client';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

/**
 * React Query Provider
 *
 * 앱 전체에서 React Query를 사용할 수 있도록 QueryClientProvider를 제공합니다.
 * 개발 환경에서는 React Query Devtools도 함께 제공합니다.
 */
export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
