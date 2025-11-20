import { currentIndex, increaseIndex, states } from './useState.js';

let effectQueue = [];

export const useEffect = (callback, deps) => {
  const index = currentIndex;
  const hasNoDeps = !deps;
  const prevDeps = states[index]?.deps;
  const prevCleanup = states[index]?.cleanup;
  const hasChangedDeps = prevDeps ? deps.some((dep, i) => !Object.is(dep, prevDeps[i])) : true;

  if (hasNoDeps || hasChangedDeps) {
    if (prevCleanup) {
      prevCleanup();
    }

    effectQueue.push(() => {
      const cleanup = callback();
      states[index] = { deps: deps, cleanup: cleanup };
    });
  }
  increaseIndex();
};

export const runEffectCallback = () => {
  effectQueue.forEach((effect) => effect());
  effectQueue = [];
};
