// 자바스크립트가 내장하고 있는 함수

//Math.round() -Math 는 js에 내장된 객체, round 함수는 반올림 해주는 함수

console.log(Math.round(1.6)); //2
console.log(Math.round(1.4)); //1

function printSum(first, second){ //parameter 
    console.log(first + second);
} 
//콘솔에 출력할 수 밖에 없는 제한된 함수

function sum(first, second){
    return first+second;
}

printSum(2,4);


console.log(sum(2,4));