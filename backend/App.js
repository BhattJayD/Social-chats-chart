const express = require("express");
const app = express();
var mysql = require("mysql");
const cors = require("cors");
app.use(cors());
var con = mysql.createConnection({
  host: "localhost",
  user: "DB_USERNAME",
  password: "DB_PASSWORD",
  database: "DB_NAME",
});
var TwitterCount = 0;
var WebCount = 0;
var FBCount = 0;
var RedditCount = 0;
var InstagramCount = 0;
var piedata = [];
var sum = 0;

con.connect(async function (err) {
  if (err) throw err;
  await con.query("SELECT * FROM Twitter", function (err, result, fields) {
    if (err) throw err;
    TwitterCount = result.length;
    // console.log(TwitterCount);
  });
  await con.query("SELECT * FROM Reddit", function (err, result, fields) {
    if (err) throw err;
    RedditCount = result.length;
    // console.log(RedditCount);
  });
  await con.query("SELECT * FROM Web", function (err, result, fields) {
    if (err) throw err;
    WebCount = result.length;
    // console.log(WebCount);
  });
  await con.query("SELECT * FROM Instagram", function (err, result, fields) {
    if (err) throw err;
    InstagramCount = result.length;
    // console.log(InstagramCount);
  });
  await con.query("SELECT * FROM Facebook", function (err, result, fields) {
    if (err) throw err;
    FBCount = result.length;
    console.log(FBCount);
    sum = FBCount + WebCount + TwitterCount + InstagramCount + RedditCount;
    // console.log(sum, "sum");
    // console.log((WebCount * 100) / sum, "web");
    // console.log((InstagramCount * 100) / sum, "insta");
    // console.log((TwitterCount * 100) / sum, "twt");
    // console.log((RedditCount * 100) / sum, "red");
    // console.log((FBCount * 100) / sum, "fb");
    piedata = [
      {
        id: 1,
        y: (WebCount * 100) / sum,
        x: Math.floor((WebCount * 100) / sum) + "%",
        platform: "Web",
        count: WebCount,
        color: "#3BACB6",
      },
      {
        id: 2,
        y: (TwitterCount * 100) / sum,
        x: Math.floor((TwitterCount * 100) / sum) + "%",
        platform: "Twitter",
        count: TwitterCount,
        color: "#EEB0B0",
      },
      {
        id: 3,
        y: (InstagramCount * 100) / sum,
        x: Math.floor((InstagramCount * 100) / sum) + "%",
        platform: "Instagram",
        color: "#83BD75",
        count: InstagramCount,
      },
      {
        id: 4,
        y: (FBCount * 100) / sum,
        x: Math.floor((FBCount * 100) / sum) + "%",
        platform: "Facebook",
        color: "#FF4949",
        count: FBCount,
      },
      {
        id: 5,
        y: (RedditCount * 100) / sum,
        x: Math.floor((RedditCount * 100) / sum) + "%",
        color: "#FF8D29",
        platform: "Reddit",
        count: RedditCount,
      },
    ];
  });
});
let count = {};
app.get("/count", function (req, res) {
  res.send(JSON.stringify(piedata));
});

app.get("/filter", function (req, res) {
  console.log(req.query.platform);
  var platform = req.query.platform;
  con.query(`SELECT * FROM ${platform}`, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(5000);
