#!/usr/bin/env node

import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import ServerSideApplication from './server';
import {PluginManager,RequestEvent} from './PluginManager';
import * as SiteAPI from './siteapi';

export default startServer;
export {startServer,createServer,SiteAPI,ServerSideApplication,PluginManager,RequestEvent};

function createServer(p:string=".",loadPlugins:boolean=true): any {

  let manager = new PluginManager();
  if(loadPlugins) {
    manager.loadPlugins(`${__dirname}/../plugins`);
    manager.setupPlugins();
    manager.startPlugins();
    SiteAPI.loadSite({host: "raw.githubusercontent.com", path: '/MinimineLP/MCScriptStudioCode-core-plugins/master/plugins-core.json', protocoll: 'https'}, function(ret) {
      for(let url of JSON.parse(ret)) manager.installPlugin(url,`${__dirname}/../plugins`);
    });
  }

  let basedir:String = `${__dirname}/htdocs`;
  let server:ServerSideApplication = new ServerSideApplication(fs.realpathSync(p));
  let contentTypes:any = JSON.parse(fs.readFileSync(`${__dirname}/contenttypes.json`).toString());

  let httpserver = http.createServer(function (request:http.IncomingMessage, response:http.ServerResponse) {

    request.url = request.url.split("#")[0].split("?")[0];

    let event:RequestEvent = <RequestEvent>manager.fireEvent(new RequestEvent(request,response));
    if(event.canceled)return;

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
  });

  return {server: httpserver, manager: manager};
}

function startServer(p=".",port=80,loadPlugins:boolean=true): any {
  let server = createServer(p,loadPlugins);
  server.server.listen(port);
  return server;
}
