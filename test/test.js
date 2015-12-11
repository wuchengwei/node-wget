var wget = require('../lib/wget');

var download = wget.download('https://www.npmjs.com/static/images/npm-logo.svg', '/tmp/README.md');
// with a proxy:
// var download = wget.download('https://raw.github.com/Fyrd/caniuse/master/data.json', '/tmp/README.md', {proxy: 'http://proxyhost:port'});
download.on('error', function(err) {
    console.log(err);
});
download.on('start', function(fileSize) {
    console.log(fileSize);
});
download.on('end', function(output) {
    console.log(output);
    process.exit();
});
download.on('progress', function(progress) {
    console.log(progress);
});