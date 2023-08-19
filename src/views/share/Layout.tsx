import { FC, PropsWithChildren } from 'react';

interface IPropsLayout extends PropsWithChildren {
  title?: string;
}

const Layout: FC<IPropsLayout> = ({ title, children }) => {
  return (
    <div className='min-h-screen bg-slate-50 flex justify-center'>
      <div className='container max-w-md flex flex-col gap-4 items-center justify-start p-6'>
        <div className='text-sky-500 text-3xl font-bold mb-6'>{title}</div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
