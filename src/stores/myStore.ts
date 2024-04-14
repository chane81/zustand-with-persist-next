import {
  createZustandContext,
  makeContextStoreHook,
  ZustandProvider,
} from '@/utils/zustand/zustandContextUtils';
import type { TCreateStore } from '@/utils/zustand/zustandUtils';
import { makeStore } from '@/utils/zustand/zustandUtils';
import { createContext } from 'react';

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
export const initState: TStore = {
  count: 0,
  isOn: false,
  users: [],
  car: {
    name: 'bmw',
    price: 500,
  },
};

/** store */
export const createStore = makeStore<TStore>(
  (set, get) => ({
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
  }),
  'myStore',
);

const context = createZustandContext<TStore>();
export const MyProvider = ZustandProvider<TStore>({ context, createStore });
export const useMyStore = makeContextStoreHook(context);
