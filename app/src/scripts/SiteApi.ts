import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';

declare global {
  interface String {
    startsWith(searchString) : boolean;
  }
}

String.prototype.startsWith = function(searchString) {
  let position = 0;
  return this.indexOf(searchString, position) === position;
};

export async function loadSite(host:string|any, then:Function, path:string="/", protocoll:string="https") {
  if(host instanceof Object) {
    if(host.host&&host.path) {
      if(host.protocoll)protocoll = host.protocoll;
      path = host.path;
      host = host.host;
    }
  }
  let ret;
  if(protocoll == "https") {
    var options = {host: host, path: path};
    var request = https.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        then(data);
      });
    });
    request.on('error', function (e) {
      console.log(e.message);
    });
    await request.end();
  }
  else if(protocoll == "http") {
    var options = {host: host, path: path};
    var request = http.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        then(data);
      });
    });
    request.on('error', function (e) {
      console.log(e.message);
    });
    await request.end();
  }
  else throw new Error("Unknown protocoll \""+protocoll+"\"");
  return ret;
}

export function parseURL(url:string) {
  let host, path, protocoll;
  var match = url.match(/(https|http):\/\/?(.[^\/:]+)/i);
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    host = match[2];
  }

  var match = url.match(/(https|http):\/\/.[^\/:]+(.*)/i);
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    path = match[2];
  }
  else {
    return null;
  }
  if(url.startsWith("https://"))protocoll="https";
  if(url.startsWith("http://"))protocoll="http";
  return {host: host, path: path, protocoll: protocoll};
}

export function downloadFile(out:string, url:string, then:(fd: number) => void = function(){}) {
  let file = fs.createWriteStream(out);
  let request;
  if(url.startsWith("https"))request = https.get(url, function(response) {
    response.pipe(file);
  });
  else request = http.get(url, function(response) {
    response.pipe(file);
  });
  file.on('finish', then);
  request.end();
}
