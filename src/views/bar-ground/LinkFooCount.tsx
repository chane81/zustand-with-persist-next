import Link from 'next/link';

const LinkFooGround = () => {
  return (
    <Link
      href='/foo-ground'
      className='w-full flex flex-col items-start p-4 bg-slate-300 rounded-lg text-slate-700 text-lg font-semibold'
    >
      Go Foo Ground
    </Link>
  );
};

export default LinkFooGround;
