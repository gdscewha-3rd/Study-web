var mysql = require('mysql');
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'111111',
  database:'opentutorials'
});
db.connect();
module.exports = db; //하나의 api를 꺼내는 경우
//여러개를 꺼내는 경우에는 exports만 쓰면 됨
