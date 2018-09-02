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
let fs = require('fs-extra')

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
     .pipe(gulp.dest("./app/htdocs/css"))
     .pipe(cleanCSS())
     .pipe(rename({suffix: '.min'}))
     .pipe(minify())
     .pipe(gulp.dest("./app/htdocs/css"))
     .pipe(concat("global.css"))
     .pipe(gulp.dest("./app/htdocs/css"))
     .pipe(rename({suffix: '.min'}))
     .pipe(minify())
     .pipe(gulp.dest("./app/htdocs/css"));
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
     .pipe(gulp.dest("./app"))
     .pipe(minify())
     .pipe(gulp.dest("./app"));

   // Bring json
   gulp.src('./src/*.json')
     .pipe(jsonminify())
     .pipe(gulp.dest("./app/"));
}
