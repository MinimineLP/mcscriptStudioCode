import { BrowserWindow, Menu, app } from "electron";
import { mainWindow } from "../../main";

const defaulttemplate: ItemOptions[] = [
  {
    label: "File",
    submenu: [
      {
        label: "Save",
        accelerator: "CmdOrCtrl+S",
        click: function() {
          mainWindow.webContents.send("menu_action", "file.save");
        }
      },
      {
        label: "Save as",
        accelerator: "CmdOrCtrl+Shift+S",
        click: function() {
          mainWindow.webContents.send("menu_action", "file.save_as");
        }
      } /*
      {
        label: 'Open File',
        accelerator: 'CmdOrCtrl+S',
        click: function() {mainWindow.webContents.send('menu_action','file.open');}
      },
      {
        label: 'Open Folder',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: function() {mainWindow.webContents.send('menu_action','file.open_folder');}
      },*/,
      {
        label: "New File",
        accelerator: "CmdOrCtrl+N",
        click: function() {
          mainWindow.webContents.send("menu_action", "file.new");
        }
      },
      {
        label: "New Folder",
        accelerator: "CmdOrCtrl+Shift+N",
        click: function() {
          mainWindow.webContents.send("menu_action", "file.new_folder");
        }
      },
      {
        label: "Exit",
        accelerator: "Alt+F4",
        click: function() {
          mainWindow.close();
        }
      }
    ]
  },
  {
    label: "Edit",
    submenu: [
      {
        role: "undo"
      },
      {
        role: "redo"
      },
      {
        type: "separator"
      },
      {
        role: "cut"
      },
      {
        role: "copy"
      },
      {
        role: "paste"
      },
      {
        role: "pasteandmatchstyle"
      },
      {
        role: "delete"
      },
      {
        role: "selectall"
      }
    ]
  },
  {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "CmdOrCtrl+R",
        click(_item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        }
      },
      {
        label: "Toggle Developer Tools",
        accelerator:
          process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
        click(_item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        }
      },
      {
        type: "separator"
      },
      {
        role: "resetzoom"
      },
      {
        role: "zoomin"
      },
      {
        role: "zoomout"
      },
      {
        type: "separator"
      },
      {
        role: "togglefullscreen"
      }
    ]
  },
  {
    role: "window",
    submenu: [
      {
        role: "minimize"
      },
      {
        role: "close"
      }
    ]
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click() {
          require("electron").shell.openExternal("http://electron.atom.io");
        }
      }
    ]
  }
];

if (process.platform === "darwin") {
  const name = app.getName();
  defaulttemplate.unshift({
    label: name,
    submenu: [
      {
        role: "about"
      },
      {
        type: "separator"
      },
      {
        role: "services",
        submenu: []
      },
      {
        type: "separator"
      },
      {
        role: "hide"
      },
      {
        role: "hideothers"
      },
      {
        role: "unhide"
      },
      {
        type: "separator"
      },
      {
        role: "quit"
      }
    ]
  });
  // Edit menu.
  defaulttemplate[1].submenu.push(
    {
      type: "separator"
    },
    {
      label: "Speech",
      submenu: [
        {
          role: "startspeaking"
        },
        {
          role: "stopspeaking"
        }
      ]
    }
  );
  // Window menu.
  defaulttemplate[3].submenu = [
    {
      label: "Close",
      accelerator: "CmdOrCtrl+W",
      role: "close"
    },
    {
      label: "Minimize",
      accelerator: "CmdOrCtrl+M",
      role: "minimize"
    },
    {
      label: "Zoom",
      role: "zoom"
    },
    {
      type: "separator"
    },
    {
      label: "Bring All to Front",
      role: "front"
    }
  ];
}

class MenuManager {
  template: any;
  constructor(template = defaulttemplate) {
    this.template = template;
  }
  getMenu() {
    return Menu.buildFromTemplate(this.template);
  }
  apply(_window: BrowserWindow): MenuManager {
    Menu.setApplicationMenu(this.getMenu());
    return this;
  }

  // WARNING: Not ready and has errors
  pushItem(path: string, itemOptions: ItemOptions, indexes: number[] = []) {
    console.warn(
      "Please do not use the pushItem method, it has bugs and may crash the program"
    );
    function insert(arr: any[], value: any, indexesindex: number) {
      if (indexes[indexesindex] != null)
        arr.splice(indexes[indexesindex], 0, created[0]);
      else arr.push(value);
      return arr;
    }

    let split: string[] = path.split(".");

    let subs: ItemOptions[] = this.template;
    let created: ItemOptions[] = [];
    for (let i: number = 0; i < split.length; i++) {
      let alreadyExists: boolean = false;
      for (let c: number = 0; c < subs.length; c++) {
        if (subs[c].label == split[i]) {
          delete subs[subs.indexOf(subs[c])];
          if (created[i - 1]) created[i - 1].submenu = subs;
          else this.template = subs;
          created.push(subs[i]);
          if (!subs[c].submenu) subs[c].submenu = [];
          subs = subs[c].submenu;
          alreadyExists = true;
          break;
        }
      }
      if (!alreadyExists) {
        created.push({ label: split[i], submenu: [] });
        subs = [];
      }
    }
    created[created.length - 1].submenu.push(itemOptions);

    for (let i: number = created.length - 1; i > 0; i--) {
      created[i - 1].submenu.push(created[i]);
    }

    this.template = insert(this.template, created[0], 0);
  }
}
class ItemOptions {
  label?: string;
  role?: string;
  accelerator?: string;
  type?: string;
  click?: Function;
  submenu?: ItemOptions[];
}

export default MenuManager;
export { MenuManager };
