const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const static = express.static(__dirname + "/public");

var passport = require('passport');
var Strategy = require('passport-local').Strategy;

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

console.log(app.settings.env)

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sessionOpts = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  //store: sessionStore,
  secret: "config.session.secret",
  cookie : { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
}

// // app.use(bodyParser.json())
// // app.use(bodyParser.urlencoded({extended: true}))
// app.use(cookieParser(sessionOpts.secret))
// app.use(session(sessionOpts))
app.use(session(sessionOpts))

app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// app.get('/', (req,res)=>{
//   res.render('home');
// });

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });



configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});