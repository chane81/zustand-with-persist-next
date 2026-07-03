import { createContext, type Context } from 'react';
import type { TCreateStore } from '../types';

/** store context 타입 */
export type TContext<TStore> = Context<TCreateStore<TStore> | null>;

/** store context 생성 */
export const createZustandContext = <TStore,>(): TContext<TStore> =>
  createContext<TCreateStore<TStore> | null>(null);
