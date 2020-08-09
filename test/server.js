const crypto = require('crypto');
const express = require('express');
const http = require('http');

const app = express();
let size = 1024 * 1024;
let file = Buffer.alloc(size);

let redirectFile = Buffer.alloc(size);
crypto.randomBytes(size, function(err, buffer) {
    file = buffer;
});
app.get('/file', function(req, res) {
    res.send(file);
});

app.get('/file/metadata', function(req, res) {
    let hash = crypto
        .createHash('sha256')
        .update(file)
        .digest('hex');
    res.json({
        size: size,
        hash: hash
    });
});

app.get('/file/redirect', function(req, res) {
    let count = 1;
    if (typeof req.query.count === 'string') {
        count = Number(req.query.count);
    }
    if (count > 3) {
        res.send(redirectFile);
    } else {
        res.redirect(
            'http://localhost:8994/file/redirect?count=' + String(count + 1)
        );
    }
});

app.get('/file/redirect/infinite', function(req, res) {
    let count = 1;
    if (typeof req.query.count === 'string') {
        count = Number(req.query.count);
    }
    res.redirect(
        'http://localhost:8994/file/redirect/infinite?count=' +
        String(count + 1)
    );
});

app.get('/file/redirect/relative', function(req, res) {
    res.set('Location', '/file/redirect?count=4');
    res.status(301).end();
});

app.get('/file/redirect/metadata', function(req, res) {
    let hash = crypto
        .createHash('sha256')
        .update(redirectFile)
        .digest('hex');
    res.json({
        size: size,
        hash: hash
    });
});

module.exports = function() {
    return new Promise(function(resolve, reject) {
        app.listen(8994, function() {
            // This server is used due to the inability to not send content-length headers in express.
            http
                .createServer(function(request, response) {
                    response.writeHead(200, {
                        'Content-Type': 'binary'
                    });
                    let responseBuffer = Buffer.alloc(858478).toString('hex');
                    response.write(responseBuffer);
                    response.end();
                })
                .listen(9933);
            console.log('listening');
            resolve();
        });
    });
};
