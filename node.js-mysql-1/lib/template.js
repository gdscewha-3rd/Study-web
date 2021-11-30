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
  },list:function(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}

authorTable:function(authors){
  var tag='<table>';
  var i=0;
  while(i<authors.legnth){
      tag+=
      `
<tr>
<td>${authors[i].name}</td>
<td>${authors[i].profile}</td>
<td><a href="/author/update?id=${authors[i].id}">update</a></td>
<td>
    <form action="/author/delete_process" method="post">
      <input type="hidden" name="id" value="${authors[i].id}">
      <input type="submit" value="delete">
    </form>
</td>
</tr>

`
i++;
  }
  tag+='</table>';
  return tag;
}