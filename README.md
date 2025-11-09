# React FSD Template

Feature-Sliced Design 아키텍처를 적용한 React + TypeScript 프로젝트 템플릿입니다.

<img width="1293" height="845" alt="image" src="https://github.com/user-attachments/assets/23810a3e-dcf4-408e-85f2-1381b0300277" />

## 📚 문서

이 템플릿을 처음 사용하시는 분들을 위해 상세한 문서를 제공합니다. 아래 문서들을 참고하여 프로젝트를 시작하세요.

### 필수 문서

- **[🏗️ FSD 아키텍처 가이드](./docs/FSD_ARCHITECTURE.md)** - Feature-Sliced Design의 개념, 레이어별 역할, 핵심 원칙 상세 설명
- **[🚀 시작하기 가이드](./docs/GETTING_STARTED.md)** - 개발 환경 설정, 프로젝트 구조 상세 설명, 첫 번째 기능 만들기
- **[📦 라이브러리 가이드](./docs/LIBRARIES.md)** - 사용된 라이브러리 상세 설명 및 활용법
- **[💡 구현 가이드](./docs/IMPLEMENTATION_GUIDE.md)** - 실제 코드 예시, 패턴 및 베스트 프랙티스
- **[🎨 스타일링 가이드](./docs/STYLED_COMPONENTS_GUIDE.md)** - Styled-components 사용법, 테마 시스템
- **[⚡ AsyncBoundary 가이드](./docs/ASYNC_BOUNDARY_GUIDE.md)** - 로딩/에러 처리 공통화, Suspense 패턴
- **[📖 예제 코드](./docs/EXAMPLES.md)** - 템플릿에 포함된 예제 기능 상세 설명

### 추천 학습 순서

1. **README** (현재 문서) - 프로젝트 전체 개요 파악
2. **[FSD_ARCHITECTURE.md](./docs/FSD_ARCHITECTURE.md)** - FSD 개념과 원칙 이해
3. **[GETTING_STARTED.md](./docs/GETTING_STARTED.md)** - 프로젝트 시작 및 개발 환경 설정
4. **[LIBRARIES.md](./docs/LIBRARIES.md)** - 사용된 라이브러리 학습
5. **[IMPLEMENTATION_GUIDE.md](./docs/IMPLEMENTATION_GUIDE.md)** - 실제 코드 구현 학습
6. **[EXAMPLES.md](./docs/EXAMPLES.md)** - 예제 코드 분석
7. **[ASYNC_BOUNDARY_GUIDE.md](./docs/ASYNC_BOUNDARY_GUIDE.md)** - 로딩/에러 처리 패턴
8. **[STYLED_COMPONENTS_GUIDE.md](./docs/STYLED_COMPONENTS_GUIDE.md)** - 스타일링 방법 학습

## 🎯 프로젝트 소개

이 템플릿은 확장 가능하고 유지보수하기 쉬운 React 애플리케이션을 위한 견고한 기반을 제공합니다. [Feature-Sliced Design](https://feature-sliced.design/) 아키텍처를 기반으로 하며, 모던 React 생태계의 best practice를 따릅니다.

### 주요 특징

- ⚡️ **빠른 개발 경험** - Vite 기반의 초고속 HMR과 빌드
- 🏗️ **확장 가능한 아키텍처** - FSD로 체계적인 코드 구조 유지
- 🔷 **타입 안정성** - TypeScript로 런타임 에러 최소화
- 💅 **강력한 스타일링** - Styled-components와 테마 시스템
- 🔄 **효율적인 상태 관리** - React Query + Zustand 조합
- 📱 **실전 예제** - 게시글/사용자 관리 샘플 구현
- 🎨 **FSD 오버레이** - 실시간으로 컴포넌트의 FSD 경로를 시각화하는 개발 도구

## 🛠️ 기술 스택

### Core

- **React 18** - 최신 React 기능 (Concurrent, Suspense 등)
- **TypeScript 5** - 타입 안전성과 개발자 경험 향상
- **Vite 6** - 빠른 개발 서버와 최적화된 빌드

### 상태 관리

- **React Query** (TanStack Query) - 서버 상태 관리 및 캐싱
- **Zustand** - 간단하고 확장 가능한 클라이언트 상태 관리

### UI & 스타일링

- **Styled-components** - CSS-in-JS, 타입 안전한 스타일링
- **Pretendard Font** - 한글 최적화 웹폰트

### Form & Validation

- **React Hook Form** - 고성능 폼 관리
- **Zod** - 타입 안전한 스키마 검증

### 라우팅

- **React Router v6** - 선언적 라우팅

### 에러 처리

- **React Error Boundary** - 컴포넌트 에러 캐칭 및 처리

### 기타

- **Dayjs** - 가벼운 날짜 라이브러리
- **ESLint & Prettier** - 코드 품질 및 포맷팅

자세한 내용은 [라이브러리 가이드](./docs/LIBRARIES.md)를 참고하세요.

## 📁 프로젝트 구조

```
public/
└── fonts/                  # 웹폰트 파일 (Pretendard)
src/
├── app/                    # 애플리케이션 초기화, 프로바이더, 라우팅
├── pages/                  # 페이지 컴포넌트 (라우트)
├── widgets/                # 복잡한 UI 블록 (여러 feature 조합)
├── features/               # 비즈니스 기능 (로그인, 게시글 작성 등)
├── entities/               # 도메인 모델 (user, post, comment 등)
└── shared/                 # 공통 코드 (UI 컴포넌트, 유틸리티, API 설정)
```

**레이어 간 의존성 규칙:**

```
app → pages → widgets → features → entities → shared
```

## 🎨 FSD 오버레이 기능

이 템플릿에는 **FSD 오버레이** 기능이 내장되어 있습니다. 페이지의 각 컴포넌트 위에 FSD 경로를 시각적으로 표시하여 아키텍처 구조를 쉽게 파악할 수 있습니다.

### 사용 방법

1. 개발 서버를 실행하면 왼쪽 하단에 **FSD** 토글 버튼이 표시됩니다
2. 버튼을 클릭하여 오버레이를 활성화/비활성화할 수 있습니다
3. 각 컴포넌트 위에 FSD 경로가 색상별로 표시됩니다:
   - 🔵 **app** - 애플리케이션 초기화
   - 🟣 **pages** - 페이지 컴포넌트
   - 🩷 **widgets** - 복잡한 UI 블록
   - 🟠 **features** - 비즈니스 기능
   - 🟢 **entities** - 도메인 모델
   - ⚫ **shared** - 공통 코드

### 예제 컴포넌트

홈페이지에는 다양한 FSD 레이어의 예제 컴포넌트가 포함되어 있습니다:

- **UI Components Demo** (`widgets/ui-components-demo`) - 공통 UI 컴포넌트 예제
- **Counter Demo** (`widgets/counter-demo`) - features 레이어 사용 예제
- **Date Format Demo** (`widgets/date-format-demo`) - 날짜 포맷 유틸리티 예제
  - 내부에 `DateFormatExample` 컴포넌트 포함 (`widgets/date-format-demo/DateFormatExample`)
- **Assets Demo** (`widgets/assets-demo`) - 에셋 사용 예제

각 컴포넌트에 `data-fsd-path` 속성을 추가하여 오버레이에 표시됩니다.

### Features 레이어 예제

프로젝트에는 다음과 같은 features 레이어 예제가 포함되어 있습니다:

- **post-list** (`features/post/post-list`) - 게시글 목록 기능
- **create-post** (`features/post/create-post`) - 게시글 작성 기능
  - `CreatePostButton` - 게시글 작성 페이지로 이동하는 버튼
  - `CreatePostForm` - 게시글 작성 폼
- **delete-post** (`features/post/delete-post`) - 게시글 삭제 기능
- **user-list** (`features/user/user-list`) - 사용자 목록 기능
- **delete-user** (`features/user/delete-user`) - 사용자 삭제 기능

상위 레이어는 하위 레이어에만 의존할 수 있으며, 각 레이어는 독립적으로 동작합니다.

자세한 구조 설명은 [FSD 아키텍처 가이드](./docs/FSD_ARCHITECTURE.md)를 참고하세요.

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 20 이상
- npm, yarn, 또는 pnpm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost 모드)
npm run dev

# 브라우저에서 http://localhost:7248 접속
```

### 주요 스크립트

```bash
# 개발
npm run dev              # localhost 모드
npm run dev:local        # localhost 모드 (별칭)
npm run dev:dev          # development 모드
npm run dev:prod         # production 모드

# 빌드
npm run build            # 프로덕션 빌드
npm run build:local      # localhost 모드 빌드
npm run build:dev        # development 빌드
npm run build:prod       # production 빌드

# 코드 품질
npm run type-check       # TypeScript 타입 체크
npm run lint             # ESLint 검사
npm run lint:fix         # ESLint 자동 수정
npm run format           # Prettier 포맷팅
npm run format:check     # Prettier 검사
npm run check            # 타입 체크 + 린트 + 포맷 체크
npm run check:fix        # 린트 수정 + 포맷팅

# 프리뷰
npm run preview          # 빌드 결과 미리보기
npm run preview:prod     # production 모드로 프리뷰
```

자세한 시작 가이드는 [GETTING_STARTED.md](./docs/GETTING_STARTED.md)를 참고하세요.

## 🎨 샘플 기능

이 템플릿에는 다음과 같은 실전 예제가 구현되어 있습니다:

- ✅ 게시글 목록/상세/작성 (CRUD)
- ✅ 사용자 목록/상세 조회
- ✅ React Query 캐싱 및 무효화
- ✅ Form 검증 (React Hook Form + Zod)
- ✅ 에러 처리 및 로딩 상태
- ✅ AsyncBoundary를 활용한 Suspense 패턴

자세한 예제 설명은 [EXAMPLES.md](./docs/EXAMPLES.md)를 참고하세요.

## 🤝 기여 및 피드백

이 프로젝트는 학습 및 프로덕션 시작점으로 사용될 수 있습니다. 개선 제안이나 버그 리포트는 언제든 환영합니다.

## 📖 참고 자료

- [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
- [React 공식 문서](https://react.dev/)
- [TanStack Query 문서](https://tanstack.com/query/latest)
- [Styled-components 문서](https://styled-components.com/)
