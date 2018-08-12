let gulp = require("gulp");
let sass = require("gulp-sass");
let cleanCSS = require('gulp-clean-css');
let autoprefixer = require('gulp-autoprefixer');
let rename = require("gulp-rename");
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let minify = require('gulp-minify');
let concatCss = require('gulp-concat-css');

gulp.task("sass", parse_sass);
gulp.task("js", parse_js);
gulp.task("html", parse_html);

gulp.task("all", function() {
  parse_sass();
  parse_js();
  parse_html();
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
     .pipe(concatCss("global.css"))
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
    .pipe(gulp.dest("./app/htdocs/"));
}
