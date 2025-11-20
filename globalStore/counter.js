import { countStore } from './app.js';
import { useStore } from './useStore.js';

const Counter = () => {
  const state = useStore(countStore);
  return `<div>
    <h1>Counter</h1>
    <p>Count: ${state.count}</p>
  </div>`;
};
export default Counter;
