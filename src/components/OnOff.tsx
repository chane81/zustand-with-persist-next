import { cn } from '@/utils/styleUtils';
import { FC } from 'react';

interface IPropsOnOff {
  className?: string;
  isOn: boolean;
  setSwitch?: () => void;
}

const OnOff: FC<IPropsOnOff> = ({ className, isOn, setSwitch }) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-start gap-2 p-4 bg-slate-300 rounded-lg text-slate-700 text-lg font-semibold',
        className,
      )}
    >
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
