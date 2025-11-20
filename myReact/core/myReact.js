import { runEffectCallback } from './useEffect.js';
import { resetIndex } from './useState.js';

export default function MyReact() {
  let _root = null;
  let _rootComponent = null;

  function createRoot(root) {
    _root = root;
    return { render };
  }

  function render(Component) {
    _rootComponent = Component;
    _render();
  }

  function _render() {
    const comp = _rootComponent();
    _root.innerHTML = comp;
    resetIndex();
    runEffectCallback();
  }

  return { createRoot, render, _render };
}

export const { createRoot, render, _render } = MyReact();
