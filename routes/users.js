//Using https://gist.github.com/paigen11/c72c8c20da9cd440f45025a1b05e5e58 as a starting point

const express = require("express");
const router = express.Router();
const data = require("../data");
const UsersData = data.users;

const jwtSecret = require("../config/auth/jwtSecret");
const jwt = require("jsonwebtoken");
const passport = require("passport");


router.post("/", async (req, res, next) => {
  //ERR CHECK
  console.log("check login Req!");

  passport.authenticate('login', {session:false}, async(err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
        const authUser = await UsersData.find(user.username);
      req.logIn(authUser, {session:false}, async(user, err) => {
        if(err) return;
        
        const token = jwt.sign({ user: authUser.username }, jwtSecret.secret);
        res.status(200).send({
            auth: true,
            token: token,
            message: 'user found & logged in',
        });
      });
    //   req.logIn(user, err => {
    //     User.findOne({
    //       where: {
    //         username: user.username,
    //       },
    //     }).then(user => {
    //       const token = jwt.sign({ id: user.username }, jwtSecret.secret);
    //       res.status(200).send({
    //         auth: true,
    //         token: token,
    //         message: 'user found & logged in',
    //       });
    //     });
    //   });
    }
  })(req, res, next);
});

router.post('/register', async (req, res, next) => {
    // console.log(req);
    // console.log("**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************");
    // console.log(res);
    // console.log(next);


    passport.authenticate('register', {session:false}, async(err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } 
      else {
        console.log("****************************************************************************")
        const authUser = await UsersData.find(user.username);
        const formData = req.body;
        console.log(formData)
        // console.log(formData.sport)
        const updatedUser = await UsersData.updateTypeSport(authUser._id, formData["type"], formData["sport"]);
        req.logIn(updatedUser, {session:false}, async(user, err) => {
            if(err) {throw err;}
            
            const token = jwt.sign({ user: authUser.username }, jwtSecret.secret);
            console.log('user created in db');
            res.status(200).send({ message: 'user created' });
        });

        //   const authUser = await UsersData.find(user.username);
        //   try{
        //       console.log(typeof authUser._id)
        //     const updatedUser = await UsersData.updateTypeSport(authUser._id, "referee", ["basketball"]);
        //     const token = jwt.sign({ user: authUser.username }, jwtSecret.secret);
        //     console.log('user created in db');
        //     res.status(200).send({ 
        //         user: updatedUser,
        //         message: 'user created' });
        //     }
        //     catch(e){
        //         res.status(404).json({ error: e});
        //     }
        // req.logIn(async(user, err) => {
        //     if(err) {throw err;}
        //     const authUser = await UsersData.find(user.username);
        //     const updatedUser = await UsersData.updateTypeSport(authUser._id, "referee", ["basketball"]);
        //     const token = jwt.sign({ user: authUser.username }, jwtSecret.secret);
        //     console.log('user created in db');
        //     res.status(200).send({ message: 'user created' });
        //   const data = {
        //     first_name: req.body.first_name,
        //     last_name: req.body.last_name,
        //     email: req.body.email,
        //     username: user.username,
        //   };
        //   User.findOne({
        //     where: {
        //       username: data.username,
        //     },
        //   }).then(user => {
        //     user
        //       .update({
        //         first_name: data.first_name,
        //         last_name: data.last_name,
        //         email: data.email,
        //       })
        //       .then(() => {
        //         console.log('user created in db');
        //         res.status(200).send({ message: 'user created' });
        //       });
        //   });
        // });
      }
    })(req, res, next);
  });



module.exports = router;