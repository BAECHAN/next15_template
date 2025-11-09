# Styled-components 가이드

템플릿에서 사용하는 Styled-components의 활용법을 설명합니다.

## 목차

1. [기본 사용법](#기본-사용법)
2. [테마 시스템](#테마-시스템)
3. [Props 기반 스타일링](#props-기반-스타일링)
4. [컴포넌트 패턴](#컴포넌트-패턴)
5. [베스트 프랙티스](#베스트-프랙티스)

## 기본 사용법

### Styled Components란?

Styled-components는 CSS-in-JS 라이브러리로, JavaScript/TypeScript 코드 내에서 CSS를 작성할 수 있게 해줍니다.

**장점**:

- 타입 안전한 스타일링
- Props 기반 동적 스타일링
- CSS 스코프 자동 처리
- 테마 시스템 지원

### 기본 예시

```typescript
import styled from 'styled-components';

// 기본 styled 컴포넌트 생성
export const StyledCard = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 사용
function Card() {
  return <StyledCard>내용</StyledCard>;
}
```

### HTML 태그 기반 생성

```typescript
const StyledButton = styled.button`...`;
const StyledInput = styled.input`...`;
const StyledLink = styled.a`...`;
```

### 기존 컴포넌트 확장

```typescript
const StyledButton = styled.button`...`;

// StyledButton을 확장하여 새로운 컴포넌트 생성
const StyledPrimaryButton = styled(StyledButton)`
  background-color: blue;
`;
```

## 테마 시스템

템플릿은 테마 시스템을 통해 일관된 디자인을 유지합니다.

### 테마 정의

```typescript
// app/styles/theme.ts
export const theme = {
  colors: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    secondary: '#64748b',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    white: '#ffffff',
    black: '#000000',

    // Gray scale
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    // ...
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    // ...
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  borderRadius: {
    sm: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    // ...
  },
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    // ...
  },
  transition: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
} as const;
```

### 테마 사용

```typescript
import styled from 'styled-components';

export const StyledCard = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: all ${({ theme }) => theme.transition.normal};
`;
```

### 테마 타입 정의

```typescript
// styled.d.ts
import 'styled-components';
import { theme } from '@/app/styles/theme';

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```

이렇게 하면 TypeScript에서 테마의 자동 완성과 타입 체크가 가능합니다.

### 테마 Provider 설정

```typescript
// app/providers/ThemeProvider.tsx
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '@/app/styles/theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  );
}
```

## Props 기반 스타일링

Props를 활용하여 동적으로 스타일을 변경할 수 있습니다.

### 기본 Props 사용

```typescript
interface StyledButtonProps {
  $variant?: 'primary' | 'secondary';
  $size?: 'sm' | 'md' | 'lg';
}

export const StyledButton = styled.button<StyledButtonProps>`
  padding: ${({ $size = 'md' }) =>
    $size === 'sm' ? '0.5rem' : $size === 'lg' ? '1.5rem' : '1rem'};

  background-color: ${({ $variant = 'primary', theme }) =>
    $variant === 'primary' ? theme.colors.primary : theme.colors.gray200};
`;
```

**참고**: DOM으로 전달되지 않는 props는 `$` 접두사를 붙입니다 (예: `$variant`, `$size`).

### CSS Helper 활용

복잡한 스타일링을 위해 `css` helper를 사용할 수 있습니다:

```typescript
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface StyledButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.blue600};
    color: ${({ theme }) => theme.colors.white};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.blue700};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.gray700};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
  `,
};

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSize.sm};
  `,
  md: css`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSize.base};
  `,
  lg: css`
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.fontSize.lg};
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: all ${({ theme }) => theme.transition.normal};
  cursor: pointer;

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
  ${({ $size = 'md' }) => sizeStyles[$size]}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
```

### 조건부 스타일링

```typescript
interface StyledInputProps {
  $hasError?: boolean;
  $fullWidth?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.gray300)};

  &:focus {
    outline: 2px solid
      ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.primary)};
  }
`;
```

## 컴포넌트 패턴

템플릿에서 권장하는 컴포넌트 구조 패턴입니다.

### 파일 구조

```
Button/
├── Button.tsx           # 컴포넌트 로직
├── Button.styles.ts     # 스타일 정의
└── index.ts             # Public API
```

### 컴포넌트 예시

```typescript
// Button.styles.ts
import styled from 'styled-components';

interface StyledButtonProps {
  $variant?: 'primary' | 'secondary';
  $size?: 'sm' | 'md' | 'lg';
}

export const StyledButton = styled.button<StyledButtonProps>`
  /* 스타일 정의 */
`;

// Button.tsx
import { ComponentPropsWithoutRef } from 'react';
import { StyledButton } from './Button.styles'; // 같은 디렉토리에서 상대 경로로 import

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      {...props}
    />
  );
}

// index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### Styles 파일 Import 규칙

**중요**: `*.styles.ts` 파일은 **반드시 같은 디렉토리에 있는 컴포넌트에서만** 상대 경로(`./`)를 사용하여 import해야 합니다.

이 규칙의 목적:

- ✅ 컴포넌트 스타일의 캡슐화 유지
- ✅ 컴포넌트 간 스타일 파일 의존성 방지
- ✅ 코드 구조의 명확성 유지

**규칙 요약**:

- ✅ `import { StyledButton } from './Button.styles';` - 같은 디렉토리, 상대 경로
- ❌ `import { StyledInput } from '../Input/Input.styles';` - 다른 컴포넌트의 styles
- ❌ `import { StyledButton } from '@/shared/ui/Button/Button.styles';` - 절대 경로 사용

이 규칙은 ESLint를 통해 자동으로 검사되며, 위반 시 에러가 발생합니다.

### `as` prop 패턴

컴포넌트를 다른 HTML 요소로 렌더링할 수 있게 해줍니다:

```typescript
import { ComponentPropsWithoutRef, ElementType } from 'react';

interface ButtonOwnProps {
  variant?: 'primary' | 'secondary';
  as?: ElementType;
}

type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps> & {
    as?: T;
  };

export function Button<T extends ElementType = 'button'>({
  variant = 'primary',
  as,
  ...props
}: ButtonProps<T>) {
  const Component = as || 'button';

  return (
    <StyledButton
      as={Component}
      $variant={variant}
      {...props}
    />
  );
}

// 사용
<Button as={Link} to="/posts">게시글 목록</Button>
<Button as="a" href="/posts">링크</Button>
```

## 베스트 프랙티스

### 1. 테마 값 활용

**✅ 좋은 예시**:

```typescript
padding: ${({ theme }) => theme.spacing.md};
color: ${({ theme }) => theme.colors.primary};
```

**❌ 나쁜 예시**:

```typescript
padding: 16px;
color: #2563eb;
```

### 2. Props 네이밍

DOM으로 전달되지 않는 props는 `$` 접두사를 사용:

```typescript
interface StyledButtonProps {
  $variant?: 'primary' | 'secondary'; // ✅ DOM으로 전달되지 않음
  disabled?: boolean; // ✅ DOM 속성으로 전달됨
}
```

### 3. CSS Helper 활용

복잡한 스타일은 `css` helper로 분리:

```typescript
const variantStyles = {
  primary: css`...`,
  secondary: css`...`,
};

export const StyledButton = styled.button`
  ${({ $variant = 'primary' }) => variantStyles[$variant]}
`;
```

### 4. 타입 안전성

TypeScript 타입을 명시적으로 정의:

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface StyledButtonProps {
  $variant?: ButtonVariant;
}
```

### 5. 파일 분리

스타일은 별도 파일(`*.styles.ts`)로 분리:

```
Button/
├── Button.tsx
├── Button.styles.ts  ← 스타일 분리
└── index.ts
```

**중요**: `*.styles.ts` 파일은 같은 디렉토리에 있는 컴포넌트에서만 import할 수 있습니다.

**✅ 올바른 예시**:

```typescript
// Button/Button.tsx
import { StyledButton } from './Button.styles'; // 같은 디렉토리, 상대 경로 사용

export function Button() {
  return <StyledButton>...</StyledButton>;
}
```

**❌ 잘못된 예시**:

```typescript
// Button/Button.tsx
// ❌ 다른 컴포넌트의 styles 파일 import 불가
import { StyledInput } from '../Input/Input.styles';

// ❌ 절대 경로로 styles 파일 import 불가
import { StyledButton } from '@/shared/ui/Button/Button.styles';
```

이 규칙은 ESLint를 통해 자동으로 검사되며, 컴포넌트 간 스타일 파일의 의존성을 방지하여 캡슐화를 유지합니다.

### 6. 재사용 가능한 스타일

공통 스타일은 변수로 추출:

```typescript
const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const StyledButton = styled.button`
  ${baseButtonStyles}/* 추가 스타일 */
`;
```

### 7. 접근성 고려

키보드 포커스 스타일 추가:

```typescript
export const StyledButton = styled.button`
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
```

### 8. 반응형 디자인

미디어 쿼리 활용:

```typescript
export const StyledContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (min-width: 1024px) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;
```

## 고급 패턴

### 애니메이션

```typescript
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledCard = styled.div`
  animation: ${fadeIn} 0.3s ease-in-out;
`;
```

### 글로벌 스타일

이 템플릿에서는 `createGlobalStyle` 대신 일반 CSS 파일(`index.css`)을 사용합니다.

글로벌 스타일은 `src/app/styles/index.css`에 정의되어 있으며, `main.tsx`에서 import합니다:

```typescript
// main.tsx
import '@/app/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
);
```

**index.css에 포함된 내용**:

- CSS Reset (margin, padding, box-sizing)
- Pretendard 폰트 정의 (@font-face)
- 기본 body 스타일
- input, button, img 등 기본 요소 스타일

**참고**: Styled-components의 `createGlobalStyle`을 사용하려는 경우에도 동일한 방식으로 사용할 수 있지만, 이 템플릿에서는 CSS 파일을 사용하는 것을 권장합니다.

### 중첩 선택자

```typescript
export const StyledCard = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    color: ${({ theme }) => theme.colors.gray600};
  }
`;
```

## 디버깅

### Styled-components 개발 도구

Chrome 확장 프로그램 [styled-components devtools](https://chrome.google.com/webstore/detail/styled-components-devtools/blfmggpipcldimaaopcfejffmkihfgjn)를 사용하여 스타일을 디버깅할 수 있습니다.

### 클래스 이름 확인

개발자 도구에서 실제로 생성된 클래스 이름을 확인할 수 있습니다.

## 다음 단계

스타일링을 학습했다면 다음 문서를 참고하세요:

- [구현 가이드](./IMPLEMENTATION_GUIDE.md) - 전체 구현 패턴
- [예제 코드](./EXAMPLES.md) - 실제 컴포넌트 예시

## 참고 자료

- [Styled-components 공식 문서](https://styled-components.com/)
- [Styled-components TypeScript 가이드](https://styled-components.com/docs/api#typescript)
