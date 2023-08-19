import {
  TCompare,
  TSelector,
  createHook,
  createHookWithArray,
  makeStore,
  useStoreHook,
} from '@/utils/zustandUtils';
import {
  UseBoundStoreWithEqualityFn,
  createWithEqualityFn,
} from 'zustand/traditional';
import { StoreApi, create } from 'zustand';
import { shallow } from 'zustand/shallow';

type GenericState = Record<string, any>;

export const createStoreWithSelectors = <T extends GenericState>(
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
  // Object.is, // Specify the default equality function, which can be shallow
);

export const useVeeStore = createStoreWithSelectors(store);
