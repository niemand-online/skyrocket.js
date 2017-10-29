var gulp        = require('gulp'),
    ts          = require('gulp-typescript'),
    merge       = require('merge-stream'),
    sourcemaps  = require('gulp-sourcemaps'),
    del         = require('del'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat');

var PATHS = {
  src: 'lib',
  build: {
    dist: './dist',
    debug: './debug'
  },
  examples: 'examples'
};

var tsProject = ts.createProject('tsconfig.json');
 
/**
 * Dev tasks
 */
gulp.task('scripts:dev', ['clean:dev'], function() {
  return merge([
      gulp.src([PATHS.src + '/**/*.ts'], { base: "./" })
          .pipe(sourcemaps.init())
          .pipe(tsProject()).js
          .pipe(concat('skyrocket.js'))
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(PATHS.build.debug))
  ]);
});

gulp.task('scripts:dev:watch', ['scripts:dev'], function () {
  gulp.watch([PATHS.src + '/**/*.ts'], ['scripts:dev']);
});

gulp.task('clean:dev', function (cb) {
    del([PATHS.build.debug], cb);
});

/**
 * Prod
 */
gulp.task('scripts:prod', ['clean:prod'], function() {
  return merge([
      gulp.src([PATHS.src + '/**/*.ts'], { base: "./" })
          .pipe(tsProject()).js
          .pipe(uglify())
          .pipe(concat('skyrocket.js'))
          .pipe(gulp.dest(PATHS.build.dist))
  ]);
}); 

gulp.task('clean:prod', function (cb) {
    del([PATHS.build.dist], cb);
});

gulp.task('clean', ['clean:dev', 'clean:prod']);
