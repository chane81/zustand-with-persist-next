import type { PropsWithChildren } from 'react';
import { createContext, useContext, useRef, type Context } from 'react';
import type { TCreateStore, TSelector } from './zustandUtils';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

type TContext<TStore> = Context<TCreateStore<TStore> | null>;

export const createZustandContext = <TStore,>(): TContext<TStore> =>
  createContext<TCreateStore<TStore> | null>(null);

export const makeContextStoreHook =
  <TStore,>(context: TContext<TStore>) =>
  <U,>(selector: TSelector<TStore, U>): U => {
    const store = useContext(context);

    if (!store) {
      throw new Error('Missing StoreProvider');
    }

    return useStoreWithEqualityFn(store, selector, shallow);
  };

interface MakeContextProviderProps<TStore> {
  context: TContext<TStore>;
  createStore: TCreateStore<TStore>;
}

export const makeContextProvider = <TStore,>({
  context,
  createStore,
}: MakeContextProviderProps<TStore>) => {
  const Provider = ({ children }: PropsWithChildren) => {
    const storeRef = useRef<TCreateStore<TStore>>();

    if (!storeRef.current) {
      storeRef.current = createStore;
    }

    return (
      <context.Provider value={storeRef.current}>{children}</context.Provider>
    );
  };

  return Provider;
};
