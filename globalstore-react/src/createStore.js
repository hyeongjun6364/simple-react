export const createStore = (createState) => {
  let state = createState;
  const listeners = new Set();
  const getState = () => state;

  const subscribe = (callback) => {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  };

  const setState = (newState) => {
    const prevState = state;
    const nextState = typeof newState === 'function' ? newState(prevState) : newState;
    if (Object.is(prevState, nextState)) return;
    state = nextState;
    //이벤트 전파
    listeners.forEach((listener) => listener(state));
  };
  state = createState(setState, getState);

  return { getState, setState, subscribe };
};
