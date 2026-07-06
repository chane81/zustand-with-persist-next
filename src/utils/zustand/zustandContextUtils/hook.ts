import { useContext } from 'react';
import { useShallow } from 'zustand/shallow';
import { useStore } from 'zustand';
import type { TSelector } from '../types';
import type { TContext } from './context';

/** context 기반 store hook 생성 */
export const makeContextStoreHook =
  <TStore,>(context: TContext<TStore>) =>
  <U,>(selector: TSelector<TStore, U>): U => {
    const store = useContext(context);

    if (!store) {
      throw new Error('Missing StoreProvider');
    }

    return useStore(store, useShallow(selector));
  };
