var fs= require('fs');//filesystem 모듈을 다룰 수 있게 된다.
fs.readFile('sample.txt', 'utf8', function(err, data){
  console.log(data);
});
