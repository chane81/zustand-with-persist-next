import Count from '@/views/vee-ground/Count';
import OnOff from '@/views/vee-ground/OnOff';

const VeeCount = () => {
  return (
    <div className='flex flex-col gap-3 items-center justify-start p-6 bg-slate-50 min-h-screen'>
      <OnOff />
      <Count />
    </div>
  );
};

export default VeeCount;
