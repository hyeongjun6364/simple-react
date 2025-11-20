import { useState } from '../core/useState.js';
import { createRoot } from '../core/myReact.js';
import { useEffect } from '../core/useEffect.js';

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('강아지');

  useEffect(() => {
    console.log('텍스트가 변경되었습니다:', text);
    return () => {
      console.log('텍스트 변경 이전 상태:', text);
    };
  }, [text]);

  useEffect(() => {
    console.log('Effect 실행됨:', count);
  }, [count]);

  window.multipleUpdates = () => {
    setCount((count) => count + 1);
    setText('고양이');
    setCount((count) => count + 2);
  };

  window.increase = () => setCount((prev) => prev + 1);
  window.decrease = () => setCount((prev) => prev - 1);
  window.sound = () => setText(text + ' 멍멍!');

  return `
    <div>
      <h1>Count: ${count}</h1>
      <h2>${text}</h2>
      <button onclick="increase()">+1</button>
      <button onclick="decrease()">-1</button>
      <button onclick="sound()">멍멍!</button>
      <button onclick="multipleUpdates()">여러 업데이트 (자동 배칭)</button>
    </div>`;
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(App);
