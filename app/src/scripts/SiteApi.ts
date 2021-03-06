import * as http from "http";
import * as https from "https";
import * as fs from "fs";

declare let global: any;

export async function loadSite(
  host: string | any,
  then: Function,
  path: string = "/",
  protocoll: string = "https"
) {
  if (host instanceof Object) {
    if (host.host && host.path) {
      if (host.protocoll) protocoll = host.protocoll;
      path = host.path;
      host = host.host;
    }
  }
  let ret;
  if (protocoll == "https") {
    var options = { host: host, path: path };
    var request = https.request(options, function(res) {
      var data = "";
      res.on("data", function(chunk) {
        data += chunk;
      });
      res.on("end", function() {
        then(data);
      });
    });
    request.on("error", function(e) {
      console.log(e.message);
    });
    await request.end();
  } else if (protocoll == "http") {
    var options = { host: host, path: path };
    var request = http.request(options, function(res) {
      var data = "";
      res.on("data", function(chunk) {
        data += chunk;
      });
      res.on("end", function() {
        then(data);
      });
    });
    request.on("error", function(e) {
      console.log(e.message);
    });
    await request.end();
  } else throw new Error('Unknown protocoll "' + protocoll + '"');
  return ret;
}

export function parseURL(url: string) {
  let host, path, protocoll;
  var match = url.match(/(https|http):\/\/?(.[^\/:]+)/i);
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === "string" &&
    match[2].length > 0
  ) {
    host = match[2];
  }

  var match = url.match(/(https|http):\/\/.[^\/:]+(.*)/i);
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === "string" &&
    match[2].length > 0
  ) {
    path = match[2];
  } else {
    return null;
  }
  if (url.startsWith("https://")) protocoll = "https";
  if (url.startsWith("http://")) protocoll = "http";
  return { host: host, path: path, protocoll: protocoll };
}

export function downloadFile(out: string, url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    let file = fs.createWriteStream(out);
    let request: http.ClientRequest;
    if (url.startsWith("https")) {
      console.log(url, out, "https");
      request = https.get(url, function(response) {
        response.pipe(file);
      });
    } else
      request = http.get(url, function(response) {
        response.pipe(file);
      });
    file.on("finish", resolve).on("error", reject);
    request.end();
  });
}

export let SiteApi: {
  loadSite: (
    host: string | any,
    then: Function,
    path?: string,
    protocoll?: string
  ) => Promise<any>;
  parseURL: (
    url: string
  ) => { host: string | any; path: string; protocoll: "http" | "https" };
  downloadFile: (out: string, url: string) => Promise<number>;
} = {
  loadSite: loadSite,
  parseURL: parseURL,
  downloadFile: downloadFile
};

global.SiteApi = SiteApi;
