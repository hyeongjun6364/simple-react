import { createStore } from './createStore';
import InnerComponent from './InnerComponent';
import { useStore } from './useStore';

export const store = createStore((set) => ({
  count: 0,
  increase: () => {
    set((state) => ({ ...state, count: state.count + 1 }));
  },
  decrease: () => {
    set((state) => ({ ...state, count: state.count - 1 }));
  },
}));

function App() {
  const state = useStore(store);
  return (
    <div className="App">
      <h1>Count: {state.count}</h1>
      <button onClick={state.increase}>Increase</button>
      <button onClick={state.decrease}>Decrease</button>
      <InnerComponent />
    </div>
  );
}

export default App;
