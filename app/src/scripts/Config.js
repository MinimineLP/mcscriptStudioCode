"use strict";

exports.__esModule = true;
var YAML = require("js-yaml");
var fs = require("fs");
var Config = /** @class */function () {
    function Config(file, parser) {
        if (parser === void 0) {
            parser = FileFormatters.Json;
        }
        if (typeof parser === "string") parser = FileFormatters.fromString(parser);
        this.parser = parser;
        this.file = file;
        if (!fs.existsSync(file)) {
            file = file.replace("\\", "/");
            var parts = file.split("/");
            for (var i = 1; i < parts.length; i++) {
                var path = "";
                for (var c = 0; c < i; c++) {
                    path += parts[c] + "/";
                }if (!fs.existsSync(path)) fs.mkdirSync(path);
            }
            fs.writeFileSync(file, "");
        }
        this.load();
    }
    Config.prototype.load = function (file, parser) {
        if (file === void 0) {
            file = this.file;
        }
        if (parser === void 0) {
            parser = this.parser;
        }
        if (typeof parser === "string") parser = FileFormatters.fromString(parser);
        this.content = parser.parse(fs.readFileSync(file, "utf8"));
        if (this.content == null) this.content = {};
    };
    Config.prototype.save = function (file, parser) {
        if (file === void 0) {
            file = this.file;
        }
        if (parser === void 0) {
            parser = this.parser;
        }
        if (typeof parser === "string") parser = FileFormatters.fromString(parser);
        fs.writeFileSync(file, parser.stringify(this.content));
    };
    Config.prototype.stringify = function (parser) {
        if (parser === void 0) {
            parser = this.parser;
        }
        if (typeof parser === "string") parser = FileFormatters.fromString(parser);
        return parser.stringify(this.content);
    };
    Config.prototype.contains = function (path, obj) {
        if (obj === void 0) {
            obj = this.content;
        }
        var parts = path.split(/\./g);
        var subparts = [];
        if (obj.hasOwnProperty(parts[0])) {
            for (var i = 1; i < parts.length; i++) {
                subparts[i - 1] = parts[i];
            }if (obj[parts[0]] instanceof Object) return this.contains(subparts.join("."), obj[parts[0]]);
            return true;
        }
        return false;
    };
    Config.prototype.get = function (path, obj) {
        if (obj === void 0) {
            obj = this.content;
        }
        if (this.contains(path, obj)) {
            var parts = path.split(/\./g);
            for (var i = 0; i < parts.length; i++) {
                obj = obj[parts[i]];
            }
            return obj;
        } else {
            console.log("Ooups... Trying to get empty path from Yaml: \"" + path + "\" Returning null!");
            return null;
        }
    };
    Config.prototype.set = function (path, val) {
        var parts = path.split(".");
        var obj = this.content;
        for (var i = 0; i < parts.length - 1; i++) {
            if (!obj[parts[i]] || !(obj[parts[i]] instanceof Object)) obj[parts[i]] = {};
            obj = obj[parts[i]];
        }
        var cmd = "this.content." + path + " = val;";
        eval(cmd);
    };
    Config.prototype.remove = function (path) {
        var parts = path.split(".");
        var obj = this.content;
        for (var i = 0; i < parts.length - 1; i++) {
            if (!obj[parts[i]] || !(obj[parts[i]] instanceof Object)) obj[parts[i]] = {};
            obj = obj[parts[i]];
        }
        var cmd = 'delete this.content."' + path + ";";
        eval(cmd);
    };
    Config.prototype.setStandart = function (path, val) {
        if (!this.contains(path)) this.set(path, val);
    };
    Config.prototype.concat = function (obj) {
        var _this = this;
        if (obj instanceof Config) {
            obj.list().forEach(function (e) {
                if (!_this.contains(e)) _this.set(e, obj.get(e));
            });
        } else {
            this.list(obj).forEach(function (e) {
                if (!_this.contains(e)) _this.set(e, _this.get(e, obj));
            });
        }
    };
    Config.prototype.apply = function (obj) {
        var _this = this;
        if (obj instanceof Config) {
            obj.list().forEach(function (e) {
                _this.set(e, obj.get(e));
            });
        } else {
            this.list(obj).forEach(function (e) {
                _this.set(e, _this.get(e, obj));
            });
        }
    };
    Config.prototype.list = function (obj) {
        var _this = this;
        if (obj === void 0) {
            obj = this.content;
        }
        var keys = Object.keys(obj);
        var ret = [];
        keys.forEach(function (e) {
            if (obj[e] instanceof Object) {
                _this.list(obj[e]).forEach(function (v) {
                    ret.push(e + "." + v);
                });
            } else ret.push(e);
        });
        return ret;
    };
    return Config;
}();
exports.Config = Config;
var FileFormatters;
(function (FileFormatters) {
    var JSONFormatter = /** @class */function () {
        function JSONFormatter() {
            this.stringify = JSON.stringify;
            this.parse = JSON.parse;
        }
        return JSONFormatter;
    }();
    var YAMLFormatter = /** @class */function () {
        function YAMLFormatter() {
            this.stringify = YAML.safeDump;
            this.parse = YAML.safeLoad;
        }
        return YAMLFormatter;
    }();
    FileFormatters.Json = new JSONFormatter();
    FileFormatters.Yaml = new YAMLFormatter();
    function fromString(from) {
        from = from.toLowerCase();
        if (from == "json") return this.Json;else if (from == "yaml") return this.Yaml;else return null;
    }
    FileFormatters.fromString = fromString;
})(FileFormatters || (FileFormatters = {}));
exports.FileFormatters = FileFormatters;
var config = new Config("config.yml", FileFormatters.Yaml);
exports.config = config;
loadConfig();
function loadConfig() {
    config.load();
    config.save();
}
global.FileFormatters = FileFormatters;
global.Config = Config;
global.config = config;
exports["default"] = config;
//# sourceMappingURL=Config.js.map
