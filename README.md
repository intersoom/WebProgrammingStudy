# 모던 Javascript

### 1. 데이터 타입의 특징과 종류

- JS는 데이터 타입이 유연함
    
    → ex> 2 * "3" = 6
    
- 데이터 타입의 종류:
    1. 기본형 (Primitive Type):
        
        Number, String, Boolean, Null, undefined, Symbol(ES 2015), BigInt(ES 2020) 
        
    2. 참조형 (Reference Type):
        
        Object
        
- Symbol & BigInt:
    
    → **Symbol:** 코드 내에서 유일한 값을 가진 변수 이름을 만들 때 사용
    
    ```jsx
    const user = Symbol('this is a user');
    
    user === 'this is user' //false
    user === 'user'; // false
    user === 'Symbol'; // false
    user === true; // false
    user === false; // false
    user === 123; // false
    user === 0; // false
    user === null; // false
    user === undefined; // false
    
    const symbolA = Symbol('this is Symbol');
    const symbolB = Symbol('this is Symbol');
    
    console.log(symbolA === symbolB); // false
    ```
    
    → 이렇게 Symbol 값을 담게 된 user라는 이름의 변수는 **다른 어떤 값과 비교해도 true가 될 수 없는 고유한 변수**가 됨
    
    → **BigInt:** JS에서 아주 큰 정수를 표현하기 위해 등장한 데이터 타입
    
- typeof 연산자: 사용하는 값이 어떤 데이터 타입을 가지고 있는지 확인하기 위해서 사용
    
    ```jsx
    typeof 'Codeit'; // string
    typeof Symbol(); // symbol
    typeof {}; // object
    typeof []; // object
    typeof true; // boolean
    typeof(false); // boolean
    typeof(123); // number
    typeof(NaN); // number
    typeof(456n); // bigint
    typeof(undefined); // undefined
    ```
    

⚠️ 주의 ⚠️

typeof 연산자의 결과 모든 타입과 1:1로 매칭되지는 않음

1. null은 object
2. 함수는 function
    
    ```jsx
    function sayHi() {
      console.log('Hi!?');
    }
    
    typeof sayHi; // function
    ```
    
- Boolean:
    
    JS에서는 맥락에 따라서 불린 타입이 아닌 것들이 불린 타입으로 평가될 수 있음
    
    1. Falsy 값 (False로 평가되는 값):
        - false
        - null
        - undefined
        - NaN
        - 0
        - ''
    2. Truthy 값 (True로 평가되는 값):
        - 나머지 값들
        
        ⚠️  주의  ⚠️ 
        
        [ ], { } 둘 다 True로 평가되는 값!!
        
- AND/OR 연산자:
    
    동작 원리: 상황에 따라서 양 쪽 값들 중 한 쪽을 선택하는 방식
    
    1. AND 연산자: 
        
        ```jsx
        console.log(true && true); //true
        console.log(true && false); //false
        console.log(false && true); //false
        console.log(false && false); //false
        ```
        
        **동작 방식:** 왼쪽 값이 truthy하면 오른쪽 값을 return, 왼쪽 값이 falsy하면 왼쪽 값을 return
        
    2. OR 연산자:
        
        ```jsx
        console.log(true || true); //true
        console.log(true || false); //true
        console.log(false || true); //true
        console.log(false || false); //false
        ```
        
        **동작 방식:** 왼쪽 값이 truthy하면 왼쪽 값을 return, 왼쪽 값이 falsy하면 오른쪽 값을 return
        
    
    → 우선순위: AND 연산자의 우선순위가 더 높음 (OR << AND)
    
    예시:
    
    ```jsx
    console.log(null && undefined); // null
    console.log(0 || true); // true
    console.log('0' && NaN); // NaN
    console.log({} || 123); //{}
    ```
    
    응용 예시: 조건식으로 활용
    
    ```jsx
    function print(value){
    	const message = value || 'Codeit';
    	
    	console.log(message);
    }
    
    print(); // null 값 전달되면 value가 false니까 'Codeit' 출력
    print('JavaScript'); // 값이 전달되니까 value가 true니까 인자 값 출력
    ```
    

### 2. null 병합 연산자

뜻: Nullish coalescing operator,  물음표 두 개(??)를 이용해서 null 혹은 undefined 값을 가려내는 연산자

방식: 연산자 왼편의 값이 null 이나 undefined라면 연산자 오른편의 값이 리턴되고, example3처럼 연산자 왼편의 값이 null 이나 undefined가 아니라면 연산자 왼편의 값이 리턴되는 원리로 동작

예시:

```jsx
const example1 = null ?? 'I'; // I
const example2 = undefined ?? 'love'; // love
const example3 = 'Codeit' ?? 'JavaScript'; // Codeit

console.log(example1, example2, example3); // I love Codeit
```

OR 연산자와 다른점: null이나 undefined가 아닌 falsy 값을 사용할 경우 값이 다름!

```jsx
const title1 = false || 'codeit';
const title2 = false ?? 'codeit';

console.log(title1); // codeit
console.log(title2); // false

const width1 = 0 || 150;
const width2 = 0 ?? 150;

console.log(width1); // 150
console.log(width2); // 0
```

### 3. 변수와 스코프

변수 (ES2015 이전 버젼): var

변수 (ES2015 이후 버젼): let(재할당이 필요한 경우), const(재할당이 필요 없는 경우)

var의 문제점:

1. 호이스팅(Hoisiting): 선언이 나중에 되었지만 마치 위로 올라간듯한 현상
    
    ```jsx
    console.log(title); // undefined
    var title = 'codeit';
    // 다음과 같이 선언하기도 전부터 값이 undefined라고 나옴
    console.log(title); //codeit
    ```
    
    참고: 선언 후, 할당된 값은 그 이후에 접근이 가능함!
    
    let, const는 호이스팅 현상 없음
    
2. 중복 선언이 가능함
    
    ```jsx
    var title = 'dd';
    console.log(title);
    .
    .
    .
    .
    var title = 'kk';
    console.log(title); // 앞에 할당한 title 값은 없어짐
    ```
    
    let, const는 오류를 반환함
    
3. 스코프 (가장 중요)
    
    var 키워드는 변수의 스코프가 '함수 단위'로만 구분됨: **함수 스코프**
    
    → 반복문이나 조건문에서는 지역 변수를 만들 수 없음
    
    let, const는 '코드블록 단위'로 구분됨: **블록 스코프**
    
    → 반복문이나 조건문에서는 지역 변수를 만들 수 있음

### 4. 함수 만들기

1. **함수 선언**

```jsx
// 함수 선언
function 함수이름(파라미터){
	동작
	return 리턴값
}
```

→ **Hoisting**이 일어남 따라서 선언 이전에 접근 가능함

→ **함수 스코프**: 함수 내에서 선언한 함수는 외부에서 접근할 수 없음, 반복문 또는 조건문 내에서 선언한 함수는 외부에서 접근할 수 있음

1. **함수 표현식:** 함수를 값처럼 사용하는 것 (ex.함수를 변수에 할당하기)

```jsx
// 함수 표현식(1)
const printCodeit = function(){
	console.log('Codeit');
};

printCodeit();

// 함수 표현식(2)
const myBtn = document.querySelector('#myBtn');

myBtn.addEventListener('click', function(){
	console.log('button is clicked!');
});
```

→ **블록 스코프:** 함수든 반복문/ 조건문이든 블록 내부에서 선언한 함수는 외부에서 접근할 수 없음

⚠️ 최대한 일정한 방식을 사용하는 것이 좋음! ⚠️

### 5. 기명 함수 표현식(Named Function Expression)

뜻: 함수 표현식으로 함수를 만들 때는 선언하는 함수에 이름을 붙여줄 수 있음 이때, 이름 있는 함수 표현식을 의미

→ 함수 표현식으로 함수가 할당된 변수에는 자동으로 name이라는 프로퍼티를 가짐

```jsx
// 이름이 없는 함수를 변수에 할당할 때
const sayHi = function () {
  console.log('Hi');
};

console.log(sayHi.name); // sayHi

// 함수에 이름을 붙여주었을 때
const sayHi = function printHiInConsole() {
  console.log('Hi');
};

console.log(sayHi.name); // printHiInConsole
```

함수 표현식에서 함수에서 할당된 이름은: 

→ 함수 내부에서 함수 자체를 가리킬 때 사용할 수 있고(재귀함수 같은 경우) 함수를 외부에서 함수를 호출할 때는 사용할 수 없음

예시:

```jsx
// BAD
let countdown = function(n) {
  console.log(n);
  if (n === 0) {
    console.log('End!');
  } else {
    countdown(n - 1);
  }
};

let myFunction = countdown;

countdown = null;

myFunction(5); // TypeError

// GOOD
let countdown = function printCountdown(n) {
  console.log(n);
  if (n === 0) {
    console.log('End!');
  } else {
    printCountdown(n - 1);
  }
};

let myFunction = countdown;

countdown = null;

myFunction(5); // 정상적으로 동작
```

→ 따라서 함수 내에서 함수를 가리켜야 할 때는 꼭 함수 이름을 작성해주는 것이 안전함! 🛠

### 6. 즉시 실행 함수 (IIFE)

뜻: Immediately Invoked Function Expression (IIFE), 선언과 동시에 즉시 실행되는 함수

형태:

```jsx
(function () {
  console.log('Hi!');
})();
```

⚠️ 주의할 점: 즉시 실행 함수에 이름을 지어주더라도 외부에서 재사용할 수 없음! ⚠️

```jsx
(function sayHi() {
  console.log('Hi!');
})();

sayHi(); // ReferenceError
```

→ 그래서 일반적으로 이름이 없는 '익명 함수'로 사용 (예외: 재귀함수 사용 시)

활용:

1. 초기화 기능을 사용할 때:

```jsx
(function init() {
  // 프로그램이 실행 될 때 기본적으로 동작할 코드들..
})();
```

1. 재사용이 필요 없는, 일회성 동작을 구성할 때:

```jsx
const firstName = Young;
const lastName = Kang;

const greetingMessage = (function () {
  const fullName = `${firstName} ${lastName} `;

  return `Hi! My name is ${fullName}`;
})();
```

→ 함수의 리턴 값을 바로 변수에 할당하고 싶을 때 사용

장점: 즉시 실행 함수에서 사용하는 변수들은 함수 내에서만 유효하기 때문에 일시적으로 사용할 변수의 이름들을 조금 자유롭게 작성할 수 있음!

### 7. 값으로서 함수

**특징:**

JS에서는 함수를 객체 타입으로 판단함

JS의 함수는 일급함수

**함수의 활용:**

1. 함수 표현식으로 선언/호출될 수 있음
2. 객체 안의 메소드로 사용될 수 있음
3. 배열의 요소로 함수를 선언하고 호출할 수 있음
4. 파라미터로 함수를 선언하고 호출할 수 있음 (*콜백함수: 다른 함수의 파라미터로 호출된 함수)

```jsx
// 콜백함수 예시
function makeQuiz(quiz, answer, success, fail){
	if (blah){
		console.log(success());
	} else {
		console.log(success());
	}

	function getSuccess() {
		return 'answer';
	}

	function getFail() {
		return 'fail';
	}
}

makeQuiz(question, '8', getSuccess, getFail);
```

1. 함수의 리턴값으로 함수를 선언하고 호출할 수 있음 (*고차 함수: 함수를 리턴하는 함수)

```jsx
// 고차함수 예시
function getPrintHi(){
	return function(){
		console.log('Hi');
	};
};

// 일반적으로 사용
getPrintHi();

// 고차함수에서 리턴되는 함수를 바로 호출하기 위해서 사용
getPrintHi()();
```

### 8. Parameter

**Argument와 Parameter의 차이점:**

1. Parameter: 함수 선언부에서 소괄호() 안에 작성되는 것
2. Argument: 함수 호출 부분에서 parameter로 전달하는 값

Parameter가 존재하는데 아무 값을 넘겨주지 않으면 

→ 기본값이 없는 경우: undefined가 들어감

→ 기본값이 있는 경우: 기본값이 들어감

```jsx
function greeting(name = 'Codeit', interest){
	console.log(name, interest);
}

greeting(); // Codeit undefined
greeting('JS'); // JS undefined -> 파라미터 순서대로 
greeting(undefined, 'Python'); // Codeit Python -> undefined가 전달되면 기본값 넘어감
```

⚠️ 위와 같은 상황 때문에 기본값을 가지는 parameter는 오른쪽에 작성하는 것이 좋음 ⚠️

파라미터 기본값은 앞의 파라미터를 활용할 수도 있음 (ES2015 이후 문법 지원)
