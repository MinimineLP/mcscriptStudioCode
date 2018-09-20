"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var http = require("http");
var https = require("https");
var fs = require("fs");
String.prototype.startsWith = function (searchString) {
    var position = 0;
    return this.indexOf(searchString, position) === position;
};
function loadSite(host, then, path, protocoll) {
    if (path === void 0) { path = "/"; }
    if (protocoll === void 0) { protocoll = "https"; }
    return __awaiter(this, void 0, void 0, function () {
        var ret, options, request, options, request;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (host instanceof Object) {
                        if (host.host && host.path) {
                            if (host.protocoll)
                                protocoll = host.protocoll;
                            path = host.path;
                            host = host.host;
                        }
                    }
                    if (!(protocoll == "https")) return [3 /*break*/, 2];
                    options = { host: host, path: path };
                    request = https.request(options, function (res) {
                        var data = '';
                        res.on('data', function (chunk) {
                            data += chunk;
                        });
                        res.on('end', function () {
                            then(data);
                        });
                    });
                    request.on('error', function (e) {
                        console.log(e.message);
                    });
                    return [4 /*yield*/, request.end()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 2:
                    if (!(protocoll == "http")) return [3 /*break*/, 4];
                    options = { host: host, path: path };
                    request = http.request(options, function (res) {
                        var data = '';
                        res.on('data', function (chunk) {
                            data += chunk;
                        });
                        res.on('end', function () {
                            then(data);
                        });
                    });
                    request.on('error', function (e) {
                        console.log(e.message);
                    });
                    return [4 /*yield*/, request.end()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4: throw new Error("Unknown protocoll \"" + protocoll + "\"");
                case 5: return [2 /*return*/, ret];
            }
        });
    });
}
exports.loadSite = loadSite;
function parseURL(url) {
    var host, path, protocoll;
    var match = url.match(/(https|http):\/\/?(.[^\/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        host = match[2];
    }
    var match = url.match(/(https|http):\/\/.[^\/:]+(.*)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        path = match[2];
    }
    else {
        return null;
    }
    if (url.startsWith("https://"))
        protocoll = "https";
    if (url.startsWith("http://"))
        protocoll = "http";
    return { host: host, path: path, protocoll: protocoll };
}
exports.parseURL = parseURL;
function downloadFile(out, url, then) {
    if (then === void 0) { then = function () { }; }
    var file = fs.createWriteStream(out);
    var request;
    if (url.startsWith("https"))
        request = https.get(url, function (response) {
            response.pipe(file);
        });
    else
        request = http.get(url, function (response) {
            response.pipe(file);
        });
    file.on('finish', then);
    request.end();
}
exports.downloadFile = downloadFile;
