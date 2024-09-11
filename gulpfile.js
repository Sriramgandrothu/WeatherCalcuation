const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sync = require("browser-sync").create();

function generateCSS(cb) {
  src("./sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./assets/compiled-css"))
    .pipe(sync.stream());
  cb();
}
exports.css = generateCSS;

const gulp = require('gulp');

gulp.task('build', function() {
  // Define build tasks here
});

function watchFiles(cb) {
  watch("./sass/*.scss", generateCSS);
}
exports.watch = watchFiles;

function browserSync(cb) {
  sync.init({
    server: {
      baseDir: ".",
    },
  });
  watch("./sass/*.scss", generateCSS);
  watch("./*.html").on("change", sync.reload);
}
exports.sync = browserSync;
