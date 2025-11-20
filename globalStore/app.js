import { createRoot } from '../myReact/core/myReact.js';
import { createStore } from './createStore.js';
import { useStore } from './useStore.js';

export const countStore = createStore({ count: 0 });

const App = () => {
  const state = useStore(countStore);
  const increment = () => {
    countStore.setState((prev) => ({ ...prev, count: prev.count + 1 }));
  };

  window.increase = () => increment();
  console.log('렌더링됨:', state.count);

  return `<div>
      <h1>Count: ${state.count}</h1>
      <button onclick="increase()">+1</button>
    </div>`;
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(App);
