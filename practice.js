// fetch('https://learn.codeit.kr/api/topics')
//     .then((response) => response.text())
//     .then((result) => { console.log(result) }) 

// // 일단 이 코드를 주석 해제하고, 아래 코드를 주석 처리해서 어떤 JSON 데이터가 오는지 확인하세요.


// fetch('https://learn.codeit.kr/api/topics')
//   .then((response) => response.text())
//   .then((result) => {
//     const topics = JSON.parse(result);
//     const beginnerLevelTopics = topics.filter((topic) => topic.difficulty === '초급');
//     console.log(beginnerLevelTopics);
//   });

const newMember = {
    name: 'Jerry',
    email: 'jerry@codeitmal.kr',
    department: 'engineering',
};

fetch('https://learn.codeit.kr/api/members', {
    //옵션 객체 (default 값은 GET) 따라서 GET일 때는 필요 없음
    method: 'POST',
    body: JSON.stringify(newMember), //request body에 넣을 정보를 stringify를 활용하기 (parse의 반대 method, js -> JSON)
})
    .then((response) => response.text())
    .then((result) => {console.log(result); });