import { MyProvider } from '@/stores/myStore';
import Count from '@/views/my-ground/Count';
import OnOff from '@/views/my-ground/OnOff';

const contextGround = () => {
  return (
    <MyProvider>
      <div className='flex flex-col gap-3 items-center justify-start p-6 bg-slate-50 min-h-screen'>
        <OnOff />
        <Count />
      </div>
    </MyProvider>
  );
};

export default contextGround;
