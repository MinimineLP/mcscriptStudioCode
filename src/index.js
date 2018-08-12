"use strict";
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
var path = require("path");
var port = 3231;
var basedir = "./src/htdocs";
http.createServer(function (request, response) {
    if (request.url.charAt(request.url.length - 1) == "/")
        request.url += "index.html";
    console.log("request starting: " + basedir + request.url + "...");
    var filePath = basedir + request.url;
    if (filePath == './')
        filePath = './index.html';
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }
    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile(basedir + "/404.html", function (error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}).listen(port);
console.log("Running server on port " + port);
