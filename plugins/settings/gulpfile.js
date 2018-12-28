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

/**
 * SASS Task
 */
gulp.task("sass", function() {
  gulp.src('css/*.css').pipe(clean());
  gulp.src('css/*.css.map').pipe(clean());

  // compile sass to minified files
  gulp.src('sass/*.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css/'));

  // compile sass to minified files
  gulp.src('sass/*.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css/'));
});

gulp.task("typescript1", function() {

  var tsProject = ts.createProject('tsconfig.json');

  gulp.src('*.ts')
    .pipe(plumber())
    .pipe(tsProject({}))
    .on("error", console.log)
    .pipe(babel({presets: ["babel-preset-env"].map(require.resolve)}))
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task("types", function() {

  var tsProject = ts.createProject('tsconfig.json');

  gulp.src('types/*.ts')
    .pipe(plumber())
    .pipe(tsProject({}))
    .on("error", console.log)
    .pipe(babel({presets: ["babel-preset-env"].map(require.resolve)}))
    .pipe(uglify())
    .pipe(gulp.dest('types'));
});

gulp.task("typescript2", function() {

  var tsProject = ts.createProject('tsconfig.json');

  gulp.src('scripts/*.ts')
    .pipe(plumber())
    .pipe(tsProject({}))
    .on("error", console.log)
    .pipe(babel({presets: ["babel-preset-env"].map(require.resolve)}))
    .pipe(uglify())
    .pipe(gulp.dest('scripts/'));
});



/**
 * Default Task
 */
gulp.task("default", function(){
  gulp.start("sass");
  gulp.start("typescript1");
  gulp.start("typescript2");
  gulp.start("types");

  gulp.watch(['sass/*.sass'],['sass']);
  gulp.watch(['*.ts'],['typescript1']);
  gulp.watch(['scripts/*.ts'],['typescript2']);
  gulp.watch(['types/*.ts'],['types']);
});
