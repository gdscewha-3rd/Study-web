module.exports = {
  HTML:function(title, list, body, control){
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
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      //querystring부분을 topics데베에서 각각의 글이 가지고 있는 고유한 id값으로지정.
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  },authorSelect: function (authors,author_id){
    var tag='<select name =author>';
   
    for (var i=0;i<authors.length;i++){
      var selected='';
      if (authors[i].id === author_id) {//저자들의 목록을 순차적으로 순회하면서 author_id(현재 우리가 선택한 수정페이지의 저자) 를 발견한다면
        selected="selected"; //option 태그에 selected라는 문자열이 생길것. 
      }
  
      tag+= `<option value = ${authors[i].id} ${selected}>${authors[i].name}</option>`; 

    }
    tag +=`</select>`;

    return tag;
  }
}
