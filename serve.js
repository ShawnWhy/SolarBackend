const { createProxyMiddleware } = require("http-proxy-middleware");

const compression = require("compression");
var express = require("express");
var bodyParser = require("body-parser");
const path = require("path");

// Sets up the Express App
// =============================================================
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
var db = require("./models");
var session = require("express-session");
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

// Routes
// =============================================================
require("./routes/api-routes")(app);
require("./routes/api-routes-other")(app);
require("./routes/api-routes-search")(app);
var PORT = process.env.PORT || 8081;
const server = require("http").createServer(app);
var db = require("./models");

app.use(express.static(path.join(__dirname, "local")));
app.get("/*", (req, res) => {
  if (req.url.includes("api")) {
    return nextTick();
  }
  res.sendFile(path.join(__dirname, "local", "index.html"));
});
//provide javascript files for html
app.get("/IOClient.js", (req, res) => {
  res.sendFile(path.join(__dirname, "local", "IOClient.js"));
}
);

db.sequelize.sync().then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});

//start socket IO server
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("message", (message) => {
    console.log("Message received:", message);
    io.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
