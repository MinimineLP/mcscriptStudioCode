import { settingsapi } from "./SettingsAPI";
import {
  PluginManager,
  PluginApi,
  Plugin
} from "@mcscriptstudiocode/pluginmanager";
import { guid } from "@mcscriptstudiocode/util";
import * as $ from "jquery";
import * as fs from "fs";
import * as marked from "marked";
let api: PluginApi = PluginManager.instance.api;

settingsapi.push({
  name: "plugins",
  renderContent: function(): string | HTMLElement {
    let main: HTMLDivElement = document.createElement("div");
    let ul: HTMLUListElement = document.createElement("ul");
    let cont: HTMLDivElement = document.createElement("div");
    cont.style.display = "none";
    main.id = "settings_plugins";
    ul.classList.add("settings_plugins", "menu");
    cont.classList.add("settings_plugins", "content");
    api.plugins.forEach((plugin: Plugin) => {
      let li: HTMLLIElement = document.createElement("li");
      let p: HTMLParagraphElement = document.createElement("p");
      let infos: HTMLDivElement = document.createElement("div");
      let h3: HTMLElement = document.createElement("h3");
      let table: HTMLTableElement = document.createElement("table");

      infos.classList.add("infos");
      table.classList.add("infostable");
      h3.classList.add("infoheadline");

      h3.innerText = "Infos";

      table.appendChild(createInfoTableEntry("Name", "" + plugin.name));
      table.appendChild(createInfoTableEntry("Url", "" + plugin.url));
      table.appendChild(createInfoTableEntry("Version", "v" + plugin.version));
      table.appendChild(createInfoTableEntry("Author", "" + plugin.author));
      table.appendChild(
        createInfoTableEntry("Author's url", "" + plugin.author_url)
      );

      infos.appendChild(h3);
      infos.appendChild(table);

      p.innerText = plugin.name;
      li.appendChild(p);

      let configid = guid();
      let configSaveId = guid();
      let config = createConfigEditor(plugin, configid, configSaveId);
      let readme = createReadmeViewer(plugin);

      $(li).click(() => {
        $(ul).hide();
        $(cont).show();
        $(cont).empty();
        $(cont).append(infos);
        if (config) {
          $(cont).append(config);
          let editor = (<any>(api
            .getAPI("editor")))
            .createEditor(
              document.getElementById(configid),
              "text/x-yaml",
              "3024-night"
            );
          $(`#${configSaveId}`).click(e => {
            e.preventDefault();
            fs.writeFileSync(
              `${plugin.path}/config.yml`,
              editor.getValue(),
              "utf8"
            );
            return false;
          });
        }
        if (readme) $(cont).append(readme);
      });
      ul.appendChild(li);
    });
    main.appendChild(ul);
    main.appendChild(cont);
    return main;
  }
});

function createInfoTableEntry(key: string, value: string): HTMLTableRowElement {
  let name: HTMLElement[] = [];
  name[0] = document.createElement("tr");
  name[1] = document.createElement("th");
  name[2] = document.createElement("th");
  name[1].innerText = key;
  name[2].innerText = value;
  name[0].appendChild(name[1]);
  name[0].appendChild(name[2]);
  return <HTMLTableRowElement>name[0];
}

function createConfigEditor(
  plugin: Plugin,
  textareaid: string = guid(),
  savebuttonid: string = guid()
): HTMLDivElement {
  if (!fs.existsSync(`${plugin.path}/config.yml`)) return;

  let div: HTMLDivElement = document.createElement("div");
  let config: HTMLTextAreaElement = document.createElement("textarea");
  let save: HTMLButtonElement = document.createElement("button");
  let h3: HTMLElement = document.createElement("h3");

  div.classList.add("config");
  h3.innerText = "Config";
  config.value = fs.readFileSync(`${plugin.path}/config.yml`, "utf8");
  config.id = textareaid;

  save.innerText = "Save";
  save.id = savebuttonid;

  div.appendChild(h3);
  div.appendChild(config);
  div.appendChild(save);

  return div;
}

function createReadmeViewer(plugin: Plugin): HTMLDivElement {
  if (!fs.existsSync(`${plugin.path}/README.md`)) return;
  let content = fs.readFileSync(`${plugin.path}/README.md`, "utf8");
  let html = marked(content);

  let div: HTMLDivElement = document.createElement("div");
  let cont: HTMLDivElement = document.createElement("div");
  let h3: HTMLElement = document.createElement("h3");

  div.classList.add("readme");
  cont.classList.add("readme-content");

  h3.innerText = "Readme";
  cont.innerHTML = html;

  div.appendChild(cont);
  return div;
}
