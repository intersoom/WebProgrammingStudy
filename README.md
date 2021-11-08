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
