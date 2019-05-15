const teamListRoutes = require("./teamList");
const eventsRoutes = require("./events");
const usersRoutes = require("./users");
var passport = require('passport');
var passportAuth = require("../config/auth/passport");

const path = require("path");

const constructorMethod = app => {
    app.use("/teamList", teamListRoutes);//passport.authenticate('jwt', {session: false}), 
    // app.use("/rosters", rostersRoutes);
    app.use("/events", eventsRoutes);
    app.use("/users", usersRoutes);
    app.get("/", (req, res) => {
      if (req.isAuthenticated()) {
        res.render("homePage", {user:res.locals.user});
      }
      else{
        res.render("login");
      }
      // res.sendFile(path.resolve("static/login.html"));
    });//might remove
    app.get("/register", (req, res) => {
        res.render("register")
        // res.sendFile(path.resolve("static/register.html"));
      });
  
    // app.use("*", (req, res) => {
    //   res.redirect("static/main.js");
    // });
  };
  
  module.exports = constructorMethod;