## 간단한 전역상태관리 구현하기
Zustand의 철학을 기반으로 전역 상태 관리를 직접 구현한 학습용 라이브러리입니다.

### 🎯 프로젝트 소개
이 프로젝트는 다음 핵심 원리들을 직접 설계하고 구현하는 것을 목표로 합니다.
실제 zustand의 코드와는 다를 수 있습니다.

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
core/
  ├── createStore.js        # 핵심 store 생성 로직
  ├── persist.js            # localStorage persist
  ├── useStore.js           # React hook binding
  └── lib.js                # package export

```