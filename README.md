# Next.js 15 Template

Next.js 15 + TypeScript + React Query를 활용한 모던 웹 애플리케이션 템플릿입니다.

## 🎯 프로젝트 소개

이 템플릿은 확장 가능하고 유지보수하기 쉬운 Next.js 애플리케이션을 위한 견고한 기반을 제공합니다. 모던 React 생태계의 best practice를 따릅니다.

### 주요 특징

- ⚡️ **빠른 개발 경험** - Next.js 15 기반의 최적화된 개발 환경
- 🔷 **타입 안정성** - TypeScript로 런타임 에러 최소화
- 💅 **강력한 스타일링** - Tailwind CSS 기반 스타일링
- 🔄 **효율적인 상태 관리** - React Query + Zustand 조합
- 📱 **실전 예제** - 게시글/사용자 관리 샘플 구현
- 🎨 **Storybook** - 컴포넌트 개발 및 문서화

## 🛠️ 기술 스택

### Core

- **Next.js 15** - React 기반 풀스택 프레임워크
- **React 19** - 최신 React 기능 (Concurrent, Suspense 등)
- **TypeScript 5** - 타입 안전성과 개발자 경험 향상

### 상태 관리

- **React Query** (TanStack Query) - 서버 상태 관리 및 캐싱
- **Zustand** - 간단하고 확장 가능한 클라이언트 상태 관리

### UI & 스타일링

- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **Shadcn UI** - 고품질 React 컴포넌트 라이브러리
- **Pretendard Font** - 한글 최적화 웹폰트

### Form & Validation

- **React Hook Form** - 고성능 폼 관리
- **Zod** - 타입 안전한 스키마 검증

### 에러 처리

- **React Error Boundary** - 컴포넌트 에러 캐칭 및 처리
- **AsyncBoundary** - 로딩/에러 처리 공통화

### 기타

- **Dayjs** - 가벼운 날짜 라이브러리
- **ESLint & Prettier** - 코드 품질 및 포맷팅
- **Storybook** - 컴포넌트 개발 및 문서화

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지 및 레이아웃
│   └── (main)/            # 메인 레이아웃 그룹
│       ├── posts/         # 게시글 관련 페이지
│       └── users/         # 사용자 관련 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── atoms/            # 기본 UI 컴포넌트
│   ├── elements/         # 복합 UI 컴포넌트
│   └── widgets/          # 위젯 컴포넌트
└── lib/                   # 유틸리티 및 설정
    ├── api/              # API 클라이언트
    ├── react-query/      # React Query 설정
    └── utils/            # 유틸리티 함수
```

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 20 이상
- pnpm 9 이상

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# Storybook 실행
pnpm storybook

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### 주요 스크립트

```bash
# 개발
pnpm dev              # 개발 서버 실행

# 빌드
pnpm build            # 프로덕션 빌드
pnpm start            # 프로덕션 서버 실행

# 코드 품질
pnpm type-check       # TypeScript 타입 체크
pnpm lint             # ESLint 검사
pnpm lint:fix         # ESLint 자동 수정
pnpm format           # Prettier 포맷팅
pnpm format:check     # Prettier 검사
pnpm check            # 타입 체크 + 린트 + 포맷 체크
pnpm check:fix        # 린트 수정 + 포맷팅

# Storybook
pnpm storybook        # Storybook 개발 서버
pnpm build-storybook  # Storybook 빌드
```

## 🎨 샘플 기능

이 템플릿에는 다음과 같은 실전 예제가 구현되어 있습니다:

- ✅ 게시글 목록/상세/작성 (CRUD)
- ✅ 사용자 목록/상세 조회
- ✅ React Query 캐싱 및 무효화
- ✅ Form 검증 (React Hook Form + Zod)
- ✅ 에러 처리 및 로딩 상태
- ✅ AsyncBoundary를 활용한 Suspense 패턴
- ✅ Next.js Parallel Routes를 활용한 Dialog 관리

## 📖 참고 자료

- [Next.js 공식 문서](https://nextjs.org/)
- [React 공식 문서](https://react.dev/)
- [TanStack Query 문서](https://tanstack.com/query/latest)
- [Tailwind CSS 문서](https://tailwindcss.com/)
- [Shadcn UI 문서](https://ui.shadcn.com/)
