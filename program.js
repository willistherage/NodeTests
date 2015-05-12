var fs = require('fs');
var params = process.argv.slice(2, process.argv.length);
var jsfile = fs.readFileSync(params[0], 'utf8');
var strArray = jsfile.split('\n');



console.log(strArray.length);