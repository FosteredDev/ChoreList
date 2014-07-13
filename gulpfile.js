"use strict";
var exec = require("child_process").exec;
var format = require("util").format;
var spawn = require("child_process").spawn;

var eslint = require("gulp-eslint");
var gulp = require("gulp");
var jsonlint = require("gulp-jsonlint");

var APP_SRC = ["index.js"];
var pkg = require("./package.json");

gulp.task("default", ["lint"]);

gulp.task("lint", function() {
  gulp.src(APP_SRC)
    .pipe(eslint())
    .pipe(eslint.format("stylish", console.error));

  gulp.src("./gulpfile.js")
    .pipe(eslint())
    .pipe(eslint.format("stylish", console.error));

  gulp.src("./pacakge.json")
    .pipe(jsonlint())
    .pipe(jsonlint.reporter("stylish", console.error));
});

gulp.task("publish", function(done) {
  exec(format("git commit -a -m 'Release %s'", pkg.version), function() {
    exec(format("git tag -a %s -m 'Release %s'", pkg.version), function() {
      exec("git push", function() {
        exec("git push --tags", function() {
          spawn("npm", ["publish"], {
            stdio: "inherit"
          }).on("close", done);
        });
      });
    });
  });
});

gulp.task("release", function(done) {
  exec(format("git commit -a -m 'Release %s'", pkg.version), function() {
    exec(format("git tag -a %s -m 'Release %s'", pkg.version), function() {
      exec("git push", function() {
        exec("git push --tags", function() {
          done();
        });
      });
    });
  });
});

gulp.task("watch", function() {
  gulp.watch([APP_SRC], ["lint"]);
});