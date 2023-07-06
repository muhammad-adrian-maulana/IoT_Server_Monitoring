const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5000" }));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const path = require("path");
const router = express.Router();

let sensorArray = [];

let sensorDefault = {
  suhu: 0,
  humidity: 0,
  smoke: 0,
  fire: false,
  doorsensor: false,
  lokasi: "Sensor 1",
};

sensorArray.push(sensorDefault);

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.get("/sensordata", async function (req, res) {
  res.send(sensorArray);
});

router.post("/sensordata", async function (req, res) {
  if (!sensorArray.length) {
    return res.send("Data is empty");
  }
  let found = 0;
  sensorArray.forEach((sensor) => {
    if (sensor.lokasi == req.body.lokasi) {
      found = 1;
      sensor.suhu = req.body.suhu;
      sensor.humidity = req.body.humidity;
      sensor.smoke = req.body.smoke;
      sensor.fire = req.body.fire == 0 ? false : true;
      sensor.doorsensor = req.body.doorsensor == 0 ? false : true;
    }
  });
  if (found == 0) {
    let sensorData = {
      suhu: req.body.suhu,
      humidity: req.body.humidity,
      smoke: req.body.smoke,
      fire: req.body.fire == 0 ? false : true,
      doorsensor: req.body.doorsensor == 0 ? false : true,
      lokasi: req.body.lokasi,
    };
    sensorArray.push(sensorData);
  }
  return res.send("Data created");
});

router.get("/sensordata_get", async function (req, res) {
  if (!sensorArray.length) {
    return res.send("Data is empty");
  }
  let found = 0;
  sensorArray.forEach((sensor) => {
    if (sensor.lokasi == req.body.lokasi) {
      found = 1;
      sensor.suhu = req.body.suhu;
      sensor.humidity = req.body.humidity;
      sensor.smoke = req.body.smoke;
      sensor.fire = req.body.fire == 0 ? false : true;
      sensor.doorsensor = req.body.doorsensor == 0 ? false : true;
    }
  });
  if (found == 0) {
    let sensorData = {
      suhu: req.body.suhu,
      humidity: req.body.humidity,
      smoke: req.body.smoke,
      fire: req.body.fire == 0 ? false : true,
      doorsensor: req.body.doorsensor == 0 ? false : true,
      lokasi: req.body.lokasi,
    };
    sensorArray.push(sensorData);
  }
  return res.send("Data created GET");
});

router.get("/reset", function (req, res) {
  sensorArray = [];
  let sensorReset = {
    suhu: 0,
    humidity: 0,
    smoke: 0,
    fire: false,
    doorsensor: false,
    lokasi: "Sensor 1",
  };
  sensorArray.push(sensorReset);
  return res.send("Data reseted");
});

app.use("/", router);
app.listen(process.env.port || 5000, () => {
  console.log("Running at Port " + (process.env.PORT || 5000));
});
