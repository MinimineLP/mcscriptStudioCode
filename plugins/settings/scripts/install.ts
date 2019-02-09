import * as SiteAPI from "@mcscriptstudiocode/siteapi";
import { settingsapi } from "./SettingsAPI";
import { PluginManager, PluginApi } from "@mcscriptstudiocode/pluginmanager";
import * as Path from "path";
let api: PluginApi = PluginManager.instance.api;
settingsapi.push({
  name: "install",
  renderContent: function(): string | HTMLElement {
    let main: HTMLDivElement = document.createElement("div");
    let ul: HTMLUListElement = document.createElement("ul");
    main.id = "settings_install";
    ul.classList.add("settings_install", "menu");

    SiteAPI.loadSite(
      SiteAPI.parseURL(
        "https://raw.githubusercontent.com/MinimineLP/mcscriptStudioCode/master/plugins/plugins.json"
      ),
      res => {
        let packages: string[] = JSON.parse(res);
        packages.forEach(e => {
          SiteAPI.loadSite(SiteAPI.parseURL(e), r => {
            r = JSON.parse(r);

            for (let i = 0; i < api.plugins.length; i++) {
              if (api.plugins[i].name.toLowerCase() == r.name.toLowerCase())
                return;
            }

            let li: HTMLLIElement = document.createElement("li");
            let infos: HTMLDivElement = document.createElement("div");
            let name: HTMLParagraphElement = document.createElement("p");
            let subinfos: HTMLUListElement = document.createElement("ul");
            let author: HTMLLIElement = document.createElement("li");
            let url: HTMLLIElement = document.createElement("li");
            let version: HTMLLIElement = document.createElement("li");
            let install: HTMLButtonElement = document.createElement("button");
            let installicon: HTMLElement = document.createElement("i");

            name.innerText = r.name;
            name.classList.add("name");
            infos.appendChild(name);

            author.innerText = r.author;
            author.classList.add("author");
            subinfos.appendChild(author);

            version.innerText = r.newestversion;
            version.classList.add("version");
            subinfos.appendChild(version);

            subinfos.classList.add("subinfos");
            infos.appendChild(subinfos);

            url.innerText = r.url;
            url.classList.add("url");
            subinfos.appendChild(url);

            installicon.classList.add("mdi", "mdi-download");
            install.appendChild(installicon);

            install.classList.add("installbutton");
            install.onclick = () => {
              install.classList.add("clicked");
              api.manager.installPlugin(
                e,
                Path.join(__dirname, "../.."),
                () => {
                  install.parentElement.style.display = "none";
                  //@ts-ignore
                  swal({
                    title: `Installed "${r.name}" successfully!`,
                    text: `Installed "${
                      r.name
                    }" successfully! You need to restart the Editor if you want the Plugin to work. If you restart now, file changes will be lost, so save them now! Restart now?`,
                    icon: "success",
                    buttons: [true, "Restart now!"],
                    dangerMode: true
                  }).then(close => {
                    if (close) window.location.reload();
                  });
                }
              );
            };

            infos.classList.add("infos");

            li.appendChild(infos);
            li.appendChild(install);
            ul.appendChild(li);
          });
        });
      }
    );

    main.appendChild(ul);
    return main;
  }
});
