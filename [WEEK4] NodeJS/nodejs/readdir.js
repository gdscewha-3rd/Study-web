//특정 디렉토리에 있는 파일의 목록을 가져오는 방법
// 결과- 배열로 출력됨 ['css', 'html', 'js']

var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){ //data 디렉토리의 파일목록 읽어와서
    console.log(filelist);  //filelist를 콘솔창에 출력
})