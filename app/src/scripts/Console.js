"use strict";

var consolelog = console.log;
var consoleerr = console.error;
var consoleexception = console.exception;
var consoledebug = console.debug;
function getDate() {
    var date = new Date();
    return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
console.log = function (tolog) {
    consolelog("[" + getDate() + "][MCScriptStudioCode][Logging] ", tolog);
};
console.error = function (tolog) {
    consoleerr("[" + getDate() + "][MCScriptStudioCode][Error] ", tolog);
};
console.debug = function (tolog) {
    consoledebug("[" + getDate() + "][MCScriptStudioCode][Debug] ", tolog);
};
//# sourceMappingURL=Console.js.map
