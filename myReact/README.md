# simple-myreact-hyeongjun

[![npm version](https://img.shields.io/npm/v/simple-myreact-hyeongjun.svg)](https://www.npmjs.com/package/simple-myreact-hyeongjun)
[![npm downloads](https://img.shields.io/npm/dm/simple-myreact-hyeongjun.svg)](https://www.npmjs.com/package/simple-myreact-hyeongjun)
[![license](https://img.shields.io/npm/l/simple-myreact-hyeongjun.svg)](https://github.com/hyeongjun6364/simple-react)

> ⚛️ 바닐라 JavaScript로 구현한 React 핵심 원리

React의 핵심 원리인 `useState`, `useEffect`, 렌더링 루프를 직접 구현한 학습 기반 라이브러리입니다.

## ✨ 구현된 기능

- ✅ **useState** - 상태 저장 및 배치 업데이트
- ✅ **useEffect** - 의존성 배열 기반 사이드 이펙트
- ✅ **createRoot** - 렌더링 루트 생성 및 관리
- ✅ **인덱스 기반 Hook 시스템** - React와 동일한 Hook 규칙
- ✅ **비동기 배치 업데이트** - 성능 최적화

## 🎯 프로젝트 배경

React를 단순히 "사용"하는 단계를 넘어서  
React가 **내부적으로 어떻게 동작하는지** 이해하기 위해 직접 구현한 라이브러리입니다.

이 프로젝트는 다음 핵심 원리들을 직접 설계하고 구현하는 것을 목표로 합니다.

- 상태 저장 및 업데이트 방식 (useState)
- 컴포넌트 렌더링 구조
- 의존성 배열 기반의 사이드 이펙트 처리 (useEffect)
- 상태 변경 시 비동기 배치 업데이트
- 인덱스 기반 Hook 시스템

> ⚠️ **주의:** 이 라이브러리는 React의 모든 기능을 제공하는 것을 목표로 하지 않습니다.  
> 학습 목적으로 제작되었습니다.

---

## 📦 설치

```bash
npm install simple-myreact-hyeongjun
```

또는

```bash
yarn add simple-myreact-hyeongjun
# or
pnpm add simple-myreact-hyeongjun
```

---

## 🚀 빠른 시작

React Hook처럼 동일하게 사용할 수 있습니다.

```javascript
import { createRoot, useState, useEffect } from 'simple-myreact-hyeongjun';


function App() {
  const [count, setCount] = useState(0);
  window.increase = () => setCount((prev) => prev + 1);

  useEffect(() => {
    console.log("Effect called:", count);
  }, [count]);

  return `
    <div>
      <h1>Count: ${count}</h1>
      <button onclick={increase()}>+1</button>
    </div>
  `;
}

const root = createRoot(document.getElementById('root'));
root.render(App);
```

### HTML 파일 설정

```html
<!DOCTYPE html>
<html>
<head>
  <title>My React App</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./app.js"></script>
</body>
</html>
```

---

## 🌱 학습 포인트
이 프로젝트는 단순한 기능 구현이 아니라
React의 핵심 개념을 스스로 구현하며 깊이 이해하는 데 목적이 있습니다.

특히 다음을 직접 체화했습니다.

- “왜 Hook은 함수 바깥에서 호출하면 안 되는가”

- “왜 Hook은 순서가 바뀌면 안 되는가”

- “상태가 어떻게 저장되고 업데이트되는가”

- “렌더링 시점과 effect 실행 시점은 왜 분리돼야 하는가”

- “왜 React는 배치 업데이트를 선택했는가”

이 모든 과정은 React 공식 문서와 내부 코드를 살펴보며
직접 구현함으로써 깊게 이해할 수 있게 해주었습니다.

---

### 📌 핵심 폴더 구조

```
core/
  ├── useState.js      # 상태 저장 및 배치 업데이트
  ├── useEffect.js     # Effect 실행 및 의존성 비교
  ├── myReact.js       # 렌더링 루프 & Root 관리
  └── lib.js           # 라이브러리 export
```

---

## 📚 API 문서

### `useState(initialValue)`

상태를 생성하고 관리합니다.

```javascript
const [count, setCount] = useState(0);
```

### `useEffect(callback, deps)`

사이드 이펙트를 실행합니다.

```javascript
useEffect(() => {
  console.log('Count changed:', count);
  return () => console.log('Cleanup');
}, [count]);
```

### `createRoot(container)`

렌더링 루트를 생성합니다.

```javascript
const root = createRoot(document.getElementById('root'));
root.render(App);
```

---

## 🔗 링크

- [GitHub Repository](https://github.com/hyeongjun6364/simple-react)
- [npm Package](https://www.npmjs.com/package/simple-myreact-hyeongjun)

## 📝 라이선스

MIT © hyeongjun6364

---

## 👨‍💻 제작자

우아한테크코스 프리코스 오픈미션 학습용 프로젝트입니다.  
React의 **내부 동작 원리를 이해**하기 위한 교육 목적으로 제작되었습니다.