# globalStore - 전역 상태관리 구현 v1
외부 라이브러리인 리액트에서 전역상태를 관리할 수 있는데 외부에서 어떻게 상태를 관리하고 업데이트가 가능한지 궁금했습니다.
이에 대한 내부원리를 직접 구현해보고 zustand의 공식문서와 각종 문서를 이용해 학습의 목적을 두고 개발한 전역상태관리 라이브러리입니다.

## 📌 개요

직접 구현한 React 훅(useState, useEffect)을 사용하여 전역 상태 관리를 구현한 프로젝트입니다.

## 📂 핵심 파일

### createStore.js
전역 상태를 생성하고 관리하는 store 객체를 만드는 함수입니다.

**주요 기능:**
- `getState()`: 현재 상태 조회
- `setState()`: 상태 업데이트 및 구독자들에게 알림
- `subscribe()`: 상태 변경 구독 (리스너 등록/해제)

```javascript
export const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();
  
  const getState = () => state;
  const setState = (newState) => {
    state = typeof newState === 'function' ? newState(state) : newState;
    listeners.forEach(listener => listener(state));
  };
  const subscribe = (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };
  
  return { getState, setState, subscribe };
};
```

### useStore.js
React 컴포넌트에서 store를 구독하고 상태를 사용하는 커스텀 훅입니다.

**주요 기능:**
- store의 상태를 컴포넌트에서 사용 가능하게 함
- selector를 통한 부분 상태 선택 (슬라이싱)
- 상태 변경 시 자동 리렌더링

```javascript
export function useStore(store, selector = (state) => state) {
  const [state, setState] = useState(() => selector(store.getState()));
  
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(selector(store.getState()));
    });
    return unsubscribe;
  }, [store, selector]);
  
  return state;
}
```

## 🔨 사용 예시

myReact폴더에서 구현한 리액트의 훅을 이용하여 전역상태관리를 사용하는 예시입니다.

```javascript
// store 생성
export const countStore = createStore({ count: 0 });

// 컴포넌트에서 사용
const App = () => {
  const state = useStore(countStore);
  
  const increment = () => {
    countStore.setState((prev) => ({ ...prev, count: prev.count + 1 }));
  };
  
  return `<div>
    <h1>Count: ${state.count}</h1>
    <button onclick="increment()">+1</button>
  </div>`;
};
```

## ✅ 핵심 기능
zustand의 핵심적인 기능인 전역상태관리와 selector를 이용한 슬라이싱을 구현했습니다.

- ✅ 기본적인 상태 구독과 업데이트
- ✅ selector를 통한 상태 선택
- ✅ 여러 컴포넌트에서 전역 상태 공유

## ❌ 문제 발생: 타이밍 갭

### 문제의 본질

useEffect는 렌더링 **후**에 실행되므로, selector 변경 시 재구독까지 시간 차이 발생하게됩니다.
그래서 최신 값이 반영이 안되는 문제가 생겼습니다.

### 시나리오
```javascript
const [showDouble, setShowDouble] = useState(false);
const value = useStore(
  store,
  showDouble ? s => s.count * 2 : s => s.count
);
```
이 시나리오에서 showDouble의 상태에 따라 액션함수가 바뀌게 됩니다.
하지만 useStore함수에서는 useEffect를 사용하여 렌더링이후에 구독이 되고 언마운트가 되는 형식입니다.

만약, showDouble의 상태값이 변경된다면 useStore에서는 이전에 구독했던 콜백함수가 실행되어 타이밍 이슈가 생겨버려 최신값이 업데이트 되지 않을 가능성이 존재하게됩니다.


## 🚀 개선 방향

→ **globalstore-react**에서 `useSyncExternalStore` 사용으로 이 문제를 해결할 수 있었습니다.

이 경험을 통해 왜 이 Hook이 만들어졌는지 이해할 수 있었습니다.

[개선된 버전 보기](../globalstore-react/README.md)
