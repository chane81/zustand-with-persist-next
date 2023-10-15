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

/**
 * store selector 함수
 * @param arrKey store 의 field name 이 array 로 들어감
 * ex) ['count', 'setInf']
 */
export const selector =
  <TStore, K extends keyof TStore>(arrKey: Array<K>) =>
  (state: TStore) => {
    const rtn = arrKey.reduce((acc, cur) => {
      return {
        ...acc,
        ...{ [cur]: state[cur] },
      };
    }, {});

    return rtn as Pick<TStore, K>;
  };

/** create hook with array - with array store field key */
export const createHookWithArray =
  <TStore>(createStore: TCreateStore<TStore>, initState: Partial<TStore>) =>
  <K extends keyof TStore>(
    arrKey: Array<K>,
    compare?: TCompare<Pick<TStore, K>>,
  ) => {
    // hydrate 처리
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);

    const resSelector = selector<TStore, K>(arrKey);
    const store = createStore(resSelector, compare ?? shallow);

    return hydrated ? store : resSelector(initState as TStore);
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

/** make store */
export const makeStore = <T>(
  store: StateCreator<
    T,
    [['zustand/devtools', never], ['zustand/immer', never]],
    []
  >,
  name?: string,
) => {
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
