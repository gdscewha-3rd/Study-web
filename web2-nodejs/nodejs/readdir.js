const testFolder = './data/'; //실행 위치 기준 경로
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
})
