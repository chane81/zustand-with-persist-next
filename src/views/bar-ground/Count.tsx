'use client';

import Count from '@/components/Count';
import { useBarStore } from '@/stores/barStore';
import { selector } from '@/utils/zustand/zustandUtils';

const BarCount = () => {
  /** createHook + arrayToSelector 버전 */
  const { count, setDesc, setInc, carSpecInch } = useBarStore(
    selector(['count', 'setDesc', 'setInc', 'getCount', 'car.spec.inch']),
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
