var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql      = require('mysql'); //mysql 모듈 가져오기
const { debugPort } = require('process');

// nodejs가 mysql서버에 접속하기 위한 정보
var db = mysql.createConnection({
  host     : 'localhost', //데이터 베이스 서버가 어떤 컴퓨터에 있는지
  user     : 'node.js',
  password : 'kgm00301', //비밀번호 설정
  database : 'opentutorials' // 사용할 데이터베이스 이름
});


db.connect(); //해당 데이터베이스서버에 접속
 

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){ //최상위 경로 (기본홈)

        // 콜백함수의 두번째 인자(topic)에 query 결과가 담김.
        db.query('SELECT * FROM topic', function(error,topics){
          console.log(topics);
          var title = 'Welcome';
          var description = 'Hello, Node.js';

          
          var list = template.list(topics); 
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
          response.end('Success');

        });

      } else { //상세보기 
        

        //id값에 해당하는 정보 불러오기
        db.query(`SELECT * FROM topic`, function(error,topics){
         
          if (error){ //topic을  가져오는데 실패한다면
            throw error; //그다음 명령을 실행시키지 않고 에러를 콘솔에 표시하면서 즉시 애플리케이션을 중지.
          }
        db.query(`SELECT * FROM topic WHERE id = ?`,[queryData.id], function(error2,topic){ //queryData.id이 ?에 치환되어서 들어감. ->보안강화
          if (error2){ // topic의 상세정보를 가져오는데 실패한다면
            throw error; //그다음 명령을 실행시키지 않고 에러를 콘솔에 표시하면서 즉시 애플리케이션을 중지.
          }
          console.log(topic[0]); //query 정보는 항상 배열에 담겨서 들어오기때문에 index로 접근해야함.
          var title = topic[0].title;
          var description = topic[0].description;

          
          var list = template.list(topics); 
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>
            <a href="/update?id=${queryData.id}">update</a>
            <form action="delete_process" method="post">
            <input types="hidden" name="id" values="${queryData.id}">
            <input type="submit" value="delete">
            </form>
            `
          );
          response.writeHead(200);
          response.end(html);
          
        })

        });

      }
    
    } else if(pathname === '/create'){ //글 생성
     
      // 콜백함수의 두번째 인자(topic)에 query 결과가 담김.
      db.query('SELECT * FROM topic', function(error,topics){
        
        var title = 'Create';
        var description = 'Hello, Node.js';

        var list = template.list(topics); 
        var html = template.HTML(title, list,
          `<form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
        response.end('Success');

      });

    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
         
        db.query(`
        INSERT INTO topic (title,description,created,author_id)
         VALUES (${post.title},${post.description},NOW(),1);`, function (error,result){


        })
      });
    } else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var title = post.title;
          var description = post.description;
          fs.rename(`data/${id}`, `data/${title}`, function(error){
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end();
            })
          });
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var filteredId = path.parse(id).base;
          fs.unlink(`data/${filteredId}`, function(error){
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
