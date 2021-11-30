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
          //console.log(topics);
          var title = 'Welcome';
          var description = 'Hello, Node.js';

          
          var list = template.list(topics); 
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
          //response.end('Success');

        });

      } else { //상세보기 
        

        //id값에 해당하는 정보 불러오기
        db.query(`SELECT * FROM topic`, function(error,topics){
         
          if (error){ //topic을  가져오는데 실패한다면
            throw error; //그다음 명령을 실행시키지 않고 에러를 콘솔에 표시하면서 즉시 애플리케이션을 중지.
          }
        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id = ?`,[queryData.id], function(error2,topic){ //queryData.id이 ?에 치환되어서 들어감. ->보안강화
          if (error2){ // topic의 상세정보를 가져오는데 실패한다면
            throw error; //그다음 명령을 실행시키지 않고 에러를 콘솔에 표시하면서 즉시 애플리케이션을 중지.
          }
          console.log(topic[0]); //query 정보는 항상 배열에 담겨서 들어오기때문에 index로 접근해야함.
          var title = topic[0].title;
          var description = topic[0].description;

          var list = template.list(topics); 
          var html = template.HTML(title, list,
            `<h2>${title}</h2> by ${topic[0].name}
            <br><br>
            ${description}
             `,
            `<a href="/create">create</a>
            <a href="/update?id=${queryData.id}">update</a>
            <form action="delete_process" method="post">
            <input type= "hidden" name="id" value="${queryData.id}">
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
        db.query('SELECT * FROM author',function(error,authors){
          var title = 'Create';
         
          var list = template.list(topics); 
          var html = template.HTML(title, list,
            `<form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
            ${template.authorSelect(authors)}
           
            </P>
            <p>
              <input type="submit">
            </p>
          </form>`,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
          //response.end('Success'); end가 두개있으면 에러남.
  
        });

        });
       

    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
         
        db.query(`INSERT INTO topic (title,description,created,author_id)
         VALUES (?,?,NOW(),?);`,[post.title,post.description,post.author], function (error,result){
          if(error){
            throw error;
          }
          //create 작업 후에 새로 생성된 글 목록 페이지로 보내야하므로 추가된 행의 id값을 알아야함.
          
          response.writeHead(302,{Location: `/?id=${result.insertId}`});
          response.end();

        })
      });
    } else if(pathname === '/update'){


      // 쿼리스트링의 id값을 통해 수정할 글의 타이틀과 내용 정보를 받아옴. 
      db.query(`SELECT * FROM topic `, function(error,topics){ //topics 는 template.list 에서 글목록을 리스트로 만드는데있어서 필요함.
        if (error){
          throw error;
        }
        // 전달받은 글의 id값을 이용해서 author표랑 join해서 저자가 누군지 찾아내야함. 
      db.query(`SELECT * FROM topic WHERE id=${queryData.id}`, function(error2,topic){

        if(error2){
          throw error2;
        }
        db.query('SELECT * FROM author',function(error3,authors){ 
          if (error3){
            throw error3;
          }
          var list = template.list(topics); 
          var html = template.HTML(topic[0].title, list,
  
            `
              <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${queryData.id}"> 
                <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                <p>
                  <textarea name="description" placeholder="description">${topic[0].description}</textarea>
                </p>
                <p>
              ${template.authorSelect(authors,topic[0].author_id)}
             
              </P>
                <p>
                  <input type="submit">
                </p>
              </form>
              `,
              `<a href="/create">create</a> <a href="/update?id=${queryData.id}">update</a>`
          );
          response.writeHead(200);
          response.end(html);
         
  
        });
      });
          
        })
     


       
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);

          // 전달받은 post 정보로 db 행데이터 수정하기
          db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?;`,[post.description,post.title,post.author,post.id],function(error,result){
            if(error){
            throw error;
            }
            response.writeHead(302,{Location: `/?id=${post.id}`}); // 업데이트 된 화면으로 보내기. 
            response.end();
          })
      });

    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          // 전달받은 post 정보로 행데이터 삭제하기 
          db.query(`DELETE FROM topic WHERE id = ?;`, [post.id], function(error,result){
            if(error){
              throw error;
            }
            console.log(post.id);
            response.writeHead(302, {Location: `/`});
            response.end();
          });
        
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
