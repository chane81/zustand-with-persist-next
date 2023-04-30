# Zustand + Persist(localstorage) + Next.js

## Zustand 의 persist 기능 사용시 hydration 이슈에 대응하기 위한 코드를 작성함

- 이미지
  <img src='./readme/persist-issue.png' width='500'>
- 이슈 링크
  https://github.com/pmndrs/zustand/issues/938

- 해결방안 참고

  - 참고 url
    https://github.com/pmndrs/zustand/issues/1145#issuecomment-1209244183

  - useEffect 를 이용하여 hydrate 가 되었는지 감지하는 상태를 넣어두고 hydrate 가 되었다면 persist 를 사용한 store 를 반환하고 그렇지 않았다면 persist 가 없는 init state(초기 상태값) 을 반환하게 하여 해결

  - code

    ```typescript
    const emptyState = {
      where: {
        places: []
      },
      what: {
        filters: {}
      },
      setPlaces: () => {
        return;
      },
      setFilters: () => {
        return;
      }
    };

    const usePersistedStore = create(
      persist<State>(
        (set) => ({
          where: {
            places: []
          },
          what: {
            filters: {}
          },
          setPlaces: (newPlaces) =>
            set({
              where: {
                places: newPlaces
              }
            }),
          setFilters: (filters) =>
            set({
              what: {
                filters
              }
            })
        }),
        {
          name: 'search-storage'
        }
      )
    );

    // This a fix to ensure zustand never hydrates the store before React hydrates the page
    // else it causes a mismatch between SSR/SSG and client side on first draw which produces an error
    export const useStore = ((selector, compare) => {
      const store = usePersistedStore(selector, compare);
      const [hydrated, setHydrated] = useState(false);
      useEffect(() => setHydrated(true), []);

      return hydrated ? store : selector(emptyState);
    }) as typeof usePersistedStore;
    ```
