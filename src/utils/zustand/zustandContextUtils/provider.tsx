import type { PropsWithChildren } from 'react';
import { useRef } from 'react';

import type { TCreateStore } from '../types';
import type { TContext } from './context';

interface MakeContextProviderProps<TStore> {
  context: TContext<TStore>;
  createStore: (initState?: Partial<TStore>) => TCreateStore<TStore>;
}

interface ProviderProps<TStore> {
  initState?: Partial<TStore>;
}

/** context 기반 store provider 생성 */
export const makeContextProvider = <TStore,>({
  context,
  createStore,
}: MakeContextProviderProps<TStore>) => {
  const Provider = ({
    initState,
    children,
  }: PropsWithChildren<ProviderProps<TStore>>) => {
    const storeRef = useRef<TCreateStore<TStore> | null>(null);

    if (!storeRef.current) {
      storeRef.current = createStore(initState);
    }

    return (
      <context.Provider value={storeRef.current ?? null}>
        {children}
      </context.Provider>
    );
  };

  return Provider;
};
