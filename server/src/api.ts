#!/usr/bin/env node

import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import ServerSideApplication from './server';

export default function startServer(p=".",port=80) {
  const basedir:String = `${__dirname}/htdocs`;
  const server:ServerSideApplication = new ServerSideApplication(fs.realpathSync(p));
  const contentTypes:any = JSON.parse(fs.readFileSync(`${__dirname}/contenttypes.json`).toString());

  http.createServer(function (request:http.IncomingMessage, response:http.ServerResponse) {

      if(request.url.charAt(request.url.length-1)=="/")request.url+="index.html";

      console.log(`request starting by address "${request.connection.remoteAddress}": ${request.url}...`);

      if(request.url=="/server") {
        server.execRequest(request, response);
        return;
      }

      let filePath:string = basedir + request.url;
      if (filePath == './')
          filePath = './index.html';

      let extname:string = path.extname(filePath);
      let contentType:string = 'text/html';
      if(contentTypes[extname])contentType = contentTypes[extname];


      fs.readFile(filePath, function(error, content) {
          if (error) {
              if(error.code == 'ENOENT'){
                  fs.readFile(`${basedir}/404.html`, function(error, content) {
                      if(error)console.log("Error reading 404 file (code: "+error.code+") "+error);
                      response.writeHead(200, { 'Content-Type': contentType });
                      response.end(content, 'utf-8');
                  });
              }
              else {
                  response.writeHead(500);
                  response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                  console.log("Error occured while reading files from fs ("+filePath+") (code: "+error.code+") "+error);
                  response.end();
              }
          }
          else {
              response.writeHead(200, { 'Content-Type': contentType });
              response.end(content, 'utf-8');
          }
      });

  }).listen(port);

  console.log(`Running server on port ${port}`)
  console.log(`Access it via this link: localhost:"${port}"`)
}
