const gulp                = require(`gulp`),
      rename              = require(`gulp-rename`),
      uglify              = require(`gulp-uglify`),
      plumber             = require(`gulp-plumber`),
      babel               = require(`gulp-babel`),
      clean               = require(`gulp-clean`),
      sourcemaps          = require(`gulp-sourcemaps`),
      htmlmin             = require(`gulp-html-minifier`),
      ts                  = require('gulp-typescript');

const src                 = "./",
      dist                = "./";

let typescript = function() {

  var tsProject = ts.createProject('tsconfig.json');

  gulp.src(dist + '*.js.map').pipe(clean());

  gulp.src(src + '*.ts')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(tsProject({}))
      .on("error", console.log)
      .pipe(babel({presets: ["babel-preset-env"].map(require.resolve)}))
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist));
};
gulp.task("typescript1", typescript);


/**
 * Default Task
 */
gulp.task("default", function(){
  typescript()
  gulp.watch([src + '*.ts'],['typescript1']);
});
