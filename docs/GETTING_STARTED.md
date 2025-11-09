# 시작하기 가이드

## 목차

1. [템플릿 받아오기](#템플릿-받아오기)
2. [프로젝트 시작 전 체크리스트](#프로젝트-시작-전-체크리스트)
3. [개발 환경 설정](#개발-환경-설정)
4. [프로젝트 설치](#프로젝트-설치)
5. [프로젝트 구조 상세 설명](#프로젝트-구조-상세-설명)
6. [개발 서버 실행](#개발-서버-실행)
7. [첫 번째 기능 만들기](#첫-번째-기능-만들기)
8. [환경 변수 설정](#환경-변수-설정)
9. [빌드 및 배포](#빌드-및-배포)

## 템플릿 받아오기

### 1. Git Clone으로 받아오기 (기본)

**프로젝트 이름 변경하기:**

클론할 때 원하는 프로젝트 이름으로 폴더를 생성하려면:

```bash
# 마지막 인자로 원하는 폴더 이름 지정
git clone <템플릿-저장소-URL> <원하는-프로젝트-이름>
cd <원하는-프로젝트-이름>
```

**예시:**

```bash
git clone https://github.com/BAECHAN/REACT_FSD_TEMPLATE.git my-awesome-project
cd my-awesome-project
```

### 2. 프로젝트 이름 설정 ( 로컬 )

템플릿을 받아온 후 `package.json`의 프로젝트 이름을 변경하세요:

```bash
# package.json 파일 열어서 name 필드 수정
# 또는 간단히 sed 명령어로 변경
# macOS/Linux:
sed -i '' 's/"name": "REACT_FSD_TEMPLATE"/"name": "your-project-name"/' package.json

# Linux (GNU sed):
# sed -i 's/"name": "REACT_FSD_TEMPLATE"/"name": "your-project-name"/' package.json
```

**주의사항:**

- 프로젝트 이름은 소문자, 하이픈(`-`)으로 구분하는 것이 일반적입니다
- Git 히스토리 초기화 전에 이름을 변경하면 초기 커밋에 반영됩니다

## 프로젝트 시작 전 체크리스트

템플릿 프로젝트를 받아온 후 다음 순서로 작업을 진행하세요.

### 1. Git 히스토리 초기화 (필수)

템플릿을 받아온 직후 기존 git 히스토리를 제거하고 새로운 git 저장소로 초기화해야 합니다.

```bash
# 기존 git 히스토리 제거
rm -rf .git

# 새로운 git 저장소 초기화
git init
```

**주의사항:**

- 템플릿의 git 히스토리는 새 프로젝트와 관련이 없으므로 반드시 제거해야 합니다
- 아직 커밋하지 마세요. 파일 정리 후 초기 커밋을 진행합니다

### 2. 의존성 설치

프로젝트에 필요한 의존성을 설치합니다.

```bash
# npm을 사용하는 경우
npm install

# 또는 yarn을 사용하는 경우
yarn install

# 또는 pnpm을 사용하는 경우
pnpm install
```

**설치 확인:**

```bash
# node_modules 폴더가 생성되었는지 확인
ls -la node_modules
```

**주의사항:**

- `node_modules` 폴더는 `.gitignore`에 포함되어 있으므로 Git에 커밋되지 않습니다
- 설치 중 오류가 발생하면 Node.js 버전을 확인하세요 (20.0.0 이상 필요)
- 자세한 내용은 [프로젝트 설치](#프로젝트-설치) 섹션을 참고하세요

### 3. 예제 파일 제거 (선택사항)

템플릿에는 학습을 위한 예제 파일들이 포함되어 있습니다. 실제 프로젝트를 시작할 때 필요에 따라 제거할 수 있습니다.

**참고:** `remove-example-files` 브랜치를 받아온 경우 이 단계를 건너뛰고 다음 단계(환경 변수 파일 GitIgnore 설정)로 진행하세요.

#### 제거 가능한 데모/예제 파일

- **데모 위젯**
  - `src/widgets/assets-demo/` - 에셋 사용 예제
  - `src/widgets/date-format-demo/` - 날짜 포맷 예제
  - `src/features/date-format-example/` - 날짜 포맷 기능 예제

- **예제 기능** (템플릿 학습용)
  - `src/entities/post/` - Post 엔티티 예제
  - `src/entities/user/` - User 엔티티 예제
  - `src/features/post/` - 게시글 관련 기능 예제
  - `src/features/user/` - 사용자 관련 기능 예제
  - `src/pages/post/` - 게시글 관련 페이지 예제
  - `src/pages/user/` - 사용자 관련 페이지 예제

#### 제거 방법

템플릿을 받아온 직후 Git 히스토리를 끊은 상태이므로, 예제 파일을 직접 제거합니다:

```bash
# 데모 위젯 제거
rm -rf src/widgets/assets-demo
rm -rf src/widgets/date-format-demo
rm -rf src/features/date-format-example

# 예제 기능 제거 (예제로만 사용할 경우)
rm -rf src/entities/post
rm -rf src/entities/user
rm -rf src/features/post
rm -rf src/features/user
rm -rf src/pages/post
rm -rf src/pages/user
```

**관련 코드 제거:**

예제 파일을 제거한 후 다음 파일들에서도 관련 코드를 제거해야 합니다:

- `src/app/routes/index.tsx` - 예제 라우트 제거
- `src/pages/home/HomePage/HomePage.tsx` - 예제 관련 코드 제거
- `src/pages/index.ts` - 예제 export 제거
- 관련 import 문 제거

**주의사항:**

- 예제 파일은 FSD 아키텍처를 학습하는 데 도움이 되므로, 처음에는 유지하면서 구조를 파악한 후 제거하는 것을 권장합니다.

### 4. 환경 변수 파일 GitIgnore 설정

`.gitignore` 파일에서 환경 변수 관련 주석을 해제하세요.

```bash
# .gitignore 파일 열기
# 24-25번째 줄의 주석을 해제
```

**변경 전:**

```bash
# 프로젝트 시작 시 주석 해제
# .env.*
```

**변경 후:**

```bash
# 프로젝트 시작 시 주석 해제
.env.*
```

이렇게 하면 `.env.localhost`, `.env.development`, `.env.production` 등의 환경 변수 파일이 Git에 커밋되지 않습니다.

### 5. 초기 커밋 생성

파일 정리와 설정이 완료되면 초기 커밋을 생성합니다:

```bash
# 변경사항 스테이징
git add .

# 초기 커밋 생성
git commit -m "chore: initial commit from template"
```

원격 저장소가 있다면 연결하세요:

```bash
git remote add origin <새-저장소-URL>
git branch -M main  # 또는 master
git push -u origin main
```

### 완료

=======================================================================================

## 개발 환경 설정

### 필수 요구사항

- **Node.js**: 20.0.0 이상
- **npm**: 9.0.0 이상 (또는 yarn, pnpm)
- **코드 에디터**: VS Code 권장 (추천 확장 프로그램 아래 참고)

### VS Code 추천 확장 프로그램

템플릿에는 `.vscode/extensions.json` 파일에 추천 확장 프로그램이 정의되어 있습니다. VS Code를 열면 자동으로 설치를 제안합니다.

다음 확장 프로그램들이 포함되어 있습니다:

- **ESLint** (`dbaeumer.vscode-eslint`) - JavaScript/TypeScript 코드 품질 검사 및 린팅
- **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`) - React 코드 스니펫 제공
- **GitLens** (`eamodio.gitlens`) - Git 히스토리 및 커밋 정보 확인
- **Prettier** (`esbenp.prettier-vscode`) - 코드 자동 포맷팅
- **Auto Rename Tag** (`formulahendry.auto-rename-tag`) - HTML/JSX 태그 자동 이름 변경
- **Image preview** (`kisstkondoros.vscode-gutter-preview`) - 이미지 미리보기
- **dotENV** (`mikestead.dotenv`) - .env 파일 문법 하이라이팅
- **Korean Language Pack** (`ms-ceintl.vscode-language-pack-ko`) - VS Code 한국어 언어 팩
- **JavaScript Debugger (Nightly)** (`ms-vscode.js-debug-nightly`) - JavaScript 디버깅 도구
- **Color Highlight** (`naumovs.color-highlight`) - 코드 내 색상 값 시각화
- **Material Icon Theme** (`pkief.material-icon-theme`) - 파일 아이콘 테마
- **Styled-components** (`styled-components.vscode-styled-components`) - Styled-components 문법 하이라이팅 및 자동 완성
- **Error Lens** (`usernamehw.errorlens`) - 코드 라인에 인라인으로 에러/경고 표시
- **IntelliCode** (`visualstudioexptteam.vscodeintellicode`) - AI 기반 코드 자동 완성
- **IntelliCode API Usage Examples** (`visualstudioexptteam.intellicode-api-usage-examples`) - API 사용 예제 제공
- **CSS Peek** (`pranaygp.vscode-css-peek`) - CSS 클래스/ID 정의로 이동
- **TODO Highlight** (`wayou.vscode-todo-highlight`) - TODO, FIXME 등 주석 하이라이팅
- **Import Cost** (`wix.vscode-import-cost`) - import한 모듈의 번들 크기 표시
- **React snippets** (`xabikos.reactsnippets`) - React 관련 코드 스니펫 제공

### Node.js 설치 확인

```bash
node --version  # v20.0.0 이상이어야 합니다
npm --version   # v9.0.0 이상이어야 합니다
```

Node.js가 설치되어 있지 않다면 [Node.js 공식 웹사이트](https://nodejs.org/)에서 설치하세요.

## 프로젝트 설치

### 1. 의존성 설치

```bash
npm install
```

이 명령어는 `package.json`에 정의된 모든 의존성을 설치합니다.

### 2. 설치 확인

설치가 완료되면 `node_modules` 폴더가 생성되고, 다음 명령어로 개발 서버를 실행할 수 있습니다:

```bash
npm run dev
```

## 프로젝트 구조 상세 설명

템플릿의 프로젝트 구조를 자세히 살펴보겠습니다.

### 전체 디렉토리 구조

```
REACT_FSD_TEMPLATE/
├── public/                 # 정적 파일
│   ├── fonts/             # 폰트 파일
│   └── images/            # 이미지 파일
├── src/
│   ├── app/               # 애플리케이션 초기화 레이어
│   ├── pages/             # 페이지 레이어
│   ├── widgets/           # 위젯 레이어
│   ├── features/          # 기능 레이어
│   ├── entities/          # 엔티티 레이어
│   ├── shared/            # 공유 레이어
│   └── main.tsx           # 진입점
├── docs/                  # 문서 폴더
├── package.json           # 프로젝트 설정 및 의존성
├── tsconfig.json          # TypeScript 설정
├── vite.config.ts         # Vite 설정
└── README.md              # 프로젝트 설명
```

### 레이어별 상세 구조

#### `app/` - 애플리케이션 초기화

```
app/
├── App.tsx                # 최상위 컴포넌트
├── index.tsx              # App export
├── providers/             # 프로바이더들
│   ├── QueryProvider.tsx  # React Query 프로바이더
│   ├── RouterProvider.tsx # React Router 프로바이더
│   ├── ThemeProvider.tsx  # Styled-components 테마 프로바이더
│   └── index.tsx          # 프로바이더 통합
├── routes/                # 라우트 설정
│   └── index.tsx          # 라우트 정의
└── styles/                # 글로벌 스타일
    ├── index.css          # CSS 리셋 및 기본 스타일
    └── theme.ts           # 테마 설정
```

#### `pages/` - 페이지 레이어

```
pages/
├── home/                  # 홈 페이지
│   └── HomePage/
│       ├── HomePage.tsx
│       └── HomePage.styles.ts
├── post/                  # 게시글 관련 페이지
│   ├── PostListPage/
│   └── CreatePostPage/
├── user/                  # 사용자 관련 페이지
│   └── UserListPage/
└── error/                 # 에러 페이지
    └── NotFoundPage/
```

#### `widgets/` - 위젯 레이어

```
widgets/
├── header/                # 헤더 위젯
│   ├── ui/Header/
│   │   ├── Header.tsx
│   │   └── Header.styles.ts
│   └── index.ts
└── page-layout/           # 페이지 레이아웃 위젯
    └── ui/PageLayout/
```

#### `features/` - 기능 레이어

```
features/
├── post/                  # 게시글 관련 기능
│   ├── post-list/         # 게시글 목록 기능
│   │   ├── ui/PostList/
│   │   └── index.ts
│   └── create-post/       # 게시글 작성 기능
│       └── ui/CreatePostForm/
└── user/                  # 사용자 관련 기능
    └── user-list/
```

#### `entities/` - 엔티티 레이어

```
entities/
├── post/                  # Post 엔티티
│   ├── api/               # API 관련
│   │   ├── post.api.ts    # API 함수
│   │   └── post.queries.ts # React Query hooks
│   ├── model/             # 데이터 모델
│   │   └── types.ts       # 타입 정의
│   ├── ui/                # 엔티티 UI
│   │   └── PostCard/      # Post 카드 컴포넌트
│   └── index.ts           # Public API
└── user/                  # User 엔티티
    └── (동일한 구조)
```

#### `shared/` - 공유 레이어

```
shared/
├── api/                   # API 클라이언트
│   └── client.ts          # fetch 기반 API 클라이언트
├── ui/                    # 공통 UI 컴포넌트
│   ├── Button/
│   ├── Input/
│   ├── AsyncBoundary/
│   └── ... (기타 컴포넌트)
├── lib/                   # 라이브러리 설정
│   └── react-query/       # React Query 설정
├── hooks/                 # 커스텀 hooks
│   ├── useToggle.ts
│   └── useKeydown.ts
├── utils/                 # 유틸리티 함수
├── config/                # 설정 파일
│   ├── api.ts             # API 설정
│   └── routes.ts          # 라우트 경로
└── types/                 # 공통 타입
```

### 주요 설정 파일

#### `.nvmrc`

Node Version Manager(NVM)를 사용하는 경우 프로젝트에서 사용할 Node.js 버전을 지정하는 파일입니다.

```bash
# .nvmrc
v20.19.0
```

**사용 방법:**

```bash
# 프로젝트 디렉토리에서 자동으로 해당 버전 사용
nvm use

# 또는 버전 직접 지정
nvm install 20.19.0
nvm use 20.19.0
```

NVM이 설치되어 있지 않다면 [NVM 설치 가이드](https://github.com/nvm-sh/nvm)를 참고하세요. NVM을 사용하지 않더라도 Node.js 20.0.0 이상 버전이 설치되어 있으면 됩니다.

#### `vite.config.ts`

Vite 빌드 도구 설정 파일입니다. 주요 설정:

- **경로 별칭**: `@` → `src` 폴더
- **프록시 설정**: `/api` 요청을 백엔드로 프록시
- **포트**: 개발 서버 포트 7248

#### `tsconfig.json`

TypeScript 컴파일러 설정 파일입니다. 경로 별칭 및 컴파일 옵션이 설정되어 있습니다.

#### `package.json`

프로젝트 메타데이터 및 의존성이 정의되어 있습니다.

## 개발 서버 실행

### 기본 실행

```bash
npm run dev
```

이 명령어는 `localhost` 모드로 개발 서버를 실행합니다.

### 환경별 실행

```bash
# localhost 모드 (기본값)
npm run dev
# 또는
npm run dev:local

# development 모드
npm run dev:dev

# production 모드
npm run dev:prod
```

개발 서버가 시작되면 브라우저에서 `http://localhost:7248`로 접속할 수 있습니다.

### 개발 서버 기능

- ⚡ **Hot Module Replacement (HMR)**: 코드 변경 시 자동 새로고침
- 🔍 **TypeScript 타입 체크**: 타입 에러 실시간 확인
- 📦 **빠른 빌드**: Vite 기반의 초고속 빌드
- 🛠️ **React Query DevTools**: 개발 모드에서 자동 활성화

## 실제 프로젝트 구조 살펴보기

템플릿에는 `post`와 `user` 기능이 이미 구현되어 있습니다. 실제 프로젝트 구조를 살펴보면서 FSD 아키텍처를 이해해보겠습니다.

### 1. Entity 구조: `entities/user`

실제 구현된 User 엔티티 구조를 살펴보겠습니다:

```typescript
// entities/user/model/types.ts
import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
export type CreateUserDTO = Omit<User, 'id'>;
export type UpdateUserDTO = Partial<Omit<User, 'id'>>;

// entities/user/api/user.api.ts
import { apiClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config';
import type { User, CreateUserDTO, UpdateUserDTO } from '@/entities/user';

export const userApi = {
  fetchUserList: (): Promise<User[]> => {
    return apiClient.get<User[]>(API_ENDPOINTS.USERS);
  },

  fetchUserDetail: (id: string): Promise<User> => {
    return apiClient.get<User>(`${API_ENDPOINTS.USERS}/${id}`);
  },
};

// entities/user/api/user.queries.ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { userApi } from './user.api';

export const userKeys = {
  root: ['users'] as const,
  list: () => [...userKeys.root, 'list'] as const,
  detail: (id: string) => [...userKeys.root, 'detail', id] as const,
};

export function useUserListQuery() {
  return useSuspenseQuery({
    queryKey: userKeys.list(),
    queryFn: () => userApi.fetchUserList(),
  });
}

// entities/user/index.ts
// Types
export type { User, CreateUserDTO, UpdateUserDTO } from './model/types';

// API
export { userApi } from './api/user.api';
export { useUserListQuery } from './api/user.queries';

// UI
export { UserCard } from './ui/UserCard/UserCard';
```

### 2. Feature 구조: `features/user/user-list`

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

### 3. Page 구조: `pages/user/UserListPage`

```typescript
// pages/user/UserListPage/UserListPage.tsx
import { Header } from '@/widgets/header';
import { PageLayout } from '@/widgets/page-layout';
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary';
import { UserList } from '@/features/user/user-list';

export function UserListPage() {
  return (
    <>
      <Header />
      <PageLayout title="사용자 목록" description="사용자를 조회하고 관리합니다">
        <AsyncBoundary>
          <UserList />
        </AsyncBoundary>
      </PageLayout>
    </>
  );
}
```

### 4. 라우트 설정

```typescript
// app/routes/index.tsx
import { Route, Routes } from 'react-router-dom';
import { UserListPage } from '@/pages';
import { ROUTES_PATHS } from '@/shared/config';

export function AppRouter() {
  return (
    <Routes>
      {/* ... 기타 라우트 */}
      <Route path={ROUTES_PATHS.USERS.LIST} element={<UserListPage />} />
    </Routes>
  );
}
```

### 프로젝트 구조 요약

실제 프로젝트에는 다음 기능들이 구현되어 있습니다:

- **Post 기능**
  - `src/entities/post/` - Post 엔티티 (API, 타입, UI)
  - `src/features/post/post-list/` - 게시글 목록 기능
  - `src/features/post/create-post/` - 게시글 작성 기능
  - `src/pages/post/PostListPage/` - 게시글 목록 페이지
  - `src/pages/post/CreatePostPage/` - 게시글 작성 페이지

- **User 기능**
  - `src/entities/user/` - User 엔티티 (API, 타입, UI)
  - `src/features/user/user-list/` - 사용자 목록 기능
  - `src/pages/user/UserListPage/` - 사용자 목록 페이지

이러한 구조를 참고하여 새로운 기능을 추가할 수 있습니다. 자세한 구현 방법은 [구현 가이드](./IMPLEMENTATION_GUIDE.md)를 참고하세요.

## 환경 변수 설정

프로젝트는 환경별로 다른 설정을 사용할 수 있습니다.

### 환경 변수 파일

프로젝트 루트에 환경 변수 파일을 생성하세요:

```bash
# .env.localhost (로컬 개발 환경)
VITE_API_BASE_URL=http://localhost:3000

# .env.development (개발 서버 환경)
VITE_API_BASE_URL=https://dev-api.example.com

# .env.production (프로덕션 환경)
VITE_API_BASE_URL=https://api.example.com
```

### 환경 변수 사용

```typescript
// src/shared/config/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
```

### 주의사항

- 모든 환경 변수는 `VITE_` 접두사를 붙여야 합니다
- 환경 변수는 빌드 타임에 주입됩니다
- 민감한 정보는 절대 클라이언트 코드에 포함하지 마세요

## 빌드 및 배포

### 프로덕션 빌드

```bash
# 프로덕션 빌드
npm run build

# 환경별 빌드
npm run build:dev      # development 모드
npm run build:prod     # production 모드
```

빌드 결과물은 `dist` 폴더에 생성됩니다.

### 빌드 결과 확인

```bash
npm run preview        # 빌드 결과 미리보기
npm run preview:prod   # production 모드로 미리보기
```

### 배포

빌드된 `dist` 폴더를 정적 호스팅 서비스(AWS S3, Vercel, Netlify 등)에 업로드하면 됩니다.

### 배포 전 체크리스트

- ✅ 환경 변수 설정 확인
- ✅ API URL 확인
- ✅ 타입 에러 확인 (`npm run type-check`)
- ✅ 린트 에러 확인 (`npm run lint`)
- ✅ 빌드 테스트 (`npm run build && npm run preview`)

## 다음 단계

프로젝트 구조를 이해했다면 다음 문서를 읽어보세요:

- [FSD 아키텍처 가이드](./FSD_ARCHITECTURE.md) - 아키텍처 원칙 이해
- [라이브러리 가이드](./LIBRARIES.md) - 사용된 라이브러리 학습
- [구현 가이드](./IMPLEMENTATION_GUIDE.md) - 실제 코드 구현 방법
- [예제 코드](./EXAMPLES.md) - 템플릿의 예제 기능 분석
