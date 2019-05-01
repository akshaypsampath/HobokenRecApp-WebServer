const teamListRoutes = require("./teamList");
const rosterRoutes = require("./roster");
const eventsRoutes = require("./events");
const usersRoutes = require("./users");
//const LocationRoutes = require("./Location");

const path = require("path");

const constructorMethod = app => {
    app.use("/teamList",teamListRoutes);
    app.use("/roster", rosterRoutes);
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