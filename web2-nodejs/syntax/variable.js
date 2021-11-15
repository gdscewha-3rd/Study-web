var a = 1; //변수 앞에는 var 붙임
console.log(a);
a = 2; //변수 선언 후에는 var 붙일 필요 없음
console.log(a);
// 1 = 2; comment 주석
var name = 'egoing';
var letter = 'Dear ' + name + 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' + name + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' + name; //데이터에 이름을 부여 - 의미 추론 가능, 중복 제거, 가독성 향상, 수정 쉬워짐
console.log(letter);
