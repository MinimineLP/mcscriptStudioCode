#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var api_1 = require("./api");
var port = 80;
var position = ".";
api_1["default"](position, port);
console.log("Running server on port " + port);
