import { useEffect, useState } from 'react';
import { StateCreator, StoreApi, UseBoundStore, create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

type TCreateStore<T> = UseBoundStore<StoreApi<T>>;

/** create store hook with hydrate */
export const useStoreHook = <T, U>(
  createStore: TCreateStore<T>,
  initState: T
) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const fnResult = ((selector, compare) => {
    const store = createStore(selector, compare ?? shallow);

    return hydrated ? store : selector(initState);
  }) as TCreateStore<T>;

  return fnResult;
};

/** create store with devtools */
export const makeStore = <T>(name: string, store: StateCreator<T, [], []>) => {
  let storeWrap: StateCreator<
    T,
    [] | [['zustand/persist', unknown]],
    [] | [['zustand/devtools', never]]
  > = store;

  if (process.env.NODE_ENV === 'development') {
    storeWrap = devtools(store);
  }

  return create(
    persist(storeWrap, {
      name,
      storage: createJSONStorage(() => localStorage)
    })
  );
};
