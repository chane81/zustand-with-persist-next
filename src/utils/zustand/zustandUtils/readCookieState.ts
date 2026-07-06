import { cookies } from 'next/headers';

/** persist 가 쿠키에 저장하는 값의 형태: { state, version } */
interface PersistedCookie<T> {
  state?: Partial<T>;
  version?: number;
}

/**
 * 서버(Server Component)에서 쿠키에 저장된 persist 상태를 읽어 초기값으로 반환
 * - SSR 시점에 이 값을 Provider initState 로 주입 → 서버/클라 첫 렌더 일치 → 깜빡임 제거
 * - name = persist name(쿠키 키) 와 동일해야 함
 */
export const readCookieState = async <T>(
  name: string,
): Promise<Partial<T> | undefined> => {
  const raw = (await cookies()).get(name)?.value;

  if (!raw) return undefined;

  try {
    const parsed = JSON.parse(raw) as PersistedCookie<T>;

    return parsed.state;
  } catch {
    return undefined;
  }
};
