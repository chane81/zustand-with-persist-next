import { useVeeStore } from '@/stores/veeStore';
import Count from '@/components/Count';

const VeeCount = () => {
  const { count, setInc, setDesc } = useVeeStore([
    'count',
    'setInc',
    'setDesc',
  ]);

  return <Count count={count} setInc={setInc} setDesc={setDesc} />;
};

export default VeeCount;
