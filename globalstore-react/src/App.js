import { create } from './createStore';
import InnerComponent from './InnerComponent';
import { createJSONStorage, persist } from './persist';
import { makeStoreHook } from './useStore';

export const store = create(
  persist(
    (set, get) => ({
      count: 0,
      count2: 100,
      increase: () => set((state) => ({ ...state, count: state.count + 1 })),
      decrease: () => set((state) => ({ ...state, count: state.count - 1 })),
    }),
    {
      name: 'counter-storage',
      storage: createJSONStorage(localStorage),
    },
  ),
);

export const useStore = makeStoreHook(store);

function App() {
  const count = useStore((state) => state.count);
  const increase = useStore((state) => state.increase);
  const decrease = useStore((state) => state.decrease);
  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <InnerComponent />
    </div>
  );
}

export default App;
