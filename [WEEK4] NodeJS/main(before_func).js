var http = require('http');
var fs = require('fs');
var url = require('url'); //url은 모듈 url 을 가리키는 것

var app = http.createServer(function(request,response){
    var _url = request.url; //모듈 url과 구분하기 위해 _url로.
    
    var queryData = url.parse(_url, true).query; // URL의 queryString 받아서 변수에 저장!!!!!
    // url.parse(받아올 주소, true).query; 이렇게
    var pathname = url.parse(_url, true).pathname; //URL로부터 path 받아와
    

    if(pathname === '/'){ //현재 접속이 path 없는 경로로 접근한 것이라면
      if(queryData.id === undefined){ //id가 정해지지 않은 경우 => home인 경우


        fs.readdir('./data', function(error, filelist){ 
          
          var title = "Welcome";
          var description = "Hello, Node.js";
          /*
          var list = `<ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>`;
          */
          var list = '<ul>'; //글 목록 출력하기

          var i = 0;
          while(i < filelist.length){
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i += 1;
          }
          list += '</ul>';

          var templete = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      response.writeHead(200);
      response.end(templete); //response.end() 괄호 안의 문장을 출력하며 끝
    });
        
      
      } else { //id 부분에 값이 있다면\

        fs.readdir('./data', function(error, filelist){ 
          
          var title = "Welcome";
          var description = "Hello, Node.js";
          /*
          var list = `<ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>`;
          */
          var list = '<ul>'; //글 목록 출력하기

          var i = 0;
          while(i < filelist.length){
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i += 1;
          }
          list += '</ul>';

          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, data) {
            var title = queryData.id;
            var description = data;
            var templete = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(templete); //response.end() 괄호 안의 문장을 출력하며 끝
          });
        }); //readdir end
      }

    } else{ //Not Found인 경우 (http://localhost:3000/뒤에 아무거나 친 경우.)
      response.writeHead(404);
      response.end("Not Found");
    }
    
    
 
});

app.listen(3000);