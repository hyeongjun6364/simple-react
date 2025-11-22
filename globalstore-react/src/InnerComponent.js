import { useStore } from './App';

function InnerComponent() {
  const count2 = useStore((state) => state.count2);

  return (
    <div>
      <h1>InnerComponent</h1>
      <h2>count2: {count2}</h2>
    </div>
  );
}

export default InnerComponent;
