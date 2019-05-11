const teamListRoutes = require("./teamList");
const rostersRoutes = require("./rosters");
const eventsRoutes = require("./events");
const usersRoutes = require("./users");
//const LocationRoutes = require("./Location");
var passport = require('passport');

const path = require("path");

const constructorMethod = app => {
    app.use("/teamList", passport.authenticate('jwt', {session: false}), teamListRoutes);
    app.use("/rosters", rostersRoutes);
    app.use("/events", eventsRoutes);
    app.use("/users", usersRoutes);
    app.get("/", (req, res) => {
      res.sendFile(path.resolve("static/login.html"));
    });//might remove
    app.get("/register", (req, res) => {
        res.sendFile(path.resolve("static/register.html"));
      });
  
    // app.use("*", (req, res) => {
    //   res.redirect("static/main.js");
    // });
  };
  
  module.exports = constructorMethod;