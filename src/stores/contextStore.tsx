'use client';

import {
  createZustandContext,
  makeContextProvider,
  makeContextStoreHook,
} from '@/utils/zustand/zustandContextUtils';
import { makeStore } from '@/utils/zustand/zustandUtils';

interface IUser {
  name: string;
  age: number;
}

/** state */
interface IState {
  count: number;
  isOn: boolean;
  users: IUser[];
  car: {
    name: string;
    price: number;
  };
}

/** action */
interface IAction {
  setInc: () => void;
  setDesc: () => void;
  setSwitch: () => void;
  getCount: () => number;
}

/** store */
export type TStore = IState & Partial<IAction>;

/** 초기화 값 */
export const defaultState: TStore = {
  count: 0,
  isOn: false,
  users: [],
  car: {
    name: 'bmw',
    price: 500,
  },
};

/** store */
export const createStore = (initState?: Partial<TStore>) =>
  makeStore<TStore>((set, get) => ({
    ...defaultState,
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

const context = createZustandContext<TStore>();
export const ContextProvider = makeContextProvider<TStore>({
  context,
  createStore,
});
export const useContextStore = makeContextStoreHook(context);
