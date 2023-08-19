import Count from '@/components/Count';
import { TStore, useFooStore } from '@/stores/fooStore';
import { TSelector, selector } from '@/utils/zustandUtils';

const FooCount = () => {
  /** createHook 버전 */
  // const { count, setInc, setDesc } = useFooStore(
  //   (state) => ({
  //     isOn: state.isOn,
  //     count: state.count,
  //     setInc: state.setInc,
  //     setDesc: state.setDesc,
  //   }),
  //   (a, b) => {
  //     return a.count === b.count;
  //   },
  // );

  /** createHook + arrayToSelector 버전 */
  const { count, setInc, setDesc } = useFooStore(
    selector(['count', 'setInc', 'setDesc']),
  );

  /** createHookWithArray 버전 */
  // const { count, setInc, setDesc } = useFooStore([
  //   'count',
  //   'setInc',
  //   'setDesc',
  // ]);

  return <Count count={count} setInc={setInc} setDesc={setDesc} />;
};

export default FooCount;
