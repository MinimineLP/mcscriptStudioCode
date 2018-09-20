/**
 * @name PluginManager
 * @author Minimine <https://github.com/miniminelp>
 * @description this PluginManage is a part of the MCScriptStudioCode editor. It is Licensed under MIT License.
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 */

import * as fs from 'fs';
import * as http from 'http';
import * as SiteAPI from './siteapi';
import * as extract from 'extract-zip';

declare let global;

/**
 *
 */
global.srclocation = __dirname;

/**
 * @class PluginManager
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description The manager for the plugins
 *
 */
class PluginManager {

  /**
   * @var plugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The loaded plugins
   *
   */
  plugins: Plugin[];

  /**
   * @var api
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The api
   *
   */
  api: ServerApi;

  /**
   * @function constructor
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Constructor for Class PluginManager
   * @param plugindir the dir where the plugins are
   *
   */
  constructor() {
    this.plugins = [];
    this.api = new ServerApi();
  }

  /**
   * @function loadPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   *
   * @copyright (c) Minimine 2018
   * @description Loads the plugins
   *
   */
  loadPlugins(plugindir:string): void {
    if(!fs.existsSync(plugindir))fs.mkdirSync(plugindir);
    for(let i of this.getPlugins(plugindir)) {
      this.plugins.push(this.loadPlugin(plugindir,i));
    }
  }

  /**
   * @function loadPlugin
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Loads a Plugin
   * @param plugin the Plugin to load
   * @return the plugin main file default class
   *
   */
  loadPlugin(plugindir:string,plugin:string): Plugin {
    let {name, url, author, author_url, version, main} = this.getPluginDescription(plugindir,plugin);
    let Plugin = require(`${plugindir}/${plugin}/`+main).default;
    return new Plugin(name, url, author, author_url, version, main);
  }

  /**
   * @function setupPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description setups the plugins
   *
   */
  setupPlugins(): void {

    this.api.addFile(`${__dirname}/../jquery/jquery.js`);
    this.api.addScript(`${__dirname}/../jquery/jquery.min.js`);
    this.api.addFile(`${__dirname}/../jquery/jquery.min.js.map`);
    this.api.addScript(`${__dirname}/htdocs/scripts/prototypes-min.js`)
    this.api.addScript(`${__dirname}/htdocs/scripts/ajax-min.js`)
    this.api.addScript(`${__dirname}/htdocs/scripts/setupWindow-min.js`)

    this.api.addStylesheet(`${__dirname}/htdocs/style/style.min.css`);

    for(let plugin of this.plugins) plugin.setup(this.api);
    this.api.registerListener(new OnRequest(this.api))

  }

  /**
   * @function startPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Starts the plugins
   *
   */
  startPlugins(): void {
    for(let plugin of this.plugins) plugin.start(this.api);
  }

  /**
   * @function stopPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description stops the plugins
   *
   */
  stopPlugins(): void {
    for(let plugin of this.plugins) plugin.stop(this.api);
  }

  /**
   * @function reloadPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description reloads the plugins
   *
   */
  reloadPlugins(): void {
    for(let plugin of this.plugins) plugin.reload(this.api);
  }

  /**
   * @function getPluginDescription
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description returns the description of a plugin
   * @param plugin the Plugin to load
   * @return the plugin.json content
   *
   */
  getPluginDescription(plugindir:string,plugin:string): any {
    return JSON.parse(fs.readFileSync(`${plugindir}/${plugin}/plugin.json`).toString());
  }

  /**
   * @function getPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description scans for plugins in the plugindir
   * @return the plugins in the plugindir
   *
   */
  getPlugins(plugindir): string[] {
    let ret = [];
    for(let i of fs.readdirSync(plugindir)) {
      if(fs.lstatSync(plugindir + "/" + i).isDirectory())ret.push(i);
    }
    return ret;
  }

  /**
   * @function fireEvent
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   * @description register a listener
   *
   * @param event the Event to fire
   */
  fireEvent(event:Event):Event {
    return this.api.fireEvent(event);
  }

  /**
   * @function installPlugin
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   * @description install a plugin (by url into pluginfolder)
   *
   * @param url the url
   * @param pluginfolder the pluginfoder
   */
  installPlugin(url:string, pluginfolder:string) {
    let THIS = this;
    SiteAPI.loadSite(SiteAPI.parseURL(url), function(res) {
      res = JSON.parse(res);
      if(!fs.existsSync(pluginfolder + "/" + res.name)) {
        let zipfile:string = `${pluginfolder}/${res.name}.tmp.zip`;
        SiteAPI.downloadFile(zipfile,res.versions[res.newestversion], function() {
          extract(zipfile, {dir: `${pluginfolder}/${res.name}`}, function (err) {
            if(err)console.log(err);
            else {
              let plugin = THIS.loadPlugin(pluginfolder,res.name);
              plugin.setup(THIS.api);
              plugin.start(THIS.api);
              THIS.plugins.push(plugin);
              fs.unlinkSync(zipfile);
            }
          });
        });
      }
    });
  }
}





/**
 * @class ServerApi
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description The Api to manage the server
 *
 */
class ServerApi {

  /**
   * @var listeners
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description contains the listeners
   *
   */
  listeners:Array<Listener> = [];

  /**
   * @var scripts
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Contains the scripts
   *
   */
  scripts: any = {};

  /**
   * @var stylesheets
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Contains the stylesheets
   *
   */
  stylesheets: any = {};

  /**
   * @var files
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Contains the files
   *
   */
  files: any = {};

  /**
   * @var apis
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the api register (can be got)
   *
   */
  apis: any = {};

  /**
   * @function on
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description register a function as listener by event name
   * @deprecated Use ServerApi#registerListener(Listener)
   * @param event the event to listen for
   * @param func the function to execute when event appears
   */
  on(event:string, func:Function) {
    this.registerListener(new OnListener(event,func));
  }

  /**
   * @function registerListener
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description register a listener
   * @param listener the listener to register
   */
  registerListener(listener:Listener) {
    this.listeners.push(listener);
  }

  /**
   * @function fireEvent
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description register a listener
   * @param event the Event to fire
   */
  fireEvent(event:Event):Event {
    let type = event.getType();
    for(let listener of this.listeners) {
      if(listener.getType()==type) {
        listener.run(event);
      }
    }
    return event;
  }

  /**
   * @function addScript
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018

   * @description register a script
   * @param src the script source
   */
  addScript(src:string, id:string = `/${guid()}.js`):string {
    this.scripts[id] = src;
    return id;
  }

  /**
   * @function addStylesheet
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018

   * @description register a stylesheet
   * @param src the stylesheet source
   */
  addStylesheet(src:string, id:string = `/${guid()}.css`):string {
    this.stylesheets[id] = src;
    return id;
  }

  /**
   * @function addFile
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018

   * @description register a stylesheet
   * @param src the file source
   */
  addFile(src:string, id:string = null):string {
    if(id == null)id = `/${guid()}.${src.split(".")[src.split(".").length-1]}`;
    this.files[id] = src;
    return id;
  }

  /**
   * @function registerAPI
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018

   * @description register a api
   * @param key the api key
   * @param api the api
   */
  registerAPI(key:string, api:any):void {
    this.apis[key] = api;
  }

  /**
   * @function registerAPI
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018

   * @description register a api
   * @param key the api key
   * @return the api
   */
  getAPI(key:string):any {
    return this.apis[key];
  }
}




/**
 * @class Plugin
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description the plugin definition
 * @abstract
 *
 */
abstract class Plugin {

  /**
   * @var name
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's name
   *
   */
  name:string;

  /**
   * @var url
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's url
   *
   */
  url:string;

  /**
   * @var author
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's author(s)
   *
   */
  author:string|string[];

  /**
   * @var author_url
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin authors's url(s)
   *
   */
  author_url:string|string[];

  /**
   * @var version
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's version
   *
   */
  version:string;

  /**
   * @var main
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's main file
   *
   */
  main:string;

  /**
   * @function constructor
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Constructor for the Plugin class
   * @param name the plugin's name
   * @param url the plugin's url
   * @param author the plugin's author(s)
   * @param author_url the plugin author's url(s)
   * @param version the plugin's version
   * @param main the plugin's main file
   *
   */
  constructor(name:string, url:string, author:string|string[], author_url:string|string[], version:string, main:string) {
    this.name = name;
    this.url = url;
    this.author = author;
    this.author_url = author_url;
    this.version = version;
    this.main = main;
  }

  /**
   * @function setup
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The setup method for the plugin
   * @param server the server APIs
   * @abstract
   *
   */
  abstract setup(server:ServerApi);

  /**
   * @function start
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The start method for the plugin
   * @param server the server APIs
   * @abstract
   *
   */
  abstract start(server:ServerApi);

  /**
   * @function register
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The stop method for the plugin
   * @param server the server APIs
   * @abstract
   *
   */
  abstract stop(server:ServerApi);

  /**
   * @function register
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The reload method for the plugin
   * @param server the server APIs
   * @abstract
   *
   */
  abstract reload(server:ServerApi);
}











/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Events
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */





 /**
  * @interface Event
  * @author Minimine <https://github.com/miniminelp>
  * @since 0.0.2
  * @version 0.0.2
  * @license MIT
  * @copyright (c) Minimine 2018
  *
  * @description Event interface
  *
  */
interface Event {

  /**
   * @function getType
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Returns the event's type
   *
   */
  getType():string;
}





/**
 * @interface CancelableEvent
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description CancelableEvent Event
 * @extends Event
 *
 */
interface CancelableEvent extends Event {

  /**
   * @var canceled
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description saves if the event is canceled
   *
   */
  canceled: boolean;

  /**
   * @function cancel
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description cancels the Event (or the default reaction)
   *
   */
  cancel();
}





/**
 * @class RequestEvent
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @implements CancelableEvent
 */
class RequestEvent implements CancelableEvent {

  /**
   * @see CancelableEvent#canceled
   *
   * @var canceled
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description saves if the event is canceled
   *
   */
  canceled: boolean = false;

  /**
   * @var request
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the http request
   *
   */
  request: http.IncomingMessage;

  /**
   * @var request
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the http response
   *
   */
  response: http.ServerResponse;

  /**
   * @function constructor
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The Constructor for the RequestEvent
   * @param request the request
   * @param response the response
   *
   */
  constructor(request:http.IncomingMessage, response: http.ServerResponse){
    this.request = request;
    this.response = response;
  }

  /**
   * @see Event#getType
   *
   * @function getType
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description cancels the Event (or the default reaction)
   * @return the type
   *
   */
  getType(): string {
    return "request";
  }


  /**
   * @see CancelableEvent#cancel
   *
   * @function cancel
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description cancels the Event (or the default reaction)
   *
   */
  cancel() {
    this.canceled = true;
  }
}










/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Listeners
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */




 /**
  * @interface Listener
  * @author Minimine <https://github.com/miniminelp>
  * @since 0.0.2
  * @version 0.0.2
  * @license MIT
  * @copyright (c) Minimine 2018
  *
  * @description The Listener inteface.
  */
interface Listener {

  /**
   * @function getType
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description get the listener type (the event the listener is waiting for)
   * @return the type
   *
   */
  getType():string;

  /**
   * @function run
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Runs the listener
   * @param event the Event
   *
   */
  run(event:Event):void;
}




/**
 * @class OnListener
 * @implements Listener
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description Listening for a event by name (deprecated)
 * @deprecated on-Listeners are deprecated, make Listeners from the Listener interface
 *
 */
class OnListener implements Listener {

  /**
   * @var trigger
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the trigger event
   *
   */
  trigger:string;

  /**
   * @var func
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Executed when event apears
   *
   */
  func:Function;

  /**
   * @function constructor
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the constructor vor OnListener
   * @param trigger the trigger
   * @param func the Function to execute when the event apears
   *
   */
  constructor(trigger:string, func:Function) {
    this.trigger=trigger;
    this.func=func;
  }

  /**
   * @see Listener#run
   *
   * @function run
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description executed when the event apears
   * @param event the event
   *
   */
  run(event: Event) {
    this.func(event);
  }

  /**
   * @see Listener#getType
   *
   * @function get Type
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description returns the type of the event
   * @return the Event type
   */
  getType(): string {
    return this.trigger;
  }
}





/**
 * @class ServerApi
 * @implements Listener
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description Listening for requsts
 * @abstract
 *
 */
abstract class RequestListener implements Listener {

  /**
   * @see Listener#run
   *
   * @function run
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the function will be run when the Event appears
   * @param Event the Event
   * @abstract
   *
   */
  abstract run(event: RequestEvent);

  /**
   * @see Listener#getType
   *
   * @function getType
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the function will be run when the Event appears
   * @return the type
   * @abstract
   *
   */
  getType(): string {
    return "request";
  }
}










/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Functions
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */
// guid: returns a uuid
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}










/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Static
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */
 const contenttypes:any = JSON.parse(fs.readFileSync(`${__dirname}/contenttypes.json`).toString());
 class OnRequest extends RequestListener {

   api: ServerApi;

  constructor(api: ServerApi) {
    super();
    this.api = api;
  }

  run(event: RequestEvent) {
    let url = event.request.url;
    if(url.charAt(url.length-1)=="/")url+="index.html";

    if(url == "/index.html") {
      let add = "";

      for(let k in this.api.scripts) {
        add += `<script src="${k}"></script>`;
      }
      for(let k in this.api.stylesheets) {
        add += `<link type="text/css" rel="stylesheet" href="${k}">`;
      }

      event.response.writeHead(200, { 'Content-Type': "text/html" });
      event.response.end(fs.readFileSync(`${__dirname}/htdocs/index.html`).toString().replace(/%scriptplaceholder%/g, add));
      event.cancel();
    }

    for(let s in this.api.scripts) {
      if(event.request.url == s) {
        event.response.writeHead(200, { 'Content-Type': "text/javascript" });
        event.response.end(fs.readFileSync(this.api.scripts[s]));
        event.cancel();
      }
    }

    for(let s in this.api.stylesheets) {
      if(event.request.url == s) {
        event.response.writeHead(200, { 'Content-Type': "text/css" });
        event.response.end(fs.readFileSync(this.api.stylesheets[s]));
        event.cancel();
      }
    }

    for(let s in this.api.files) {
      if(event.request.url == s) {
        let file = this.api.files[s];
        let ending = file.split(".")[file.split(".").length-1];
        let contenttype = "text/html";
        if(contenttypes[ending])contenttype = contenttypes[ending];
        event.response.writeHead(200, { 'Content-Type': contenttype });
        event.response.end(fs.readFileSync(this.api.files[s]));
        event.cancel();
      }
    }
  }
}









 /*
  **********************************************************************************************************************************
  **********************************************************************************************************************************
  Exports
  **********************************************************************************************************************************
  **********************************************************************************************************************************
  */

export default PluginManager;

export {
  // Standart APIs
  Plugin, ServerApi, PluginManager,

  // Events
  Event, RequestEvent,

  // Listeners
  Listener, OnListener, RequestListener,
};
