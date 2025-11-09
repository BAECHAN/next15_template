# 예제 코드 설명

템플릿에 포함된 예제 기능들을 상세히 설명합니다.

## 목차

1. [게시글 기능](#게시글-기능)
2. [사용자 기능](#사용자-기능)
3. [공통 패턴](#공통-패턴)

## 게시글 기능

템플릿에는 게시글 CRUD 기능이 예제로 구현되어 있습니다.

### 기능 목록

- ✅ 게시글 목록 조회
- ✅ 게시글 상세 조회 (준비됨)
- ✅ 게시글 작성
- ✅ 게시글 삭제

### 구조

```
entities/post/              # Post 엔티티
├── api/
│   ├── post.api.ts        # API 함수
│   └── post.queries.ts    # React Query hooks
├── model/
│   └── types.ts           # 타입 정의
├── ui/
│   └── PostCard/          # Post 카드 컴포넌트
└── index.ts               # Public API

features/post/
├── post-list/             # 게시글 목록 기능
├── create-post/           # 게시글 작성 기능
│   ├── ui/
│   │   ├── CreatePostButton/  # 게시글 작성 버튼
│   │   └── CreatePostForm/   # 게시글 작성 폼
└── delete-post/           # 게시글 삭제 기능

pages/post/
├── PostListPage/          # 게시글 목록 페이지
└── CreatePostPage/        # 게시글 작성 페이지
```

### 1. Entity: Post

#### 타입 정의

```typescript
// entities/post/model/types.ts
import { z } from 'zod';

export const postSchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

export type Post = z.infer<typeof postSchema>;
export type CreatePostDTO = Omit<Post, 'id'>;
export type UpdatePostDTO = Partial<Omit<Post, 'id'>>;
```

**설명**:

- `zod`를 사용하여 타입과 검증 스키마를 동시에 정의
- `CreatePostDTO`, `UpdatePostDTO`는 API 호출 시 사용하는 타입

#### API 함수

```typescript
// entities/post/api/post.api.ts
import { apiClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config';
import type { Post, CreatePostDTO, UpdatePostDTO } from '@/entities/post';

export const postApi = {
  // 게시글 목록 조회
  fetchPostList: (): Promise<Post[]> => {
    return apiClient.get<Post[]>(API_ENDPOINTS.POSTS);
  },

  // 게시글 상세 조회
  fetchPostDetail: (id: string): Promise<Post> => {
    return apiClient.get<Post>(`${API_ENDPOINTS.POSTS}/${id}`);
  },

  // 게시글 생성
  createPost: (data: CreatePostDTO): Promise<Post> => {
    return apiClient.post<Post>(API_ENDPOINTS.POSTS, data);
  },

  // 게시글 삭제
  deletePost: (id: string): Promise<void> => {
    return apiClient.delete<void>(`${API_ENDPOINTS.POSTS}/${id}`);
  },
};
```

**설명**:

- `apiClient`를 통해 모든 API 호출을 추상화
- 타입 안전한 API 호출
- RESTful API 패턴 준수

#### React Query Hooks

```typescript
// entities/post/api/post.queries.ts
import { useQuery, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { postApi } from '@/entities/post';
import { queryClient } from '@/shared/lib/react-query';

// Query Keys - 계층적 구조로 관리
export const postKeys = {
  root: ['posts'] as const,
  list: () => [...postKeys.root, 'list'] as const,
  detail: (id: string) => [...postKeys.root, 'detail', id] as const,
};

// 캐시 무효화 헬퍼
export const postInvalidateQueries = {
  list: () => {
    queryClient.invalidateQueries({ queryKey: postKeys.list() });
  },
  detail: (id: string) => {
    queryClient.invalidateQueries({ queryKey: postKeys.detail(id) });
  },
};

// 게시글 목록 조회 (Suspense 사용)
export function usePostListQuery() {
  return useSuspenseQuery({
    queryKey: postKeys.list(),
    queryFn: () => postApi.fetchPostList(),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 게시글 상세 조회
export function usePostDetailQuery(postId: string) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => postApi.fetchPostDetail(postId),
    enabled: !!postId,
  });
}

// 게시글 생성 Mutation
export function useCreatePostMutation() {
  return useMutation({
    mutationFn: (data: CreatePostDTO) => postApi.createPost(data),
    onSuccess: () => {
      postInvalidateQueries.list(); // 목록 캐시 무효화
    },
  });
}

// 게시글 삭제 Mutation
export function useDeletePostMutation() {
  return useMutation({
    mutationFn: (id: string) => postApi.deletePost(id),
    onSuccess: () => {
      postInvalidateQueries.list(); // 목록 캐시 무효화
    },
  });
}
```

**주요 포인트**:

- **Query Keys**: 계층적 구조로 관리하여 무효화가 쉬움
- **useSuspenseQuery**: Suspense와 함께 사용하여 로딩 처리 단순화
- **onSuccess**: Mutation 성공 시 관련 쿼리 자동 무효화

#### PostCard 컴포넌트

```typescript
// entities/post/ui/PostCard/PostCard.tsx
import type { Post } from '@/entities/post';
import { DeletePostButton } from '@/features/post/delete-post';
import { StyledCard, StyledTitle, StyledBody, StyledMeta } from './PostCard.styles';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <StyledCard data-fsd-path="entities/post/PostCard">
      <StyledTitle>{post.title}</StyledTitle>
      <StyledBody>{post.body}</StyledBody>
      <StyledMeta>
        <span>ID: {post.id}</span>
        <span>사용자 ID: {post.userId}</span>
        {post.id && <DeletePostButton postId={String(post.id)} />}
      </StyledMeta>
    </StyledCard>
  );
}
```

**설명**:

- Entity의 UI 컴포넌트로, Post를 표시하는 역할
- 삭제 기능은 `features/post/delete-post`의 `DeletePostButton`을 사용 (비즈니스 로직은 features 레이어에 위치)

### 2. Feature: 게시글 목록

```typescript
// features/post/post-list/ui/PostList/PostList.tsx
import { usePostListQuery, PostCard } from '@/entities/post';
import { Grid } from '@/shared/ui/Grid';

export function PostList() {
  const { data: postList } = usePostListQuery();

  return (
    <Grid>
      {postList?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Grid>
  );
}
```

**설명**:

- `usePostListQuery`는 `useSuspenseQuery`를 사용하므로 로딩 상태 처리 불필요
- `AsyncBoundary`로 래핑하여 로딩/에러 처리
- Entity의 `PostCard`를 재사용

### 3. Feature: 게시글 작성

#### CreatePostButton

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

**설명**:

- 게시글 작성 페이지로 이동하는 버튼
- 단순 링크 이동이지만, 향후 권한 체크 등 전처리 로직 추가 가능
- `features` 레이어에 위치 (비즈니스 액션)

#### CreatePostForm

```typescript
// features/post/create-post/ui/CreatePostForm/CreatePostForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreatePostMutation } from '@/entities/post';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '@/shared/config';

const createPostSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(100, '제목은 100자 이하로 입력해주세요'),
  body: z.string().min(1, '내용을 입력해주세요').max(1000, '내용은 1000자 이하로 입력해주세요'),
  userId: z.number().min(1, '사용자 ID는 1 이상이어야 합니다'),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

export function CreatePostForm() {
  const { mutateAsync: createPost, isPending } = useCreatePostMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      userId: 1,
    },
  });

  const onSubmit = async (data: CreatePostFormData) => {
    await createPost(data);
    navigate(ROUTES_PATHS.POSTS.LIST);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} data-fsd-path="features/post/create-post">
      {/* 폼 필드들 */}
      <Button type="submit" disabled={isPending} data-fsd-path="features/post/create-post/SubmitButton">
        {isPending ? '작성 중...' : '작성'}
      </Button>
    </StyledForm>
  );
}
```

**주요 포인트**:

- **React Hook Form + Zod**: 폼 검증과 타입 안전성
- **onSuccess 처리**: Mutation 성공 시 자동으로 목록 페이지로 이동
- **로딩 상태**: `isPending`으로 제출 버튼 비활성화

### 4. Feature: 게시글 삭제

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

**설명**:

- 게시글 삭제 기능을 담당하는 feature
- Entity의 `PostCard`에서 사용
- 비즈니스 로직(확인 다이얼로그, 삭제 처리)을 포함

### 5. Page: 게시글 목록 페이지

```typescript
// pages/post/PostListPage/PostListPage.tsx
import { Header } from '@/widgets/header';
import { PageLayout } from '@/widgets/page-layout';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';
import { PostList } from '@/features/post/post-list';
import { CreatePostButton } from '@/features/post/create-post';

export function PostListPage() {
  return (
    <>
      <Header />
      <PageLayout title="게시글 목록" description="게시글을 조회하고 관리합니다">
        <AsyncBoundary>
          <StyledActions>
            <CreatePostButton />
          </StyledActions>
          <PostList />
        </AsyncBoundary>
      </PageLayout>
    </>
  );
}
```

**설명**:

- `AsyncBoundary`로 래핑하여 Suspense와 ErrorBoundary 처리
- Widget과 Feature를 조합하여 페이지 구성
- `CreatePostButton`을 features 레이어에서 가져와 사용

## 사용자 기능

사용자 목록 조회 및 삭제 기능이 예제로 구현되어 있습니다.

### 구조

```
entities/user/              # User 엔티티
├── api/
│   ├── user.api.ts
│   └── user.queries.ts
├── model/
│   └── types.ts
└── ui/
    └── UserCard/

features/user/
├── user-list/             # 사용자 목록 기능
└── delete-user/           # 사용자 삭제 기능

pages/user/
└── UserListPage/
```

### User 엔티티

게시글과 동일한 패턴을 따릅니다:

```typescript
// entities/user/model/types.ts
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
}

// entities/user/api/user.queries.ts
export function useUserListQuery() {
  return useSuspenseQuery({
    queryKey: userKeys.list(),
    queryFn: () => userApi.fetchUserList(),
  });
}
```

## 공통 패턴

### 1. Public API 패턴

각 레이어의 슬라이스는 `index.ts`를 통해 외부에 공개됩니다:

```typescript
// entities/post/index.ts
export { postApi } from './api/post.api';
export { usePostListQuery, useCreatePostMutation } from './api/post.queries';
export type { Post, CreatePostDTO } from './model/types';
export { PostCard } from './ui/PostCard';
```

**사용**:

```typescript
// ✅ 올바른 방법
import { PostCard, usePostListQuery } from '@/entities/post';

// ❌ 잘못된 방법 (내부 구현에 직접 접근)
import { PostCard } from '@/entities/post/ui/PostCard/PostCard';
```

### 2. Query Keys 패턴

계층적 구조로 Query Keys를 관리합니다:

```typescript
export const postKeys = {
  root: ['posts'] as const,
  list: () => [...postKeys.root, 'list'] as const,
  detail: (id: string) => [...postKeys.root, 'detail', id] as const,
};
```

**장점**:

- 특정 엔티티의 모든 쿼리 무효화 가능
- 타입 안전성
- 확장 용이성

### 3. Mutation 무효화 패턴

Mutation 성공 시 관련 Query를 자동으로 무효화합니다:

```typescript
export function useCreatePostMutation() {
  return useMutation({
    mutationFn: (data: CreatePostDTO) => postApi.createPost(data),
    onSuccess: () => {
      postInvalidateQueries.list(); // 목록 자동 리패치
    },
  });
}
```

### 4. AsyncBoundary 패턴

Suspense와 ErrorBoundary를 통합한 패턴:

```typescript
<AsyncBoundary>
  <PostList /> {/* useSuspenseQuery 사용 */}
</AsyncBoundary>
```

**장점**:

- 로딩 상태 자동 처리
- 에러 처리 자동화
- 코드 중복 제거

### 5. Styled Components 패턴

각 컴포넌트는 별도의 스타일 파일을 가집니다:

```typescript
// PostCard.tsx
import { StyledCard, StyledTitle } from './PostCard.styles';

// PostCard.styles.ts
export const StyledCard = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;
```

### 6. TypeScript 타입 추론 활용

```typescript
// Zod로 타입과 검증 동시 정의
const schema = z.object({ ... });
type Post = z.infer<typeof schema>;

// React Query에서 자동 타입 추론
const { data } = usePostListQuery(); // data는 Post[] 타입
```

## 학습 팁

1. **Entity부터 시작**: 새로운 기능을 만들 때 Entity를 먼저 만듭니다
2. **Query Keys 구조 이해**: 계층적 구조의 Query Keys 패턴을 익히세요
3. **Public API 유지**: 항상 `index.ts`를 통해 export하세요
4. **재사용성 고려**: 공통 기능은 `shared` 레이어에 위치시키세요
5. **타입 안전성**: TypeScript와 Zod를 적극 활용하세요

## 다음 단계

예제 코드를 분석했다면 다음 문서를 참고하세요:

- [구현 가이드](./IMPLEMENTATION_GUIDE.md) - 새로운 기능 구현 방법
- [AsyncBoundary 가이드](./ASYNC_BOUNDARY_GUIDE.md) - 로딩/에러 처리 패턴
- [스타일링 가이드](./STYLED_COMPONENTS_GUIDE.md) - 스타일링 방법
