import { store } from './App';
import { useStore } from './useStore';

function InnerComponent() {
  const state = useStore(store);

  return (
    <div>
      <h1>InnerComponent</h1>
      <h2>count: {state.count}</h2>
    </div>
  );
}

export default InnerComponent;
