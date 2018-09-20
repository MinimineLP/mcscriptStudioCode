#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
var path = require("path");
var server_1 = require("./server");
exports.ServerSideApplication = server_1["default"];
var PluginManager_1 = require("./PluginManager");
exports.PluginManager = PluginManager_1.PluginManager;
exports.RequestEvent = PluginManager_1.RequestEvent;
var SiteAPI = require("./siteapi");
exports.SiteAPI = SiteAPI;
exports["default"] = startServer;
function createServer(p, loadPlugins) {
    if (p === void 0) { p = "."; }
    if (loadPlugins === void 0) { loadPlugins = true; }
    var manager = new PluginManager_1.PluginManager();
    if (loadPlugins) {
        manager.loadPlugins(__dirname + "/../plugins");
        manager.setupPlugins();
        manager.startPlugins();
        SiteAPI.loadSite({ host: "raw.githubusercontent.com", path: '/MinimineLP/MCScriptStudioCode-core-plugins/master/plugins-core.json', protocoll: 'https' }, function (ret) {
            for (var _i = 0, _a = JSON.parse(ret); _i < _a.length; _i++) {
                var url = _a[_i];
                manager.installPlugin(url, __dirname + "/../plugins");
            }
        });
    }
    var basedir = __dirname + "/htdocs";
    var server = new server_1["default"](fs.realpathSync(p));
    var contentTypes = JSON.parse(fs.readFileSync(__dirname + "/contenttypes.json").toString());
    var httpserver = http.createServer(function (request, response) {
        request.url = request.url.split("#")[0].split("?")[0];
        var event = manager.fireEvent(new PluginManager_1.RequestEvent(request, response));
        if (event.canceled)
            return;
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
    });
    return { server: httpserver, manager: manager };
}
exports.createServer = createServer;
function startServer(p, port, loadPlugins) {
    if (p === void 0) { p = "."; }
    if (port === void 0) { port = 80; }
    if (loadPlugins === void 0) { loadPlugins = true; }
    var server = createServer(p, loadPlugins);
    server.server.listen(port);
    return server;
}
exports.startServer = startServer;
