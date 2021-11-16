var fs=require('fs');


//readFile Sync


/*
//동기
console.log('A');
var result = fs.readFileSync('syntax/sample.txt','utf8'); // 리턴값 존재
console.log(result);
console.log('C');
*/
//비동기

console.log('A');
var result = fs.readFile('syntax/sample.txt','utf8',function(err,result){
    console.log(result);
}); //파일을 읽는 작업이 끝나면 callback함수 실행시킴. 

console.log('C');
