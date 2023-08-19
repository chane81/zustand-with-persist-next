import Link from 'next/link';

const LinkBarGround = () => {
  return (
    <Link
      href='/bar-ground'
      className='w-full flex flex-col items-start p-4 bg-slate-300 rounded-lg text-slate-700 text-lg font-semibold'
    >
      Go Bar Ground
    </Link>
  );
};

export default LinkBarGround;
