const PORT = process.env.PORT || 9000;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./database");

app.use(
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  cors({
    credentials: true,
    origin: [
      "http://habitica.com",
      "https://habitica.com",
      "http://localhost:3000",
    ],
  })
);

require("./webhooks")(app, db);

app.listen(PORT, () => {
  console.info(`\x1b[1m\x1b[32m[server] listening on port ${PORT}\x1b[0m`);
});

module.exports = app;
