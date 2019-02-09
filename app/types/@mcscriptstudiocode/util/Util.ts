import * as fs from "fs";

/**
 * @function CallbackFunction
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.3
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description A callback function type
 * @param err the error (Error | undefined)
 * @param res the result (String | undefined)
 *
 */
declare interface CallbackFunction {
  (err?: Error | undefined, res?: any | undefined): void;
}

/**
 * @function guid
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.1
 * @version 0.0.1
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description returns a random uuid
 * @return random uuid
 *
 */
declare function guid():string;

/**
 * @function copyFileSync
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.3
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description copys a file
 * @param source the source file
 * @param target the paste target
 *
 */
declare function copyFileSync(source, target);

/**
 * @function copyFolderRecursiveSync
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.3
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description copys a folder recursively
 * @param source the source folder
 * @param target the paste target
 * @param useOldName should a sub folder created with the old name? default: true
 *
 */
declare function copyFolderRecursiveSync(
  source: string,
  target: string,
  useOldName?: boolean
);

/**
 * @function deleteFolderRecursive
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.3
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description deletes a folder recursively
 * @param path the folder to delete
 *
 */
declare function deleteFolderRecursive(path: fs.PathLike);

declare interface Map<V> {
  [key: string]: V;
}

export {
  CallbackFunction,
  Map,
  guid,
  copyFileSync,
  copyFolderRecursiveSync,
  deleteFolderRecursive
};

module.exports = {
  guid: guid,
  copyFileSync: copyFileSync,
  copyFolderRecursiveSync: copyFolderRecursiveSync,
  deleteFolderRecursive: deleteFolderRecursive
}
