/** 'car.spec.inch' -> 'carSpecInch' 형태로 변환하는 타입 */
type CamelCasePath<P extends string> = P extends `${infer Head}.${infer Tail}`
  ? `${Head}${CamelCasePath<Capitalize<Tail>>}`
  : P;

/** 객체의 중첩 경로를 dot 표기 문자열 union 으로 뽑아오는 타입 */
type Paths<T, Key extends keyof T = keyof T> = Key extends string | number
  ? T[Key] extends Record<string, any>
    ? T[Key] extends Array<any>
      ? `${Key}` // 배열인 경우는 단순 키만 반환 (더 깊이 안 들어감)
      : `${Key}` | `${Key}.${Paths<T[Key]>}`
    : `${Key}`
  : never;

/** 객체 경로에서 실제 값의 타입을 꺼내오는 헬퍼 타입 */
type PathValue<T, P extends string> = P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? PathValue<T[K], R>
    : never
  : P extends keyof T
    ? T[P]
    : never;

/**
 * store selector 함수
 * store 의 field name 을 array 로 받음. 중첩 경로는 dot 표기 지원.
 * ex) selector(['count', 'setInc', 'car.spec.inch']) -> { count, setInc, carSpecInch }
 */
export const selector =
  <TStore, P extends Paths<TStore>>(arrKey: Array<P>) =>
  (state: TStore) => {
    return arrKey.reduce(
      (acc, cur) => {
        const pathStr = cur as string;
        const keys = pathStr.split('.');

        // 1. 런타임에서 중첩된 실제 값 찾아오기
        const value = keys.reduce<any>((v, k) => v?.[k], state);

        // 2. 'car.spec.inch' -> 'carSpecInch' 형태로 변환
        // 점 뒤 문자 1개를 대문자화하고 점 제거 (CamelCasePath 타입과 동일 규칙)
        const camelKey = pathStr.replace(/\.(.)/g, (_, c: string) => c.toUpperCase());

        // 3. 변환된 키로 결과 객체에 담기
        (acc as Record<string, unknown>)[camelKey] = value;

        return acc;
      },
      {} as { [K in P as CamelCasePath<K>]: PathValue<TStore, K> },
    );
  };
