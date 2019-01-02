const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text;
});

app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(`${now}: ${req.method} ${req.url}`);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("unable to append server.log");
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render("maintenance.hbs");
});
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  //res.send("<h1>Hello Express!</h1>");
  /*  res.send({
        name: "mano",
        likes: ["cooking", "traveling"]
    });*/
  res.render("home.hbs", { pageTitle: "Home Page" });
});

app.get("/about", (req, res) => {
  //res.send("About Page");
  res.render("about.hbs", { pageTitle: "About Page" });
});

app.get("/bad", (req, res) => {
  res.send({ errorMessage: "Unable to load" });
});
app.listen(3000, () => {
  console.log("server is up on port 3000");
});
