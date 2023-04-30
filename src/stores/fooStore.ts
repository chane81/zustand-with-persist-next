import { makeStore, useStoreHook } from '@/utils/zustandUtils';

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

type TStore = IState & Partial<IAction>;

export const initState: TStore = {
  count: 0,
  isOn: false
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
  (set, get) => ({
    ...initState,
    setInc: () => {
      set({
        count: get().count + 1
      });
    },
    setDesc: () => {
      set({
        count: get().count - 1
      });
    },
    setSwitch: () => {
      set({
        isOn: !get().isOn
      });
    }
  }),
  'fooStore'
);

/** store hook */
export const useFooStore = ((selector, compare) => {
  const store = useStoreHook(createStore, initState);

  return store(selector, compare);
}) as typeof createStore;
