const teamListRoutes = require("./teamList");
const rosterRoutes = require("./roster");
const eventsRoutes = require("./events");
const usersRoutes = require("./users");
//const LocationRoutes = require("./Location");

const constructorMethod = app => {
    app.use("/teamList",teamListRoutes);
    app.use("/roster", rosterRoutes);
    app.get("/", (req, res) => {
      res.sendFile(path.resolve("static/login.html"));
    });//might remove
  
    // app.use("*", (req, res) => {
    //   res.redirect("static/main.js");
    // });
  };
  
  module.exports = constructorMethod;