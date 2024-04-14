import OnOff from '@/components/OnOff';
import { useFooStore } from '@/stores/fooStore';
import { selector } from '@/utils/zustand/zustandUtils';

const FooOnOff = () => {
  /** createHook 버전 */
  // const { isOn, setSwitch } = useFooStore((state) => ({
  //   isOn: state.isOn,
  //   setSwitch: state.setSwitch
  // }));

  /** createHookWithArray 버전 */
  const { isOn, setSwitch } = useFooStore(selector(['isOn', 'setSwitch']));

  return <OnOff isOn={isOn} setSwitch={setSwitch} />;
};

export default FooOnOff;
