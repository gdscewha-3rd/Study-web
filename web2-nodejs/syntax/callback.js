/*
function a(){
  console.log('A');
}*/
var a = function(){ //JS에서는 함수가 값이 됨
  console.log('A');
}
a();

function slowfunc(callback){ //이 기능에 대한 실행이 끝난 다음에 다음 일을 하라고 하고 싶음 - 인자로 callback을 받음
  callback();
}

slowfunc(a); //slowfunc라는 오랜시간이 걸리는 함수가 동작한 후 a가 가리키는 함수를 실행
