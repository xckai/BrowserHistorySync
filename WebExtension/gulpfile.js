const gulp = require("gulp");
const path = require("path");
const clean = require("gulp-clean");
const ts = require("gulp-typescript");
const merge2 = require("merge2");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const inject = require("gulp-inject-string");
const zip = require("gulp-zip");

function getTsProject(option) {
  return ts.createProject(
    path.resolve(__dirname, "./tsconfig.json"),
    option || {}
  )(ts.reporter.fullReporter());
}

gulp.task("clear-dist", () => {
  console.log("执行清理");
  return gulp
    .src(["./dist"], {
      allowEmpty: true,
    })
    .pipe(clean({ force: true }))
    .once("end", () => {
      console.log("文件清理完成");
    });
});
function getBuildStream() {
  const staticFiles = gulp.src([
    path.resolve(__dirname, "./src/static/**/*.*"),
    path.resolve(
      __dirname,
      "./node_modules/bootstrap/dist/css/bootstrap.min.css"
    ),
    path.resolve(
      __dirname,
      "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ),
    path.resolve(
      __dirname,
      "./node_modules/webextension-polyfill/dist/browser-polyfill.min.js"
    ),
  ]);
  const commonFiles$ = gulp
    .src([
      path.resolve(
        __dirname,
        "./node_modules/webextension-polyfill/dist/browser-polyfill.min.js"
      ),
      path.resolve(__dirname, "./node_modules/requirejs/require.js"),
    ])
    .pipe(concat("common.js"))
    .pipe(uglify());
  const backgroundjs$ = gulp
    .src([path.resolve(__dirname, "./src/background.ts")])
    .pipe(getTsProject({ module: "amd", outFile: "background.js" }))
    .on("error", function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .js.pipe(inject.append("requirejs(['background']);"));
  const contentjs$ = gulp
    .src([path.resolve(__dirname, "./src/content.ts")])
    .pipe(getTsProject({ module: "amd", outFile: "content.js" }))
    .on("error", function (err) {
      console.log(err.toString());
      this.emit("end");
    }).js;
  const optionjs$ = gulp
    .src([path.resolve(__dirname, "./src/pages/option.ts")])
    .pipe(getTsProject({ module: "amd", outFile: "option.js" }))
    .on("error", function (err) {
      console.log(err.toString());
      this.emit("end");
    }).js;
  const popup$ = gulp
    .src([path.resolve(__dirname, "./src/pages/popup.ts")])
    .pipe(getTsProject({ module: "amd", outFile: "popup.js" }))
    .on("error", function (err) {
      console.log(err.toString());
      this.emit("end");
    }).js;
  const pagesHtml$ = gulp.src([
    path.resolve(__dirname, "./src/pages/option.html"),
    path.resolve(__dirname, "./src/pages/popup.html"),
  ]);

  return merge2([
    staticFiles,
    commonFiles$,
    backgroundjs$,
    optionjs$,
    contentjs$,
    pagesHtml$,
    popup$,
  ]);
}
gulp.task("build", () => {
  return getBuildStream().pipe(gulp.dest(path.resolve(__dirname, "./dist")));
});
gulp.task("pkg_chrome", () => {
  return getBuildStream()
    .pipe(zip("pkg.zip"))
    .pipe(gulp.dest(path.resolve(__dirname, "./public")));
});

gulp.task(
  "dev",
  gulp.series([
    "build",
    () => {
      let isBuilding = false;
      let buildSchduleId;
      console.log("\x1B[32m%s\x1B[0m", "Start watching file changes...");
      gulp.watch(["./src/**/*.ts", "./src/**/*.html"]).on("change", () => {
        function runBuild() {
          console.log("\x1B[32m%s\x1B[0m", "Rebuilding...");
          const startTime = new Date().getTime();
          isBuilding = true;
          const backgroundjs$ = gulp
            .src([path.resolve(__dirname, "./src/background.ts")])
            .pipe(getTsProject({ module: "amd", outFile: "background.js" }))
            .on("error", function (err) {
              console.log(err.toString());
              this.emit("end");
            })
            .js.pipe(inject.append("requirejs(['background']);"));
          const contentjs$ = gulp
            .src([path.resolve(__dirname, "./src/content.ts")])
            .pipe(getTsProject({ module: "amd", outFile: "content.js" }))
            .on("error", function (err) {
              console.log(err.toString());
              this.emit("end");
            }).js;
          const optionjs$ = gulp
            .src([path.resolve(__dirname, "./src/pages/option.ts")])
            .pipe(getTsProject({ module: "amd", outFile: "option.js" }))
            .on("error", function (err) {
              console.log(err.toString());
              this.emit("end");
            }).js;

          const popup$ = gulp
            .src([path.resolve(__dirname, "./src/pages/popup.ts")])
            .pipe(getTsProject({ module: "amd", outFile: "popup.js" }))
            .on("error", function (err) {
              console.log(err.toString());
              this.emit("end");
            }).js;
          const pagesHtml$ = gulp.src([
            path.resolve(__dirname, "./src/pages/option.html"),
            path.resolve(__dirname, "./src/pages/popup.html"),
          ]);
          merge2([backgroundjs$, contentjs$, optionjs$, pagesHtml$, popup$])
            .pipe(gulp.dest(path.resolve(__dirname, "./dist")))
            .once("end", () => {
              console.log(
                "\x1B[32m%s\x1B[0m",
                "Build task done. time cost : " +
                  Math.round((new Date().getTime() - startTime) / 1000) +
                  "s"
              );
              isBuilding = false;
            });
        }
        if (isBuilding) {
          if (buildSchduleId) {
            clearTimeout(buildSchduleId);
          }
          console.log(
            "\x1B[36m%s\x1B[0m",
            "File change, rebuild task is waiting.."
          );
          buildSchduleId = setTimeout(onFileChange, 5000);
        } else {
          if (buildSchduleId) {
            clearTimeout(buildSchduleId);
          }
          buildSchduleId = setTimeout(runBuild, 1000);
        }
      });
    },
  ])
);
