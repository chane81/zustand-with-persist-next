import OnOff from '@/components/OnOff';
import { useMyStore } from '@/stores/myStore';

const VeeOnOff = () => {
  const { isOn, setSwitch } = useMyStore((state) => ({
    isOn: state.isOn,
    setSwitch: state.setSwitch,
  }));

  return <OnOff isOn={isOn} setSwitch={setSwitch} />;
};

export default VeeOnOff;
