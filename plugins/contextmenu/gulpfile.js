const gulp = require(`gulp`),
  sass = require(`gulp-sass`),
  cleanCSS = require(`gulp-clean-css`),
  autoprefixer = require(`gulp-autoprefixer`),
  rename = require(`gulp-rename`),
  uglify = require(`gulp-uglify`),
  plumber = require(`gulp-plumber`),
  babel = require(`gulp-babel`),
  clean = require(`gulp-clean`),
  sourcemaps = require(`gulp-sourcemaps`),
  htmlmin = require(`gulp-html-minifier`),
  ts = require('gulp-typescript'),
  concat = require('gulp-concat'),
  path = require('path'),
  fs = require('fs-extra'),
  zipFolder = require('zip-folder'),
  readline = require('readline');


let data = fs.readFileSync(`${__dirname}/package.json`, 'utf8');

try {
  data = JSON.parse(data);
} catch (e) {
  console.error("Error in package.json, could not parse it!", e)
  return;
}
let config = JSON.parse(fs.readFileSync(path.join(__dirname, "compiler.json")));

/**
 * Formatters for console
 */
let Formats = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
};

/**
 * The table colors
 */
let tablecolors = [
  Formats.FgGreen,
  Formats.FgCyan,
  Formats.FgRed,
  Formats.FgMagenta
]


/**
 * Clean style Function complation results
 */
function cleanStyle() {
  if (!fs.existsSync(`./style/css/`)) fs.mkdirsSync(path.resolve(`./style/css/`))
  return Promise.all([
    new Promise((resolve, reject) => {
      gulp.src('style/css/*.min.css')
        .pipe(clean())
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    }),
    new Promise((resolve, reject) => {
      gulp.src('style/css/*.min.css.map')
        .pipe(clean())
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    })
  ])
}

/**
 * Clean Typescript's compilation results
 */
function cleanTypescript() {
  if (!fs.existsSync(`./scripts/`)) fs.mkdirsSync(path.resolve(`./scripts/`))
  return Promise.all([
    new Promise((resolve, reject) => {
      gulp.src(['*.js', '!gulpfile.js'])
        .pipe(clean())
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    }),
    new Promise((resolve, reject) => {
      gulp.src(['*.js.map', '!gulpfile.js'])
        .pipe(clean())
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    }),
    new Promise((resolve, reject) => {
      gulp.src('scripts/*.js')
        .pipe(clean())
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    }),
    new Promise((resolve, reject) => {
      gulp.src('scripts/*.js.map')
        .pipe(clean())
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    }),
  ]);
}

/**
 * Cleans Types's compilation results
 */
function cleanTypes() {
  if (!fs.existsSync(`./types/`)) fs.mkdirsSync(path.resolve(`./types/`))
  return Promise.all([
    new Promise((resolve, reject) => {
      gulp.src('types/*.js')
        .pipe(clean())
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    }),
    new Promise((resolve, reject) => {
      gulp.src('types/*.js.map')
        .pipe(clean())
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    }),
  ]);
}

/**
 * Cleans HTML's compilation results
 */
function cleanHTML() {
  if (!fs.existsSync(`./html/`)) fs.mkdirsSync(path.resolve(`./html/`))
  return new Promise((resolve, reject) => {
    gulp.src('html/*.min.html')
      .pipe(clean())
      .on('error', reject)
      .on('end', resolve)
      .on('finish', resolve)
  });
}

/**
 * Style Task compiles Sass, SCSS and normal css to minified css
 */
function style() {
  return new Promise((rs, rj) => {
    cleanStyle().then(() => {
      Promise.all([
        new Promise((resolve, reject) => {
          gulp.src('style/css/*.css')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(autoprefixer())
            .pipe(cleanCSS())
            .pipe(rename({
              suffix: '.min'
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('style/css/'))
            .on('error', reject)
            .on('end', resolve)
            .on('finish', resolve);
        }),

        new Promise((resolve, reject) => {
          gulp.src('style/scss/*.scss')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cleanCSS())
            .pipe(rename({
              suffix: '.min'
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('style/css/'))
            .on('error', reject)
            .on('end', resolve)
            .on('finish', resolve);
        }),
        new Promise((resolve, reject) => {
          gulp.src('style/sass/*.sass')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cleanCSS())
            .pipe(rename({
              suffix: '.min'
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('style/css/'))
            .on('error', reject)
            .on('end', resolve)
            .on('finish', resolve);
        })
      ]).then(() => {
        gulp.src('style/css/*.min.css')
          .pipe(plumber())
          .pipe(sourcemaps.init())
          .pipe(concat('global.css'))
          .pipe(cleanCSS())
          .pipe(rename({
            suffix: '.min'
          }))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('style/css/'))
          .on('error', rj)
          .on('end', rs)
          .on('finish', rs);
      });
    });
  });
}

/**
 * Typescript compiles typescript from ./ and ./scripts/
 */
function typescript() {

  cleanTypescript();

  return Promise.all([
    new Promise((resolve, reject) => {
      gulp.src('*.ts')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts.createProject('tsconfig.json')({}))
        .on("error", () => {})
        .pipe(babel({
          presets: ["babel-preset-env"].map(require.resolve)
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'))
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    }),
    new Promise((resolve, reject) => {
      gulp.src('scripts/*.ts')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts.createProject('tsconfig.json')({}))
        .on("error", () => {})
        .pipe(babel({
          presets: ["babel-preset-env"].map(require.resolve)
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('scripts/'))
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    })
  ]);
}


/**
 * Compiles typescript trom ./types
 */
function types() {
  cleanTypes();

  return new Promise((resolve, reject) => {
    gulp.src('types/*.ts')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(ts.createProject('tsconfig.json')({}))
      .on("error", () => {})
      .pipe(babel({
        presets: ["babel-preset-env"].map(require.resolve)
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('types/'))
      .on('error', reject)
      .on('end', resolve)
      .on('finish', resolve);
  });
}

/**
 * Minifies HTML from ./html
 */
function html() {
  return new Promise((resolve, reject) => {
    cleanHTML().then(() => {
      gulp.src('html/*.html')
        .pipe(plumber())
        .pipe(htmlmin({
          collapseWhitespace: true
        }))
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest('html/'))
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);;
    });
  });
}

/**
 * listens for style changes and autocompiles
 */
function listenStyle() {
  gulp.watch(['style/sass/*.sass', 'style/scss/*.scss', 'style/css/*.css', '!style/css/*.min.css'], ['style']);
}

/**
 * listens for typescript changes and autocompiles
 */
function listenTypescript() {
  gulp.watch(['scripts/*.ts', "*.ts"], ['typescript']);
}

/**
 * listens for types changes and autocompiles
 */
function listenTypes() {
  gulp.watch(['types/*.ts'], ['types']);
}

/**
 * Listen html and autocompiles
 */
function listenHTML() {
  gulp.watch(['html/*.html', '!html/*.min.html'], ['html']);
}

/**
 * Listen everything and autocompiles
 */
function listen() {
  listenStyle();
  listenTypescript();
  listenTypes();
  listenHTML();
}

function once() {
  gulp.start("style");
  gulp.start("typescript");
  gulp.start("types");
  gulp.start("html");
}

function start() {
  once();
  listen();
}

function newSass() {
  return new Promise((rs, rj) => {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Please enter name for the new sass file: ', (d) => {
      let name = d.toString().trim().toLowerCase();
      if (name.endsWith(".sass")) name = name.slice(0, -5);
      if (!fs.existsSync(`./style/sass/`)) fs.mkdirsSync(path.resolve(`./style/sass/`))
      let file = path.resolve(`./style/sass/${name}.sass`);
      if (!fs.existsSync(file)) {
        console.log(Formats.FgGreen + `Creating sass file "${file}"` + Formats.Reset);
        fs.writeFileSync(file, `// style/sass/${name}.sass\n// Style with sass\n\nhead \n  display: none\n`);
        console.log(`${Formats.FgCyan}Code-Snippet for import: "${Formats.FgYellow}server.addStylesheet${Formats.FgWhite}(${Formats.FgGreen}\`${Formats.FgRed}\${__dirname}${Formats.FgGreen}/style/css/${name}.min.css\`${Formats.FgWhite})${Formats.FgCyan}"${Formats.Reset}`)
        console.log(`${Formats.FgCyan}Code-Snippet for global import: "${Formats.FgYellow}server.addStylesheet${Formats.FgWhite}(${Formats.FgGreen}\`${Formats.FgRed}\${__dirname}${Formats.FgGreen}/style/css/global.min.css\`${Formats.FgWhite})${Formats.FgCyan}"${Formats.Reset}`)
        style().then(rs);
      } else {
        console.log(Formats.FgRed + `\nFile "${file}" already exists` + Formats.Reset);
        rs();
      }
      rl.close();
    });
  });
}

function newScss() {
  return new Promise((rs, rj) => {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Please enter name for the new scss file: ', (d) => {
      let name = d.toString().trim().toLowerCase();
      if (name.endsWith(".scss")) name = name.slice(0, -5);
      if (!fs.existsSync(`./style/scss/`)) fs.mkdirsSync(path.resolve(`./style/scss/`))
      let file = path.resolve(`./style/scss/${name}.scss`);
      if (!fs.existsSync(file)) {
        console.log(Formats.FgGreen + `Creating scss file "${file}"` + Formats.Reset);
        fs.writeFileSync(file, `// style/scss/${name}.scss\n// Style with scss\n\nhead {\n  display: none;\n}`);
        console.log(`${Formats.FgCyan}Code-Snippet for import: "${Formats.FgYellow}server.addStylesheet${Formats.FgWhite}(${Formats.FgGreen}\`${Formats.FgRed}\${__dirname}${Formats.FgGreen}/style/css/${name}.min.css\`${Formats.FgWhite})${Formats.FgCyan}"${Formats.Reset}`)
        console.log(`${Formats.FgCyan}Code-Snippet for global import: "${Formats.FgYellow}server.addStylesheet${Formats.FgWhite}(${Formats.FgGreen}\`${Formats.FgRed}\${__dirname}${Formats.FgGreen}/style/css/global.min.css\`${Formats.FgWhite})${Formats.FgCyan}"${Formats.Reset}`)
        style().then(rs);
      } else {
        console.log(Formats.FgRed + `File "${file}" already exists` + Formats.Reset);
        rs();
      }
      rl.close();
    });
  });
}

function newCss() {
  return new Promise((rs, rj) => {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Please enter name for the new css file: ', (d) => {
      let name = d.toString().trim().toLowerCase();
      if (name.endsWith(".css")) name = name.slice(0, -4);
      if (!fs.existsSync(`./style/css/`)) fs.mkdirsSync(path.resolve(`./style/css/`))
      let file = path.resolve(`./style/css/${name}.css`);
      if (!fs.existsSync(file)) {
        console.log(Formats.FgGreen + `Creating css file "${file}"` + Formats.Reset);
        fs.writeFileSync(file, `/* style/css/${name}.css */\n/* Style with css */\n\nhead {\n  display: none;\n}`);
        console.log(`${Formats.FgCyan}Code-Snippet for import: "${Formats.FgYellow}server.addStylesheet${Formats.FgWhite}(${Formats.FgGreen}\`${Formats.FgRed}\${__dirname}${Formats.FgGreen}/style/css/${name}.min.css\`${Formats.FgWhite})${Formats.FgCyan}"${Formats.Reset}`)
        console.log(`${Formats.FgCyan}Code-Snippet for global import: "${Formats.FgYellow}server.addStylesheet${Formats.FgWhite}(${Formats.FgGreen}\`${Formats.FgRed}\${__dirname}${Formats.FgGreen}/style/css/global.min.css\`${Formats.FgWhite})${Formats.FgCyan}"${Formats.Reset}`)
        style().then(rs);
      } else {
        console.log(Formats.FgRed + `File "${file}" already exists` + Formats.Reset);
        rs();
      }
      rl.close();
    });
  });
}

function newScript() {
  return new Promise((rs, rj) => {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Please enter name for the new typescript file: ', (d) => {
      let name = d.toString().trim().toLowerCase();
      if (name.endsWith(".ts")) name = name.slice(0, -3);
      if (!fs.existsSync(`./scripts/`)) fs.mkdirsSync(path.resolve(`./scripts/`))
      let file = path.resolve(`./scripts/${name}.ts`);
      if (!fs.existsSync(file)) {
        console.log(Formats.FgGreen + `Creating typescript file "${file}"` + Formats.Reset);
        fs.writeFileSync(file, `// scripts/${name}.ts \n// Here you can code Typescript\n\nexport default class ${name.charAt(0).toUpperCase() + name.slice(1)} {\n  constructor() {\n    \n  }\n}`);
        console.log(`${Formats.FgCyan}Code-Snippet for import: "${Formats.FgMagenta}import ${Formats.FgYellow}* ${Formats.FgMagenta}as ${Formats.FgWhite}${name.charAt(0).toUpperCase() + name.slice(1)} ${Formats.FgMagenta}from ${Formats.FgGreen}\`./scripts/${name}\`${Formats.FgCyan}"${Formats.Reset}`)
        typescript().then(rs);
      } else {
        console.log(Formats.FgRed + `File "${file}" already exists` + Formats.Reset);
        rs();
      }
      rl.close();
    });
  });
}

function newTypes() {
  return new Promise((rs, rj) => {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Please enter name for the new (Type\'s) typescript file: ', (d) => {
      let name = d.toString().trim().toLowerCase();
      if (name.endsWith(".ts")) name = name.slice(0, -3);
      if (!fs.existsSync(`./types/`)) fs.mkdirsSync(path.resolve(`./types/`))
      let file = path.resolve(`./types/${name}.ts`);
      if (!fs.existsSync(file)) {
        console.log(Formats.FgGreen + `Creating (Type's) typescript file "${file}"` + Formats.Reset);
        fs.writeFileSync(file, `// types/${name}.ts // Here you can code Typescript\n\nexport default class ${name.charAt(0).toUpperCase() + name.slice(1)} {\n  constructor() {\n    \n  }\n}`);
        console.log(`\n${Formats.FgCyan}Code-Snippet for import: "${Formats.FgMagenta}import ${Formats.FgYellow}* ${Formats.FgMagenta}as ${Formats.FgWhite}${name.charAt(0).toUpperCase() + name.slice(1)} ${Formats.FgMagenta}from ${Formats.FgGreen}\`@mcscriptstudiocodeplugins/${data.name}/${name}\`${Formats.FgCyan}"${Formats.Reset}`)
        types().then(rs);
      } else {
        console.log(Formats.FgRed + `File "${file}" already exists` + Formats.Reset);
        rs();
      }
      rl.close();
    });
  });
}

function newHTML() {
  return new Promise((rs, rj) => {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Please enter name for the new html file: ', (d) => {
      let name = d.toString().trim().toLowerCase();
      if (name.endsWith(".html")) name = name.slice(0, -5);
      if (!fs.existsSync(`./html/`)) fs.mkdirsSync(path.resolve(`./html/`))
      let file = path.resolve(`./html/${name}.html`);
      if (!fs.existsSync(file)) {
        console.log(Formats.FgGreen + `\nCreating html file "${file}"` + Formats.Reset);
        fs.writeFileSync(file, `<!-- html/${name}.html -->\n<!-- Here you can code html -->\n\n`);
        console.log(`${Formats.FgCyan}Code-Snippet for import fs (required for import): "${Formats.FgMagenta}import ${Formats.FgYellow}* ${Formats.FgMagenta}as ${Formats.FgWhite}fs ${Formats.FgMagenta}from ${Formats.FgGreen}\`fs\`${Formats.FgCyan}"${Formats.Reset}`)
        console.log(`${Formats.FgCyan}Code-Snippet for adding (from core): "${Formats.FgYellow}server.addElement${Formats.FgWhite}(${Formats.FgYellow}fs.readFileSync(${Formats.FgGreen}\`${Formats.FgRed}\${__dirname}${Formats.FgGreen}/html/${name}.min.html\`${Formats.FgWhite}, ${Formats.FgGreen}\`utf8\`${Formats.FgWhite})${Formats.FgCyan}"${Formats.Reset}`)
        console.log(`${Formats.FgCyan}Code-Snippet for adding (from scripts): "${Formats.FgYellow}server.addElement${Formats.FgWhite}(${Formats.FgYellow}fs.readFileSync(${Formats.FgGreen}\`${Formats.FgRed}\${__dirname}${Formats.FgGreen}/../html/${name}.min.html\`${Formats.FgWhite}, ${Formats.FgGreen}\`utf8\`${Formats.FgWhite})${Formats.FgCyan}"${Formats.Reset}`)
        html().then(rs);
      } else {
        console.log(Formats.FgRed + `File "${file}" already exists` + Formats.Reset);
        rs();
      }
      rl.close();
    });
  });
}

function build() {

  return new Promise((rs, rj) => {

    function copyFileSync(source, target) {

      var targetFile = target;

      //if target is a directory a new file with the same name will be created
      if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
          targetFile = path.join(target, path.basename(source))
        }
      }
      fs.writeFileSync(targetFile, fs.readFileSync(source))
    }

    function copyFolderRecursiveSync(source, target) {
      var files = [];

      //check if folder needs to be created or integrated
      var targetFolder = target
      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder)
      }

      //copy
      if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source)
        files.forEach((file) => {
          var curSource = path.join(source, file)
          switch (path.basename(curSource)) {
            case "builds":
              break;
            case "node_modules":
              break;
            default:
              if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, path.join(targetFolder, path.basename(curSource)))
              } else {
                copyFileSync(curSource, targetFolder)
              }
              break;
          }
        });
      }
    }

    async function Clean(...src) {

      if (src instanceof Array) {
        let promises = [];
        for (let i = 0; i < src.length; i++) {
          let e = src[i]
          promises.push(new Promise((resolve, reject) => {
            gulp.src(e).pipe(clean())
              .on('error', reject)
              .on('end', resolve)
              .on('finish', resolve);
          }).catch(console.error));
        }
        await Promise.all(promises);
      } else await (new Promise((resolve, reject) => {
        gulp.src(src)
          .pipe(plumber())
          .pipe(clean())
          .on('error', reject)
          .on('end', resolve)
          .on('finish', resolve);
      })).catch(console.error);
    }

    let {
      version
    } = data
    let builds = path.join(__dirname, "builds")
    let folder = path.join(builds, `tmp-${version}`)
    let file = path.join(builds, `${version}.zip`);

    if (fs.existsSync(folder)) fs.removeSync(folder)
    if (fs.existsSync(file)) fs.removeSync(file)

    if (!fs.existsSync(builds)) fs.mkdirSync(builds);
    copyFolderRecursiveSync(__dirname, folder);

    Clean(
      path.join(folder, "gulpfile.js"),
      path.join(folder, ".atomignore"),
      path.join(folder, ".gitignore"),
      path.join(folder, "tsconfig.json"),
      path.join(folder, "versions.json"),
      path.join(folder, "compiler.json"),
      path.join(folder, "package-lock.json"),
      path.join(folder, "*.ts"),
      path.join(folder, "scripts/*.ts"),
      path.join(folder, "style/scss"),
      path.join(folder, "style/sass"),
      path.join(folder, "node_modules"),
      [path.join(folder, "html/*.html"), "!" + path.join(folder, "html/*.min.html")],
      [path.join(folder, "style/css/*.css"), "!" + path.join(folder, "style/css/*.min.css")]
    ).then(() => {
      zipFolder(folder, file, function(err) {
        if (err) {
          console.log('oh no!', err)
        } else {
          fs.remove(folder).catch(console.error)
          let versions = JSON.parse(fs.readFileSync("versions.json", "utf8"))
          versions.versions[version] = config.baseurl + "builds/0.0.1.zip"
          versions.newestversion = version;
          fs.writeFileSync("versions.json", JSON.stringify(versions, null, 2), "utf8")
        }
        rs()
      })
    });
  });
}


/**
 * Help task
 */
function help() {
  function stringRepeat(string, count) {
    let ret = ""
    for (let i = 0; i < count; i++) ret += string;
    return ret;
  }

  function renderTemplate(template) {
    size = 0;
    let sizes = []
    template.forEach((e) => {
      if (e instanceof Array)
        e.forEach((c, i) => {
          if (!sizes[i]) sizes[i] = 0
          if ((c.length + 1) > sizes[i]) {
            sizes[i] = c.length + 1;
          }
        })
      else if (size < e.length) size = e.length;
    })
    let x = 0;
    sizes.forEach((e) => {
      x += e
    })
    if (size < x) size = x;
    let render = Formats.FgYellow + "┌" + stringRepeat("─", size + 1) + "┐" + Formats.Reset
    template.forEach((e) => {
      render += "\n"
      if (e instanceof Array) {
        render += Formats.FgYellow + "│ " + Formats.Reset
        let x = ""
        e.forEach((c, i) => {
          if (tablecolors[i]) x += tablecolors[i]
          x += c + Formats.Reset + stringRepeat(" ", sizes[i] - c.length)
        });
        x += stringRepeat(" ", size - x.length)
        render += x + Formats.FgYellow + "│" + Formats.Reset
      } else render += Formats.FgYellow + "│ " + Formats.Reset + e + stringRepeat(" ", size - e.length) + Formats.FgYellow + "│" + Formats.Reset;
    });
    render += Formats.FgYellow + "\n└" + stringRepeat("─", size + 1) + "┘" + Formats.Reset
    return render;
  }

  console.log(renderTemplate([
    "Help Menu",
    "",
    ["Category", "Name", "Command", "Description"],
    ["Compiler", "Style", "gulp style", "Creates min css from sass, scss or css files."],
    ["", "Typescript", "gulp typescript", "Compiles typescript from ., ./scripts to min javascript."],
    ["", "Types", "gulp types", "Compiles the typescript from ./types to min javascript."],
    ["", "HTML", "gulp html", "Compiles .html files from ./html to min files."],
    ["Linsteners", "Style listener", "gulp listen-style", "Listens for style changes and compiles them."],
    ["", "Typescript listener", "gulp listen-typescript", "Listens for typescript changes and compiles them."],
    ["", "Types listener", "gulp listen-types", "Listens for types changes and compiles them."],
    ["", "HTML listener", "gulp listen-html", "Listens for html changes and compiles them."],
    ["Cleaners", "Style cleaner", "gulp clean-style", "Cleans the compiled style files."],
    ["", "Typescript cleaner", "gulp clean-typescript", "Cleans the compiled typescript files."],
    ["", "Types cleaner", "gulp clean-types", "Cleans the compiled types files."],
    ["", "HTML cleaner", "gulp clean-html", "Cleans the compiled html files."],
    ["Creators", "Sass creator", "gulp new-sass", "Creates new sass file."],
    ["", "SCSS creator", "gulp new-scss", "Creates new scss file."],
    ["", "CSS creator", "gulp new-css", "Creates new css file."],
    ["", "Typescript creator", "gulp new-typescript", "Creates new typescript file (located ./scripts)."],
    ["", "", "gulp new-script", ""],
    ["", "Types creator", "gulp new-types", "Creates new type's typescript file."],
    ["", "HTML creator", "gulp new-html", "Creates new html file."],
    ["Multi Compiler", "Once", "gulp once", "Compiles everything once."],
    ["", "Listener", "gulp listen", "Binds all compile Listeners."],
    ["", "Start", "gulp start", "Compiles everything once and binds listeners."],
    ["", "", "gulp defaut", ""],
    ["", "", "gulp", ""],
    ["Generators", "Export", "gulp export", "Export as build."],
    ["", "Build", "gulp build", "Export as build."],
    ["Others", "Help", "gulp help", "Shows this menu."],
    "",
    stringRepeat(" ", 85) + "- Copyright (c) Minimine 2019"
  ]))
}

gulp.task("clean-style", cleanStyle)
gulp.task("clean-typescript", cleanTypescript)
gulp.task("clean-types", cleanTypes)
gulp.task("clean-html", cleanHTML)

gulp.task("style", style);
gulp.task("typescript", typescript);
gulp.task("types", types)
gulp.task("html", html)

gulp.task("listen-style", listenStyle)
gulp.task("listen-typescript", listenTypescript)
gulp.task("listen-types", listenTypes)
gulp.task("listen-html", listenHTML)

gulp.task("new-sass", newSass)
gulp.task("new-scss", newScss)
gulp.task("new-css", newCss)
gulp.task("new-typescript", newScript)
gulp.task("new-script", newScript)
gulp.task("new-types", newTypes)
gulp.task("new-html", newHTML)

gulp.task("help", help)
gulp.task("listen", listen)
gulp.task("once", once)
gulp.task("start", start)
gulp.task("default", start)
gulp.task("build", build)
gulp.task("export", build)