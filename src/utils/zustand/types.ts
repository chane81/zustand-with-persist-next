import type { StoreApi } from 'zustand';
import type { UseBoundStoreWithEqualityFn as UseBoundStore } from 'zustand/traditional';

/** selector 함수 타입 */
export type TSelector<T, U> = (state: T) => U;

/** 비교 함수 타입 */
export type TCompare<U> = (a: U, b: U) => boolean;

/** store hook 타입 */
export type TCreateStore<T> = UseBoundStore<StoreApi<T>>;
