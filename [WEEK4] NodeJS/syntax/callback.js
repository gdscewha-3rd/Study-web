/*
function a(){
    console.log('A');
}
*/

var a = function(){
    console.log('A');
} // js에서는 함수가 값이다! 위와 같은 함수

function slowfunc(callback){ //callback이라는 parameter
    callback();
}
slowfunc(a); // A
// callback 은 a라는 값을 가질것 - a가 'A' 출력하는 함수이므로