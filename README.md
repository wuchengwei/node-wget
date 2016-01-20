# wget-improved

wget-improved simplifies retrieving files from any URL

Improvements over old wget module
  - Handles 302 redirects (including infinite redirect loops)
  - Passes URL parameters
  - Better error reporting
  - Does not write using append (uses w+ identical to wget)
  - Handles gzip compression, allow you to automatically gunzip the stream


# Installing
```
npm install wget-improved --save
```
```js
var wget = require('wget-improved');
var src = 'http://nodejs.org/images/logo.svg';
var output = '/tmp/logo.svg';
var options = {
//see options below
};
var download = wget.download(src, output, options);
download.on('error', function(err) {
    console.log(err);
});
download.on('start', function(fileSize) {
    console.log(fileSize);
});
download.on('end', function(output) {
    console.log(output);
});
download.on('progress', function(progress) {
    // code to show progress bar
});
```


<a name="request" />

## request(options, callback)

```js
var wget = require('wget');
var options = {
    protocol: 'https',
    host: 'raw.github.com',
    path: '/Fyrd/caniuse/master/data.json',
    proxy: 'http://host:port',
    method: 'GET'
};
var req = wget.request(options, function(res) {
    var content = '';
    if (res.statusCode === 200) {
        res.on('error', function(err) {
            console.log(err);
        });
        res.on('data', function(chunk) {
            content += chunk;
        });
        res.on('end', function() {
            console.log(content);
        });
    } else {
        console.log('Server respond ' + res.statusCode);
    }
});

req.end();
req.on('error', function(err) {
    console.log(err);
});
```
#download and request method options
```js

options = {}
    // Set to true to have any gzip stream automatically decompressed before saving
    options.gunzip = false;
    options.proxy = {};
        options.proxy.protocol = 'http';
        options.proxy.host = 'someproxy.org';
        options.proxy.port = 1337;
        options.proxy.proxyAuth = '{basic auth}';
        options.proxy.headers = {'User-Agent': 'Node'};
```


#Todo
Enable gzip when using request method