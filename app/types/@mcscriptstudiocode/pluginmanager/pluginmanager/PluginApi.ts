import Event from "./events/Event";
import Listener from "./listeners/Listener";
import PluginManager from "./PluginManager";
import OnListener from "./listeners/OnListener";
import Plugin from "./Plugin";
import Api from "./Api";
import { Map } from "../../Util";

/**
 * @class PluginApi
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018 - 2019
 *
 * @description The Api to manage the server
 *
 */
class PluginApi implements Api {

  /**
   * @var name
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2019
   *
   * @description the name
   *
   */
  name: string = "0.0.3";

  /**
   * @var version
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2019
   *
   * @description the version
   *
   */
  version: string = "0.0.3";

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
  listeners: Array<Listener> = [];

  /**
   * @var apis
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the api register (can be got)
   *
   */
  apis: Map<Api> = {};

  /**
   * @var manager
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The the plugin manager
   *
   */
  manager: PluginManager;

  /**
   * @var plugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description All the registered Plugins
   *
   */
  plugins: Plugin[];

  /**
   * @function constructor
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Constructorclass for the ServerApi
   */
  constructor(manager: PluginManager) {
    this.manager = manager;
    this.plugins = manager.plugins;
  }

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
  on(event: string, func: Function) {
    this.registerListener(new OnListener(event, func));
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
  registerListener(listener: Listener) {
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
   *
   */
  fireEvent(event: Event): Event {
    let type = event.getType();
    for (let listener of this.listeners) {
      if (listener.getType() == type) {
        listener.run(event);
      }
    }
    return event;
  }

  /**
   * @function addStylesheet
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description loads a css stylesheet via a <link> tag
   * @param stylesheet the script path
   *
   */
  addStylesheet(stylesheet: string) {
    if (!document.getElementById(stylesheet)) {
      var head: HTMLHeadElement = document.getElementsByTagName("head")[0];
      var link: HTMLLinkElement = document.createElement("link");
      link.id = stylesheet;
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = stylesheet;
      link.media = "all";
      head.appendChild(link);
    }
  }

  /**
   * @function addScript
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @deprecated please use require(yourscript) instead
   * @description loads a javascript via a <script src="yourscript"></script>
   * @param script the element's path
   *
   */
  addScript(script: string) {
    console.warn(
      "Please use require(yourscript) instead of the deprecated method ServerApi#addScript()"
    );
    //console.log(`Loaded script from "${script}"`);
    if (!document.getElementById(script)) {
      var head: HTMLHeadElement = document.getElementsByTagName("head")[0];
      var link: HTMLScriptElement = document.createElement("script");
      link.id = script;
      link.type = "text/javascript";
      link.src = script;
      head.appendChild(link);
    }
  }

  /**
   * @function addElement
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description adds an element to the document's body
   * @param element the element to add
   *
   */
  addElement(element: string | HTMLElement) {
    if (element instanceof HTMLElement) document.body.appendChild(element);
    else $("body").append(element);
  }

  /**
   * @function registerAPI
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018

   * @description register a api
   * @param key the api key
   * @param api the api
   */
  registerAPI(key: string, api: Api): void {
    this.apis[key] = api;
  }

  /**
   * @function getAPI
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018

   * @description get a api
   * @param key the api key
   * @return the api
   */
  getAPI(key: string): Api {
    return this.apis[key];
  }
}

export default PluginApi;
export { PluginApi };
