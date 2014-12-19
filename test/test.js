var wget = require('../lib/wget');

var download = wget.download('http://www.google.com', 'google.html');
// with a proxy:
//var download = wget.download('http://www.google.com', 'google.html', {proxy: 'http://proxyhost:port'});

download.on('error', function(err) {
    console.log(err);
});
download.on('end', function(output) {
    console.log(output);
});
download.on('progress', function(progress) {
    console.log(progress);
});