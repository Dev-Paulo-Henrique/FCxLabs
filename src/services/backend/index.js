const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const routes = require("./routes");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(
  "mongodb+srv://omnistack:18032004@cluster0.akrde.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);

app.get("/", (req, res) =>
  res.send("<h1><center>Backend - Case</center></h1>")
);
