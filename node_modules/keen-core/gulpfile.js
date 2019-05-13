var gulp = require('gulp'),
    pkg = require('./package.json');

var aws = require('gulp-awspublish'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    connect = require('gulp-connect'),
    compress = require('gulp-yuicompressor'),
    eslint = require('gulp-eslint'),
    flow = require('gulp-flowtype'),
    gutil = require('gulp-util'),
    karma = require('karma'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    tapeRunner = require('tape-run');

gulp.task('default', ['build', 'connect', 'watch']);

gulp.task('build', function(){
  return browserify({
      entries: './lib/index.js',
      debug: true
    })
    .bundle()
    .pipe(source('keen-core.js'))
    .pipe(buffer())
    .on('error', gutil.log)
    .pipe(gulp.dest('./test'));
});

gulp.task('connect', ['build'], function () {
  return connect.server({
      root: [ 'test' ],
      port: 9003
    });
});

gulp.task('lint', function () {
  return gulp.src([
      './lib/**/*.js'
    ])
    .pipe(flow({
      all: false,
      weak: false,
      declarations: './declarations',
      killFlow: false,
      beep: true,
      abort: false
    }))
    .pipe(eslint({
      rules: {
        'strict': 0
      }
    }))
    // Output results to the console
    .pipe(eslint.format())
    // Exit process with an error code (1) on error
    .pipe(eslint.failAfterError())
    // Verify yui-compressor ok-ness
    .pipe(compress());
});

gulp.task('watch', ['lint', 'build'], function() {
  gulp.watch([
    'lib/**/*.js',
    'gulpfile.js',
    'test/index.js'
  ], ['build', 'lint']);
});

gulp.task('test', ['test:tape', 'test:karma']);

gulp.task('test:tape', function(){
  browserify({
    entries: './test/index.js',
    debug: true
  })
  .bundle()
  .pipe(tapeRunner())
  .on('error', gutil.log)
  .on('results', gutil.log)
  .pipe(process.stdout)
  .pipe(source('bundle.js'))
  .pipe(buffer())
  // .pipe(compress())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./test'));
});

gulp.task('test:karma', ['build'], function(done) {
  new karma.Server({
      configFile: __dirname + '/test/karma/index.js',
      singleRun: true
    }, function(exitCode){
      gutil.log('Karma test runner has exited with ' + exitCode);
      process.exit(exitCode);
      done(exitCode);
    }).start();
});

gulp.task('test:sauce', ['build'], function(done){
  new karma.Server({
      configFile: __dirname + '/test/karma/sauce.js',
      singleRun: true
    }, function(exitCode){
      gutil.log('Saucelabs test runner has exited with ' + exitCode);
      process.exit(exitCode);
      done(exitCode);
    }).start();
});
