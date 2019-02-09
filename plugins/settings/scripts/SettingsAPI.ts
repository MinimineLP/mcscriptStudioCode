import * as $ from "jquery";
import {guid} from '@mcscriptstudiocode/util'
import {Api} from '@mcscriptstudiocode/pluginmanager'

export class SettingsAPI implements Api {
  readonly name:string = "Settings";
  readonly version:string = "0.0.1";
  frame: JQuery<HTMLElement>;
  sites: SettingsSite[] = [];

  loadFrame() {
    this.frame = $("#settings");
  }
  show() {
    let THIS = this;
    THIS.frame.empty();

    let settingsContent: HTMLDivElement = document.createElement("div");
    settingsContent.id = "settingsContent";
    settingsContent.classList.add("settingsContent");
    settingsContent.innerHTML = `<div class="settingsContent-empty"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="none" d="M0 0h20v20H0V0z"/><path fill="#555" d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg></div>`;

    let close: HTMLElement = document.createElement("i");
    close.id = "settingsClose";
    close.classList.add("settingsClose", "mdi", "mdi-close");
    close.onclick = function() {
      THIS.hide();
    };

    let nav: HTMLUListElement = document.createElement("ul");
    nav.classList.add("settingsNav");
    nav.id = "settingsNav";

    THIS.sites.forEach((e: SettingsSite) => {
      let li = document.createElement("li");
      let p = document.createElement("p");
      li.id = guid();
      p.innerText = e.name;

      li.onclick = function() {
        $(`#${li.id}`)
          .parent()
          .children(".active")
          .removeClass("active");
        $(this).addClass("active");
        $(`#${settingsContent.id}`).empty();
        $(`#${settingsContent.id}`).append(e.renderContent());
      };

      li.appendChild(p);
      nav.appendChild(li);
    });
    THIS.frame.append(nav);
    THIS.frame.append(settingsContent);
    THIS.frame.append(close);
    THIS.frame.show();
  }
  hide() {
    this.frame.empty();
    this.frame.hide();
  }
  push(e: SettingsSite, index: number = this.sites.length) {
    this.sites.splice(index, 0, e);
  }
}

export interface SettingsSite {
  name: string;
  renderContent(): string | HTMLElement;
}

export let settingsapi = new SettingsAPI();

require("./plugins.js");
require("./install.js");
