const gulp                = require(`gulp`),
      rename              = require(`gulp-rename`),
      uglify              = require(`gulp-uglify`),
      plumber             = require(`gulp-plumber`),
      babel               = require(`gulp-babel`),
      clean               = require(`gulp-clean`),
      sourcemaps          = require(`gulp-sourcemaps`),
      ts                  = require('gulp-typescript');

const src                 = "./",
      dist                = "./";

gulp.task("typescript1", function() {

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
});



/**
 * Default Task
 */
gulp.task("default", function(){
  gulp.start("typescript1");
  gulp.watch([src + '*.ts'],['typescript1']);
});
