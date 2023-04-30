import { useFooStore } from '@/stores/fooStore';
import Image from 'next/image';
import useLocalStorageState from 'use-local-storage-state';
import { Count } from './Count';
import { OnOff } from './OnOff';

export default function Home() {
  return (
    <div className='flex flex-col gap-3 items-center justify-start p-6 bg-slate-50 min-h-screen'>
      <OnOff />
      <Count />
    </div>
  );
}
