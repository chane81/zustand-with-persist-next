import Count from '@/components/Count';
import { useBarStore } from '@/stores/barStore';
import { selector } from '@/utils/zustandUtils';

const BarCount = () => {
  // const { count, setDesc, setInc, getCount } = useBarStore((state) => ({
  //   isOn: state.isOn,
  //   count: state.count,
  //   cartt: state.car.name,
  //   setInc: state.setInc,
  //   setDesc: state.setDesc,
  //   getCount: state.getCount,
  // }));

  /** createHook + arrayToSelector 버전 */
  const { count, setDesc, setInc } = useBarStore(
    selector(['count', 'setDesc', 'setInc', 'getCount']),
  );

  return (
    <Count
      className='border-0 bg-pink-500 text-white'
      count={count}
      setInc={setInc}
      setDesc={setDesc}
    />
  );
};

export default BarCount;
