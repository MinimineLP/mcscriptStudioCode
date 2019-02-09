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

let typescriptfolders = [
  '',
  'src/scripts/',
  'src/scripts/pluginmanager/',
  'src/scripts/pluginmanager/listeners/',
  'src/scripts/pluginmanager/events/',
]

let typesfolders = [
  'types/@mcscriptstudiocode/config/',
  'types/@mcscriptstudiocode/mcscriptstudiocode/',
  'types/@mcscriptstudiocode/pluginmanager/',
  'types/@mcscriptstudiocode/pluginmanager/pluginmanager/',
  'types/@mcscriptstudiocode/pluginmanager/pluginmanager/events/',
  'types/@mcscriptstudiocode/pluginmanager/pluginmanager/listeners/',
  'types/@mcscriptstudiocode/siteapi/',
  'types/@mcscriptstudiocode/Util/',
  'types/mcscriptstudiocode/'
];


/**
 * Clean style Function complation results
 */
function cleanStyle() {
  if (!fs.existsSync(`./src/css/`)) fs.mkdirsSync(path.resolve(`./src/css/`))
  return Promise.all([
    new Promise((resolve, reject) => {
      gulp.src('src/css/*.min.css')
        .pipe(clean())
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    }),
    new Promise((resolve, reject) => {
      gulp.src('src/css/*.min.css.map')
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
  if (!fs.existsSync(`./src/scripts/`)) fs.mkdirsSync(path.resolve(`./src/scripts/`))
  let promises = [];
  typescriptfolders.forEach((e) => {
    [`${e}*.js`, `${e}*.js.map`].forEach((i) => {
      promises.push(new Promise((resolve, reject) => {
        gulp.src([i, '!gulpfile.js'])
          .pipe(clean())
          .on('error', reject)
          .on('end', resolve)
          .on('finish', resolve);
      }));
    });
  });
  return Promise.all(promises);
}

/**
 * Cleans Types's compilation results
 */
function cleanTypes() {
  if (!fs.existsSync(`./types/`)) fs.mkdirsSync(path.resolve(`./types/`))
  let promises = [];
  typesfolders.forEach((e) => {
    [`${e}*.js`, `${e}*.js.map`].forEach((i) => {
      promises.push(new Promise((resolve, reject) => {
        gulp.src(i)
          .pipe(clean())
          .on('error', reject)
          .on('end', resolve)
          .on('finish', resolve);
      }));
    });
  });
  return Promise.all(promises);
}

/**
 * Cleans HTML's compilation results
 */
function cleanHTML() {
  if (!fs.existsSync(`./src/html/`)) fs.mkdirsSync(path.resolve(`./src/html/`))
  return new Promise((resolve, reject) => {
    gulp.src('src/html/*.min.html')
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
          gulp.src('src/sass/*.sass')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cleanCSS())
            .pipe(rename({
              suffix: '.min'
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('src/css/'))
            .on('error', reject)
            .on('end', resolve)
            .on('finish', resolve);
        })
      ]).then(() => {
        gulp.src('src/css/*.min.css')
          .pipe(plumber())
          .pipe(sourcemaps.init())
          .pipe(concat('global.css'))
          .pipe(cleanCSS())
          .pipe(rename({
            suffix: '.min'
          }))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('src/css/'))
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

  let promises = [];
  typescriptfolders.forEach((e) => {
    promises.push(new Promise((resolve, reject) => {
      gulp.src(e + "*.ts")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts.createProject('tsconfig.json')({}))
        .on("error", () => {})
        .pipe(babel({
          presets: ["babel-preset-env"].map(require.resolve)
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(e + "."))
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    }));
  });
  return Promise.all(promises);
}


/**
 * Compiles typescript trom ./types
 */
function types() {
  cleanTypes();

  let promises = [];
  typesfolders.forEach((e) => {
    promises.push(new Promise((resolve, reject) => {
      gulp.src(e + '*.ts')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts.createProject('tsconfig.json')({}))
        .on("error", () => {})
        .pipe(babel({
          presets: ["babel-preset-env"].map(require.resolve)
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(e + "."))
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    }));
  });
  return Promise.all(promises);
}

/**
 * Minifies HTML from ./html
 */
function html() {
  return new Promise((resolve, reject) => {
    cleanHTML().then(() => {
      gulp.src('src/html/*.html')
        .pipe(plumber())
        .pipe(htmlmin({
          collapseWhitespace: true
        }))
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest('src/html/'))
        .on('error', reject)
        .on('end', resolve)
        .on('finish', resolve);
    });
  });
}

/**
 * listens for style changes and autocompiles
 */
function listenStyle() {
  gulp.watch(['src/sass/*.sass'], ['style']);
}

/**
 * listens for typescript changes and autocompiles
 */
function listenTypescript() {
  let files = typescriptfolders;
  for (let i = 0; i < files.length; i++) files[i] = files[i] + "*.ts";
  gulp.watch(files, ['typescript']);
}

/**
 * listens for types changes and autocompiles
 */
function listenTypes() {
  let files = typesfolders;
  for (let i = 0; i < files.length; i++) files[i] = files[i] + "*.ts";
  gulp.watch(files, ['types']);
}

/**
 * Listen html and autocompiles
 */
function listenHTML() {
  gulp.watch(['src/html/*.html', '!src/html/*.min.html'], ['html']);
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
    ["Multi Compiler", "Once", "gulp once", "Compiles everything once."],
    ["", "Listener", "gulp listen", "Binds all compile Listeners."],
    ["", "Start", "gulp start", "Compiles everything once and binds listeners."],
    ["", "", "gulp defaut", ""],
    ["", "", "gulp", ""],
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

gulp.task("help", help)
gulp.task("listen", listen)
gulp.task("once", once)
gulp.task("start", start)
gulp.task("default", start)