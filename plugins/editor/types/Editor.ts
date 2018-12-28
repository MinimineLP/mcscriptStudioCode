declare class Highlights {
  mcscript:string;
  mcfunction:string;
  mcmeta:string;
  json:string;
  md:string;
  js:string;
  html:string;
  yml:string;
}

declare class Editor {

  highlights:Highlights;

  actual:string;

  opened:any;

  texteditors:any[];

  constructor();

  createEditor(element:HTMLTextAreaElement|HTMLDivElement, mode?:string, theme?:string);

  getMode(ending);

  save();

  undo();

  redo();

  closeActual(): void;

  open(path);
};
declare function createEditor(mode,value):EditorCreateAnswer;

declare interface EditorCreateAnswer {
  editor: any;
  id: string;
  div: HTMLDivElement;
  content: string;
  type: "code"|"text";
}

declare let editor;

export default editor;
export {editor,Editor,createEditor};
module.exports = {editor:editor,Editor:Editor,createEditor:createEditor}
module.exports.default = editor;
