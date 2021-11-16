var members = ['yoonseo', 'k9977', 'ottlseo'];

var i = 0;
while (i < members.length){
    console.log(members[i]);
    i++;
}
// Array


var roles = {
    'programmer':'ewha',
    'Data Scientist':'yoonseo',
    'security Manager':'KIM'
}
console.log(roles.programmer); //ewha
console.log(roles["Data Scientist"]); //yoonseo

for (var i in roles){
    console.log('object => ', i, "value => ", roles[i]);
}
