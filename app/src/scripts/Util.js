"use strict";

exports.__esModule = true;
var fs = require("fs");
var Path = require("path");
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
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}
exports.guid = guid;
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
function copyFileSync(source, target) {
    var targetFile = target;
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = Path.join(target, Path.basename(source));
        }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}
exports.copyFileSync = copyFileSync;
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
function copyFolderRecursiveSync(source, target, useOldName) {
    if (useOldName === void 0) {
        useOldName = true;
    }
    var files = [];
    var targetFolder = target;
    if (useOldName) targetFolder = Path.join(target, Path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = Path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}
exports.copyFolderRecursiveSync = copyFolderRecursiveSync;
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
function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolderRecursive(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
exports.deleteFolderRecursive = deleteFolderRecursive;
//# sourceMappingURL=Util.js.map
