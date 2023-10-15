import { createHook, makeStore } from '@/utils/zustandUtils';

/** state */
interface IState {
  count: number;
  isOn: boolean;
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
};

// export const createStore = create(
//   persist<TStore>(
//     (set, get) => ({
//       ...initState,
//       setInc: () => {
//         set({
//           count: get().count + 1
//         });
//       },
//       setDesc: () => {
//         set({
//           count: get().count - 1
//         });
//       },
//       setSwitch: () => {
//         set({
//           isOn: !get().isOn
//         });
//       }
//     }),
//     {
//       name: 'fooStore'
//     }
//   )
// );

/** 위에서 create 와 persist 를 감싼 부분을 makeStore로 간결화 */
export const createStore = makeStore<TStore>(
  (set) => ({
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
  }),
  'fooStore',
);

/** store hook - 일반버전 */
// export const useFooStore = <U>(
//   selector: TSelector<TStore, U>,
//   compare?: TCompare<U>,
// ) => {
//   const store = useStoreHook<TStore, U>(createStore, initState);

//   return store(selector, compare);
// };

/** store hook - selector 사용을 store 의 field 를 array로 받게 사용 */
// export const useFooStore = createHookWithArray<TStore>(createStore, initState);

/** store hook - selector 사용을 callback 함수 사용 */
export const useFooStore = createHook<TStore>(createStore, initState);
