var fs = require('fs'); //fs 모듈에 fs라는 이름 붙임

/*
//readFileSync, 동기적 처리
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

//readFile, 비동기적 처리 - return값은 없으나 세번째 인자로 함수를 줘야 함
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){ //에러가 발생하면 err를 인자로 제공, 두번째 파라미터는 파일의 내용을 인자로 공급
  console.log(result);
});
console.log('C');
