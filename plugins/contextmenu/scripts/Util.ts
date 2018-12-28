declare let global:any;

class ContextMenuPointBuildingOptions {
  name:string;
  click?:EventListener;
  subs?:ContextMenu;
}

class ContextMenuPoint {

  name:string;
  click?:EventListener;
  subs?:ContextMenu;

  constructor (options:ContextMenuPointBuildingOptions) {
    this.name = options.name;
    this.click = options.click;
    this.subs = options.subs;
  }

  render():HTMLLIElement {
    let li:HTMLLIElement = document.createElement("li");

    let p:HTMLParagraphElement = document.createElement("p");
    p.innerText = this.name;
    li.appendChild(p);

    if(this.subs) li.appendChild(this.subs.render());

    if(this.click) li.addEventListener("click",this.click);

    return li;
  }
}

class ContextMenu {
  points: ContextMenuPoint[][];
  constructor(points:ContextMenuPoint[][] = []) {
    this.points = points;
  }

  push(...e:ContextMenuPoint[]) {
    this.points.push(e);
  };
  render():HTMLDivElement {
    let ret:HTMLDivElement = document.createElement("div");
    this.points.forEach(function(i:ContextMenuPoint[]) {
      let ul:HTMLUListElement = document.createElement("ul");
      i.forEach(function(p:ContextMenuPoint) {
        ul.appendChild(p.render());
      });
      ret.appendChild(ul);
    });
    return ret;
  }
}

export {ContextMenu,ContextMenuPoint,ContextMenuPointBuildingOptions}
global.ContextMenu = ContextMenu
global.ContextMenuPoint = ContextMenuPoint
global.ContextMenuPointBuildingOptions = ContextMenuPointBuildingOptions
