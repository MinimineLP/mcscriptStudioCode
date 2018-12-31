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
  htmlmin = require(`gulp-html-minifier`)
ts = require('gulp-typescript');;

const src = "src/",
  dist = "src/";

/**
 * SASS Task
 */
gulp.task("sass", function() {
  gulp.src(dist + 'css/*.css').pipe(clean());
  gulp.src(dist + 'css/*.css.map').pipe(clean());

  // compile sass to normal files
  gulp.src(src + 'sass/*.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist + 'css/'));
  // compile sass to minified files
  gulp.src(src + 'sass/*.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist + 'css/'));
});
/*
gulp.task("typescript1", function() {

  var tsProject = ts.createProject('tsconfig.json');

  gulp.src(dist + '*.js').pipe(clean());
  gulp.src(dist + '*.js.map').pipe(clean());

  gulp.src('*.ts')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(tsProject({}))
      .on("error", console.log)
      .pipe(babel({presets: ["babel-preset-env"].map(require.resolve)}))
      .pipe(uglify())
      //.pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});*/


gulp.task("typescript2", function() {

  var tsProject = ts.createProject('tsconfig.json');

  gulp.src(dist + 'scripts/*.js').pipe(clean());
  gulp.src(dist + 'scripts/*.js.map').pipe(clean());

  gulp.src(src + 'scripts/*.ts')
    .pipe(plumber())
    .pipe(tsProject({}))
    .on("error", console.log)
    .pipe(babel({
      presets: ["babel-preset-env"].map(require.resolve)
    }))
    .pipe(uglify())
    .pipe(gulp.dest(dist + 'scripts/'));
});


gulp.task("types", function() {

  var tsProject = ts.createProject('tsconfig.json');

  gulp.src('types/mcscriptstudiocode/*.js').pipe(clean());
  gulp.src('types/mcscriptstudiocode/*.js.map').pipe(clean());

  gulp.src('types/mcscriptstudiocode/*.ts')
    .pipe(plumber())
    .pipe(tsProject({}))
    .on("error", console.log)
    .pipe(babel({
      presets: ["babel-preset-env"].map(require.resolve)
    }))
    .pipe(uglify())
    .pipe(gulp.dest('types/mcscriptstudiocode/'));

  tsProject = ts.createProject('tsconfig.json');

  gulp.src('types/@mcscriptstudiocode/mcscriptstudiocode/*.js').pipe(clean());
  gulp.src('types/@mcscriptstudiocode/mcscriptstudiocode/*.js.map').pipe(clean());

  gulp.src('types/@mcscriptstudiocode/mcscriptstudiocode/*.ts')
    .pipe(plumber())
    .pipe(tsProject({}))
    .on("error", console.log)
    .pipe(babel({
      presets: ["babel-preset-env"].map(require.resolve)
    }))
    .pipe(uglify())
    .pipe(gulp.dest('types/@mcscriptstudiocode/mcscriptstudiocode/'));

  tsProject = ts.createProject('tsconfig.json');

  gulp.src('types/@mcscriptstudiocode/pluginmanager/*.js').pipe(clean());
  gulp.src('types/@mcscriptstudiocode/pluginmanager/*.js.map').pipe(clean());

  gulp.src('types/@mcscriptstudiocode/pluginmanager/*.ts')
    .pipe(plumber())
    .pipe(tsProject({}))
    .on("error", console.log)
    .pipe(babel({
      presets: ["babel-preset-env"].map(require.resolve)
    }))
    .pipe(uglify())
    .pipe(gulp.dest('types/@mcscriptstudiocode/pluginmanager/'));

  tsProject = ts.createProject('tsconfig.json');

  gulp.src('types/@mcscriptstudiocode/config/*.js').pipe(clean());
  gulp.src('types/@mcscriptstudiocode/config/*.js.map').pipe(clean());

  gulp.src('types/@mcscriptstudiocode/config/*.ts')
    .pipe(plumber())
    .pipe(tsProject({}))
    .on("error", console.log)
    .pipe(babel({
      presets: ["babel-preset-env"].map(require.resolve)
    }))
    .pipe(uglify())
    .pipe(gulp.dest('types/@mcscriptstudiocode/config/'));
});




/**
 * Default Task
 */
gulp.task("default", function() {
  gulp.start("sass");
  gulp.start("typescript2");

  gulp.watch([src + 'sass/*.sass'], ['sass']);
  gulp.watch([src + 'scripts/*.ts'], ['typescript2']);
});