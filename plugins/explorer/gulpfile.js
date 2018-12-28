const gulp                = require(`gulp`),
      sass                = require(`gulp-sass`),
      cleanCSS            = require(`gulp-clean-css`),
      autoprefixer        = require(`gulp-autoprefixer`),
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

/**
 * SASS Task
 */
gulp.task("sass", function() {
  gulp.src(dist+'css/*.css').pipe(clean());
  gulp.src(dist+'css/*.css.map').pipe(clean());

  // compile sass to minified files
  gulp.src(src + 'sass/*.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      //.pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist+'css/'));
});

gulp.task("typescript1", function() {

  var tsProject = ts.createProject('tsconfig.json');

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

gulp.task("types", function() {

  var tsProject = ts.createProject('tsconfig.json');

  gulp.src('types/*.js').pipe(clean());

  gulp.src('types/*.ts')
    .pipe(plumber())
    .pipe(tsProject({}))
    .on("error", console.log)
    .pipe(babel({presets: ["babel-preset-env"].map(require.resolve)}))
    .pipe(uglify())
    .pipe(gulp.dest('types/'));
});



/**
 * Default Task
 */
gulp.task("default", function(){
  gulp.start("sass");
  gulp.start("typescript1");
  gulp.start("types");

  gulp.watch([src + 'sass/*.sass'],['sass']);
  gulp.watch([src + '*.ts'],['typescript1']);
  gulp.watch([src + 'types/*.ts'],['types']);
});
