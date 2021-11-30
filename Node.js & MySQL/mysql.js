var mysql      = require('mysql');

// nodejs가 mysql서버에 접속하기 위한 정보
var connection = mysql.createConnection({
  host     : 'localhost', //데이터 베이스 서버가 어떤 컴퓨터에 있는지
  user     : 'node.js',
  password : 'kgm00301', //비밀번호 설정
  database : 'opentutorials' // 사용할 데이터베이스 이름
});
 
connection.connect();
 
// 첫번째 인자의 sql이 데이터베이스 서버에게 전송되어 실행이 끝난다음에 두번째 인자의 콜백함수가 실행.

connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error) {
      console.log(error);
  }
  console.log(results);
});
 
connection.end();