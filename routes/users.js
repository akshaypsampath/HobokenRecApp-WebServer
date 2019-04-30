//Using https://gist.github.com/paigen11/c72c8c20da9cd440f45025a1b05e5e58 as a starting point

const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;

const jwtSecret = require("../config/auth/jwtConfig");
const jwt = require("jsonwebtoken");
const passport = require("passport");


router.get("/login", async (req, res) => {
  //ERR CHECK
  console.log("check login Req!");
//   try{
    // if(!req.params.id) throw "No Id Found!"
    // const user = await detailsData.get(req.params.id.toString());
    // console.log(user);
    // res.render("details", { user: user });
  
//     res.json("teamList");
//   } catch (e) {
//     console.log("threw it out")
//     res.status(404).json({ error: "User not found" });
//   }

  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      req.logIn(user, err => {
        User.findOne({
          where: {
            username: user.username,
          },
        }).then(user => {
          const token = jwt.sign({ id: user.username }, jwtSecret.secret);
          res.status(200).send({
            auth: true,
            token: token,
            message: 'user found & logged in',
          });
        });
      });
    }
  })(req, res, next);
});



module.exports = router;