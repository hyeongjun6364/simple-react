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

  return (set, get) => {
    const wrappedSet = (newState) => {
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

    const savedState = storage.getItem(name);

    const initialState = createState(wrappedSet, get);

    if (savedState) {
      Object.keys(savedState).forEach((key) => {
        if (typeof initialState[key] !== 'function') {
          initialState[key] = savedState[key];
        }
      });
    }

    return initialState;
  };
};
