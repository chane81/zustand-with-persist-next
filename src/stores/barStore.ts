import { fnNoop, fnZero } from '@/utils/commonUtils';
import {
  TCompare,
  TCreateStore,
  TSelector,
  makeStore,
  useStoreHook,
} from '@/utils/zustandUtils';
import { useEffect, useState } from 'react';
import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

interface IUser {
  name: string;
  age: number;
}

/** state */
interface IState {
  count: number;
  isOn: boolean;
  users: IUser[];
}

/** action */
interface IAction {
  setInc: () => void;
  setDesc: () => void;
  setSwitch: () => void;
  getCount: () => number;
}

/** store */
type TStore = IState & IAction;

/** 초기화 값 */
export const initState: TStore = {
  count: 0,
  isOn: false,
  users: [],
  getCount: fnZero,
  setInc: fnNoop,
  setDesc: fnNoop,
  setSwitch: fnNoop,
};

/** store */
export const createStore = makeStore<TStore>('barStore', (set, get) => ({
  ...initState,
  setInc: () => {
    set((state) => {
      state.count += 1;
    });
  },
  setDesc: () => {
    set((state) => {
      state.count -= 1;
    });
  },
  setSwitch: () => {
    set((state) => {
      state.isOn = !state.isOn;
    });
  },
  getCount: () => {
    return get().count;
  },
}));

/** store hook */
export const useBarStore = <U>(
  selector: TSelector<TStore, U>,
  compare?: TCompare<U>,
) => {
  const store = useStoreHook<TStore, U>(createStore, initState);

  return store(selector, compare);
};
