function a(){

    console.log('A');
}

var a= function (){ // js에서는 익명함수를 변수로 치환가능. 

    console.log('A');
}
a(); //함수호출

//함수의 인자로서 함수를 넘겨줄수 있다! 
//
function slowfunc(callback){ //slowfunc -> 오랜시간이 걸리는 함수.
callback();

}
slowfunc(a);