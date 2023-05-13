import { useEffect, useState } from 'react';
import { StateCreator, StoreApi, UseBoundStore, create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

export type TSelector<T, U> = (state: T) => U;
export type TCompare<U> = (a: U, b: U) => boolean;
export type TCreateStore<T, U> = (
  selector: TSelector<T, U>,
  compare?: TCompare<U>
) => U;
// export type TCreateStore<T> = UseBoundStore<StoreApi<T>>;

/** create store hook with hydrate */
export const useStoreHook = <T, U>(
  createStore: TCreateStore<T, U>,
  initState: Partial<T>
) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const fnResult = (selector: TSelector<T, U>, compare?: TCompare<U>) => {
    const store = createStore(selector, compare ?? shallow);

    return hydrated ? store : selector(initState as T);
  };

  return fnResult;
};

/** make store */
export const makeStore = <T>(
  name: string,
  store: StateCreator<
    T,
    [['zustand/devtools', never], ['zustand/immer', never]],
    []
  >
) => {
  const withTools = devtools(immer(store), {
    enabled: process.env.NODE_ENV === 'development'
  });

  if (name) {
    return create<T>()(
      persist(withTools, {
        name,
        storage: createJSONStorage(() => localStorage)
      })
    );
  }

  return create<T>()(withTools);
};
