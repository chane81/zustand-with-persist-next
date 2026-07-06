import type { PropsWithChildren } from 'react';
import { useRef } from 'react';

import type { TCreateStore } from '../types';
import type { TContext } from './context';

interface MakeContextProviderProps<TStore> {
  context: TContext<TStore>;
  createStore: (
    initState?: Partial<TStore>,
    name?: string,
  ) => TCreateStore<TStore>;
}

interface ProviderProps<TStore> {
  initState?: Partial<TStore>;
  /** persist 쿠키 키 — Provider 인스턴스별 격리 + SSR 초기값 매칭용 */
  name?: string;
}

/** context 기반 store provider 생성 */
export const makeContextProvider = <TStore,>({
  context,
  createStore,
}: MakeContextProviderProps<TStore>) => {
  const Provider = ({
    initState,
    name,
    children,
  }: PropsWithChildren<ProviderProps<TStore>>) => {
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

  return Provider;
};
