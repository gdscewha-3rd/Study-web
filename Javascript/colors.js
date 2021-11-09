var link= {
  setLinkColor: function(color){
  var linkco= document.querySelectorAll('a');
  var i=0;
  while(i<linkco.length)
  {
    linkco[i].style.color=color;
    i++;
  }
}
}
var body= {
  setColor: function (color){
    var target= document.querySelector('body');
    target.style.color=color;
  },
  setBackgroundColor: function(color){
    var target= document.querySelector('body');
    target.style.backgroundColor= color;
  }
}
function nightDayHandler(self){


if(self.value== 'night'){
    body.setBackgroundColor('black');
    body.setColor('white');
    self.value= 'day';
    link.setLinkColor('powderblue');
}

else{
    body.setBackgroundColor('white');
    body.setColor('black');
    self.value= 'night';
    link.setLinkColor('blue');
}
}
