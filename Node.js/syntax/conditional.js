var args=process.argv;
console.log(args[2]);

console.log('A1');
console.log('B1');
if(args[2]==='1'){ //첫번째 인자값으로 1을 주면
    console.log('C1');
}
else {
    console.log('C2');
}
console.log('D');
