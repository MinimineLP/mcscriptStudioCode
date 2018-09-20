#!/usr/bin/env node
import startServer from "./api";

let port = 80;
let position = ".";

startServer(position,port);

console.log(`Running server on port ${port}`);
