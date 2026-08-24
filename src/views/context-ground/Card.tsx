import type { TStore } from '@/stores/contextStore';
import { ContextProvider } from '@/stores/contextStore';
import { readCookieState } from '@/utils/zustand/zustandUtils/readCookieState';
import OnOff from './OnOff';
import Count from './Count';
import { cn } from '@/utils/styleUtils';

interface IPropsCard {
  title?: string;
  className?: string;
  initState?: Partial<TStore>;
  /** persist 쿠키 키 — Provider 인스턴스별로 고유해야 함 */
  name: string;
}

// Server Component: SSR 시점에 쿠키를 읽어 persist 값을 초기값으로 주입 → 깜빡임 제거
const Card = async ({ title, className, initState, name }: IPropsCard) => {
  const cookieState = await readCookieState<TStore>(name);
  // 쿠키 값이 있으면 우선 적용, 없으면(첫 방문) 전달된 initState 사용
  const mergedInitState = { ...initState, ...cookieState };

  return (
    <div
      className={cn(
        'w-full flex flex-col gap-3 items-center justify-start p-3 bg-slate-100 rounded-lg',
        className,
      )}
    >
      <div className='text-slate-700 text-lg font-semibold'>{title}</div>
      <ContextProvider name={name} initState={mergedInitState}>
        <OnOff />
        <Count />
      </ContextProvider>
    </div>
  );
};

export default Card;
