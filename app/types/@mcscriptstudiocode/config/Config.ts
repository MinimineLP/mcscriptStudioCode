declare class Config {
  file: string;
  content: any;
  parser: FileFormatters.FileFormatter;
  constructor(file: string, parser?: string | FileFormatters.FileFormatter);
  load(file?, parser?: string | FileFormatters.FileFormatter);
  save(file?, parser?: string | FileFormatters.FileFormatter);
  stringify(parser?: string | FileFormatters.FileFormatter): string;
  contains(path: string, obj?: any);
  get(path: string, obj?: any);
  set(path: string, val: any);
  remove(path: string);
  setStandart(path: string, val: any);
  concat(obj: object | Config);
  apply(obj: object | Config);
  list(obj?: Object): string[];
}

declare module FileFormatters {
  export interface FileFormatter {
    stringify(object: any): string;
    parse(string: string): any;
  }
  export let Json: FileFormatter;
  export let Yaml: FileFormatter;
  export function fromString(from: string): FileFormatter;
}

export { FileFormatters, Config };
module.exports = { FileFormatters, Config };
export default Config;
