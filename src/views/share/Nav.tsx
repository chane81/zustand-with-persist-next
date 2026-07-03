'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/styleUtils';

/** route 세그먼트 네비게이션 항목 */
const NAV_ITEMS = [
  { href: '/foo-ground', label: 'Foo' },
  { href: '/bar-ground', label: 'Bar' },
  { href: '/vee-ground', label: 'Vee' },
  { href: '/context-ground', label: 'Context' },
] as const;

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className='sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur'>
      <ul className='mx-auto flex max-w-xl items-center gap-2 px-6 py-3'>
        {NAV_ITEMS.map(({ href, label }) => {
          const active = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-semibold transition-colors',
                  active
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100',
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
