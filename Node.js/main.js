var http = require('http');
var fs = require('fs');
var url = require('url'); 
var qs =require('querystring');

//HTML 템플릿 생성
function templateHTML(title,list,body,control){

return  `<!doctype html>
<html>
<head>
  <title>WEB1-${title} </title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1> 
  ${list}
  ${control}
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
      
      fs.readdir('./data',function(error,filelist){
        var title = 'Welcome';
        var description='Hello,WEB';
       
      var list=templateList(filelist);
        var template =templateHTML(title,list,`<h2>${title}</h2>${description}`,`<a href="/create">create</a>` );
        response.writeHead(200);
        response.end(template); 
      })
        
    
   }
   else{ // querystring이 있다면

    fs.readdir('./data',function(error,filelist){
    fs.readFile(`data/${queryData.id}`,'utf-8',(err, description)=>{
        var title = queryData.id;
        var list = templateList(filelist);
        var template =templateHTML(title,list,`<h2>${title}</h2>${description}`
        ,`<a href="/create">create</a> <a href="/update?id=${title}">update</a> 
        <form action="/delete_process" method="post"> 
        <input type="hidden" name="id" value="${title}">
        <input type="submit"  value="delete">
        </form>`); //어떤 파일을 수정,삭제할 것인지에 대한 정보를 query string으로 넘겨준다.
        response.writeHead(200);
        response.end(template); //template을 화면상에 그려낸다.
       });
     });
     }

  }
  else if (pathname==='/create_process'){
    var body = '';
    request.on('data',function (data){ //post방식으로 전달되는 데이터가 많을경우
      body+=data; //callback이 실행될때마다 data 추가. 정보가 조각 조각 들어옴

    });
   
    //더이상 전송할 data가 없으면
    request.on('end',function(){
      var post =qs.parse(body); //body 추출.
      console.log(post); // 사용자가 입력한 정보가 객체형태로 저장.
      var title = post.title;
      var contents =post.contents;
       //파일쓰기 
    fs.writeFile(`data/${title}`,contents,'utf8',function(err){
      response.writeHead(302,{Location:`/?id=${title}`}); // 생성된 디렉토리목록으로 이동.
      response.end(); 
    });    
    }); 

  }
  else if (pathname ==='/update_process'){


    //1 .post방식으로 전달된 data 받기
    var body = '';
    request.on('data',function (data){
      body+=data; 

    });
   
       request.on('end',function(){
      var post =qs.parse(body); 
      console.log(post); 
      var id =post.id; // 이전 파일명.
      var title = post.title; //바꾼 파일명
      var contents =post.contents; //바꾼 내용

      //2. 파일이름 수정 id -> title
      fs.rename(`data/${id}`,`data/${title}`,function(err){
        //3. 내용수정
        fs.writeFile(`data/${title}`,contents,'utf8',function(err){
          response.writeHead(302,{Location:`/?id=${title}`}); // 바뀐 디렉토리목록으로 이동.
          response.end(); 
          });    
        }); 

      });  
   }
 
   else if (pathname ==='/delete_process'){

    //1 .post방식으로 전달된 data 받기
    var body = '';
    request.on('data',function (data){
      body+=data; 
       request.on('end',function(){
      var post =qs.parse(body); 
      console.log(post); 
      var deleted =post.id; // 삭제할 파일명.

      fs.unlink(`data/${deleted}`,function(err){
        response.writeHead(302,{Location:`/`}); // 홈으로 이동.
            response.end(); 
          });
      });  
   
    });
   }
  else if (pathname ==='/update'){

    fs.readdir('./data',function(error,filelist){
      fs.readFile(`data/${queryData.id}`,'utf-8',(err, description)=>{
          var title = queryData.id;
          var list = templateList(filelist);
          var template =templateHTML(title,list,`<form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}"> 
          <p> <input type="text" name="title" value="${title}" ></p>
          <p>
              <textarea name="contents" >${description}</textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          
          </form>`
          ,`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`); //어떤 파일을 수정할 것인지에 대한 정보를 query string으로 넘겨준다.
          response.writeHead(200);
          response.end(template); //template을 화면상에 그려낸다.
         });
       });
  }
  else if (pathname==='/create'){
 
    fs.readdir('./data',function(error,filelist){
      var title = 'Web-create'; 
      var list=templateList(filelist);
      var template =templateHTML(title,list,`<form action="/create_process" method="post">
      <p> <input type="text" name="title" placeholder="title"></p>
      <p>
          <textarea name="contents" placeholder="contents"></textarea>
      </p>
      <p>
          <input type="submit">
      </p>
      
      </form>`,'');
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