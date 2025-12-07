import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  prefix: '',
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        // 타이포그래피 유틸리티 클래스
        '.typo-h1-bold': {
          fontSize: '1.25rem', // 20px
          fontWeight: '700',
          fontFamily: 'Pretendard',
        },
        '.typo-h1-semibold': {
          fontSize: '1.25rem', // 20px
          fontWeight: '600',
          fontFamily: 'Pretendard',
        },
        '.typo-h2-bold': {
          fontSize: '1.125rem', // 18px
          fontWeight: '700',
          fontFamily: 'Pretendard',
        },
        '.typo-h2-semibold': {
          fontSize: '1.125rem', // 18px
          fontWeight: '600',
          fontFamily: 'Pretendard',
        },
        '.typo-h3-bold': {
          fontSize: '1rem', // 16px
          fontWeight: '700',
          fontFamily: 'Pretendard',
        },
        '.typo-h3-semibold': {
          fontSize: '1rem', // 16px
          fontWeight: '600',
          fontFamily: 'Pretendard',
        },
        '.typo-h4-bold': {
          fontSize: '0.875rem', // 14px
          fontWeight: '700',
          fontFamily: 'Pretendard',
        },
        '.typo-h4-semibold': {
          fontSize: '0.875rem', // 14px
          fontWeight: '600',
          fontFamily: 'Pretendard',
        },
        '.typo-b1-medium': {
          fontSize: '1rem', // 16px
          fontWeight: '500',
          fontFamily: 'Pretendard',
        },
        '.typo-b2-medium': {
          fontSize: '0.875rem', // 14px
          fontWeight: '500',
          fontFamily: 'Pretendard',
        },
        '.typo-b3-medium': {
          fontSize: '0.8125rem', // 13px
          fontWeight: '500',
          fontFamily: 'Pretendard',
        },
        '.typo-b1-regular': {
          fontSize: '1rem', // 16px
          fontWeight: '400',
          fontFamily: 'Pretendard',
        },
        '.typo-b2-regular': {
          fontSize: '0.875rem', // 14px
          fontWeight: '400',
          fontFamily: 'Pretendard',
        },
        '.typo-b3-regular': {
          fontSize: '0.8125rem', // 13px
          fontWeight: '400',
          fontFamily: 'Pretendard',
        },
      });
    }),
  ],
  theme: {
    extend: {
      // shadcn/ui 색상 (CSS 변수 사용)
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // theme.ts에서 가져온 색상
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        // Blue scale
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Red scale
        red: {
          100: '#fee2e2',
          600: '#dc2626',
        },
      },
      // theme.ts에서 가져온 spacing
      spacing: {
        xs: '0.25rem', // 4px
        sm: '0.5rem', // 8px
        md: '1rem', // 16px
        lg: '1.5rem', // 24px
        xl: '2rem', // 32px
        '2xl': '3rem', // 48px
      },
      // theme.ts에서 가져온 fontSize
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }], // 12px
        sm: ['0.875rem', { lineHeight: '1.5' }], // 14px
        base: ['1rem', { lineHeight: '1.5' }], // 16px
        lg: ['1.125rem', { lineHeight: '1.5' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.5' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '1.5' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '1.5' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '1.5' }], // 36px
      },
      // theme.ts에서 가져온 fontWeight
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      // theme.ts에서 가져온 borderRadius
      borderRadius: {
        sm: '0.25rem', // 4px
        md: '0.375rem', // 6px
        lg: '0.5rem', // 8px
        xl: '0.75rem', // 12px
        full: '9999px',
        // shadcn/ui radius
        DEFAULT: 'var(--radius)',
      },
      // theme.ts에서 가져온 boxShadow
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      // theme.ts에서 가져온 transition
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      // fontFamily
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
};

export default config;
