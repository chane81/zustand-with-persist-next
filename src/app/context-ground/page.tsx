import { ContextProvider } from '@/stores/contextStore';
import Count from '@/views/context-ground/Count';
import OnOff from '@/views/context-ground/OnOff';

const contextGround = () => {
  return (
    <ContextProvider>
      <div className='flex flex-col gap-3 items-center justify-start p-6 bg-slate-50 min-h-screen'>
        <OnOff />
        <Count />
      </div>
    </ContextProvider>
  );
};

export default contextGround;
