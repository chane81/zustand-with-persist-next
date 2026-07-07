import type { StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn as create } from 'zustand/traditional';

import { cookieStorage } from './cookieStorage';

type WithImmer = ['zustand/immer', never];
type TMakeStore<T> = StateCreator<T, [WithImmer], []>;

/** persist storage 종류 */
type TPersistType = 'cookie' | 'localStorage';

interface TMakeStoreOptions {
  /** persist storage 종류. 미지정 시 persist 미적용(메모리 전용) */
  persist?: TPersistType;
  /** persist 키. persist 지정 시 필수 */
  name?: string;
}

/** devtools + immer 공통 래핑 */
const withMiddleware = <T>(store: TMakeStore<T>) =>
  devtools(immer(store), {
    enabled: process.env.NODE_ENV === 'development',
  });

/**
 * store 생성 통합 진입점
 * - 옵션 미지정: persist 없는 메모리 전용 store
 * - `{ persist: 'cookie', name }`: 쿠키 persist (SSR 깜빡임 없음)
 * - `{ persist: 'localStorage', name }`: localStorage persist (클라 전용)
 */
export const makeStore = <T>(
  store: TMakeStore<T>,
  options?: TMakeStoreOptions,
) => {
  const { persist: persistType, name } = options ?? {};

  if (persistType === 'cookie') {
    if (!name) throw new Error('makeStore: cookie persist 에는 name 이 필요합니다');
    return makeStoreWithCookie<T>(store, name);
  }

  if (persistType === 'localStorage') {
    if (!name)
      throw new Error('makeStore: localStorage persist 에는 name 이 필요합니다');
    return makeStoreWithLocal<T>(store, name);
  }

  return create<T>()(withMiddleware(store), shallow);
};

/**
 * 쿠키 storage persist store
 * - 쿠키는 요청에 실려 서버가 SSR 시점에 읽음 → 초기 렌더 반영 → 깜빡임 없음
 * - SSR 초기값 주입(next/headers)과 함께 사용
 * - 주의: 상태가 매 요청에 실림 → 작은 UI 상태에만 적합
 * @param name persist 키 = 쿠키 키
 */
export const makeStoreWithCookie = <T>(store: TMakeStore<T>, name: string) =>
  create<T>()(
    persist(withMiddleware(store), {
      name,
      storage: createJSONStorage(() => cookieStorage),
    }),
    shallow,
  );

/**
 * localStorage persist store
 * - 클라 전용 저장. 서버가 못 읽음 → SSR 페이지에선 hydration 깜빡임 발생 가능
 * - 요청에 실리지 않아 오버헤드 없음. 대용량 상태 가능
 * @param name persist 키 = localStorage 키
 */
export const makeStoreWithLocal = <T>(store: TMakeStore<T>, name: string) =>
  create<T>()(
    persist(withMiddleware(store), {
      name,
      storage: createJSONStorage(() => localStorage),
    }),
    shallow,
  );
