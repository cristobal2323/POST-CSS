var gulp = require('gulp')
var postcss = require('gulp-postcss')
var rucksack = require('rucksack-css')
var cssnext = require('postcss-cssnext')
var autoprefixer = require('autoprefixer')
var cssnested = require('postcss-nested')
var mixins = require('postcss-mixins')
var atImport = require('postcss-import')
var lost = require('lost')
var csswring = require('csswring')
var mqpacker = require('css-mqpacker')
var browserSync = require('browser-sync').create()

// Servidor de desarrollo
gulp.task('serve',function () {
   browserSync.init({
       server: {
           baseDir: './dist'
        }
   })
})

// tarea para procesar css
gulp.task('css',function () {
    var processors = [
      atImport(),
      mixins(),
      cssnested,
      lost(),
      rucksack(),
      cssnext({browsers: ['>5%','ie 8']}),
      csswring(),
      mqpacker
    ]
    return gulp.src('./src/invie.css')
           .pipe(postcss(processors))
           .pipe(gulp.dest('./dist/css')) 
           .pipe(browserSync.stream()) 
})

// Tarea para vigilar los cambios
gulp.task('watch',function () {
	gulp.watch('./src/*.css', ['css'])
	gulp.watch('./src/*.css').on('change', browserSync.reload)
})

gulp.task('default', ['serve','watch'])