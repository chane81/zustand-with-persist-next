import Count from '@/components/Count';
import { useFooStore } from '@/stores/fooStore';
import { selector } from '@/utils/zustandUtils';

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
    // compare example
    (a, b) => {
      return a.count === b.count;
    },
  );

  return <Count count={count} setInc={setInc} setDesc={setDesc} />;
};

export default FooCount;
