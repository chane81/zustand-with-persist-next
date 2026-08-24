// @ts-check

import nextPlugin from '@next/eslint-plugin-next';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // 빌드 산출물 및 자동 생성 파일은 린트 대상에서 제외
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  // JS 기본 권장 규칙
  js.configs.recommended,

  // TypeScript 권장 규칙 (타입 정보 없이 동작하는 규칙만)
  ...tseslint.configs.recommended,

  // Next.js 규칙 + Core Web Vitals 규칙
  nextPlugin.configs['core-web-vitals'],

  // React Hooks 규칙
  reactHooks.configs.flat['recommended-latest'],

  // 접근성 규칙
  jsxA11y.flatConfigs.recommended,

  // 애플리케이션 코드: 브라우저 + Node 전역 사용
  {
    files: ['src/**/*.{js,mjs,ts,tsx}', '*.{ts,mjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // 설정 파일: CommonJS (module, require 전역)
  {
    files: ['*.js', '*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },

  // 프로젝트 개별 규칙
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
]);
