const fs = require('fs');
const jsFile = fs.readdirSync('dist/assets').find(f => f.endsWith('.js'));
const jsContent = fs.readFileSync('dist/assets/' + jsFile, 'utf-8');
// look at where photos are defined
const configPart = jsContent.substring(jsContent.indexOf('hameedFamilyConfig'), jsContent.indexOf('hameedFamilyConfig') + 2000);
console.log(configPart);
