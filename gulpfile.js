const gulp = require('gulp');
const ts = require('gulp-typescript');
const htmlmin = require('gulp-htmlmin');
const tsProject = ts.createProject('tsconfig.json');

function compileTypescript() {
  const tsResult = gulp.src('src/**/*.ts').pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
}

function minifyHandlebarsTemplates() {
  return gulp
    .src(['src/views/*.handlebars', 'src/views/**/*.handlebars'])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/views'));
}

exports.default = gulp.series(compileTypescript, minifyHandlebarsTemplates);