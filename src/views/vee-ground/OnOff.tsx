import OnOff from '@/components/OnOff';
import { store, useVeeStore } from '@/stores/veeStore';
import { shallow } from 'zustand/shallow';

const VeeOnOff = () => {
  const { isOn, setSwitch } = store(
    (state) => ({
      // count: state.count,
      isOn: state.isOn,
      setSwitch: state.setSwitch,
    }),
    // shallow,
  );

  return <OnOff isOn={isOn} setSwitch={setSwitch} />;
};

export default VeeOnOff;
