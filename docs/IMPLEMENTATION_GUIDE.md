# 구현 가이드

FSD 아키텍처를 따라 새로운 기능을 구현하는 방법을 단계별로 설명합니다.

## 목차

1. [구현 워크플로우](#구현-워크플로우)
2. [Entity 구현](#entity-구현)
3. [Feature 구현](#feature-구현)
4. [Page 구현](#page-구현)
5. [공통 패턴](#공통-패턴)
6. [문제 해결](#문제-해결)

## 구현 워크플로우

새로운 기능을 구현할 때는 다음 순서를 따릅니다:

```
1. Entity 생성 (데이터 모델, API)
   ↓
2. Feature 구현 (비즈니스 로직)
   ↓
3. Page 구현 (라우트 연결)
   ↓
4. 라우트 추가
```

이 순서는 하위 레이어부터 상위 레이어로 진행하는 FSD의 의존성 규칙을 따릅니다.

## Entity 구현

Entity는 비즈니스 도메인 모델을 나타냅니다. 실제 프로젝트에 구현된 `user` 엔티티를 예제로 사용하여 구조를 설명합니다.

### 1. 디렉토리 구조

실제 프로젝트의 `entities/user/` 구조:

```
entities/user/
├── api/
│   ├── user.api.ts
│   └── user.queries.ts
├── model/
│   └── types.ts
├── ui/
│   └── UserCard/
│       ├── UserCard.tsx
│       ├── UserCard.styles.ts
│       └── index.ts (선택사항)
└── index.ts
```

### 2. 타입 정의

```typescript
// entities/user/model/types.ts
import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
export type CreateUserDTO = Omit<User, 'id'>;
export type UpdateUserDTO = Partial<Omit<User, 'id'>>;
```

**포인트**:

- Zod를 사용하여 타입과 검증 스키마를 동시에 정의
- DTO 타입을 별도로 정의하여 API 호출 시 사용
- `.optional()`로 선택적 필드 처리

### 3. API 함수 구현

```typescript
// entities/user/api/user.api.ts
import { apiClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config';
import type { User, CreateUserDTO, UpdateUserDTO } from '@/entities/user';

export const userApi = {
  // 사용자 목록 조회
  fetchUserList: (): Promise<User[]> => {
    return apiClient.get<User[]>(API_ENDPOINTS.USERS);
  },

  // 사용자 상세 조회
  fetchUserDetail: (id: string): Promise<User> => {
    return apiClient.get<User>(`${API_ENDPOINTS.USERS}/${id}`);
  },

  // 사용자 생성
  createUser: (data: CreateUserDTO): Promise<User> => {
    return apiClient.post<User>(API_ENDPOINTS.USERS, data);
  },

  // 사용자 수정
  updateUser: (id: string, data: UpdateUserDTO): Promise<User> => {
    return apiClient.put<User>(`${API_ENDPOINTS.USERS}/${id}`, data);
  },

  // 사용자 삭제
  deleteUser: (id: string): Promise<void> => {
    return apiClient.delete<void>(`${API_ENDPOINTS.USERS}/${id}`);
  },
};
```

**포인트**:

- `apiClient`를 통해 모든 API 호출을 추상화
- 타입 안전한 API 호출
- RESTful API 패턴 준수

### 4. React Query Hooks 구현

```typescript
// entities/user/api/user.queries.ts
import { useQuery, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { userApi } from '@/entities/user';
import { queryClient } from '@/shared/lib/react-query';

// Query Keys - 계층적 구조로 관리
export const userKeys = {
  root: ['users'] as const,
  list: () => [...userKeys.root, 'list'] as const,
  detail: (id: string) => [...userKeys.root, 'detail', id] as const,
};

// 캐시 무효화 헬퍼
export const userInvalidateQueries = {
  list: () => {
    queryClient.invalidateQueries({ queryKey: userKeys.list() });
  },
  detail: (id: string) => {
    queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
  },
};

// 사용자 목록 조회 (Suspense 사용)
export function useUserListQuery() {
  return useSuspenseQuery({
    queryKey: userKeys.list(),
    queryFn: () => userApi.fetchUserList(),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 사용자 상세 조회
export function useUserDetailQuery(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => userApi.fetchUserDetail(userId),
    enabled: !!userId,
  });
}

// 사용자 생성 Mutation
export function useCreateUserMutation() {
  return useMutation({
    mutationFn: (data: Parameters<typeof userApi.createUser>[0]) => userApi.createUser(data),
    onSuccess: () => {
      userInvalidateQueries.list(); // 목록 캐시 무효화
    },
  });
}

// 사용자 삭제 Mutation
export function useDeleteUserMutation() {
  return useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => {
      userInvalidateQueries.list(); // 목록 캐시 무효화
    },
  });
}
```

**주요 포인트**:

- **Query Keys**: 계층적 구조로 관리하여 무효화가 쉬움
- **useSuspenseQuery**: Suspense와 함께 사용 (AsyncBoundary 필요)
- **useQuery**: 조건부 쿼리나 수동 로딩 상태 관리 시 사용
- **onSuccess**: Mutation 성공 시 관련 쿼리 자동 무효화

### 5. UI 컴포넌트 구현 (선택사항)

```typescript
// entities/user/ui/UserCard/UserCard.tsx
import type { User } from '@/entities/user';
import {
  StyledCard,
  StyledName,
  StyledEmail,
  StyledMeta,
} from './UserCard.styles';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <StyledCard>
      <StyledName>{user.name}</StyledName>
      <StyledEmail>{user.email}</StyledEmail>
      <StyledMeta>
        <span>@{user.username}</span>
        {user.phone && <span>{user.phone}</span>}
      </StyledMeta>
    </StyledCard>
  );
}
```

### 6. Public API 정의

```typescript
// entities/user/index.ts
// Types
export type { User, CreateUserDTO, UpdateUserDTO } from './model/types';

// API
export { userApi } from './api/user.api';
export {
  useUserListQuery,
  useUserDetailQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  userKeys,
} from './api/user.queries';

// UI
export { UserCard } from './ui/UserCard/UserCard';
```

**중요**: 항상 `index.ts`를 통해 외부에 공개하세요!

## Feature 구현

Feature는 사용자 액션과 비즈니스 기능을 구현합니다.

### 1. 디렉토리 구조

실제 프로젝트의 `features/user/user-list/` 구조:

```
features/user/
└── user-list/
    ├── ui/
    │   └── UserList/
    │       └── UserList.tsx
    └── index.ts
```

### 2. UserList Feature 구현

실제 프로젝트의 `UserList` feature 예제:

```typescript
// features/user/user-list/ui/UserList/UserList.tsx
import { useUserListQuery, UserCard } from '@/entities/user';
import { Grid } from '@/shared/ui/Grid';

export function UserList() {
  const { data: userList } = useUserListQuery();

  return (
    <Grid>
      {userList?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Grid>
  );
}

// features/user/user-list/index.ts
export { UserList } from './ui/UserList/UserList';
```

**포인트**:

- Entity의 hooks와 컴포넌트를 재사용
- 로딩/에러 처리는 상위의 AsyncBoundary에 위임
- `useSuspenseQuery`를 사용하므로 로딩 상태 처리 불필요

### 3. Feature 예제: CreatePostButton

단순 링크 이동이지만, 향후 전처리 로직(권한 체크 등) 추가 가능성을 고려하여 features 레이어에 위치:

```typescript
// features/post/create-post/ui/CreatePostButton/CreatePostButton.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { ROUTES_PATHS } from '@/shared/config';

export function CreatePostButton({ children = '게시글 작성' }: CreatePostButtonProps) {
  return (
    <Button as={Link} to={ROUTES_PATHS.POSTS.NEW} data-fsd-path="features/post/create-post/CreatePostButton">
      {children}
    </Button>
  );
}
```

### 4. Feature 예제: DeletePostButton

비즈니스 로직(확인 다이얼로그, 삭제 처리)을 포함하는 feature:

```typescript
// features/post/delete-post/ui/DeletePostButton/DeletePostButton.tsx
import { useDeletePostMutation } from '@/entities/post';
import { Button } from '@/shared/ui/Button';

interface DeletePostButtonProps {
  postId: string;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const { mutateAsync: deletePost, isPending } = useDeletePostMutation();

  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      await deletePost(postId);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isPending}
      variant="danger"
      data-fsd-path="features/post/delete-post"
    >
      {isPending ? '삭제 중...' : '삭제'}
    </Button>
  );
}
```

### 5. 폼이 포함된 Feature 예제

폼이 포함된 Feature는 실제 프로젝트의 `features/post/create-post/`를 참고하세요:

```typescript
// features/post/create-post/ui/CreatePostForm/CreatePostForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreatePostMutation } from '@/entities/post';
// ... 기타 import

export function CreatePostForm() {
  const { mutateAsync: createPost, isPending } = useCreatePostMutation();
  // ... 폼 구현
}
```

**포인트**:

- React Hook Form + Zod로 폼 검증
- Mutation의 `isPending`으로 로딩 상태 관리
- 성공 후 네비게이션 처리

## Page 구현

Page는 라우트에 직접 연결되는 최상위 컴포넌트입니다.

> **참고**: 아래 예제는 구현 가이드 목적으로 제공됩니다. 실제 프로젝트에는 `PostListPage`, `CreatePostPage`, `UserListPage`가 구현되어 있으며, 이를 참고하여 학습할 수 있습니다.

### 1. 실제 프로젝트 예제: PostListPage

템플릿에 구현된 `PostListPage`를 예제로 살펴보겠습니다:

```typescript
// pages/post/PostListPage/PostListPage.tsx
import { Link } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { PageLayout } from '@/widgets/page-layout';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';
import { PostList } from '@/features/post/post-list';
import { ROUTES_PATHS } from '@/shared/config';
import { Button } from '@/shared/ui/Button';

export function PostListPage() {
  return (
    <>
      <Header />
      <PageLayout title="게시글 목록" description="게시글을 조회하고 관리합니다">
        <AsyncBoundary>
          <StyledActions>
            <Button as={Link} to={ROUTES_PATHS.POSTS.NEW}>
              게시글 작성
            </Button>
          </StyledActions>
          <PostList />
        </AsyncBoundary>
      </PageLayout>
    </>
  );
}
```

**포인트**:

- `AsyncBoundary`로 래핑하여 로딩/에러 처리
- Widget(`Header`, `PageLayout`)과 Feature(`PostList`)를 조합하여 페이지 구성
- 비즈니스 로직은 Feature에 위임

### 2. 새로운 Page 만들기 예제

새로운 페이지를 만들 때는 다음과 같은 구조를 따릅니다:

```
pages/post/
└── PostDetailPage/
    ├── PostDetailPage.tsx
    └── PostDetailPage.styles.ts
```

```typescript
// pages/post/PostDetailPage/PostDetailPage.tsx
import { useParams } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { PageLayout } from '@/widgets/page-layout';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';
import { usePostDetailQuery } from '@/entities/post';

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Header />
      <PageLayout title="게시글 상세">
        <AsyncBoundary>
          <PostDetailContent postId={id} />
        </AsyncBoundary>
      </PageLayout>
    </>
  );
}

function PostDetailContent({ postId }: { postId: string }) {
  const { data: post, isLoading } = usePostDetailQuery(postId);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
```

### 3. 라우트 추가

```typescript
// app/routes/index.tsx
import { Route, Routes } from 'react-router-dom';
import { PostDetailPage } from '@/pages/post/PostDetailPage';
import { ROUTES_PATHS } from '@/shared/config';

export function AppRouter() {
  return (
    <Routes>
      {/* ... 기존 라우트 */}
      <Route path={`${ROUTES_PATHS.POSTS.LIST}/:id`} element={<PostDetailPage />} />
    </Routes>
  );
}

// shared/config/routes.ts
export const ROUTES_PATHS = {
  // ... 기존 경로
  POSTS: {
    LIST: '/posts',
    NEW: '/posts/new',
    DETAIL: (id: string | number) => `/posts/${id}`,
  },
} as const;
```

## 공통 패턴

### 1. Query Keys 패턴

계층적 구조로 관리하여 무효화가 쉽습니다:

```typescript
export const entityKeys = {
  root: ['entity'] as const,
  list: () => [...entityKeys.root, 'list'] as const,
  detail: (id: string) => [...entityKeys.root, 'detail', id] as const,
  filter: (filters: Filters) => [...entityKeys.root, 'list', filters] as const,
};
```

### 2. Mutation 무효화 패턴

```typescript
export function useCreateEntityMutation() {
  return useMutation({
    mutationFn: (data: CreateDTO) => entityApi.create(data),
    onSuccess: () => {
      // 관련 쿼리 무효화
      entityInvalidateQueries.list();
    },
  });
}
```

### 3. 에러 처리 패턴

```typescript
// Entity 레벨에서 에러 처리
export function useEntityQuery(id: string) {
  return useQuery({
    queryKey: entityKeys.detail(id),
    queryFn: () => entityApi.fetchDetail(id),
    onError: (error) => {
      // 로깅, 알림 등
      console.error('Failed to fetch entity:', error);
    },
  });
}

// Page 레벨에서 AsyncBoundary로 처리
<AsyncBoundary
  onError={(error) => {
    // 글로벌 에러 처리
  }}
>
  <Component />
</AsyncBoundary>
```

### 4. 로딩 상태 패턴

**Query (데이터 조회)**:

```typescript
// useSuspenseQuery + AsyncBoundary
export function useEntityListQuery() {
  return useSuspenseQuery({
    queryKey: entityKeys.list(),
    queryFn: () => entityApi.fetchList(),
  });
}

// 사용
<AsyncBoundary>
  <EntityList /> {/* 로딩/에러 자동 처리 */}
</AsyncBoundary>
```

**Mutation (데이터 변경)**:

```typescript
// useMutation + isPending
export function useCreateEntityMutation() {
  return useMutation({
    mutationFn: (data: CreateDTO) => entityApi.create(data),
  });
}

// 사용
function CreateForm() {
  const { mutateAsync, isPending } = useCreateEntityMutation();

  return (
    <button disabled={isPending}>
      {isPending ? '처리 중...' : '제출'}
    </button>
  );
}
```

### 5. UI 텍스트 관리 패턴 (TEXTS)

애플리케이션의 모든 UI 텍스트는 `shared/config/texts.ts`의 `TEXTS` 객체에서 중앙 관리됩니다.

**구조**:

```typescript
// shared/config/texts.ts
export const TEXTS = {
  labels: {
    email: '이메일',
    password: '비밀번호',
    title: '제목',
    // ...
  },
  placeholders: {
    email: 'example@email.com',
    password: '비밀번호를 입력하세요',
    // ...
  },
  buttons: {
    delete: '삭제',
    deleteLoading: '삭제 중...',
    create: '작성',
    // ...
  },
  formValidation: {
    titleRequired: '제목을 입력해주세요',
    titleMaxLength: (max: number) => `제목은 ${max}자 이하로 입력해주세요`,
    // ...
  },
  ui: {
    defaultError: '오류가 발생했습니다.',
    // ...
  },
  errors: {
    idRequired: 'id is required',
    // ...
  },
} as const;
```

**사용 방법**:

```typescript
// 1. Import
import { TEXTS } from '@/shared/config';

// 2. 기본 사용 (문자열)
<Label>{TEXTS.labels.email}</Label>
<Input placeholder={TEXTS.placeholders.email} />
<Button>{TEXTS.buttons.delete}</Button>

// 3. 함수 사용 (동적 값)
const createPostSchema = z.object({
  title: z
    .string()
    .min(1, TEXTS.formValidation.titleRequired)
    .max(100, TEXTS.formValidation.titleMaxLength(100)),
  body: z
    .string()
    .min(1, TEXTS.formValidation.bodyRequired)
    .max(1000, TEXTS.formValidation.bodyMaxLength(1000)),
});

// 4. 조건부 사용
<Button disabled={isPending}>
  {isPending ? TEXTS.buttons.deleteLoading : TEXTS.buttons.delete}
</Button>
```

**장점**:

- ✅ 모든 텍스트를 한 곳에서 관리
- ✅ 일관된 네이밍 (camelCase)
- ✅ 카테고리별 구조화로 찾기 쉬움
- ✅ 다국어 지원 확장 용이
- ✅ 동적 메시지 지원 (함수 형태)

**새로운 텍스트 추가**:

```typescript
// shared/config/texts.ts
export const TEXTS = {
  buttons: {
    // 기존...
    save: '저장', // 새로 추가
    cancel: '취소', // 새로 추가
  },
} as const;
```

**주의사항**:

- 하드코딩된 문자열 대신 항상 `TEXTS` 사용
- 새로운 텍스트는 적절한 카테고리에 추가
- 동적 값이 필요한 경우 함수 형태로 정의

## 문제 해결

### 문제 1: Circular Dependency (순환 의존성)

**증상**: 서로를 import하는 레이어 발생

**해결**:

- 같은 레이어 간 import 금지
- 공통 기능은 `shared` 레이어로 이동

### 문제 2: 타입 에러

**증상**: TypeScript 타입 에러

**해결**:

- Zod 스키마로 타입과 검증 통합
- `z.infer`로 타입 추론
- Public API를 통해 타입 export

### 문제 3: Query 무효화가 작동하지 않음

**증상**: 데이터 변경 후 목록이 갱신되지 않음

**해결**:

- Query Keys 구조 확인
- `onSuccess`에서 올바른 키로 무효화
- `queryClient.invalidateQueries` 직접 사용

### 문제 4: Suspense 에러

**증상**: `useSuspenseQuery` 사용 시 에러

**해결**:

- React Query 설정에서 `throwOnError: true` 확인
- `AsyncBoundary`로 래핑 확인
- `useQuery`로 변경하여 수동 처리

## 체크리스트

새로운 기능을 구현할 때 다음을 확인하세요:

- [ ] Entity 타입 정의 및 API 구현
- [ ] React Query hooks 구현 (Query Keys 포함)
- [ ] Public API (`index.ts`) 정의
- [ ] Feature 구현
- [ ] Page 구현 및 라우트 추가
- [ ] AsyncBoundary 적용
- [ ] 타입 에러 확인 (`npm run type-check`)
- [ ] 린트 에러 확인 (`npm run lint`)

## 다음 단계

구현 가이드를 학습했다면 다음 문서를 참고하세요:

- [FSD 아키텍처 가이드](./FSD_ARCHITECTURE.md) - 아키텍처 원칙
- [예제 코드](./EXAMPLES.md) - 실제 구현 예시
- [AsyncBoundary 가이드](./ASYNC_BOUNDARY_GUIDE.md) - 로딩/에러 처리
