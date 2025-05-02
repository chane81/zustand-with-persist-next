'use client';

import Count from '@/components/Count';
import { useContextStore } from '@/stores/contextStore';

const VeeCount = () => {
  const { count, setInc, setDesc } = useContextStore((state) => ({
    count: state.count,
    setInc: state.setInc,
    setDesc: state.setDesc,
  }));

  return <Count count={count} setInc={setInc} setDesc={setDesc} />;
};

export default VeeCount;
