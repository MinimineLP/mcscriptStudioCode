import {Api} from '@mcscriptstudiocode/pluginmanager';
declare class SettingsAPI implements Api {
  readonly name:string;
  readonly version:string;
  frame: JQuery<HTMLElement>;
  sites: SettingsSite[];

  loadFrame();
  show();
  hide();
  push(e: SettingsSite, index?: number);
}

declare interface SettingsSite {
  name: string;
  renderContent(): string | HTMLElement;
}

declare let settingsapi: SettingsAPI;

export { SettingsAPI, SettingsSite, settingsapi };
module.exports = { SettingsAPI, settingsapi };
