import { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

import type { TCompare, TCreateStore, TSelector } from '../types';

/** create store hook with hydrate */
export const useStoreHook = <T, U>(
  createStore: TCreateStore<T>,
  initState: Partial<T>,
) => {
  const [hydrated, setHydrated] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR/CSR hydration 시점 구분용. 최초 마운트 1회만 실행
  useEffect(() => setHydrated(true), []);

  return (selector: TSelector<T, U>, compare?: TCompare<U>) => {
    const store = createStore(selector, compare ?? shallow);

    return hydrated ? store : selector(initState as T);
  };
};

/** create hook */
export const createHook =
  <TStore>(createStore: TCreateStore<TStore>, initState: Partial<TStore>) =>
  <U>(selector: TSelector<TStore, U>, compare?: TCompare<U>) => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => setHydrated(true), []);

    const store = createStore(selector, compare ?? shallow);

    return hydrated ? store : selector(initState as TStore);
  };
