var fs = require('fs');

fs.readFile('sample.txt', 'UTF-8', function(err, data) {
    console.log(data);
  });