import type { ReactNode } from 'react';
import { useRef } from 'react';
import type { TCreateStore } from '../types';
import { createZustandContext } from './context';

type MakeContextProviderProps<TStore> = (
  initState?: Partial<TStore>,
  name?: string,
) => TCreateStore<TStore>;

interface ProviderProps<TStore> {
  initState?: Partial<TStore>;
  name?: string;
  children: ReactNode;
}

/** context 기반 store provider 생성 */
export const makeContextProvider = <TStore,>(
  createStore: MakeContextProviderProps<TStore>,
) => {
  const context = createZustandContext<TStore>();

  const ContextProvider = ({
    initState,
    name,
    children,
  }: ProviderProps<TStore>) => {
    const storeRef = useRef<TCreateStore<TStore> | null>(null);

    if (!storeRef.current) {
      storeRef.current = createStore(initState, name);
    }

    return (
      <context.Provider value={storeRef.current ?? null}>
        {children}
      </context.Provider>
    );
  };

  return {
    ContextProvider,
    context,
  };
};
