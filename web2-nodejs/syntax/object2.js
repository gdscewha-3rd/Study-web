//데이터를 저장하는 방식 두 가지 -> array, object
//var i = if(true){console.log(1);} -> 에러 - if문은 값이 될 수 없음
//var w = while(true){console.log(1);} -> 에러 - while문은 값이 될 수 없음
var f = function(){ //함수 statement가 값이 될 수 있음
  console.log(1+1);
  console.log(1+2);
}
console.log(f); //함수 정보 출력
f(); //함수 f 실행
var a = [f];  //배열의 원소로서 존재하는 함수
a[0](); //함수 f 실행
var 0 = {
  func:f //property
}
o.func(); //함수 실행
