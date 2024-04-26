const gulp = require("gulp");
const nodemon = require("gulp-nodemon");

gulp.task("serve", () => {
  const server = nodemon({
    script: "index.js",
    ext: "js",
  });

  server
    .on("restart", () => console.log("NodeJS restarted!"))
    .on("crash", () => {
      console.error("NodeJS has crashed!");
      // Restart the server in 5 seconds
      server.emit("restart", 5);
    });
});
