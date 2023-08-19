import { cn } from '@/utils/styleUtils';
import { FC } from 'react';

interface IPropsCount {
  className?: string;
  count: number;
  setInc?: () => void;
  setDesc?: () => void;
}

const Count: FC<IPropsCount> = ({ className, count, setInc, setDesc }) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-start p-4 gap-2 border-3 border-sky-400 rounded-lg text-slate-600 text-lg font-semibold',
        className,
      )}
    >
      <div>name: Count Component</div>
      <div>count: {count}</div>
      <button
        onClick={setInc}
        className='mt-6 py-2 px-4 bg-sky-300 rounded-lg shadow-md w-full text-slate-600'
      >
        inc count
      </button>
      <button
        onClick={setDesc}
        className='py-2 px-4 bg-slate-300 rounded-lg shadow-md w-full text-slate-600'
      >
        desc count
      </button>
    </div>
  );
};

export default Count;
