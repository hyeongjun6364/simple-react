import { useSyncExternalStore } from 'react';

export function makeStoreHook(store) {
  return function useStore(selector = (state) => state) {
    return useSyncExternalStore(store.subscribe, () => selector(store.getState()));
  };
}
