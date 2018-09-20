#!/usr/bin/env node
"use strict";exports.__esModule=!0;var api_1=require("./api"),port=80,position=".";api_1.default(position,port),console.log("Running server on port "+port);