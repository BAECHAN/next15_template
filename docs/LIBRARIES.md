# 라이브러리 가이드

이 템플릿에서 사용하는 주요 라이브러리와 그 활용법을 설명합니다.

## 목차

1. [Core 라이브러리](#core-라이브러리)
2. [상태 관리](#상태-관리)
3. [UI & 스타일링](#ui--스타일링)
4. [Form & Validation](#form--validation)
5. [라우팅](#라우팅)
6. [기타 유틸리티](#기타-유틸리티)

## Core 라이브러리

### React 18

**버전**: ^18.2.0

React의 최신 기능을 활용합니다.

**주요 기능**:

- Concurrent Rendering
- Suspense for Data Fetching
- Automatic Batching

**사용 예시**:

```typescript
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PostList />
    </Suspense>
  );
}
```

**참고 자료**: [React 공식 문서](https://react.dev/)

### TypeScript 5

**버전**: ~5.7.2

타입 안정성을 제공합니다.

**주요 설정** (`tsconfig.json`):

- 경로 별칭: `@/*` → `src/*`
- Strict 모드 활성화
- ES2020 타겟

**사용 예시**:

```typescript
// 명시적 타입 정의
interface Post {
  id: number;
  title: string;
  body: string;
}

// 타입 추론 활용
const posts: Post[] = [];
```

**참고 자료**: [TypeScript 공식 문서](https://www.typescriptlang.org/)

### Vite 6

**버전**: ^6.2.5

빠른 개발 서버와 빌드 도구입니다.

**주요 기능**:

- 초고속 HMR (Hot Module Replacement)
- ESM 네이티브 지원
- 최적화된 프로덕션 빌드
- 환경 변수 관리

**설정 파일** (`vite.config.ts`):

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 7248,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

**참고 자료**: [Vite 공식 문서](https://vitejs.dev/)

## 상태 관리

### TanStack Query (React Query)

**버전**: ^5.69.0

서버 상태 관리 및 캐싱을 담당합니다.

**주요 기능**:

- 자동 캐싱 및 리패칭
- 백그라운드 업데이트
- Suspense 지원 (`useSuspenseQuery`)
- Optimistic Updates

**설정** (`shared/lib/react-query/config/queryClient.ts`):

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000, // 3분
      gcTime: 5 * 60 * 1000, // 5분 (이전 cacheTime)
      retry: 1,
      refetchOnWindowFocus: true,
      throwOnError: true, // ErrorBoundary로 에러 전파
    },
  },
});
```

**사용 예시**:

**Query (데이터 조회)**:

```typescript
// entities/post/api/post.queries.ts
export function usePostListQuery() {
  return useSuspenseQuery({
    queryKey: postKeys.list(),
    queryFn: () => postApi.fetchPostList(),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 사용
function PostList() {
  const { data: posts } = usePostListQuery(); // Suspense로 로딩 처리
  return <div>{posts.map(post => ...)}</div>;
}
```

**Mutation (데이터 변경)**:

```typescript
export function useCreatePostMutation() {
  return useMutation({
    mutationFn: (data: CreatePostDTO) => postApi.createPost(data),
    onSuccess: () => {
      // 성공 시 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.list() });
    },
  });
}

// 사용
function CreatePostForm() {
  const { mutateAsync: createPost, isPending } = useCreatePostMutation();

  const onSubmit = async (data: CreatePostFormData) => {
    await createPost(data);
    // onSuccess에서 자동으로 리스트 리패치됨
  };
}
```

**Query Keys 관리**:

```typescript
// 계층적 키 구조로 관리
export const postKeys = {
  root: ['posts'] as const,
  list: () => [...postKeys.root, 'list'] as const,
  detail: (id: string) => [...postKeys.root, 'detail', id] as const,
};
```

**React Query DevTools**:
개발 모드에서 자동으로 활성화되어 캐시 상태를 확인할 수 있습니다.

**참고 자료**: [TanStack Query 문서](https://tanstack.com/query/latest)

### Zustand

**버전**: ^5.0.3

클라이언트 상태 관리를 위한 가벼운 라이브러리입니다.

**주요 특징**:

- 작은 번들 사이즈
- Boilerplate 없음
- TypeScript 완벽 지원

**사용 예시**:

```typescript
// store/userStore.ts
import { create } from 'zustand';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

// 사용
function UserProfile() {
  const { user, setUser } = useUserStore();
  // ...
}
```

**참고 자료**: [Zustand 공식 문서](https://zustand-demo.pmnd.rs/)

## UI & 스타일링

### Styled-components

**버전**: ^6.1.16

CSS-in-JS 라이브러리입니다.

**주요 기능**:

- 타입 안전한 스타일링
- 테마 시스템
- Props 기반 동적 스타일링

**테마 시스템** (`app/styles/theme.ts`):

```typescript
export const theme = {
  colors: {
    primary: '#2563eb',
    gray50: '#f9fafb',
    // ...
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    // ...
  },
  // ...
} as const;
```

**사용 예시**:

```typescript
// Button.styles.ts
import styled from 'styled-components';

export const StyledButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary : theme.colors.gray200};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    opacity: 0.9;
  }
`;
```

**참고 자료**:

- [Styled-components 공식 문서](https://styled-components.com/)
- [스타일링 가이드](./STYLED_COMPONENTS_GUIDE.md)

## Form & Validation

### React Hook Form

**버전**: ^7.54.2

고성능 폼 관리 라이브러리입니다.

**주요 특징**:

- 제어 컴포넌트 최소화로 성능 최적화
- 적은 리렌더링
- 타입 안전성

**사용 예시**:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  body: z.string().min(1, '내용을 입력해주세요'),
});

type FormData = z.infer<typeof schema>;

function CreatePostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} />
      {errors.title && <span>{errors.title.message}</span>}

      <textarea {...register('body')} />
      {errors.body && <span>{errors.body.message}</span>}

      <button type="submit">제출</button>
    </form>
  );
}
```

**참고 자료**: [React Hook Form 문서](https://react-hook-form.com/)

### Zod

**버전**: ^3.24.3

타입 안전한 스키마 검증 라이브러리입니다.

**주요 기능**:

- 런타임 타입 검증
- TypeScript 타입 자동 추론
- React Hook Form과 통합

**사용 예시**:

```typescript
import { z } from 'zod';

// 스키마 정의
export const postSchema = z.object({
  id: z.number().optional(),
  userId: z.number().min(1),
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(1000),
});

// 타입 추론
export type Post = z.infer<typeof postSchema>;

// 검증
const result = postSchema.safeParse(data);
if (result.success) {
  console.log(result.data); // 타입 안전한 데이터
} else {
  console.log(result.error); // 에러 정보
}
```

**참고 자료**: [Zod 공식 문서](https://zod.dev/)

## 라우팅

### React Router v6

**버전**: ^6.30.0

선언적 라우팅을 제공합니다.

**주요 기능**:

- Nested Routes
- TypeScript 지원

**사용 예시**:

```typescript
import { Route, Routes } from 'react-router-dom';
import { HomePage, PostListPage, CreatePostPage, UserListPage, NotFoundPage } from '@/pages';
import { ROUTES_PATHS } from '@/shared/config';

/**
 * App Router
 * FSD: app 레이어의 라우팅 설정
 */
export function AppRouter() {
  return (
    <Routes>
      {/* Home */}
      <Route path={ROUTES_PATHS.HOME} element={<HomePage />} />

      {/* Post */}
      <Route path={ROUTES_PATHS.POSTS.LIST} element={<PostListPage />} />
      <Route path={ROUTES_PATHS.POSTS.NEW} element={<CreatePostPage />} />

      {/* User */}
      <Route path={ROUTES_PATHS.USERS.LIST} element={<UserListPage />} />

      {/* 404 */}
      <Route path={ROUTES_PATHS.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}
```

**참고 자료**: [React Router 공식 문서](https://reactrouter.com/)

## 기타 유틸리티

### Day.js

**버전**: ^1.11.18

가벼운 날짜 라이브러리입니다.

**주요 특징**:

- Moment.js와 유사한 API
- 불변성 (Immutable)
- 작은 번들 사이즈

**사용 예시**:

```typescript
import dayjs from 'dayjs';

const formatted = dayjs(date).format('YYYY-MM-DD');
const relative = dayjs(date).fromNow();
```

**참고 자료**: [Day.js 공식 문서](https://day.js.org/)

### React Error Boundary

**버전**: ^5.0.0

React 컴포넌트 에러를 처리합니다.

**사용 예시**:

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h2>오류가 발생했습니다</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <YourApp />
    </ErrorBoundary>
  );
}
```

**참고 자료**: [react-error-boundary 문서](https://github.com/bvaughn/react-error-boundary)

### React Spinners

**버전**: ^0.17.0

로딩 스피너 컴포넌트를 제공합니다.

**사용 예시**:

```typescript
import { ClipLoader } from 'react-spinners';

<ClipLoader color="#36d7b7" size={50} />
```

**참고 자료**: [react-spinners 문서](https://www.davidhu.io/react-spinners/)

## 개발 도구

### ESLint

**버전**: ^9.22.0

코드 품질을 검사합니다.

**주요 플러그인**:

- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `typescript-eslint`

**실행**:

```bash
npm run lint
```

### Prettier

**버전**: ^3.5.3

코드 포맷팅을 담당합니다.

**실행**:

```bash
npm run format
```

## 라이브러리 선택 이유

### 왜 React Query를 사용하나요?

- 서버 상태 관리에 특화됨
- 자동 캐싱 및 리패칭으로 개발 생산성 향상
- Suspense 지원으로 로딩 처리 단순화

### 왜 Zustand를 사용하나요?

- Redux보다 간단한 API
- 작은 번들 사이즈
- TypeScript 지원이 우수함

### 왜 Styled-components를 사용하나요?

- 타입 안전한 스타일링
- 테마 시스템 지원
- Props 기반 동적 스타일링

### 왜 React Hook Form + Zod를 사용하나요?

- React Hook Form: 최적화된 성능
- Zod: 런타임 검증과 타입 추론 통합
- 두 라이브러리의 완벽한 통합

## 다음 단계

라이브러리를 학습했다면 다음 문서를 참고하세요:

- [구현 가이드](./IMPLEMENTATION_GUIDE.md) - 실제 라이브러리 활용 예시
- [예제 코드](./EXAMPLES.md) - 템플릿의 예제 분석
- [스타일링 가이드](./STYLED_COMPONENTS_GUIDE.md) - Styled-components 상세 가이드
