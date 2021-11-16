var http = require('http');//http 모듈 사용하겠다.
var fs = require('fs');//fs 모듈 사용하겠다.
var url = require('url'); // 이 애플리케이션은 url이라는 모듈을 사용할 것이란걸 nodejs 에게 알려준다.
var app = http.createServer(function(request,response){
    var _url = request.url//사용자가 요청하는 query string을 _url에 저장
    var queryData = url.parse(_url, true).query;//queryData는 객체 id, name, page 등등 url의 query string 에 담긴 정보를 모두 담고있다.
    var pathname = url.parse(_url, true).pathname;
    var title= queryData.id;

function templateHTML(title, list, body){
  return `
  <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${body}
      </body>
      </html>
  `
}
function templatelist(filelist){
  var list = '<ul>';
  var i =0;
  while(i<filelist.length){
    list= list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i=i+1;
  }
  list= list+'</ul>'
  return list;
}


    console.log(queryData.id);//id만 출력하기 위해 queryData.id를 쓴다.
    if(pathname==='/'){


      if(queryData.id=== undefined){

        fs.readdir('./data', function(error,filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list =templatelist(filelist);
        var template= templateHTML(title, list, `<h2>${title}</h2>
        <p>${description}</p>`);
        response.writeHead(200);//query string 부분이 /favicon.ico가 아니면 정상쟉동한다.
        response.end(template);
      }
    )
  }

    else{
      fs.readdir('./data', function(error, filelist){


       fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        var list= templatelist(filelist);
        var title = queryData.id;
        var template= templateHTML(title, list, `<h2>${title}</h2>
      <p>${description}</p>`);
      response.writeHead(200);//query string 부분이 /favicon.ico가 아니면 정상쟉동한다.
      response.end(template);//파일을 가져오는 대신에 파일 내용을 변수에 저장해서 가져온다. query string 이 바뀔 때마다 title 부분만 바뀐다.
    });
  });
}
}
  else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
