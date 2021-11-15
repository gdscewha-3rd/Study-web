var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]); //k8805

var i = 0;
while(i < members.length){
  console.log('array loop', members[i]);
  i = i + 1;
}

var roles = { //각 데이터에 고유한 이름 부여
  'programmer' : 'egoing',
  'designer' : 'k8805',
  'manager' : 'hoya'
}
console.log(roles.designer); //k8805
console.log(roles['designer']); //k8805

for(var name in roles){ //name: 객체의 식별자 key, roles[name]: 객체의 값 value
  console.log('object => ', name, 'value => ', roles[name]);
}
