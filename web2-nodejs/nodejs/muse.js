/*
var M = {
  v:'v',
  f:function(){
    console.log(this.v);
  }
}
*/
//M.f();

var part = require('./mpart.js'); //모듈을 로딩한 결과를 part에 담음
console.log(part); //객체 출력
part.f(); //객체 멤버 함수 출력
