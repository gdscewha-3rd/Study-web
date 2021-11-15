var q = {
  v1:'v1',
  v2:'v2',
  f1:function (){
    console.log(this.v1); //함수가 객체 안에서 사용될 때 자신이 속한 객체를 참조하는 키워드 this
  },
  f2:function (){
    console.log(this.v2);
  }
}

q.f1();
q.f2();
