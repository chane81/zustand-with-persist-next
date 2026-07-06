import type { StateStorage } from 'zustand/middleware';

/** 쿠키 유효기간 (1년, 초 단위) */
const MAX_AGE = 60 * 60 * 24 * 365;

/** 쿠키 이름의 정규식 특수문자 이스케이프 */
const escape = (name: string) => name.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');

/**
 * 쿠키 기반 zustand persist storage
 * - localStorage 와 달리 쿠키는 요청에 실려 서버가 SSR 시점에 읽을 수 있음
 * - 서버가 초기 렌더에 persist 값을 반영 → hydration 깜빡임 제거
 * - 서버 환경(document 없음)에서는 no-op (서버 초기값은 next/headers 로 별도 주입)
 */
export const cookieStorage: StateStorage = {
  getItem: (name) => {
    if (typeof document === 'undefined') return null;

    const match = document.cookie.match(
      new RegExp(`(?:^|; )${escape(name)}=([^;]*)`),
    );

    return match ? decodeURIComponent(match[1]) : null;
  },
  setItem: (name, value) => {
    if (typeof document === 'undefined') return;

    document.cookie = `${name}=${encodeURIComponent(
      value,
    )}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
  },
  removeItem: (name) => {
    if (typeof document === 'undefined') return;

    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
  },
};
