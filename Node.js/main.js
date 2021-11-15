var http = require('http');
var fs = require('fs');
var url = require('url'); //url이라는 모듈 사용.


var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(_url);
    var queryData =url.parse(_url,true).query; // 객체 형태로 query string저장
    var pathname =url.parse(_url,true).pathname;
    
   
   //console.log(pathname);
   if(pathname==='/'){ // 경로명이 /라면

    //main home 처리(WEB)
    if (queryData.id===undefined){ // querystring이 없다면
       
       fs.readFile(`data/${queryData.id}`,'utf-8',(err, description)=>{
        var title = 'Welcome';
        var description='Hello,WEB';
        var template = `<!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title} </title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1> 
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=Javascript">JavaScript</a></li>
          </ol>
          <h2> ${title}</h2>
          <p>
          ${description}
          </p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template); //template을 화면상에 그려낸다.
    });
   }
   else{ // 경로명이 /가 아니라면

    fs.readFile(`data/${queryData.id}`,'utf-8',(err, description)=>{
        var title = queryData.id;
        var template = `<!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title} </title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1> 
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=Javascript">JavaScript</a></li>
          </ol>
          <h2> ${title}</h2>
          <p>
          ${description}
          </p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template); //template을 화면상에 그려낸다.
    });
    }

   }

   else {
    response.writeHead(404);
    response.end('Not found');
}
  
   
 
});
app.listen(3000);