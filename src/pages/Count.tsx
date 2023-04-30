import { useFooStore } from '@/stores/fooStore';

const Count = () => {
  const { count, setDesc, setInc } = useFooStore(
    (state) => ({
      isOn: state.isOn,
      count: state.count,
      setInc: state.setInc,
      setDesc: state.setDesc
    }),
    (a, b) => {
      return a.count === b.count;
    }
  );

  return (
    <div className='flex flex-col items-start p-4 gap-2 ring ring-sky-400 max-w-sm rounded-lg text-slate-600 text-lg font-semibold'>
      <div>name: Count Component</div>
      <div>count: {count}</div>
      <button
        onClick={setInc}
        className='mt-6 py-2 px-4 bg-sky-300 rounded-lg shadow-md w-full'
      >
        inc count
      </button>
      <button
        onClick={setDesc}
        className='py-2 px-4 bg-slate-300 rounded-lg shadow-md w-full'
      >
        desc count
      </button>
    </div>
  );
};

export { Count };
