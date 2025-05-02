'use client';

import OnOff from '@/components/OnOff';
import { useContextStore } from '@/stores/contextStore';

const VeeOnOff = () => {
  const { isOn, setSwitch } = useContextStore((state) => ({
    isOn: state.isOn,
    setSwitch: state.setSwitch,
  }));

  return <OnOff isOn={isOn} setSwitch={setSwitch} />;
};

export default VeeOnOff;
