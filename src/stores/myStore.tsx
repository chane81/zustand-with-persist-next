import type { TCreateStore, TSelector } from '@/utils/zustandUtils';
import { makeStore } from '@/utils/zustandUtils';
import type { ReactNode } from 'react';
import { createContext, useContext, useRef } from 'react';
import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';

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

type CreateStore = TCreateStore<TStore>;

export const MyContext = createContext<CreateStore | null>(null);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<CreateStore>();

  if (!storeRef.current) {
    storeRef.current = createStore;
  }

  return (
    <MyContext.Provider value={storeRef.current}>{children}</MyContext.Provider>
  );
};

export function useMyStore<U>(selector: TSelector<TStore, U>): U {
  const store = useContext(MyContext);

  if (!store) {
    throw new Error('Missing StoreProvider');
  }

  return useStoreWithEqualityFn(store, selector, shallow);
}
