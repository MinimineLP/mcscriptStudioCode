import * as fs from "fs";
import { Plugin } from "@mcscriptstudiocode/pluginmanager";
import { ExplorerAPI } from "@mcscriptstudiocodeplugins/explorer";

export default class ignorefile extends Plugin {

  setup() {
  }

  start() {
    (<ExplorerAPI>this.api.getAPI("explorer")).onReload(afterExplorerReload);
  }

  stop() {
  }

  reload() {
  }
}

function afterExplorerReload(files) {
  scan(files, []);
  function scan(files: any, ignore: string[]): any {
    Object.keys(files).forEach(function(key) {
      let value = files[key];
      if (key.toLowerCase() == ".mcscriptstudiocodeignore") {
        let content = fs.readFileSync(value, "utf8");
        content = content.replace(/\r/, "");
        let split = content.split(/\n/g);
        ignore = ignore.concat(split);
      }
    });
    let filter: RegExp[] = createFilter(ignore);
    Object.keys(files).forEach(function(key) {
      let value = files[key];
      if (testFilterMatch(filter, key)) delete files[key];
      if (value instanceof Object) {
        value = scan(value, ignore);
      }
    });
  }
  return files;
}

function parseIgnoreExpression(exp: string): RegExp {
  exp =
    "^" +
    exp
      .replace(/\\/, "\\\\")
      .replace(/\./, "\\.")
      .replace(/\[/, "\\[")
      .replace(/\]/, "\\]")
      .replace(/\(/, "\\]")
      .replace(/\)/, "\\]")
      .replace(/\{/, "\\]")
      .replace(/\}/, "\\]")
      .replace(/\*/, ".*")
      .replace(/\//, "\\/")
      .replace(/\^/, "\\^")
      .replace(/\$/, "\\$")
      .replace(/\?/, "\\?")
      .replace(/\+/, "\\+")
      .replace(/\=/, "\\=")
      .replace(/\|/, "\\|")
      .replace(/\,/, "\\,")
      .replace(/\=/, "\\=")
      .replace(/\=/, "\\=");
  exp += "$";
  return new RegExp(exp);
}

function createFilter(filter: string[]): RegExp[] {
  let filters: RegExp[] = [];
  for (let i in filter) {
    filters.push(parseIgnoreExpression(filter[i]));
  }
  return filters;
}

function testFilterMatch(filter: RegExp[], string: string): boolean {
  for (let i in filter) {
    if (filter[i].test(string)) return true;
  }
  return false;
}
