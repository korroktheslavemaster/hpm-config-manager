require("dotenv").config();
var Config = require("./models/Config");
var mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello World!"));

// add a config
app.post("/add", (req, res) => {
  const { params } = req.body;
  var config = new Config({ params, status: "pending" });
  config.save((err, savedConfig) => {
    if (err) {
      res.status(500);
      res.send("something wrong happened");
    } else {
      res.send(savedConfig.id);
    }
  });
});

// view
app.get("/view", (req, res) => {
  Config.find({}, (err, results) => {
    res.json(results);
  });
});

// fetch a config and mark as running
app.get("/fetchOne", (req, res) => {
  Config.findOne({ status: "pending" }, (err, config) => {
    if (!config) {
      res.status(400);
      res.send("Error: No pending tasks left");
    } else {
      config.status = "running";
      config.save((err, savedConfig) => {
        res.json(savedConfig);
      });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
