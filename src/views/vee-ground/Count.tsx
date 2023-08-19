import { useVeeStore } from '@/stores/veeStore';
import Count from '@/components/Count';

const VeeCount = () => {
  // const { count, setInc, setDesc } = useVeeStore(
  //   (state) => ({
  //     count: state.count,
  //     setInc: state.setInc,
  //     setDesc: state.setDesc,
  //   }),
  //   shallow,
  // );
  const {
    count,
    setInc,
    setDesc,
    car: { name },
  } = useVeeStore(['count', 'setInc', 'setDesc', 'car']);

  // const { count, setInc, setDesc, carName } = store((state) => {
  //   return {
  //     ...pick(state, ['count', 'setInc', 'setDesc']),
  //     carName: state.car.name,
  //   };
  // }, shallow);

  return <Count count={count} setInc={setInc} setDesc={setDesc} />;
};

export default VeeCount;
