let express = require("express");

let db_conn = require("./db_conn");
let controller = require("./controllers/controller");

let app = express();
let http = require("http").createServer(app);

let port = process.env.port || 3000;


const path = require("path");

let io = require("socket.io")(http, { /* options */ });

require('dotenv').config({ path: path.join(__dirname, '.env') });

// Set the views directory
app.set("views", path.join(__dirname, "views"));
// Set the view engine to use
app.set("view engine", "html");

let catsRoute = require("./routers/catsRoute");

app.use(express.static(__dirname + "/public"));
app.use(express.json()); // for application/json
app.use(express.urlencoded()); // for application/x-www-form-urlencoded

app.use("/api/cats", catsRoute);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});

app.get("/addTwoNumbers/:firstNumber/:secondNumber", function (req, res, next) {
  var firstNumber = parseInt(req.params.firstNumber);
  var secondNumber = parseInt(req.params.secondNumber);
  var result = firstNumber + secondNumber || null;
  if (result == null) {
    res.json({ result: result, statusCode: 400 }).status(400);
  } else {
    res.json({ result: result, statusCode: 200 }).status(200);
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});
 

http.listen(port, () => {
  console.log("Listening on port ", port);
});
