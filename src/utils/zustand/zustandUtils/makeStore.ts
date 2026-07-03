import type { StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn as create } from 'zustand/traditional';

type WithDevtools = ['zustand/devtools', never];
type WithImmer = ['zustand/immer', never];
type TMakeStore<T> = StateCreator<T, [WithDevtools, WithImmer], []>;

/** make store */
export const makeStore = <T>(store: TMakeStore<T>, name?: string) => {
  const withTools = devtools(immer(store), {
    enabled: process.env.NODE_ENV === 'development',
  });

  if (name) {
    return create<T>()(
      persist(withTools, {
        name,
        storage: createJSONStorage(() => localStorage),
      }),
      shallow,
    );
  }

  return create<T>()(withTools, shallow);
};
