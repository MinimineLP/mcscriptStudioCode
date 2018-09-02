#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
var path = require("path");
var server_1 = require("./server");
function startServer(p, port) {
    if (p === void 0) { p = "."; }
    if (port === void 0) { port = 80; }
    var basedir = __dirname + "/htdocs";
    var server = new server_1["default"](fs.realpathSync(p));
    var contentTypes = JSON.parse(fs.readFileSync(__dirname + "/contenttypes.json").toString());
    http.createServer(function (request, response) {
        if (request.url.charAt(request.url.length - 1) == "/")
            request.url += "index.html";
        console.log("request starting by address \"" + request.connection.remoteAddress + "\": " + request.url + "...");
        if (request.url == "/server") {
            server.execRequest(request, response);
            return;
        }
        var filePath = basedir + request.url;
        if (filePath == './')
            filePath = './index.html';
        var extname = path.extname(filePath);
        var contentType = 'text/html';
        if (contentTypes[extname])
            contentType = contentTypes[extname];
        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile(basedir + "/404.html", function (error, content) {
                        if (error)
                            console.log("Error reading 404 file (code: " + error.code + ") " + error);
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    console.log("Error occured while reading files from fs (" + filePath + ") (code: " + error.code + ") " + error);
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
    console.log("Access it via this link: localhost:\"" + port + "\"");
}
exports["default"] = startServer;
