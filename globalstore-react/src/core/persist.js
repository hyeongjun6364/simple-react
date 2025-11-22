export const createJSONStorage = (storage) => {
  return {
    getItem: (key) => {
      const value = storage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
    setItem: (key, value) => {
      storage.setItem(key, JSON.stringify(value));
    },
  };
};

export const persist = (createState, options) => {
  const { name, storage = createJSONStorage(localStorage) } = options;

  const createWrappedSet = (set, get) => {
    return (newState) => {
      set(newState);

      const currentState = get();
      const stateToSave = Object.keys(currentState).reduce((acc, key) => {
        if (typeof currentState[key] !== 'function') {
          acc[key] = currentState[key];
        }
        return acc;
      }, {});
      storage.setItem(name, stateToSave);
    };
  };

  const restoreState = (initialState) => {
    const savedState = storage.getItem(name);
    if (!savedState) return initialState;

    Object.keys(savedState).forEach((key) => {
      if (typeof initialState[key] !== 'function') {
        initialState[key] = savedState[key];
      }
    });

    return initialState;
  };

  return (set, get) => {
    const wrappedSet = createWrappedSet(set, get);
    const initialState = createState(wrappedSet, get);

    return restoreState(initialState);
  };
};
