import * as YAML from 'js-yaml'
import * as fs from 'fs'

declare let global:any;

class Config {

  file: string;
  content: any;
  parser: FileFormatters.FileFormatter;

  constructor(file:string,parser:string|FileFormatters.FileFormatter = FileFormatters.Json) {
    if(typeof parser === "string")parser = FileFormatters.fromString(parser);
    this.parser = parser;
    this.file = file;
    if (!fs.existsSync(file)) {
      file = file.replace("\\", "/");
      let parts = file.split("/");
      for (let i = 1; i < parts.length; i++) {
        let path = "";
        for (let c = 0; c < i; c++)
          path += parts[c] + "/";
        if (!fs.existsSync(path)) fs.mkdirSync(path);
      }
      fs.writeFileSync(file, "");
    }
    this.load();
  }

  load(file = this.file, parser:string|FileFormatters.FileFormatter = this.parser) {
    if(typeof parser === "string")parser = FileFormatters.fromString(parser);
    this.content = parser.parse(fs.readFileSync(file, 'utf8'));
    if (this.content == null) this.content = {};
  }

  save(file = this.file, parser:string|FileFormatters.FileFormatter = this.parser) {
    if(typeof parser === "string")parser = FileFormatters.fromString(parser);
    fs.writeFileSync(file, parser.stringify(this.content));
  }

  stringify(parser:string|FileFormatters.FileFormatter = this.parser):string {
    if(typeof parser === "string")parser = FileFormatters.fromString(parser);
    return parser.stringify(this.content)
  }

  contains(path:string, obj = this.content) {
    let parts:Array<string> = path.split(/\./g);
    let subparts:Array<string> = [];
    if (obj.hasOwnProperty(parts[0])) {
      for(let i=1;i<parts.length;i++) subparts[i-1] = parts[i];
      if (obj[parts[0]] instanceof Object) return this.contains(subparts.join("."), obj[parts[0]]);
      return true;
    }
    return false;
  }

  get(path:string, obj = this.content) {
    if (this.contains(path,obj)) {
      let parts = path.split(/\./g);
      for (let i = 0; i < parts.length; i++) {
        obj = obj[parts[i]];
      }
      return obj;
    } else {
      console.log(`Ooups... Trying to get empty path from Yaml: "${path}" Returning null!`);
      return null;
    }
  }

  set(path:string, val:any) {

    let parts = path.split(".");
    let obj = this.content;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!obj[parts[i]] || !(obj[parts[i]] instanceof Object)) obj[parts[i]] = {};
      obj = obj[parts[i]];
    }

    let cmd = 'this.content.' + path +' = val;';
    eval(cmd);

  }

  remove(path:string) {

    let parts = path.split(".");
    let obj = this.content;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!obj[parts[i]] || !(obj[parts[i]] instanceof Object)) obj[parts[i]] = {};
      obj = obj[parts[i]];
    }

    let cmd = 'delete this.content."' + path +';';
    eval(cmd)

  }

  setStandart(path:string, val:any) {
    if (!this.contains(path)) this.set(path, val);
  }

  concat(obj:object|Config) {
    if(obj instanceof Config) {
      obj.list().forEach((e:string) => {
        if(!this.contains(e))this.set(e,obj.get(e));
      });
    }
    else {
      this.list(obj).forEach((e:string) => {
        if(!this.contains(e))this.set(e, this.get(e, obj));
      });
    }
  }

  apply(obj:object|Config) {
    if(obj instanceof Config) {
      obj.list().forEach((e:string) => {
        this.set(e,obj.get(e));
      });
    }
    else {
      this.list(obj).forEach((e:string) => {
        this.set(e, this.get(e, obj));
      });
    }
  }

  list(obj:Object = this.content):string[] {
    let keys = Object.keys(obj);
    let ret:string[] = [];
    keys.forEach((e) => {
      if(obj[e] instanceof Object) {
        this.list(obj[e]).forEach((v) => {
          ret.push(e+"."+v);
        });
      }
      else ret.push(e);
    });
    return ret;
  }
}

module FileFormatters {

  export interface FileFormatter {
    stringify(object:any):string;
    parse(string:string):any;
  }

  class JSONFormatter implements FileFormatter {
    stringify = JSON.stringify;
    parse = JSON.parse;
  }

  class YAMLFormatter implements FileFormatter {
    stringify = YAML.safeDump;
    parse = YAML.safeLoad;
  }

  export let Json:FileFormatter = new JSONFormatter();
  export let Yaml:FileFormatter = new YAMLFormatter();

  export function fromString(from:string):FileFormatter {
    from = from.toLowerCase();
    if(from=="json")return this.Json;
    else if(from=="yaml")return this.Yaml;
    else return null;
  }
}

let config:Config = new Config("config.yml",FileFormatters.Yaml);
loadConfig();

function loadConfig() {
  config.load();
  config.save();
}

global.FileFormatters = FileFormatters;
global.Config = Config;
global.config = config;

export default config;
export {Config, FileFormatters, config}
