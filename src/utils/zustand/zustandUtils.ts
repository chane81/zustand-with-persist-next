import { useEffect, useState } from 'react';
import type { StateCreator, StoreApi } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

import type { UseBoundStoreWithEqualityFn as UseBoundStore } from 'zustand/traditional';
import { createWithEqualityFn as create } from 'zustand/traditional';

export type TSelector<T, U> = (state: T) => U;
export type TCompare<U> = (a: U, b: U) => boolean;
// export type TCreateStore<T, U> = (
//   selector: TSelector<T, U>,
//   compare?: TCompare<U>
// ) => U;
export type TCreateStore<T> = UseBoundStore<StoreApi<T>>;

/** create store hook with hydrate */
export const useStoreHook = <T, U>(
  createStore: TCreateStore<T>,
  initState: Partial<T>,
) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (selector: TSelector<T, U>, compare?: TCompare<U>) => {
    const store = createStore(selector, compare ?? shallow);

    return hydrated ? store : selector(initState as T);
  };
};

type CamelCasePath<P extends string> = P extends `${infer Head}.${infer Tail}`
  ? `${Head}${CamelCasePath<Capitalize<Tail>>}`
  : P;

type Paths<T, Key extends keyof T = keyof T> = Key extends string | number
  ? T[Key] extends Record<string, any>
    ? T[Key] extends Array<any>
      ? `${Key}` // 배열인 경우는 단순 키만 반환 (더 깊이 안 들어감)
      : `${Key}` | `${Key}.${Paths<T[Key]>}`
    : `${Key}`
  : never;

// 객체 경로에서 실제 값의 타입을 꺼내오는 헬퍼 타입
type PathValue<T, P extends string> = P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? PathValue<T[K], R>
    : never
  : P extends keyof T
    ? T[P]
    : never;

/**
 * store selector 함수
 * @param arrKey store 의 field name 이 array 로 들어감
 * ex) ['count', 'setInf']
 */
// export const selector =
//   <TStore, K extends keyof TStore>(arrKey: Array<K>) =>
//   (state: TStore) => {
//     const rtn = arrKey.reduce((acc, cur) => {
//       return {
//         ...acc,
//         ...{ [cur]: state[cur] },
//       };
//     }, {});

//     return rtn as Pick<TStore, K>;
//   };

export const selector =
  <TStore, P extends Paths<TStore>>(arrKey: Array<P>) =>
  (state: TStore) => {
    return arrKey.reduce(
      (acc, cur) => {
        const pathStr = cur as string;
        const keys = pathStr.split('.');

        // 1. 런타임에서 중첩된 실제 값 찾아오기
        let value: any = state;
        for (const key of keys) {
          value = value?.[key];
        }

        // 2. 'car.spec.inch' -> 'carSpecInch' 형태로 문자열 치환
        // 점(.) 뒤의 소문자를 대문자로 바꾸고 점을 제거하는 정규식
        const camelKey = pathStr.replace(/\.([a-z])/g, (_, match) =>
          match.toUpperCase(),
        );

        // 3. 변환된 키로 결과 객체에 담기
        (acc as any)[camelKey] = value;

        return acc;
      },
      {} as { [K in P as CamelCasePath<K>]: PathValue<TStore, K> },
    );
  };

/** create hook */
export const createHook =
  <TStore>(createStore: TCreateStore<TStore>, initState: Partial<TStore>) =>
  <U>(selector: TSelector<TStore, U>, compare?: TCompare<U>) => {
    const [hydrated, setHydrated] = useState(false);

    console.log('is server', typeof window);

    useEffect(() => setHydrated(true), []);

    const store = createStore(selector, compare ?? shallow);

    return hydrated ? store : selector(initState as TStore);
  };

type WithDevtools = ['zustand/devtools', never];
type WithImmer = ['zustand/immer', never];
type TMakeStore<T> = StateCreator<T, [WithDevtools, WithImmer], []>;

/** make store */
export const makeStore = <T>(store: TMakeStore<T>, name?: string) => {
  const withTools = devtools(immer(store), {
    enabled: process.env.NODE_ENV === 'development',
  });

  if (name) {
    return create<T>()(
      persist(withTools, {
        name,
        storage: createJSONStorage(() => localStorage),
      }),
      shallow,
    );
  }

  return create<T>()(withTools, shallow);
};
