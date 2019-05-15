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

// const tools = require("./public/js/tools")

require("./config/auth/passport")(passport);

console.log(app.settings.env)

app.use("/public", static);
app.use("/static", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var sessionOpts = {
  name: 'HRACookie',
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  //store: sessionStore,
  secret: "config.session.secret",
  cookie : { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
}

// // app.use(bodyParser.json())
// // app.use(bodyParser.urlencoded({extended: true}))
// app.use(cookieParser(sessionOpts.secret))
app.use(session(sessionOpts))


app.use(passport.initialize())
app.use(passport.session())

var hbs = exphbs.create({
  helpers: require("./public/js/helpers").helpers,
  // helpers: {
  //     dateFormat: function(date) { return new Handlebars.SafeString(tools._getMonthDate(date)); },
  //     // json: function (value, options) {
  //     //     return JSON.stringify(value);
  //     // }
  // },
  defaultLayout: "main"
});


app.engine("handlebars", exphbs(hbs));// exphbs(hbs.engine));//exphbs({ defaultLayout: "main"})
app.set("view engine", "handlebars");

// app.get('/', (req,res)=>{
//   res.render('home');
// });

// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

app.use('*', function(req, res, next) {
  res.locals.user = req.user || null;
  console.log(res.locals.user)
  next();
});


configRoutes(app);

require('./routes/index')(app, passport);
// require('./routes/passport')(passport);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});