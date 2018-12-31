let fs = require("fs")
let https = require("https")
/*let src = "C:/Users/Nicolas/AppData/Roaming/mcscriptStudioCode/plugins/unknown.zip"
let dest = "C:/Users/Nicolas/AppData/Roaming/mcscriptStudioCode/plugins/Contextmenu"

let extract = require("extract-zip")

extract(src, {
  dir: dest
}, function(err) {
  console.error(err)
})*/
let url = "https://raw.githubusercontent.com/MinimineLP/mcscriptStudioCode/master/plugins/contextmenu/versions/0.0.1.zip"
let file = fs.createWriteStream("zip.zip");
let request = https.get(url, function(response) {
  response.pipe(file);
});