var http = require('http');
var fs = require('fs');
var url = require('url'); 

//HTML 템플릿 생성
function templateHTML(title,list,body){

return  `<!doctype html>
<html>
<head>
  <title>WEB1-${title} </title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1> 
  ${list}
  <a href="/create">create</a>
  ${body}
  </p>
</body>
</html>
`;

}

// List 목록 생성
function templateList(filelist){

  var list='<ul>'; 
        for(var i=0;i<filelist.length;i++){
          
          list+=`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        }

        list +='</ul>'; 

        return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    
    var queryData =url.parse(_url,true).query; 
    var pathname =url.parse(_url,true).pathname;
    console.log(pathname);
   if(pathname==='/'){ // 경로명이 /라면

    //main home 처리(WEB)
    if (queryData.id===undefined){ // querystring이 없다면
      console.log(1);
      fs.readdir('./data',function(error,filelist){
        var title = 'Welcome';
        var description='Hello,WEB';
       
      var list=templateList(filelist);
        var template =templateHTML(title,list,`<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template); 
      })
        
    
   }
   else{ // querystring이 있다면

    fs.readdir('./data',function(error,filelist){
      var title = 'Welcome';
      var description='Hello,WEB';
    

    fs.readFile(`data/${queryData.id}`,'utf-8',(err, description)=>{
        var title = queryData.id;
        var list = templateList(filelist);
        var template =templateHTML(title,list,`<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template); //template을 화면상에 그려낸다.
       });
     });
     }

  }

  else if (pathname==='/create'){
 
    fs.readdir('./data',function(error,filelist){
      var title = 'Web-create'; 
      var list=templateList(filelist);
      var template =templateHTML(title,list,`<form action="http://localhost:3000/process_create" method="post">
      <p> <input type="text" name="title" placeholder="title"></p>
      <p>
          <textarea name="contents" placeholder="contents"></textarea>
      </p>
      <p>
          <input type="submit">
      </p>
      
      </form>`);
      response.writeHead(200);
      response.end(template); 
    });
      

  }

   else { // 경로명이 /가 아니라면 ex) localhost:3000/asfsd
 
    response.writeHead(404);
    response.end('Not found');
    }
  
   
 
});
app.listen(3000);