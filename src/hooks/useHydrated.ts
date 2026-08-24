import { useSyncExternalStore } from 'react';

/** 구독할 외부 스토어가 없으므로 아무것도 하지 않는다 (참조 고정 필요) */
const emptySubscribe = () => () => {};
const getHydrated = () => true;
const getHydratedOnServer = () => false;

/**
 * hydration 완료 여부
 * 서버 렌더링과 클라이언트 hydration 중에는 false, 그 이후 렌더부터 true.
 * getServerSnapshot 이 hydration 시점까지 서버와 같은 값을 보장하므로
 * effect 로 state 를 바꾸지 않아도 마크업 불일치가 생기지 않는다.
 *
 * ex) const hydrated = useHydrated();
 *     return hydrated ? clientValue : serverValue;
 */
export const useHydrated = () =>
  useSyncExternalStore(emptySubscribe, getHydrated, getHydratedOnServer);
