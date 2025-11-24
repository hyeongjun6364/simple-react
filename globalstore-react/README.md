# globalstore-react-hyeongjun

[![npm version](https://img.shields.io/npm/v/globalstore-react-hyeongjun.svg)](https://www.npmjs.com/package/globalstore-react-hyeongjun)
[![npm downloads](https://img.shields.io/npm/dm/globalstore-react-hyeongjun.svg)](https://www.npmjs.com/package/globalstore-react-hyeongjun)
[![license](https://img.shields.io/npm/l/globalstore-react-hyeongjun.svg)](https://github.com/hyeongjun6364/simple-react)

> 🐻 Zustand 스타일의 React 전역 상태 관리 라이브러리

Zustand의 철학을 기반으로 전역 상태 관리를 직접 구현한 학습용 라이브러리입니다.  
React의 `useSyncExternalStore`를 활용하여 안전하고 효율적인 상태 구독을 제공합니다.

## ✨ 주요 기능

- ✅ **간단한 API** - Zustand와 유사한 직관적인 사용법
- ✅ **선택적 구독** - Selector를 통한 부분 상태 구독
- ✅ **Persist 지원** - localStorage 자동 저장/복원
- ✅ **경량** - 최소한의 번들 사이즈

## 🎯 프로젝트 배경

이 프로젝트는 다음 핵심 원리들을 직접 설계하고 구현하는 것을 목표로 합니다.

"React가 어떻게 외부 상태를 구독하는지 궁금했고 이를 이해하기 위해 직접 개발해보며 내부 구현원리를 학습하고자 했습니다."

- 중앙 집중식 상태 저장소 (store)
- pub/sub을 이용한 옵저버 패턴 기반의 상태관리
- localStorage에 상태 저장(persist) 지원
- selector 기반의 부분 상태 구독 지원


“React가 어떻게 외부 상태를 구독하는지 궁금했고 이를 이해하기 위해 직접 개발해보며 내부 구현원리를 학습하고자 했습니다.”

### 📦 설치

```
npm install globalstore-react-hyeongjun

or

yarn add globalstore-react-hyeongjun

or 

pnpm add globalstore-react-hyeongjun

```

## 사용예제
zustand처럼 사용가능합니다.

### 1️⃣ store 생성하기
```jsx
import { create } from 'globalstore-react-hyeongjun';

const counterStore = create((set, get) => ({
  count: 0,
  increase: () => set((prev) => ({ count: prev.count + 1 })),
  decrease: () => set((prev) => ({ count: prev.count - 1 })),
}));
```

### 2️⃣ store 사용하기
```jsx
import { makeStoreHook } from 'globalstore-react-hyeongjun';

export const useCounter = makeStoreHook(counterStore);
```
**컴포넌트에서의 사용**
```jsx
function App() {
  const state = useCounter();
  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={state.increase}>+1</button>
    </div>
  );
}

```

### 3️⃣ selector 사용하기 (부분 상태만 구독)
```jsx
const count = useCounter((state) => state.count);
```

### 4️⃣ localStorage Persist 기능
persist를 사용하면 localStorage에 값을 저장 및 복원을 하여 새로고침시 값을 유지할 수 있습니다.
```jsx
import { create, persist } from 'globalstore-react-hyeongjun';

const useTodoStore = create(
  persist(
    (set, get) => ({
      count: 0,
      increase: () => set((state) => ({ ...state, count: state.count + 1 })),
      decrease: () => set((state) => ({ ...state, count: state.count - 1 })),
        
    }),
    {
      name: 'todo-storage', // localStorage key
    }
  )
);

```

### 📝 학습 포인트

이 프로젝트는 단순 기능 구현이 아니라
전역 상태관리 라이브러리를 직접 설계하며 zustand의 외부 상태 흐름을 깊이 이해하기 위한 학습 목적으로 만들었습니다.

- “왜 useSyncExternalStore로 관리할까?”

- “어떻게 외부 컴포넌트가 상태를 구독하고 상태의 관리가 가능할까?”

- “persist에서 함수는 왜 저장되면 안 될까?”


이러한 질문들을 스스로 던지며 구현했고,
그 과정 속에서 상태관리 라이브러리의 본질을 깊이 이해할 수 있었습니다.

### 🧩 핵심 디렉토리 구조

```
src/
  ├── createStore.js        # 핵심 store 생성 로직
  ├── persist.js            # localStorage persist 미들웨어
  ├── useStore.js           # React hook binding (useSyncExternalStore)
  └── index.js              # Package export
```

---

## 📚 API 문서

### `create(createState)`

Store를 생성합니다.

**파라미터:**
- `createState`: `(set, get) => state` 형태의 함수

**반환값:**
- Store 객체 (`{ getState, setState, subscribe }`)

### `makeStoreHook(store)`

Store를 React 컴포넌트에서 사용할 수 있는 Hook으로 변환합니다.

**파라미터:**
- `store`: create()로 생성된 Store

**반환값:**
- `useStore(selector?)` Hook 함수

### `persist(createState, options)`

localStorage에 상태를 자동으로 저장/복원하는 미들웨어입니다.

**파라미터:**
- `createState`: Store 생성 함수
- `options.name`: localStorage key 이름

---

## 🔗 링크

- [GitHub Repository](https://github.com/hyeongjun6364/simple-react)
- [npm Package](https://www.npmjs.com/package/globalstore-react-hyeongjun)

## 📝 라이선스

MIT © hyeongjun6364

---

## 👨‍💻 제작자

우아한테크코스 프리코스 오픈미션 학습용 프로젝트입니다.  
실제 프로덕션 사용보다는 **React 상태 관리 원리 학습**을 목적으로 제작되었습니다.

### 🔧V1에서 발생한 문제 해결
버전 1에서는 useStore훅에서 selector가 변경되면 렌더링 이후 구독이 되는 원리였기에 최신값이 반영되지 않을 가능성이 존재했습니다.

그래서 렌더링 이후가 DOM에 반영되기 직전에 최신값을 체크해야했습니다.
이를 리액트에서 제공하는 useSyncExternalStore훅을 이용하여 해결 할 수 있었습니다.

***기존 코드***

```jsx
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

***개선 코드***
```jsx
import { useSyncExternalStore } from 'react';

export function makeStoreHook(store) {
  return function useStore(selector = (state) => state) {
    return useSyncExternalStore(store.subscribe, () => selector(store.getState()));
  };
}

```
