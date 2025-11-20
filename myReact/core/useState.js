import { _render } from './myReact.js';

export const states = [];
export let currentIndex = 0;
let isScheduled = false;

export const useState = (initialValue) => {
  if (typeof initialValue === 'function') {
    states[currentIndex] = states[currentIndex] ?? initialValue();
  } else {
    states[currentIndex] = states[currentIndex] ?? initialValue;
  }

  const index = currentIndex;

  const setState = (newValue) => {
    const nextValue = typeof newValue === 'function' ? newValue(states[index]) : newValue;

    if (Object.is(states[index], nextValue)) return;

    states[index] = nextValue;

    if (!isScheduled) {
      isScheduled = true;
      queueMicrotask(() => {
        isScheduled = false;
        _render();
      });
    }
  };

  increaseIndex();
  return [states[index], setState];
};

export const resetIndex = () => {
  currentIndex = 0;
};

export const increaseIndex = () => {
  currentIndex += 1;
};
