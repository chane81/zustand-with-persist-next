import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional';
import { createWithEqualityFn as create } from 'zustand/traditional';
import type { StoreApi } from 'zustand';
import { shallow } from 'zustand/shallow';

export const createStoreWithSelectors = <T extends object>(
  store: UseBoundStoreWithEqualityFn<StoreApi<T>>,
): (<K extends keyof T>(keys: K[]) => Pick<T, K>) => {
  const useStore: <K extends keyof T>(keys: K[]) => Pick<T, K> = <
    K extends keyof T,
  >(
    keys: K[],
  ) => {
    return store((state) => {
      const x: Partial<T> = {};

      if (Array.isArray(keys)) {
        for (const key of keys) {
          x[key] = state[key];
        }
      }

      return x as Pick<T, K>;
    }, shallow);
  };

  return useStore;
};

/** state */
interface IState {
  count: number;
  isOn: boolean;
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
}

export type TStore = IState & Partial<IAction>;

export const initState: TStore = {
  count: 0,
  isOn: false,
  car: {
    name: 'bmw',
    price: 500,
  },
};

export const store = create<TStore>(
  (set, get) => ({
    ...initState,
    setInc: () =>
      set({
        count: get().count + 1,
      }),
    setDesc: () => {
      set({
        count: get().count - 1,
      });
    },
    setSwitch: () => {
      set({
        isOn: !get().isOn,
      });
    },
  }),
  shallow,
);

export const useVeeStore = createStoreWithSelectors(store);
