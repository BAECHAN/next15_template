import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unicornPlugin from 'eslint-plugin-unicorn';
import prettierConfig from 'eslint-config-prettier';

export default [
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    ignores: [
      'dist/**/*',
      'node_modules/**/*',
      '.next/**/*',
      'out/**/*',
      'build/**/*',
      '**/*.md',
      '**/*.svg',
      'next-env.d.ts',
    ],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/main.tsx', '**/*.styles.ts', '**/*.styles.tsx', 'src/*.d.ts'],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.app.json'],
      },
      globals: {
        console: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      eqeqeq: 'error',
      'no-var': 'error',
      'no-empty-pattern': 'error',
      'no-undef': 'off',
      'import/no-default-export': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          args: 'none',
        },
      ],
      'prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      // 상대 경로 대신 절대 경로 사용 권장
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['..', '../*', '../**/*'],
              message: 'Please use absolute imports with @/ instead of relative paths with ../.',
            },
          ],
        },
      ],
    },
  },
  // 스타일 파일에 대한 특별 규칙
  {
    files: ['**/*.styles.ts', '**/*.styles.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  // 파일 명명 규칙 (unicorn/filename-case)
  // 비-ASCII 문자 검사 (한글 등) - 커스텀 규칙
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['**/index.{ts,tsx}'],
    plugins: {
      'custom-filename': {
        rules: {
          'no-non-ascii-filename': {
            meta: {
              type: 'problem',
              docs: {
                description: '파일명에 비-ASCII 문자 사용 금지',
              },
              messages: {
                nonAscii:
                  '파일명 "{{filename}}"에 비-ASCII 문자가 포함되어 있습니다. ASCII 문자만 사용해주세요.',
              },
            },
            create(context) {
              return {
                Program(node) {
                  const filename = context.getFilename();
                  const basename = filename.split('/').pop() || '';
                  const nameWithoutExt = basename.replace(/\.(ts|tsx|js|jsx)$/, '');
                  const nonAsciiRegex = /[^\x00-\x7F]/;
                  if (nonAsciiRegex.test(nameWithoutExt)) {
                    context.report({
                      node,
                      messageId: 'nonAscii',
                      data: {
                        filename: basename,
                      },
                    });
                  }
                },
              };
            },
          },
        },
      },
    },
    rules: {
      'custom-filename/no-non-ascii-filename': 'error',
    },
  },
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
  // 유틸리티 파일: kebab-case
  {
    files: ['src/**/utils/**/*.ts'],
    ignores: ['**/index.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  // API 파일: kebab-case.api.ts
  {
    files: ['src/**/*.api.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  // Queries 파일: kebab-case.queries.ts
  {
    files: ['src/**/*.queries.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  // 타입 파일: camelCase
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
  // 타입 파일: kebab-case (model/types.ts)
  {
    files: ['src/**/model/**/types.ts'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
  },
  // 설정 파일: camelCase
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
  // Next.js App Router 파일들: 소문자 파일명 허용
  {
    files: [
      'next.config.{ts,js}',
      '**/{layout,page,not-found,loading,error,global-error,template,default}.{ts,tsx}',
    ],
    plugins: {
      unicorn: unicornPlugin,
      import: importPlugin,
    },
    rules: {
      'unicorn/filename-case': 'off',
      'import/no-default-export': 'off',
    },
  },
];
