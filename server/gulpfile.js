let gulp = require("gulp");
let sass = require("gulp-sass");
let cleanCSS = require('gulp-clean-css');
let autoprefixer = require('gulp-autoprefixer');
let rename = require("gulp-rename");
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let minify = require('gulp-minify');
let htmlmin = require('gulp-htmlmin');
let jsonminify = require('gulp-jsonminify');
let fs = require('fs-extra');
let uglify = require('gulp-uglify');

gulp.task("sass", parse_sass);
gulp.task("js", parse_js);
gulp.task("html", parse_html);
gulp.task("server", parse_server_js);

gulp.task("all", function() {
  parse_sass();
  parse_js();
  parse_html();
  parse_server_js();
});

function parse_sass() {
  gulp.src('./src/htdocs/sass/*.sass')
     .pipe(sass())
     .pipe(autoprefixer())
     .pipe(rename({}))
     .pipe(gulp.dest("./app/htdocs/style"))
     .pipe(cleanCSS())
     .pipe(rename({suffix: '.min'}))
     .pipe(minify())
     .pipe(gulp.dest("./app/htdocs/style"))
     .pipe(concat("global.css"))
     .pipe(gulp.dest("./app/htdocs/style"))
     .pipe(rename({suffix: '.min'}))
     .pipe(minify())
     .pipe(gulp.dest("./app/htdocs/style"));
}

function parse_js() {
  gulp.src('./src/htdocs/scripts/*.js')
     .pipe(babel({presets:["es2015"]}))
     .pipe(gulp.dest("./app/htdocs/scripts"))
     .pipe(minify())
     .pipe(gulp.dest("./app/htdocs/scripts"))
     .pipe(concat('global.js'))
     .pipe(gulp.dest("./app/htdocs/scripts"))
     .pipe(minify())
     .pipe(gulp.dest("./app/htdocs/scripts"));
}

function parse_html() {
  gulp.src('./src/htdocs/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("./app/htdocs/"));

  // Bring json
  gulp.src('./src/htdocs/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest("./app/htdocs/"));

  // Bring rest
  gulp.src('./src/htdocs/images/explorericons/*.*')
    .pipe(gulp.dest("./app/htdocs/images/explorericons/"));

  gulp.src('./src/htdocs/images/*.*')
    .pipe(gulp.dest("./app/htdocs/images/"));

  gulp.src('./src/htdocs/fonts/*.*')
    .pipe(gulp.dest("./app/htdocs/fonts/"));
}

function parse_server_js() {
  gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest("./app"));

   // Bring json
   gulp.src('./src/*.json')
     .pipe(jsonminify())
     .pipe(gulp.dest("./app/"));
}


gulp.task("explorer", function () {
  gulp.src('./plugins/explorer/htdocs/scripts/src/*.js')
    .pipe(babel({presets:["es2015"]}))
    .pipe(gulp.dest("./plugins/explorer/htdocs/scripts/dest/"))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/explorer/htdocs/scripts/dest/"));

  gulp.src('./plugins/explorer/htdocs/sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename({}))
    .pipe(gulp.dest("./plugins/explorer/htdocs/css"))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/explorer/htdocs/css"))
    .pipe(concat("global.css"))
    .pipe(gulp.dest("./plugins/explorer/htdocs/css"))
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/explorer/htdocs/css"));
});



gulp.task("bar-top", function () {
  gulp.src('./plugins/bar-top/htdocs/scripts/src/*.js')
    .pipe(babel({presets:["es2015"]}))
    .pipe(gulp.dest("./plugins/bar-top/htdocs/scripts/dest/"))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/bar-top/htdocs/scripts/dest/"));

  gulp.src('./plugins/bar-top/htdocs/sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename({}))
    .pipe(gulp.dest("./plugins/bar-top/htdocs/css"))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/bar-top/htdocs/css"))
    .pipe(concat("global.css"))
    .pipe(gulp.dest("./plugins/bar-top/htdocs/css"))
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/bar-top/htdocs/css"));
});

gulp.task("editor", function () {
  gulp.src('./plugins/editor/htdocs/scripts/src/*.js')
    .pipe(babel({presets:["es2015"]}))
    .pipe(gulp.dest("./plugins/editor/htdocs/scripts/dest/"))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/editor/htdocs/scripts/dest/"));

  gulp.src('./plugins/editor/htdocs/sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename({}))
    .pipe(gulp.dest("./plugins/editor/htdocs/css"))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/editor/htdocs/css"))
    .pipe(concat("global.css"))
    .pipe(gulp.dest("./plugins/editor/htdocs/css"))
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/editor/htdocs/css"));
});


gulp.task("icons", function () {
  gulp.src('./plugins/icons/htdocs/sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename({}))
    .pipe(gulp.dest("./plugins/icons/htdocs/css"))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/icons/htdocs/css"))
    .pipe(concat("global.css"))
    .pipe(gulp.dest("./plugins/icons/htdocs/css"))
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/icons/htdocs/css"));
});


gulp.task("keybindings", function () {
  gulp.src('./plugins/keybindings/htdocs/scripts/src/*.js')
    .pipe(babel({presets:["es2015"]}))
    .pipe(gulp.dest("./plugins/keybindings/htdocs/scripts/dest/"))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/keybindings/htdocs/scripts/dest/"));
});

gulp.task("alert", function () {
  gulp.src('./plugins/alert/htdocs/sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename({}))
    .pipe(gulp.dest("./plugins/alert/htdocs/css"))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/alert/htdocs/css"))
    .pipe(concat("global.css"))
    .pipe(gulp.dest("./plugins/alert/htdocs/css"))
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest("./plugins/alert/htdocs/css"));
});
