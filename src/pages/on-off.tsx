import { useFooStore } from '@/stores/fooStore';

const OnOff = () => {
  const { isOn, setSwitch } = useFooStore((state) => ({
    isOn: state.isOn,
    setSwitch: state.setSwitch
  }));

  return (
    <div className='flex flex-col items-start gap-2 p-4 bg-slate-300 max-w-sm rounded-lg text-slate-700 text-lg font-semibold'>
      <div>name: OnOff Component</div>
      <div>isOn: {isOn.toString()}</div>
      <button
        onClick={setSwitch}
        className='mt-6 py-2 px-4 bg-slate-500 rounded-lg shadow-md w-full text-slate-50'
      >
        Set Switch On/Off
      </button>
    </div>
  );
};

export default OnOff;
