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
export const makeStore = <T>(
  stateCreator: StateCreator<T>,
  persistName?: string
) => {
  let creatorWrap: StateCreator<
    T,
    [] | [['zustand/persist', unknown]],
    [] | [['zustand/devtools', never]]
  > = stateCreator;
  let store = create(creatorWrap);

  if (process.env.NODE_ENV === 'development') {
    creatorWrap = devtools(stateCreator);
  }

  if (persistName) {
    store = create(
      persist(creatorWrap, {
        name: persistName,
        storage: createJSONStorage(() => localStorage)
      })
    );
  }

  return store;
};
