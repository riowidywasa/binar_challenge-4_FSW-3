console.log("Implement servermu disini yak 😝!");
const http = require('http');
const { PORT = 8000 } = process.env;

const fs = require('fs');
const path = require('path');
const DIRECTORY = path.join(__dirname, '../public');
// const IMG_DIRECTORY = path.join(__dirname, '..');

function gHtml(htmlF) {
    const htmlFilePath = path.join(DIRECTORY, htmlF);
    return fs.readFileSync(htmlFilePath, 'UTF-8');
}
function gImg(imageF) {
    const imageFilePath = path.join(DIRECTORY, imageF);
    return fs.readFileSync(imageFilePath);
}
function gCss(cssF) {
    const cssFilePath = path.join(DIRECTORY, cssF);
    return fs.readFileSync(cssFilePath, 'UTF-8');
}
function gJs(jsF) {
    const jsFilePath = path.join(DIRECTORY, jsF);
    return fs.readFileSync(jsFilePath, 'UTF-8');
}


function onReqRes(req, res) {
    let css = '';
    let js = '';
    let img = '';

    if (req.url.match('.css$')) {
        css = req.url;
    } else if (req.url.match('.js$')) {
        js = req.url;
    } else if (req.url.match('.png$') || req.url.match('.jpg$')) {
        img = req.url;
    }

    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(gHtml('index.html'));
            return;

        case '/sewa.html':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(gHtml('sewa.html'));
            return;

        case css:
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(gCss(css));
            return;

        case js:
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(gJs(js));
            return;

        case img:
            res.writeHead(200, { 'Content-Type': 'image' });
            res.end(gImg(img));
            return;

        default:
            res.writeHead(404);
            res.end(gHtml('error.html'));
            break;
    }
}

const server = http.createServer(onReqRes);
server.listen(PORT, '0.0.0.0', () => {
    console.log('server sudah berjalan, Klik http://localhost:%d', PORT);
});


// const express = require("express");
// const app = express();
// const port = 2424;
// const path = require("path");
// const public = path.join(__dirname, "../public");

// app.use(express.static(public));

// app.get("/", function (req, res) {
//   res.set('Content-Type', 'text/html')
//   res.sendFile(path.join(public, "index.html"));
//   res.status(200);
// });

// app.get("/cars", function (req, res) {
//   res.set('Content-Type', 'text/html')
//   res.sendFile(path.join(public, "sewa.html"));
//   res.status(200);
// })