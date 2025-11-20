import { useState } from '../myReact/core/useState.js';
import { useEffect } from '../myReact/core/useEffect.js';

export function useStore(store, selector = (state) => state) {
  const [state, setState] = useState(() => selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(selector(store.getState()));
    });
    return unsubscribe;
  }, [store, selector]);

  return state;
}
