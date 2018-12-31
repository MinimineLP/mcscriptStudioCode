let consolelog = console.log;
let consoleerr = console.error;
let consoleexception = console.exception;
let consoledebug = console.debug;

function getDate() {
  let date = new Date();
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

console.log = function(tolog) {
  consolelog(`[${getDate()}][MCScriptStudioCode][Logging] `, tolog);
};

console.error = function(tolog) {
  consoleerr(`[${getDate()}][MCScriptStudioCode][Error] `, tolog);
};

console.debug = function(tolog) {
  consoledebug(`[${getDate()}][MCScriptStudioCode][Debug] `, tolog);
};
