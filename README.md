# node-wget

A download tool, now supporting http/https resource and http/https proxy, written in nodejs.

# Installing
```
npm install wget
```

# Usage
```js
var wget = require('wget');
var src = 'https://raw.github.com/Fyrd/caniuse/master/data.json';
var output = '/tmp/data.json';
var options = {
    proxy: 'http://host:port
};
var download = wget.download(src, output, options);
download.on('error', function(err) {
    console.log(err);
});
download.on('end', function(output) {
    console.log(output);
});
download.on('progress', function(progress) {
    // code to show progress bar
});
```