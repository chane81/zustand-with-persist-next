import { cn } from '@/utils/styleUtils';
import type { FC, PropsWithChildren, ReactNode } from 'react';

interface IPropsLayout extends PropsWithChildren {
  title?: string;
  direction?: 'row' | 'col';
  bottom?: ReactNode;
}

const Layout: FC<IPropsLayout> = ({
  title,
  children,
  direction = 'col',
  bottom,
}) => {
  return (
    <div className='min-h-screen flex-col flex justify-center max-w-xl mx-auto'>
      <div className='text-sky-500 text-3xl font-bold mb-6 mx-auto'>
        {title}
      </div>
      <div
        className={cn(
          'container flex flex-col gap-4 items-center justify-start p-6',
          {
            'flex-row': direction === 'row',
          },
        )}
      >
        {children}
      </div>
      {bottom && <div className='px-6'>{bottom}</div>}
    </div>
  );
};

export default Layout;
