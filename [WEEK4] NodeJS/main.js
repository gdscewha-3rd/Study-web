var http = require('http');
var fs = require('fs');
var url = require('url'); //url은 모듈 url 을 가리키는 것
var qs = require('querystring');

var template = require('./lib/template.js');

var app = http.createServer(function(request,response){ //request: 요청할때 웹브라우저가 보낸 정보/ response: 우리가 컴퓨터에 요청할값
    var _url = request.url; //모듈 url과 구분하기 위해 _url로.
    
    var queryData = url.parse(_url, true).query; // URL의 queryString 받아서 변수에 저장!!!!!
    // url.parse(받아올 주소, true).query; 이렇게
    var pathname = url.parse(_url, true).pathname; //URL로부터 path 받아와
    
    if(pathname === '/'){ //현재 접속이 path 없는 경로로 접근한 것이라면
      if(queryData.id === undefined){ //id가 정해지지 않은 경우 => home인 경우


        fs.readdir('./data', function(error, filelist){ 
          
          var title = "Welcome";
          var description = "Hello, Node.js";
          var list = template.list(filelist);
          var html = template.html(title, list, 
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
            );
      response.writeHead(200);
      response.end(html); //response.end() 괄호 안의 문장을 출력하며 끝
    });
        
      
      } else { //HOME이 아니고, id 부분에 값이 있다면(http://localhost:3000/?id=css)

        fs.readdir('./data', function(error, filelist){ 
      
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, data) {
            var title = queryData.id;
            var description = data;
            var list = template.list(filelist);
            var html = template.html(title, list,
              `<h2>${title}</h2>${description}`,
              ` <a href="/create">create</a>
                <a href="/update?id=${title}">update</a>
                <form action="delete_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <input type="submit" value="delete">
                </form>
              `
              );
        response.writeHead(200);
        response.end(html); //response.end() 괄호 안의 문장을 출력하며 끝
          });
        }); //readdir end
      }
    
    } else if(pathname === '/create'){

      fs.readdir('./data', function(error, filelist){ 
          
        var title = "WEB - create";
        var list = template.list(filelist);
        var html = template.html(title, list, `
        <form action="/create_process"
        method="POST">
            <p><input type="text" name="title"
            placeholder="title"></p>
            <p>
                <textarea name ="description"
                placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
        `, '');
      response.writeHead(200);
      response.end(html);
      })
    } else if (pathname === '/create_process') {
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description; //웹페이지에서 입력된 데이터를 받아옴
        fs.writeFile(`data/${title}`, description, 'utf-8',function(err){ //title이라는 이름의 파일이 생성됨 +내용도 그대로 들어감
          response.writeHead(302, {Location: `/?id=${title}`}); //302 라는 값은 Location으로 리다이렉션 하도록 해줌(200:성공, 404:실패(?))
          response.end();
        })
      }); //end에 해당되는 callback이 실행됐을 때 실행이 끝났다고 알 수 있는것

    } else if (pathname === '/update') {
      fs.readdir('./data', function(error, filelist){ 
      
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, data) {
          var title = queryData.id;
          var description = data;
          var list = template.list(filelist);
          var html = template.html(title, list,
            `
            <form action="/update_process"
        method="POST">
            <input type="hidden" name="id" value=${title}>
            <p><input type="text" name="title"
            placeholder="title" value=${title}></p>
            <p>
                <textarea name ="description"
                placeholder="description">${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
            );
      response.writeHead(200);
      response.end(html); //response.end() 괄호 안의 문장을 출력하며 끝
        });
      }); //글을 읽어오는 부분

    } else if (pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description; //웹페이지에서 입력된 데이터를 받아옴
        fs.rename(`data/${id}`, `data/${title}`, function(error){ //파일명 바꾸는 함수
          fs.writeFile(`data/${title}`, description, 'utf-8',function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
        })
        console.log(post);
        
      });

    } else if (pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`, function(error){
          response.writeHead(302, {Location: `/`});
          response.end();
        })
        
        
      });

    
    } else { //Not Found인 경우 (http://localhost:3000/뒤에 아무거나 친 경우.)
      response.writeHead(404);
      response.end("Not Found");
    }
    
    
 
});

app.listen(3000);