"use strict";$(window).bind("keydown",function(e){if(116==e.keyCode)return!1;if(e.ctrlKey||e.metaKey)switch(String.fromCharCode(e.which).toLowerCase()){case"s":case"f":case"g":case"u":case"w":return!1}}),$(window).bind("keydown",function(e){if(116==e.keyCode)reloadExplorer();else if(e.ctrlKey||e.metaKey)switch(String.fromCharCode(e.which).toLowerCase()){case"s":editor.save()}});