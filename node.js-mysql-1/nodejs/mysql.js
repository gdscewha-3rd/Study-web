var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'node.js',
  password : '111111',
  database : 'opentutorials'
});
 
connection.connect();
 
connection.query('SELECT  * FROM topic', function (error, results, fields) {
    if (error) {
    consol.log(error);
    }
      console.log(results);
    });
    
 
connection.end();