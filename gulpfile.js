var gulp = require('gulp');
// var jshint = require('gulp-jshint');//linting JS files
var changed = require('gulp-changed');//moniters files for changes to be gulped
var webpack = require('gulp-webpack');//not sure what this does yet but it's important
var shell = require('gulp-shell');//shell commands for pushing to heroku
const babel = require('gulp-babel');
const watch = require('gulp-watch');

// gulp.task('default', function() {
//   // place code for your default task here
// });

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('babel', function() {
	return gulp.src('public/components/*')
    // .pipe(jsx())
		.pipe(babel({
			presets: ['react']
		}))
		.pipe(gulp.dest('compiled/public/components'));
});

gulp.task('watch', function() {
  gulp.watch('public/components/*.jsx', ['babel']);

});
