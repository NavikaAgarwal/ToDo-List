//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); //telling the app to use body parser
app.use(express.static("public")); //telling Express to serve up this public folder as a static resource.

app.get("/", function (req, res) {
  // var currentDay = today.getDay();
  // var day = "";

  // to check whether it is a weekend or a weekday

  // if(currentDay === 6 || currentDay === 0){
  //     day = "Weekend";
  //     // res.sendFile(__dirname + "/weekend.html");
  // }
  // else{
  //     day = "Weekday";
  //     // res.sendFile(__dirname + "/weekday.html");
  // }

  // switch(currentDay){
  //     case 0:
  //         day = "Sunday";
  //         break;
  //     case 1:
  //         day = "Monday";
  //         break;
  //     case 2:
  //         day = "Tuesday";
  //         break;
  //     case 3:
  //         day = "Wednesday";
  //         break;
  //     case 4:
  //         day = "Thursday";
  //         break;
  //     case 5:
  //         day = "Friday";
  //         break;
  //     case 6:
  //         day = "Saturday";
  //         break;

  //         default:
  //             console.log("Error!");
  // }

  let day = date.getDate();
  res.render("list", { listTitle: day, newlistItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newlistItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
