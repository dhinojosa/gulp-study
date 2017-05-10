const gulp     = require('gulp');
const babel    = require('gulp-babel');
const eslint   = require('gulp-eslint');
const mocha    = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('default', function() {
  //Linting
  gulp.src(["src/**/*.js", "test/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
  // Babel src
  gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(istanbul({includeUntested:true}))
    .pipe(istanbul.hookRequire())
    .pipe(gulp.dest("dist/babel-src"));
  // Babel test
  gulp.src("test/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./dist/babel-test")).on('finish', () => {
       gulp.src("./dist/babel-test/**/*.js")
       .pipe(mocha())
       .pipe(istanbul.writeReports("./dist/coverage"))
    });
});
