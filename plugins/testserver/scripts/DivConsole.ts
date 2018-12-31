import * as Stream from "stream";
import * as Util from "util";

export class DivConsole {
  outStream: Stream.Writable = new DivConsoleOutStream(this);
  debugStream: Stream.Writable = new DivConsoleDebugStream(this);
  errorStream: Stream.Writable = new DivConsoleErrorStream(this);
  exceptionStream: Stream.Writable = new DivConsoleExceptionStream(this);
  contentList: ConsoleContentList = new ConsoleContentList();
  log(...args: any[]) {
    this.contentList.push(new ConsoleLogContent(args));
  }
  error(...args: any[]) {
    this.contentList.push(new ConsoleErrorContent(args));
  }
  debug(...args: any[]) {
    this.contentList.push(new ConsoleDebugContent(args));
  }
  exception(...args: any[]) {
    this.contentList.push(new ConsoleExceptionContent(args));
  }
  pipe(pipe: HTMLElement | Function | Stream.Writable) {
    this.contentList.pipe(pipe);
  }
  clear() {
    this.contentList.clear();
  }
}

export class ConsoleContent {
  type: string;
  content: any;
  constructor(type: string, ...args: any[]) {
    this.type = type;
    this.content = args;
  }
  getString(): string {
    return this.content.toString();
  }
  getHTML(): string {
    return this.content.toString();
  }
  getPrefix(): string {
    return `Console/${this.type.toUpperCase()}`;
  }
}

export class ConsoleLogContent extends ConsoleContent {
  constructor(...args: any[]) {
    super("log", args);
  }
  getPrefix(): string {
    return `Console/LOGGING`;
  }
}

export class ConsoleErrorContent extends ConsoleContent {
  constructor(...args: any[]) {
    super("error", args);
  }
  getPrefix(): string {
    return `Console/ERROR`;
  }
}

export class ConsoleExceptionContent extends ConsoleContent {
  constructor(...args: any[]) {
    super("exception", args);
  }
  getPrefix(): string {
    return `Console/EXCEPTION`;
  }
}

export class ConsoleDebugContent extends ConsoleContent {
  constructor(...args: any[]) {
    super("debug", args);
  }
  getPrefix(): string {
    return `Console/DEBUGGING`;
  }
}

export class ConsoleContentList {
  content: ConsoleContent[] = [];
  size: number = 1000;
  renderformat: string;
  pipes: (HTMLElement | Function | Stream.Writable)[] = [];

  constructor(renderformat: string = "%msg%") {
    this.renderformat = renderformat;
  }

  push(content: ConsoleContent): void {
    if (this.size < this.content.length)
      this.content.splice(0, this.content.length - this.size, content);
    else this.content.splice(0, 0, content);
    this.pipeToPipes(content);
  }

  parseRenderMessageHTML(format: string, content: ConsoleContent): string {
    return format
      .replace(/%msg%/g, content.getHTML())
      .replace(/%pre%/g, content.getPrefix());
  }

  parseRenderMessageString(format: string, content: ConsoleContent): string {
    return format
      .replace(/%msg%/g, content.getString())
      .replace(/%pre%/g, content.getPrefix());
  }

  renderHTML(
    max: number = this.size,
    renderformat = this.renderformat
  ): string {
    if (max == 0) max = this.size;
    let ret: string = "";
    if (max >= this.content.length) max = this.content.length - 1;
    for (let i = max; i >= 0; i--) {
      ret += this.parseRenderMessageHTML(renderformat, this.content[i]) + "\n";
    }
    return ret.replace(/\n/g, "\n<br/>");
  }

  renderString(
    max: number = this.size,
    renderformat = this.renderformat
  ): string {
    if (max == 0) max = this.size;
    let ret: string = "";
    if (max >= this.content.length) max = this.content.length - 1;
    for (let i = max; i >= 0; i--) {
      ret += this.parseRenderMessageString(renderformat, this.content[i]);
    }
    return ret;
  }

  pipe(pipe: HTMLElement | Function | Stream.Writable): void {
    if (pipe instanceof HTMLElement) pipe.innerHTML = this.renderHTML();
    this.pipes.push(pipe);
  }

  pipeToPipes(newelement: ConsoleContent): void {
    this.pipes.forEach((pipe: HTMLElement | Function | Stream.Writable) => {
      if (pipe instanceof HTMLElement) {
        pipe.innerHTML = this.renderHTML();
        pipe.scrollTop = pipe.scrollHeight;
      } else if (pipe instanceof Function) pipe(newelement.getString());
      else if (pipe instanceof Stream.Writable)
        pipe._write(newelement.getString(), "utf8", err => {
          if (err) console.error(err);
        });
    });
  }
  clear(): void {
    this.content = [];
  }
}

export function DivConsoleOutStream(console: DivConsole) {
  Stream.Writable.call(this);
  this.console = console;
}
Util.inherits(DivConsoleOutStream, Stream.Writable);
DivConsoleOutStream.prototype._write = function(chunk, _encoding, done) {
  this.console.log(chunk.toString());
  done();
};

export function DivConsoleErrorStream(console: DivConsole) {
  Stream.Writable.call(this);
  this.console = console;
}
Util.inherits(DivConsoleErrorStream, Stream.Writable);
DivConsoleErrorStream.prototype._write = function(chunk, _encoding, done) {
  this.console.error(chunk.toString());
  done();
};

export function DivConsoleExceptionStream(console: DivConsole) {
  Stream.Writable.call(this);
  this.console = console;
}
Util.inherits(DivConsoleErrorStream, Stream.Writable);
DivConsoleErrorStream.prototype._write = function(chunk, _encoding, done) {
  this.console.exception(chunk.toString());
  done();
};

export function DivConsoleDebugStream(console: DivConsole) {
  Stream.Writable.call(this);
  this.console = console;
}
Util.inherits(DivConsoleErrorStream, Stream.Writable);
DivConsoleErrorStream.prototype._write = function(chunk, _encoding, done) {
  this.console.debug(chunk.toString());
  done();
};
