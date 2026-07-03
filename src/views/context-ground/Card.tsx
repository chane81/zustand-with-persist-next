import { ContextProvider, TStore } from '@/stores/contextStore';
import OnOff from './OnOff';
import Count from './Count';
import { cn } from '@/utils/styleUtils';

interface IPropsCard {
  title?: string;
  className?: string;
  initState?: Partial<TStore>;
}

const Card = ({ title, className, initState }: IPropsCard) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col gap-3 items-center justify-start p-3 bg-slate-100 rounded-lg',
        className,
      )}
    >
      <div className='text-slate-700 text-lg font-semibold'>{title}</div>
      <ContextProvider initState={initState}>
        <OnOff />
        <Count />
      </ContextProvider>
    </div>
  );
};

export default Card;
