import { shallow } from 'zustand/shallow';

import { useHydrated } from '@/hooks';
import type { TCompare, TCreateStore, TSelector } from '../types';

/** create store hook with hydrate */
export const useStoreHook = <T, U>(
  createStore: TCreateStore<T>,
  initState: Partial<T>,
) => {
  const hydrated = useHydrated();

  return (selector: TSelector<T, U>, compare?: TCompare<U>) => {
    const store = createStore(selector, compare ?? shallow);

    return hydrated ? store : selector(initState as T);
  };
};

/** create hook */
export const createHook =
  <TStore>(createStore: TCreateStore<TStore>, initState: Partial<TStore>) =>
  <U>(selector: TSelector<TStore, U>, compare?: TCompare<U>) => {
    const hydrated = useHydrated();

    const store = createStore(selector, compare ?? shallow);

    return hydrated ? store : selector(initState as TStore);
  };
