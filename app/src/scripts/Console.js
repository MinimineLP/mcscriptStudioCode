"use strict";var consolelog=console.log,consoleerr=console.error,consoleexception=console.exception,consoledebug=console.debug;function getDate(){var e=new Date;return e.getFullYear()+"/"+e.getMonth()+"/"+e.getDay()+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()}console.log=function(e){consolelog("["+getDate()+"][MCScriptStudioCode][Logging] ",e)},console.error=function(e){consoleerr("["+getDate()+"][MCScriptStudioCode][Error] ",e)},console.debug=function(e){consoledebug("["+getDate()+"][MCScriptStudioCode][Debug] ",e)};