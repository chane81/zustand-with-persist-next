import { fnNoop, fnZero } from '@/utils/commonUtils';
import { createHook, makeStore } from '@/utils/zustandUtils';

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
export type TStore = IState & IAction;

/** 초기화 값 */
export const initState: TStore = {
  count: 0,
  isOn: false,
  users: [],
  car: {
    name: 'bmw',
    price: 500,
  },
  getCount: fnZero,
  setInc: fnNoop,
  setDesc: fnNoop,
  setSwitch: fnNoop,
};

/** store */
export const createStore = makeStore<TStore>(
  (set, get) => ({
    ...initState,
    setInc: () => {
      // before immer
      // set({
      //   count: get().count + 1,
      // });

      // after immer
      set((state) => {
        state.count += 1;
      });
    },
    setDesc: () => {
      // before immer
      // set({
      //   count: get().count - 1,
      // });

      // after immer
      set((state) => {
        state.count -= 1;
      });
    },
    setSwitch: () => {
      // before immer
      // set({
      //   isOn: !get().isOn,
      // });

      // after immer
      set((state) => {
        state.isOn = !state.isOn;
      });
    },
    getCount: () => {
      return get().count;
    },
  }),
  // 'barStore',
);

/** store hook - 일반버전 */
// export const useBarStore = <U>(
//   selector: TSelector<TStore, U>,
//   compare?: TCompare<U>,
// ) => {
//   const store = useStoreHook<TStore, U>(createStore, initState);

//   return store(selector, compare);
// };

/** store hook - selector 사용을 store 의 field 를 array로 받게 사용 */
// export const useBarStore = createHookWithArray<TStore>(createStore, initState);

/** store hook - selector 사용을 callback 함수 사용 */
export const useBarStore = createHook<TStore>(createStore, initState);
