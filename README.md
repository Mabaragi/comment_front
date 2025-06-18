`apiGetSeries` 같은 “순수” API 호출 함수에서는 굳이 `try/catch`로 감싸서 다시 던져주지 않아도 됩니다. 그 이유는 다음과 같습니다:

1. **에러 전파가 자연스럽다**

   - `await api.get(…)`에서 네트워크 오류나 HTTP 에러가 나면, JS 엔진이 자동으로 `Promise`를 reject 해 줍니다.
   - React Query의 `useQuery`나 `useMutation`은 이 reject를 받아서 `onError` 콜백으로 처리해 주므로, API 레이어에서 또 잡아서 다시 던질 필요가 없습니다.

2. **중복 로깅·중복 처리 방지**

   - API 레이어와 훅 레이어 양쪽에서 `console.error`를 쓰면, 같은 에러가 두 번 찍히거나 다른 방식으로 처리되는 혼선이 생깁니다.
   - 에러 로깅이나 사용자 알림 전략은 **한 곳**(예: React Query의 `onError` 혹은 전역 에러 바운더리)에서만 관리하는 게 유지보수에 더 깔끔합니다.

3. **원본 스택 트레이스 보존**

   - `try/catch`로 잡았다가 `throw error`로 다시 던지면, 원본 에러 스택이 약간 왜곡될 수 있습니다.
   - 그대로 throw 되는 게 디버깅·로깅 관점에서 더 명확한 스택을 제공합니다.

4. **코드가 더 간결해진다**
   - 불필요한 `try/catch`가 사라지면, API 함수 본연의 “어떤 URL을 호출해서 데이터를 반환한다”는 의도가 훨씬 분명해집니다.
   - `async () => api.get(...).then(r => r.data)` 한 줄로도 충분히 동작합니다.

---

결론적으로,

> **“API 호출 함수는 에러를 잡아서 처리하기보다는, 발생시켜(throw) 상위 레이어가 한 번에 관리하게”**  
> 하면, 중복 코드도 줄고 에러 흐름도 훨씬 단일화되어 유지보수가 쉬워집니다.

# TypeScript 제네릭(Generic)이란?

제네릭은 타입을 **파라미터화**(parameterize)하여, 재사용 가능한 컴포넌트나 함수, 클래스, 인터페이스 등을 정의할 수 있게 해 주는 TypeScript의 강력한 기능입니다.

---

## 1. 왜 제네릭을 사용할까?

- **재사용성**
  - 여러 타입에 대해 동일한 로직을 쓰되, 타입 안정성은 그대로 유지하고 싶을 때
- **타입 안전성**
  - `any`를 쓰지 않고도 “입력 타입 → 출력 타입” 관계를 보장
- **추론과 자동 완성**
  - 호출 시점에 타입스크립트가 제네릭 인자를 추론하여, IDE에서 자동 완성 제공

---

## 2. 함수에서의 제네릭

```ts
// 제네릭 없이 any를 쓰면 타입 안전성이 사라짐
function identity(arg: any): any {
  return arg;
}

// 제네릭 T를 도입하면 호출 시 입력 타입을 그대로 반환 타입에 반영
function identity<T>(arg: T): T {
  return arg;
}

// 사용 예
const num = identity<number>(123); // num: number
const str = identity<string>('hello'); // str: string

// 제네릭 인자 생략 시 TS가 추론
const inferred = identity([1, 2, 3]); // inferred: number[]
```

## 2. 함수에서의 제네릭

```ts
// 제네릭 없이 any를 쓰면 타입 안전성이 사라짐
function identity(arg: any): any {
  return arg;
}

// 제네릭 T를 도입하면 호출 시 입력 타입을 그대로 반환 타입에 반영
function identity<T>(arg: T): T {
  return arg;
}

// 사용 예
const num = identity<number>(123); // num: number
const str = identity<string>('hello'); // str: string

// 제네릭 인자 생략 시 TS가 추론
const inferred = identity([1, 2, 3]); // inferred: number[]
```

---

## 3. 인터페이스·타입에 제네릭

```ts
// 제네릭 인터페이스
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: 'TypeScript' };

// 제네릭 타입 별칭
type Pair<K, V> = { key: K; value: V };

const entry: Pair<string, number> = { key: 'age', value: 30 };
```

---

## 4. 클래스에서의 제네릭

```ts
class Stack<T> {
  private items: T[] = [];

  push(item: T) {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
const last = numberStack.pop(); // last: number | undefined
```

---

## 5. 제네릭 제약조건(Constraint)

`T extends U` 문법으로 “T는 반드시 U의 서브타입”이도록 제한할 수 있습니다.

```ts
// length 프로퍼티가 있는 타입으로 제약
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello'); // OK, string에 length가 있음
logLength([1, 2, 3, 4]); // OK
// logLength(123);          // 오류! number에는 length 프로퍼티가 없음
```

---

## 6. 기본(Generic Default) 및 부분적 제네릭

```ts
// 기본 타입을 지정
function wrap<T = string>(value: T) {
  return { wrapped: value };
}

const a = wrap('abc'); // T = string
const b = wrap<number>(123); // T = number
```

---

## 7. 유틸리티 타입과 제네릭

TypeScript 내장 유틸리티 타입(`Partial<T>`, `Readonly<T>`, `Record<K, V>` 등)도 모두 제네릭입니다.

```ts
interface User {
  id: number;
  name: string;
  age: number;
}

// 모든 프로퍼티를 선택적(optional)으로
type PartialUser = Partial<User>;

// 키-값 맵으로
type NameMap = Record<'first' | 'last', string>;
```

---

## 8. 요약

1. **제네릭**은 “타입의 매개변수”를 받아서 재사용 가능한 코드를 작성하게 해 줌
2. 함수, 인터페이스, 클래스 어디에나 적용 가능
3. **제약(extends)** 으로 허용 타입을 제한하고, **기본값**을 지정할 수도 있음
4. TypeScript의 내장 **유틸리티 타입**도 모두 제네릭으로 구현되어 있음

제네릭을 적절히 활용하면 코드의 **유연성**, **안정성**, **재사용성**을 크게 높일 수 있습니다!

# comment_front

# 스키마 연동

```
npx openapi-typescript-codegen --input http://localhost:8000/swagger/?format=openapi --output src/api --client axios
```
