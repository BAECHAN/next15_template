# AsyncBoundary 가이드

로딩 및 에러 처리를 통합한 `AsyncBoundary` 컴포넌트 사용법을 설명합니다.

## 목차

1. [AsyncBoundary란?](#asyncboundary란)
2. [왜 필요한가?](#왜-필요한가)
3. [기본 사용법](#기본-사용법)
4. [고급 사용법](#고급-사용법)
5. [Suspense와 함께 사용](#suspense와-함께-사용)
6. [베스트 프랙티스](#베스트-프랙티스)

## AsyncBoundary란?

`AsyncBoundary`는 React의 `Suspense`와 `ErrorBoundary`를 결합한 래퍼 컴포넌트입니다. React Query의 `useSuspenseQuery`와 함께 사용하여 로딩 및 에러 처리를 단순화합니다.

### 주요 기능

- ✅ 로딩 상태 자동 처리 (Suspense)
- ✅ 에러 상태 자동 처리 (ErrorBoundary)
- ✅ 재시도 기능
- ✅ 커스텀 로딩/에러 UI 지원

## 왜 필요한가?

### 기존 방식의 문제점

**기존 방식 (useQuery 사용)**:

```typescript
function PostList() {
  const { data, isLoading, error } = useQuery({
    queryKey: postKeys.list(),
    queryFn: () => postApi.fetchPostList(),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return <div>{data.map(...)}</div>;
}
```

**문제점**:

- 각 컴포넌트마다 로딩/에러 처리 코드 반복
- 일관성 없는 에러 처리
- 코드 중복

### AsyncBoundary 방식

**개선된 방식 (useSuspenseQuery + AsyncBoundary)**:

```typescript
function PostList() {
  const { data } = usePostListQuery(); // useSuspenseQuery 사용

  return <div>{data.map(...)}</div>;
}

// 사용
<AsyncBoundary>
  <PostList />
</AsyncBoundary>
```

**장점**:

- 로딩/에러 처리 코드 중복 제거
- 일관된 에러 처리
- 깔끔한 컴포넌트 코드

## 기본 사용법

### 컴포넌트 구조

```typescript
// shared/ui/AsyncBoundary/AsyncBoundary.tsx
import { Suspense, ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { ErrorDisplay } from '@/shared/ui/ErrorDisplay';
import { Button } from '@/shared/ui/Button';

interface AsyncBoundaryProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: (props: FallbackProps) => ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: () => void;
}

export function AsyncBoundary({
  children,
  loadingFallback = <LoadingSpinner />,
  errorFallback,
  onError,
  onReset,
}: AsyncBoundaryProps) {
  const defaultErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
    <ErrorDisplay message={error.message || '오류가 발생했습니다.'}>
      <Button onClick={onReset || resetErrorBoundary}>다시 시도</Button>
    </ErrorDisplay>
  );

  return (
    <ErrorBoundary
      FallbackComponent={errorFallback || defaultErrorFallback}
      onError={onError}
      onReset={onReset}
    >
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
```

### 기본 사용 예시

```typescript
// pages/post/PostListPage.tsx
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';
import { PostList } from '@/features/post/post-list';

export function PostListPage() {
  return (
    <PageLayout title="게시글 목록">
      <AsyncBoundary>
        <PostList />
      </AsyncBoundary>
    </PageLayout>
  );
}
```

### React Query 설정

React Query의 `useSuspenseQuery`를 사용하려면 다음 설정이 필요합니다:

```typescript
// shared/lib/react-query/config/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true, // ErrorBoundary로 에러 전파
    },
  },
});
```

### Query Hook 예시

```typescript
// entities/post/api/post.queries.ts
export function usePostListQuery() {
  return useSuspenseQuery({
    queryKey: postKeys.list(),
    queryFn: () => postApi.fetchPostList(),
    staleTime: 1000 * 60 * 5,
  });
}

// features/post/post-list/ui/PostList/PostList.tsx
export function PostList() {
  const { data: postList } = usePostListQuery(); // 로딩/에러 처리 불필요!

  return (
    <Grid>
      {postList.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Grid>
  );
}
```

## 고급 사용법

### 커스텀 로딩 UI

```typescript
function CustomLoadingFallback() {
  return (
    <div>
      <Spinner />
      <p>데이터를 불러오는 중...</p>
    </div>
  );
}

<AsyncBoundary loadingFallback={<CustomLoadingFallback />}>
  <PostList />
</AsyncBoundary>
```

### 커스텀 에러 UI

```typescript
function CustomErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <h2>오류 발생</h2>
      <p>{error.message}</p>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
    </div>
  );
}

<AsyncBoundary errorFallback={CustomErrorFallback}>
  <PostList />
</AsyncBoundary>
```

### 에러 로깅

```typescript
<AsyncBoundary
  onError={(error, info) => {
    // 에러 로깅 서비스에 전송
    console.error('AsyncBoundary Error:', error, info);
    // Sentry, LogRocket 등에 전송
  }}
>
  <PostList />
</AsyncBoundary>
```

### 재시도 로직

```typescript
function PostListPage() {
  const queryClient = useQueryClient();

  const handleReset = () => {
    // 특정 쿼리만 재시도
    queryClient.invalidateQueries({ queryKey: postKeys.list() });
  };

  return (
    <AsyncBoundary onReset={handleReset}>
      <PostList />
    </AsyncBoundary>
  );
}
```

### 조건부 AsyncBoundary

```typescript
function ConditionalAsyncBoundary({ children, enabled }: Props) {
  if (!enabled) {
    return <>{children}</>;
  }

  return <AsyncBoundary>{children}</AsyncBoundary>;
}
```

## Suspense와 함께 사용

### useSuspenseQuery vs useQuery

**useSuspenseQuery** (AsyncBoundary와 함께 사용):

```typescript
export function usePostListQuery() {
  return useSuspenseQuery({
    queryKey: postKeys.list(),
    queryFn: () => postApi.fetchPostList(),
  });
}

// 컴포넌트에서
function PostList() {
  const { data } = usePostListQuery(); // 로딩 상태 없음
  return <div>{data.map(...)}</div>;
}
```

**useQuery** (전통적인 방식):

```typescript
export function usePostListQuery() {
  return useQuery({
    queryKey: postKeys.list(),
    queryFn: () => postApi.fetchPostList(),
  });
}

// 컴포넌트에서
function PostList() {
  const { data, isLoading, error } = usePostListQuery();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return <div>{data.map(...)}</div>;
}
```

### 중첩된 Suspense

여러 레벨의 Suspense를 중첩하여 사용할 수 있습니다:

```typescript
<AsyncBoundary>
  <PageLayout>
    <AsyncBoundary loadingFallback={<PostListSkeleton />}>
      <PostList />
    </AsyncBoundary>

    <AsyncBoundary loadingFallback={<UserListSkeleton />}>
      <UserList />
    </AsyncBoundary>
  </PageLayout>
</AsyncBoundary>
```

### 여러 Query 동시 처리

실제 프로젝트의 `PostListPage`에서는 `PostList` feature만 사용하지만, 여러 컴포넌트를 조합하여 사용할 수 있습니다:

```typescript
// pages/post/PostListPage/PostListPage.tsx
import { Header } from '@/widgets/header';
import { PageLayout } from '@/widgets/page-layout';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';
import { PostList } from '@/features/post/post-list';

export function PostListPage() {
  return (
    <>
      <Header />
      <PageLayout title="게시글 목록">
        <AsyncBoundary>
          <PostList /> {/* useSuspenseQuery 사용 */}
        </AsyncBoundary>
      </PageLayout>
    </>
  );
}
```

여러 feature를 조합하는 예제:

```typescript
function ExamplePage() {
  return (
    <AsyncBoundary>
      <PostList /> {/* useSuspenseQuery 사용 */}
      <UserList /> {/* useSuspenseQuery 사용 */}
    </AsyncBoundary>
  );
}

// 두 컴포넌트 모두 useSuspenseQuery 사용
function PostList() {
  const { data: posts } = usePostListQuery(); // useSuspenseQuery
  return <div>{posts.map(...)}</div>;
}

function UserList() {
  const { data: users } = useUserListQuery(); // useSuspenseQuery
  return <div>{users.map(...)}</div>;
}
```

## 베스트 프랙티스

### 1. 페이지 레벨에서 사용

**✅ 좋은 예시**:

```typescript
export function PostListPage() {
  return (
    <PageLayout>
      <AsyncBoundary>
        <PostList />
      </AsyncBoundary>
    </PageLayout>
  );
}
```

**❌ 나쁜 예시** (너무 세분화):

```typescript
export function PostList() {
  return (
    <div>
      <AsyncBoundary>
        <PostCard />
      </AsyncBoundary>
    </div>
  );
}
```

### 2. 일관된 에러 처리

모든 페이지에서 동일한 에러 처리 패턴 사용:

```typescript
// 모든 페이지에서 동일한 패턴
<AsyncBoundary>
  <FeatureComponent />
</AsyncBoundary>
```

### 3. 적절한 로딩 UI

컨텍스트에 맞는 로딩 UI 사용:

```typescript
// 목록 페이지
<AsyncBoundary loadingFallback={<ListSkeleton />}>
  <PostList />
</AsyncBoundary>

// 상세 페이지
<AsyncBoundary loadingFallback={<DetailSkeleton />}>
  <PostDetail />
</AsyncBoundary>
```

### 4. 에러 복구 전략

사용자가 쉽게 복구할 수 있도록:

```typescript
<AsyncBoundary
  errorFallback={({ error, resetErrorBoundary }) => (
    <ErrorDisplay>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
      <Button onClick={() => navigate('/')}>홈으로</Button>
    </ErrorDisplay>
  )}
>
  <PostList />
</AsyncBoundary>
```

### 5. 개발 환경에서의 에러 정보

개발 환경에서 더 자세한 에러 정보 표시:

```typescript
function ErrorFallback({ error }: FallbackProps) {
  const isDev = import.meta.env.DEV;

  return (
    <ErrorDisplay>
      <p>{error.message}</p>
      {isDev && (
        <details>
          <summary>에러 상세 정보</summary>
          <pre>{error.stack}</pre>
        </details>
      )}
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
    </ErrorDisplay>
  );
}
```

### 6. Query와 Mutation 분리

- **Query**: `useSuspenseQuery` + `AsyncBoundary` 사용
- **Mutation**: 일반 `useMutation` 사용 (AsyncBoundary 불필요)

```typescript
// Query - AsyncBoundary 필요
function PostList() {
  const { data } = usePostListQuery(); // useSuspenseQuery
  return <div>{data.map(...)}</div>;
}

// Mutation - AsyncBoundary 불필요
function CreatePostForm() {
  const { mutateAsync, isPending } = useCreatePostMutation();
  // 로딩 상태는 isPending으로 직접 처리
  return (
    <form onSubmit={handleSubmit}>
      <button disabled={isPending}>
        {isPending ? '작성 중...' : '작성'}
      </button>
    </form>
  );
}
```

## 주의사항

### 1. throwOnError 설정

React Query에서 `throwOnError: true` 설정이 필요합니다:

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true, // 필수!
    },
  },
});
```

### 2. ErrorBoundary 범위

ErrorBoundary는 하위 트리의 에러만 잡습니다:

```typescript
// ❌ 이벤트 핸들러 내부의 에러는 잡지 못함
function Component() {
  const handleClick = () => {
    throw new Error('이 에러는 잡히지 않음');
  };

  return <button onClick={handleClick}>Click</button>;
}
```

### 3. 비동기 에러

Suspense는 Promise rejection을 자동으로 처리합니다:

```typescript
// useSuspenseQuery의 에러는 자동으로 ErrorBoundary로 전파됨
export function usePostListQuery() {
  return useSuspenseQuery({
    queryKey: postKeys.list(),
    queryFn: async () => {
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch'); // ErrorBoundary로 전파됨
      }
      return response.json();
    },
  });
}
```

## 다음 단계

AsyncBoundary를 학습했다면 다음 문서를 참고하세요:

- [구현 가이드](./IMPLEMENTATION_GUIDE.md) - 전체 구현 패턴
- [예제 코드](./EXAMPLES.md) - 실제 사용 예시
- [라이브러리 가이드](./LIBRARIES.md) - React Query 상세 설명

## 참고 자료

- [React Error Boundary 공식 문서](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [React Suspense 공식 문서](https://react.dev/reference/react/Suspense)
- [TanStack Query Suspense 가이드](https://tanstack.com/query/latest/docs/react/guides/suspense)
