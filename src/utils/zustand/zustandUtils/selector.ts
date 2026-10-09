/* ───────── 타입 ───────── */

/** 'car.spec.inch' → 'carSpecInch' */
type CamelCasePath<P extends string> = P extends `${infer Head}.${infer Tail}`
  ? `${Head}${CamelCasePath<Capitalize<Tail>>}`
  : P;

/**
 * 객체의 모든 중첩 경로를 dot 표기 union 으로 뽑아오는 타입
 * ex) { count: number; car: { spec: { inch: number } } }
 *     → 'count' | 'car' | 'car.spec' | 'car.spec.inch'
 * - 배열은 인덱스·length 까지 딸려오므로 자기 키에서 멈춘다
 * - 함수는 keyof 가 never 라 저절로 멈춘다
 */
type Paths<T> = {
  [K in keyof T & string]: T[K] extends readonly unknown[]
    ? K
    : T[K] extends object
      ? K | `${K}.${Paths<T[K]>}`
      : K;
}[keyof T & string];

/** 경로에 해당하는 값의 타입. ex) PathValue<Store, 'car.spec.inch'> → number */
type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

/** selector 결과 타입. 각 경로를 camelCase 키로 바꾸고 값 타입을 매핑 */
type Selected<T, P extends string> = {
  [K in P as CamelCasePath<K>]: PathValue<T, K>;
};

/* ───────── 런타임 ───────── */

/** 'car.spec.inch' → state.car.spec.inch */
const getByPath = (obj: unknown, path: string) =>
  path
    .split('.')
    .reduce<unknown>((v, k) => (v as Record<string, unknown>)?.[k], obj);

/** 'car.spec.inch' → 'carSpecInch' (CamelCasePath 타입과 동일 규칙) */
const toCamelKey = (path: string) =>
  path.replace(/\.(.)/g, (_, c: string) => c.toUpperCase());

/**
 * store selector 함수
 * store 의 field 경로를 array 로 받음. 중첩 경로는 dot 표기 지원.
 * ex) selector(['count', 'setInc', 'car.spec.inch']) → { count, setInc, carSpecInch }
 */
export const selector =
  <TStore, P extends Paths<TStore>>(paths: P[]) =>
  (state: TStore) =>
    Object.fromEntries(
      paths.map((path) => [toCamelKey(path), getByPath(state, path)]),
    ) as Selected<TStore, P>;
