import { useVeeStore } from '@/stores/veeStore';
import Count from '@/components/Count';
import { useMyStore } from '@/stores/myStore';

const VeeCount = () => {
  const { count, setInc, setDesc } = useMyStore((state) => ({
    count: state.count,
    setInc: state.setInc,
    setDesc: state.setDesc,
  }));

  return <Count count={count} setInc={setInc} setDesc={setDesc} />;
};

export default VeeCount;
