var testFolder = './data'; // 실행하는 위치를 기준으로 파일 목록을 알고싶은 곳의 경로
var fs=require('fs');

fs.readdir(testFolder,function(error,filelist){
console.log(filelist); // testFolder 경로에 존재하는 파일리스트 가져오기.
})