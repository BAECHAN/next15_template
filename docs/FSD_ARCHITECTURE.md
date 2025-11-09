# FSD (Feature-Sliced Design) 아키텍처 가이드

## 목차

1. [FSD란?](#fsd란)
2. [레이어 구조](#레이어-구조)
3. [레이어별 상세 설명](#레이어별-상세-설명)
4. [의존성 규칙](#의존성-규칙)
5. [Public API 패턴](#public-api-패턴)
6. [실제 예제](#실제-예제)
7. [베스트 프랙티스](#베스트-프랙티스)

## FSD란?

**Feature-Sliced Design (FSD)**은 확장 가능하고 유지보수하기 쉬운 프론트엔드 아키텍처 방법론입니다. FSD는 코드를 명확한 레이어와 슬라이스로 나누어 구조화하여, 큰 프로젝트에서도 코드를 체계적으로 관리할 수 있도록 도와줍니다.

### FSD의 핵심 원칙

1. **단방향 의존성** - 상위 레이어만 하위 레이어를 사용할 수 있습니다
2. **Public API** - 각 슬라이스는 `index.ts`를 통해서만 외부에 공개됩니다
3. **격리와 캡슐화** - 각 기능은 독립적으로 동작하며 다른 기능에 직접 의존하지 않습니다
4. **재사용성** - 하위 레이어의 컴포넌트와 유틸리티는 여러 곳에서 재사용됩니다

### FSD의 장점

- ✅ **확장성** - 새로운 기능 추가가 쉬워집니다
- ✅ **유지보수성** - 코드 구조가 명확하여 찾기 쉽습니다
- ✅ **테스트 용이성** - 각 레이어가 독립적으로 테스트 가능합니다
- ✅ **협업 효율성** - 명확한 구조로 팀원 간 충돌이 줄어듭니다
- ✅ **학습 곡선** - 구조가 예측 가능하여 신규 개발자 온보딩이 빠릅니다

## 레이어 구조

FSD는 다음과 같은 7개의 레이어로 구성됩니다:

```
app
  ↓
pages
  ↓
widgets
  ↓
features
  ↓
entities
  ↓
shared
```

각 레이어는 특정 목적을 가지고 있으며, 위에서 아래로만 의존할 수 있습니다.

### 레이어 계층도

```
┌─────────────────────────────────────┐
│            app                      │  ← 애플리이션 초기화
│  (프로바이더, 라우팅, 글로벌 설정)     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│            pages                     │  ← 페이지 컴포넌트
│  (라우트에 연결된 최상위 컴포넌트)      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│            widgets                   │  ← 복잡한 UI 블록
│  (여러 UI를 조합한 컴포넌트)          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│            features                  │  ← 비즈니스 기능
│  (사용자 액션, 특정 기능 구현)         │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│            entities                  │  ← 도메인 모델
│  (비즈니스 엔티티, 데이터 모델)        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│            shared                   │  ← 공통 코드
│  (UI, 유틸리티, 설정, 타입 등)        │
└─────────────────────────────────────┘
```

## 레이어별 상세 설명

### 1. `app` - 애플리이션 초기화 레이어

**역할**: 애플리케이션의 진입점, 전역 설정, 프로바이더 설정

**포함 내용**:

- `App.tsx` - 최상위 컴포넌트
- `providers/` - React Query, Router, Theme 등 프로바이더
- `routes/` - 라우트 설정
- `styles/` - 글로벌 스타일, 테마 설정

**특징**:

- 다른 레이어에 의존하지 않습니다
- 애플리케이션 전체의 설정을 담당합니다

**예시**:

```typescript
// app/App.tsx
export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider />
    </ErrorBoundary>
  );
}

// app/providers/QueryProvider.tsx
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 2. `pages` - 페이지 레이어

**역할**: 라우트에 직접 연결되는 페이지 컴포넌트

**포함 내용**:

- 각 라우트에 대응하는 페이지 컴포넌트
- 페이지별 레이아웃 구성

**특징**:

- 라우트와 1:1 매핑됩니다
- 주로 `widgets`와 `features`를 조합하여 구성합니다
- 비즈니스 로직은 포함하지 않습니다

**예시**:

```typescript
// pages/post/PostListPage/PostListPage.tsx
export function PostListPage() {
  return (
    <>
      <Header /> {/* widget */}
      <PageLayout title="게시글 목록">
        <AsyncBoundary>
          <PostList /> {/* feature */}
        </AsyncBoundary>
      </PageLayout>
    </>
  );
}
```

### 3. `widgets` - 위젯 레이어

**역할**: 여러 feature, entity, shared를 조합한 복잡한 UI 블록

**포함 내용**:

- 헤더, 푸터, 사이드바 같은 레이아웃 컴포넌트
- 여러 기능이 조합된 복합 컴포넌트

**특징**:

- 여러 `features`, `entities`, `shared`를 조합할 수 있습니다
- 재사용 가능한 복잡한 UI 블록입니다
- 주로 레이아웃이나 여러 기능을 묶는 역할을 합니다

**예시**:

```typescript
// widgets/header/ui/Header/Header.tsx
import { ROUTES_PATHS } from '@/shared/config'; // shared 사용

export function Header() {
  return (
    <StyledHeader>
      <StyledLogo to={ROUTES_PATHS.HOME}>React Template</StyledLogo>
      <Navigation />
      <UserMenu />
    </StyledHeader>
  );
}

// widgets/page-layout/ui/PageLayout/PageLayout.tsx
// shared 컴포넌트를 사용할 수도 있고,
// features나 entities를 조합하여 사용할 수도 있습니다
```

### 4. `features` - 기능 레이어

**역할**: 사용자 액션과 비즈니스 기능을 구현

**포함 내용**:

- 사용자가 수행하는 액션 (로그인, 게시글 작성, 좋아요 등)
- 기능별 UI 컴포넌트

**특징**:

- 사용자와의 상호작용을 담당합니다
- 각 feature는 독립적으로 동작합니다
- `entities`를 사용하여 데이터를 표시하거나 조작합니다

**예시**:

```typescript
// features/post/create-post/ui/CreatePostButton/CreatePostButton.tsx
export function CreatePostButton() {
  return (
    <Button as={Link} to={ROUTES_PATHS.POSTS.NEW} data-fsd-path="features/post/create-post/CreatePostButton">
      게시글 작성
    </Button>
  );
}

// features/post/delete-post/ui/DeletePostButton/DeletePostButton.tsx
export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const { mutateAsync: deletePost } = useDeletePostMutation(); // entity

  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      await deletePost(postId);
    }
  };

  return (
    <Button onClick={handleDelete} data-fsd-path="features/post/delete-post">
      삭제
    </Button>
  );
}
```

### 5. `entities` - 엔티티 레이어

**역할**: 비즈니스 도메인 모델 (Post, User 등)

**포함 내용**:

- 도메인 모델의 타입 정의
- API 호출 로직
- React Query hooks
- 엔티티 관련 UI 컴포넌트 (Card, List 등)

**특징**:

- 비즈니스 도메인과 직접 연결됩니다
- API 통신을 담당합니다
- 여러 feature에서 재사용됩니다

**구조 예시**:

```
entities/post/
├── api/
│   ├── post.api.ts          # API 함수
│   └── post.queries.ts       # React Query hooks
├── model/
│   └── types.ts              # 타입 정의
├── ui/
│   └── PostCard/             # Post 카드 컴포넌트
└── index.ts                   # Public API
```

**예시**:

```typescript
// entities/post/api/post.queries.ts
export function usePostListQuery() {
  return useSuspenseQuery({
    queryKey: postKeys.list(),
    queryFn: () => postApi.fetchPostList(),
    staleTime: 1000 * 60 * 5,
  });
}
```

### 6. `shared` - 공유 레이어

**역할**: 프로젝트 전체에서 사용하는 공통 코드

**포함 내용**:

- `api/` - API 클라이언트 설정
- `assets/` - icon, image 등
- `config/` - 설정 파일
- `hooks/` - 커스텀 hooks
- `lib/` - 라이브러리 설정 및 유틸
- `types/` - 공통 타입
- `ui/` - 공통 UI 컴포넌트 (Button, Input, Modal 등)
- `utils/` - 유틸리티 함수

**특징**:

- 다른 레이어에 의존하지 않습니다
- 프로젝트 전반에서 재사용됩니다
- 가장 하위 레이어입니다

**예시**:

```typescript
// shared/ui/Button/Button.tsx
export function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

// shared/hooks/useToggle.ts
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle] as const;
}
```

## 의존성 규칙

FSD의 가장 중요한 규칙은 **단방향 의존성**입니다.

### 규칙

1. **상위 레이어만 하위 레이어를 import할 수 있습니다**
2. **같은 레이어 내에서는 서로 import할 수 없습니다**
3. **하위 레이어는 상위 레이어를 절대 import할 수 없습니다**

### 올바른 예시

```typescript
// ✅ pages → widgets → features → entities → shared
import { Button } from '@/shared/ui/Button';
import { usePostListQuery } from '@/entities/post';
import { PostList } from '@/features/post/post-list';
import { Header } from '@/widgets/header';
```

### 잘못된 예시

```typescript
// ❌ shared → entities (하위 레이어가 상위 레이어를 import)
// shared/ui/Button/Button.tsx
import { PostCard } from '@/entities/post'; // ❌ 잘못됨!

// ❌ 같은 레이어 간 import
// entities/post/api/post.api.ts
import { userApi } from '@/entities/user'; // ❌ 잘못됨!

// ❌ 내부 구현에 직접 접근
// pages/post/PostListPage.tsx
import { PostCard } from '@/entities/post/ui/PostCard/PostCard'; // ❌ 잘못됨!
// 올바른 방법: import { PostCard } from '@/entities/post';
```

### 의존성 체크

다음과 같은 의존성 그래프가 형성되어야 합니다:

```
app
 ├─ pages
 │   ├─ widgets
 │   │   ├─ features
 │   │   │   ├─ entities
 │   │   │   │   └─ shared
 │   │   │   └─ shared
 │   │   └─ shared
 │   └─ shared
 └─ shared
```

## Public API 패턴

각 레이어의 슬라이스는 `index.ts` 파일을 통해 외부에 공개됩니다. 이를 **Public API**라고 합니다.

### Public API의 역할

1. **캡슐화** - 내부 구현을 숨기고 필요한 것만 공개
2. **유연성** - 내부 구조 변경 시 외부 코드에 영향 없음
3. **명확성** - 어떤 것이 공개 API인지 명확함

### Public API 예시

**Entity 레이어** - 여러 종류의 export를 카테고리별로 구분:

```typescript
// entities/post/index.ts
// Types
export type { Post, CreatePostDTO, UpdatePostDTO } from './model/types';

// API
export { postApi } from './api/post.api';
export {
  usePostListQuery,
  usePostDetailQuery,
  useCreatePostMutation,
  postKeys,
} from './api/post.queries';

// UI
export { PostCard } from './ui/PostCard/PostCard';
```

**Feature 레이어** - 단일 컴포넌트 export:

```typescript
// features/post/post-list/index.ts
export { PostList } from './ui/PostList/PostList';
```

**Widget 레이어** - 단일 컴포넌트 export:

```typescript
// widgets/header/index.ts
export { Header } from './ui/Header/Header';
```

**Shared 레이어** - 각 컴포넌트별 단일 export:

```typescript
// shared/ui/Button/index.ts
export { Button } from './Button';

// shared/ui/Input/index.ts
export { Input } from './Input';
```

**Page 레이어** - 카테고리별로 구분:

```typescript
// pages/index.ts
// Home
export { HomePage } from './home/HomePage/HomePage';

// Post
export { PostListPage } from './post/PostListPage/PostListPage';
export { CreatePostPage } from './post/CreatePostPage/CreatePostPage';
```

### 올바른 Import 방법

```typescript
// ✅ Public API를 통한 import
import { PostCard, usePostListQuery } from '@/entities/post';
import { Button } from '@/shared/ui';

// ❌ 내부 구현에 직접 접근 (Public API 우회)
import { PostCard } from '@/entities/post/ui/PostCard/PostCard';
```

## 실제 예제

### 예제 1: 게시글 목록 페이지 만들기

```
1. entities/post 생성
   ├── api/post.api.ts           # API 함수 정의
   ├── api/post.queries.ts       # React Query hooks
   ├── model/types.ts            # Post 타입 정의
   └── index.ts                  # Public API

2. features/post/post-list 생성
   ├── ui/PostList/PostList.tsx  # PostList 컴포넌트
   └── index.ts                   # Public API

3. pages/post/PostListPage 생성
   └── PostListPage.tsx          # 페이지 컴포넌트
```

**의존성 흐름**:

```
PostListPage (pages)
  ↓
PostList (features)
  ↓
usePostListQuery (entities)
  ↓
postApi (entities)
  ↓
apiClient (shared)
```

### 예제 2: 게시글 작성 기능 만들기

```
1. entities/post에 mutation 추가
   └── api/post.queries.ts       # useCreatePostMutation 추가

2. features/post/create-post 생성
   ├── ui/CreatePostForm/        # 폼 컴포넌트
   └── index.ts

3. pages/post/CreatePostPage 생성
   └── CreatePostPage.tsx        # 페이지 컴포넌트
```

## FSD 오버레이 기능

이 템플릿에는 **FSD 오버레이** 기능이 내장되어 있어, 개발 중에 각 컴포넌트의 FSD 경로를 시각적으로 확인할 수 있습니다.

### 사용 방법

1. 개발 서버를 실행하면 왼쪽 하단에 **FSD** 토글 버튼이 표시됩니다
2. 버튼을 클릭하여 오버레이를 활성화/비활성화할 수 있습니다 (기본값: 활성화)
3. 각 컴포넌트 위에 FSD 경로가 색상별로 표시됩니다

### 레이어별 색상

- 🔵 **app** - 애플리케이션 초기화
- 🟣 **pages** - 페이지 컴포넌트
- 🩷 **widgets** - 복잡한 UI 블록
- 🟠 **features** - 비즈니스 기능
- 🟢 **entities** - 도메인 모델
- ⚫ **shared** - 공통 코드 (오버레이에서 제외됨)

### 컴포넌트에 FSD 경로 추가하기

컴포넌트에 `data-fsd-path` 속성을 추가하면 오버레이에 표시됩니다:

```typescript
// widgets/header/ui/Header/Header.tsx
export function Header() {
  return (
    <StyledHeaderContainer data-fsd-path="widgets/header">
      {/* ... */}
    </StyledHeaderContainer>
  );
}

// features/post/create-post/ui/CreatePostButton/CreatePostButton.tsx
export function CreatePostButton() {
  return (
    <Button as={Link} to={ROUTES_PATHS.POSTS.NEW} data-fsd-path="features/post/create-post/CreatePostButton">
      게시글 작성
    </Button>
  );
}
```

**경로 형식**: `{layer}/{segment}/{component}`

- `widgets/header` - widgets 레이어의 header 세그먼트
- `features/post/create-post/CreatePostButton` - features 레이어의 post/create-post 세그먼트의 CreatePostButton 컴포넌트

### 주의사항

- `shared` 레이어는 오버레이에서 자동으로 제외됩니다 (너무 많은 오버레이로 인한 화면 가림 방지)
- 컴포넌트가 화면 상단에 가까우면 레이블이 컴포넌트 내부에 표시됩니다

## 베스트 프랙티스

### 1. 명확한 레이어 분리

- 각 레이어의 역할을 명확히 구분하세요
- 비즈니스 로직은 `features`나 `entities`에 위치해야 합니다
- 단순한 UI 컴포넌트는 `shared/ui`에 위치합니다

### 2. Public API 유지

- 항상 `index.ts`를 통해 export하세요
- 내부 구현에 직접 접근하지 마세요

### 3. 명명 규칙

- **pages**: `*Page` (예: `PostListPage`)
- **widgets**: 기능 중심 (예: `Header`, `Sidebar`)
- **features**: 동사 중심 (예: `create-post`, `post-list`)
- **entities**: 명사 중심 (예: `post`, `user`)
- **shared**: 명사 중심 (예: `ui`, `utils`)

### 4. 파일 구조

각 레이어와 세그먼트별로 `index.ts`의 역할과 구조가 다릅니다:

#### Entity 레이어의 index.ts

Entity는 여러 종류의 export를 포함하므로 카테고리별로 구분하여 export합니다:

```
entities/post/
├── api/
│   ├── post.api.ts
│   └── post.queries.ts
├── model/
│   └── types.ts
├── ui/
│   └── PostCard/
└── index.ts           # Public API - 카테고리별 구분
```

```typescript
// entities/post/index.ts
// Types
export type { Post, CreatePostDTO, UpdatePostDTO } from './model/types';

// API
export { postApi } from './api/post.api';
export {
  usePostListQuery,
  usePostDetailQuery,
  useCreatePostMutation,
  postKeys,
} from './api/post.queries';

// UI
export { PostCard } from './ui/PostCard/PostCard';
```

#### Feature 레이어의 index.ts

Feature는 주로 단일 컴포넌트를 export하므로 간단한 구조입니다:

```
features/post/post-list/
├── ui/
│   └── PostList/
│       └── PostList.tsx
└── index.ts           # Public API - 단순 export
```

```typescript
// features/post/post-list/index.ts
export { PostList } from './ui/PostList/PostList';
```

#### Widget 레이어의 index.ts

Widget도 단일 컴포넌트를 export하므로 간단한 구조입니다:

```
widgets/header/
├── ui/
│   └── Header/
│       └── Header.tsx
└── index.ts           # Public API - 단순 export
```

```typescript
// widgets/header/index.ts
export { Header } from './ui/Header/Header';
```

#### Shared 레이어의 index.ts

Shared는 각 서브폴더별로 단일 export입니다:

```
shared/ui/
├── Button/
│   ├── Button.tsx
│   └── index.ts       # 단순 export
└── Input/
    ├── Input.tsx
    └── index.ts       # 단순 export
```

```typescript
// shared/ui/Button/index.ts
export { Button } from './Button';

// shared/ui/index.ts (통합 export, 선택사항)
export { Button } from './Button';
export { Input } from './Input';
```

#### Page 레이어의 index.ts

Page는 여러 페이지를 카테고리별로 구분하여 export합니다:

```
pages/
├── home/
│   └── HomePage/
├── post/
│   └── PostListPage/
└── index.ts           # Public API - 카테고리별 구분
```

```typescript
// pages/index.ts
// Home
export { HomePage } from './home/HomePage/HomePage';

// Post
export { PostListPage } from './post/PostListPage/PostListPage';
export { CreatePostPage } from './post/CreatePostPage/CreatePostPage';

// User
export { UserListPage } from './user/UserListPage/UserListPage';
```

#### 일반적인 디렉토리 구조

각 세그먼트 내부의 파일 구조는 다음과 같습니다:

```
segment-name/
├── api/              # API 관련 (선택, 주로 entities에 사용)
├── model/            # 타입, 모델 (선택, 주로 entities에 사용)
├── ui/               # UI 컴포넌트
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── ComponentName.styles.ts
│       └── index.ts  # 컴포넌트 export (선택)
├── lib/              # 유틸리티 (선택)
└── index.ts          # Public API (필수)
```

### 5. 순환 의존성 방지

- 같은 레이어 내에서는 서로 import하지 마세요
- 공통 기능이 필요하면 `shared` 레이어를 활용하세요

### 6. 타입 안정성

- TypeScript를 적극 활용하세요
- 타입 정의는 `model/types.ts`에 위치합니다
- 공통 타입은 `shared/types`에 위치합니다

### 7. Shared UI 컴포넌트 분류 및 확장 패턴

#### 공통 컴포넌트 vs 특수 컴포넌트

`shared/ui` 폴더에는 프로젝트 전반에서 재사용되는 **공통 컴포넌트**만 위치시켜야 합니다.

**공통 컴포넌트 (shared/ui에 위치)**:

- 프로젝트 전반에서 재사용되는 기본 UI 컴포넌트
- 예: `Button`, `Input`, `Label`, `Textarea`, `Grid`, `Section`
- 특정 도메인이나 기능에 종속되지 않는 범용 컴포넌트
- MUI, Ant Design 같은 라이브러리의 기본 컴포넌트를 래핑한 경우도 포함

**특수 컴포넌트 (shared/ui에서 제외)**:

- 특정 기능이나 도메인에 특화된 컴포넌트
- 예: `RainbowBlinkingText` (특정 위젯에만 사용)
- 프로젝트 전반에서 재사용되지 않는 컴포넌트
- **위치**: 해당 기능이 속한 레이어로 이동
  - Widget에만 사용: `widgets/{widget-name}/ui/`
  - Feature에만 사용: `features/{feature-name}/ui/`

**예시: LoadingSpinner의 경우**

```typescript
// shared/ui/LoadingSpinner/LoadingSpinner.tsx
// ✅ 프로젝트 전반에서 재사용되므로 shared에 위치
export function LoadingSpinner({ size, color }: LoadingSpinnerProps) {
  return <BeatLoader color={color} size={size} />;
}
```

`LoadingSpinner`는 특색있는 디자인이지만, 프로젝트 전반에서 로딩 상태를 표시하는 데 사용되므로 `shared/ui`에 위치하는 것이 적절합니다.

**예시: RainbowBlinkingText의 경우**

```typescript
// widgets/header/ui/RainbowBlinkingText/RainbowBlinkingText.tsx
// ✅ Header 위젯에만 사용되므로 widgets에 위치
export function RainbowBlinkingText({ children }: RainbowBlinkingTextProps) {
  // ...
}
```

`RainbowBlinkingText`는 특정 위젯(Header)에만 사용되므로 `widgets/header`에 위치하는 것이 적절합니다.

#### 컴포넌트 확장 패턴 (BaseButton → SubmitButton)

기본 컴포넌트를 확장하여 특정 용도로 사용하는 경우, 다음과 같이 구조화합니다:

**1. 기본 컴포넌트 (shared/ui)**

```typescript
// shared/ui/Button/Button.tsx
// ✅ 공통 기본 컴포넌트 - 프로젝트 전반에서 재사용
export function Button({ variant, size, children, ...props }: ButtonProps) {
  return <StyledButton $variant={variant} $size={size} {...props}>{children}</StyledButton>;
}
```

**2. 확장 컴포넌트 (features 또는 widgets)**

기본 컴포넌트를 확장한 컴포넌트는 해당 기능이 속한 레이어에 위치시킵니다:

**방법 A: Feature 내부에 위치 (권장)**

```typescript
// features/post/create-post/ui/SubmitButton/SubmitButton.tsx
// ✅ BaseButton을 확장하여 특정 기능에 맞게 커스터마이징
import { Button } from '@/shared/ui/Button';

interface SubmitButtonProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}

export function SubmitButton({ isLoading, children = '제출', ...props }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? '처리 중...' : children}
    </Button>
  );
}
```

**방법 B: 공통 확장 컴포넌트가 필요한 경우**

만약 `SubmitButton`이 여러 feature에서 재사용된다면, `shared/ui`에 위치시킬 수도 있습니다:

```typescript
// shared/ui/SubmitButton/SubmitButton.tsx
// ✅ 여러 feature에서 재사용되는 확장 컴포넌트
import { Button } from '@/shared/ui/Button';

export function SubmitButton({ isLoading, children, ...props }: SubmitButtonProps) {
  return (
    <Button type="submit" variant="primary" disabled={isLoading} {...props}>
      {isLoading ? '처리 중...' : children}
    </Button>
  );
}
```

**구조 예시:**

```
shared/ui/
├── Button/              # 기본 Button 컴포넌트
│   ├── Button.tsx
│   └── index.ts
└── Input/               # 기본 Input 컴포넌트
    ├── Input.tsx
    └── index.ts

features/post/create-post/
└── ui/
    └── SubmitButton/    # Button을 확장한 SubmitButton
        ├── SubmitButton.tsx
        └── index.ts

features/user/login/
└── ui/
    └── LoginButton/     # Button을 확장한 LoginButton
        ├── LoginButton.tsx
        └── index.ts
```

**판단 기준:**

1. **shared/ui에 위치할 때**:
   - 프로젝트 전반에서 재사용됨
   - 특정 도메인/기능에 종속되지 않음
   - 기본적인 UI 컴포넌트

2. **features에 위치할 때**:
   - 특정 기능에만 사용됨
   - 비즈니스 로직이 포함됨
   - 기본 컴포넌트를 확장하여 특정 용도로 사용

3. **widgets에 위치할 때**:
   - 특정 위젯에만 사용됨
   - 여러 컴포넌트를 조합한 복합 컴포넌트

**요약:**

- ✅ **공통 컴포넌트**: `shared/ui`에 위치
- ✅ **특수 컴포넌트**: 해당 레이어(features, widgets)에 위치
- ✅ **확장 컴포넌트**: 기본 컴포넌트는 `shared/ui`, 확장 컴포넌트는 `features` 또는 `widgets`에 위치
- ✅ **재사용성**: 여러 곳에서 재사용되면 `shared`, 특정 기능에만 사용되면 해당 레이어

### 8. 파일 명명 규칙 (eslint-plugin-filename-rules)

FSD 아키텍처에서 일관된 파일 명명 규칙을 유지하기 위해 `eslint-plugin-filename-rules`를 사용할 수 있습니다.

#### eslint-plugin-filename-rules란?

`eslint-plugin-filename-rules`는 파일 이름의 명명 규칙을 강제하는 ESLint 플러그인입니다. 이를 통해 프로젝트 전체에서 일관된 파일 명명 규칙을 유지할 수 있습니다.

#### 설치

이미 프로젝트에 설치되어 있습니다:

```bash
npm install --save-dev eslint-plugin-filename-rules
```

#### 설정 방법

`eslint.config.js`에 플러그인을 추가하고 규칙을 설정합니다:

```javascript
import filenameRulesPlugin from 'eslint-plugin-filename-rules';

export default [
  // ... 기존 설정
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/main.tsx', 'src/App.tsx', '**/index.{ts,tsx}'],
    plugins: {
      'filename-rules': filenameRulesPlugin,
    },
    rules: {
      'filename-rules/match': [
        'error',
        {
          // 컴포넌트 파일: PascalCase
          '**/*.tsx': 'pascalcase',
          // 스타일 파일: PascalCase.styles.ts
          '**/*.styles.ts': 'pascalcase',
          // API 파일: camelCase.api.ts
          '**/*.api.ts': 'camelcase',
          // Queries 파일: camelCase.queries.ts
          '**/*.queries.ts': 'camelcase',
          // 유틸리티 파일: camelCase (utils 폴더)
          '**/utils/**/*.ts': 'camelcase',
          // 타입 파일: camelCase (shared/types 폴더)
          '**/types/**/*.ts': 'camelcase',
          // 타입 파일: 소문자 (model/types.ts)
          '**/model/**/types.ts': /^types\.ts$/,
          // 설정 파일: camelCase (config 폴더)
          '**/config/**/*.ts': 'camelcase',
        },
      ],
    },
  },
  // index.ts 파일은 예외 처리
  {
    files: ['**/index.{ts,tsx}'],
    plugins: {
      'filename-rules': filenameRulesPlugin,
    },
    rules: {
      'filename-rules/match': ['error', /^index\.(ts|tsx)$/],
    },
  },
];
```

#### FSD 아키텍처별 명명 규칙

FSD 아키텍처에서는 레이어와 파일 유형에 따라 다른 명명 규칙을 적용할 수 있습니다:

**1. 컴포넌트 파일 (PascalCase)**

```typescript
// ✅ 올바른 예시
Button.tsx;
PostCard.tsx;
UserList.tsx;
CreatePostForm.tsx;

// ❌ 잘못된 예시
button.tsx;
post - card.tsx;
user_list.tsx;
```

**2. 유틸리티 파일 (camelCase)**

```typescript
// ✅ 올바른 예시
common.util.ts; // camelCase
date.util.ts; // camelCase
format.util.ts; // camelCase
fsd - scanner.ts; // kebab-case (FSD는 약어이므로 하이픈 사용)

// ❌ 잘못된 예시
CommonUtil.ts; // camelCase 사용
common_util.ts;
dateUtil.ts; // 점(.)으로 구분 필요
fsdScanner.ts; // kebab-case 사용
```

**3. 스타일 파일 (PascalCase.styles.ts)**

```typescript
// ✅ 올바른 예시
Button.styles.ts;
PostCard.styles.ts;
Header.styles.ts;

// ❌ 잘못된 예시
button.styles.ts;
post - card.styles.ts;
header_styles.ts;
```

**4. API 파일 (camelCase.api.ts)**

```typescript
// ✅ 올바른 예시
post.api.ts;
user.api.ts;
comment.api.ts;

// ❌ 잘못된 예시
Post.api.ts;
user - api.ts;
comment_api.ts;
```

**5. Queries 파일 (camelCase.queries.ts)**

```typescript
// ✅ 올바른 예시
post.queries.ts;
user.queries.ts;
comment.queries.ts;

// ❌ 잘못된 예시
Post.queries.ts;
user - queries.ts;
comment_queries.ts;
```

**6. 타입 파일 (camelCase)**

```typescript
// ✅ 올바른 예시
types.ts; // model/types.ts (소문자)
common.type.ts; // shared/types/common.type.ts (camelCase)

// ❌ 잘못된 예시
Types.ts;
CommonType.ts; // camelCase 사용
common - type.ts;
api_type.ts;
```

**참고**: `model/types.ts`는 소문자로, `shared/types/` 내의 타입 파일은 camelCase로 명명합니다.

**7. Public API 파일 (index.ts)**

```typescript
// ✅ 올바른 예시
index.ts;
index.tsx;

// ❌ 잘못된 예시
Index.ts;
index - file.ts;
```

**8. SVG 파일 (kebab-case)**

```typescript
// ✅ 올바른 예시
check.svg;
user.svg;
heart.svg;
star.svg;
logo - placeholder.svg;
no - image.svg;

// ❌ 잘못된 예시
Check.svg;
userIcon.svg;
heart_icon.svg;
logoPlaceholder.svg;
```

**9. MD 파일 (SCREAMING_SNAKE_CASE)**

```typescript
// ✅ 올바른 예시
FSD_ARCHITECTURE.md;
IMPLEMENTATION_GUIDE.md;
GETTING_STARTED.md;
ASYNC_BOUNDARY_GUIDE.md;
README.md; // 예외: README.md는 대문자 허용
CHANGELOG.md; // 예외: CHANGELOG.md는 대문자 허용

// ❌ 잘못된 예시
fsd - architecture.md;
ImplementationGuide.md;
getting_started.md;
```

#### 고급 설정 예시

특정 경로에 대해 다른 규칙을 적용할 수 있습니다:

```javascript
{
  files: ['src/**/*.{ts,tsx}'],
  ignores: ['src/main.tsx', 'src/App.tsx', '**/index.{ts,tsx}'],
  plugins: {
    'filename-rules': filenameRulesPlugin,
  },
  rules: {
    'filename-rules/match': [
      'error',
      {
        // 컴포넌트 파일 (ui 폴더 내)
        '**/ui/**/*.tsx': 'pascalcase',
        // 페이지 컴포넌트
        '**/pages/**/*Page.tsx': /^[A-Z][a-zA-Z0-9]*Page\.tsx$/,
        // 스타일 파일: PascalCase.styles.ts
        '**/*.styles.ts': 'pascalcase',
        // 유틸리티 파일: PascalCase
        '**/utils/**/*.ts': 'pascalcase',
        // API 파일: camelCase
        '**/api/**/*.api.ts': 'camelcase',
        // Queries 파일: camelCase
        '**/api/**/*.queries.ts': 'camelcase',
        // 타입 파일: 소문자 (model/types.ts)
        '**/model/**/types.ts': /^types\.ts$/,
        // 타입 파일: PascalCase (shared/types)
        '**/types/**/*.ts': 'pascalcase',
        // 설정 파일: camelCase
        '**/config/**/*.ts': 'camelcase',
      },
    ],
  },
}
```

#### 사용 가능한 명명 규칙

플러그인에서 제공하는 기본 명명 규칙:

- `'pascalcase'` 또는 `'PascalCase'`: `Button.tsx`, `PostCard.tsx`
- `'camelcase'` 또는 `'camelCase'`: `formatUtil.ts`, `dateUtil.ts`
- `'snakecase'` 또는 `'snake_case'`: `format_util.ts`, `date_util.ts`
- `'kebabcase'` 또는 `'kebab-case'`: `format-util.ts`, `date-util.ts`

또는 정규 표현식을 사용하여 커스텀 규칙을 정의할 수 있습니다:

```javascript
'filename-rules/match': [
  'error',
  /^[A-Z][a-zA-Z0-9]*\.tsx$/, // PascalCase 컴포넌트
]
```

#### 실제 설정 예시

현재 프로젝트에 적용된 설정 (`eslint-plugin-unicorn` 사용):

```javascript
import unicornPlugin from 'eslint-plugin-unicorn';

export default [
  // ... 기존 설정
  // 컴포넌트 파일: PascalCase
  {
    files: ['src/**/*.tsx'],
    ignores: ['src/main.tsx', 'src/App.tsx', '**/index.tsx', '**/FSD*.tsx', '**/UI*.tsx'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },
  // 스타일 파일: PascalCase.styles.ts
  {
    files: ['src/**/*.styles.ts'],
    ignores: ['**/FSD*.styles.ts', '**/UI*.styles.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },
  // 유틸리티 파일: camelCase (utils 폴더)
  {
    files: ['src/**/utils/**/*.ts'],
    ignores: ['**/index.ts', '**/fsd-scanner.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
    },
  },
  // FSD Scanner 파일: kebab-case
  {
    files: ['src/**/utils/fsd-scanner.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  // API 파일: camelCase.api.ts
  {
    files: ['src/**/*.api.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
    },
  },
  // Queries 파일: camelCase.queries.ts
  {
    files: ['src/**/*.queries.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
    },
  },
  // 타입 파일: camelCase (shared/types 폴더)
  {
    files: ['src/**/types/**/*.ts'],
    ignores: ['**/index.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
    },
  },
  // 타입 파일: 소문자 (model/types.ts)
  {
    files: ['src/**/model/**/types.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  // 설정 파일: camelCase (config 폴더)
  {
    files: ['src/**/config/**/*.ts'],
    ignores: ['**/index.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
    },
  },
  // index.ts 파일은 예외 처리
  {
    files: ['**/index.{ts,tsx}'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
];
```

#### 사용 방법

설정 후 ESLint를 실행하면 파일 이름이 규칙을 따르지 않을 때 에러가 발생합니다:

```bash
# 린트 검사
npm run lint

# 자동 수정 (파일 이름은 자동 수정되지 않으므로 수동으로 변경 필요)
npm run lint:fix
```

**에러 예시:**

```
src/shared/ui/button/Button.tsx
  1:1  error  Filename should match the pattern: pascalcase  filename-rules/match
```

이 경우 파일 이름을 `Button.tsx`로 변경해야 합니다.

#### 주의사항

1. **파일 이름 자동 수정 불가**: ESLint는 파일 이름을 자동으로 변경하지 않습니다. 수동으로 파일 이름을 변경해야 합니다.

2. **Git 히스토리**: 파일 이름을 변경하면 Git에서 파일 삭제/추가로 인식됩니다. `git mv` 명령어를 사용하여 히스토리를 유지할 수 있습니다:

```bash
git mv src/shared/ui/button/button.tsx src/shared/ui/button/Button.tsx
```

3. **IDE 통합**: 대부분의 IDE에서 ESLint 에러를 실시간으로 확인할 수 있습니다.

4. **점진적 적용**: 기존 프로젝트에 적용할 때는 점진적으로 적용하는 것이 좋습니다. 먼저 `warn` 레벨로 설정하고, 점차 `error`로 변경하세요.

## 추가 학습 자료

- [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
- [FSD 가이드라인](https://feature-sliced.design/docs/get-started/overview)

## 다음 단계

FSD 아키텍처를 이해했다면 다음 문서를 읽어보세요:

- [시작하기 가이드](./GETTING_STARTED.md) - 프로젝트 구조 상세 설명
- [구현 가이드](./IMPLEMENTATION_GUIDE.md) - 실제 코드 구현 방법
- [예제 코드](./EXAMPLES.md) - 템플릿의 예제 기능 분석
