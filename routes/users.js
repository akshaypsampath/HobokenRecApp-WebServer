//Using https://gist.github.com/paigen11/c72c8c20da9cd440f45025a1b05e5e58 as a starting point
const bcrypt =require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;
const express = require("express");
const router = express.Router();
const data = require("../data");
const UsersData = data.users;

// const jwtSecret = require("../config/auth/jwtSecret");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const xss = require("xss");

// router.post('/login', function(req, res, next) {
//   reqBodyData = req.body;
//   if(xss(reqBodyData.username) && xss(reqBodyData.password)) {
//     passport.authenticate('local', function(err, user, info) {
//       if (err) {
//          console.log("error");
//          return next(err); 
//       }
//       if (!user) {
//          return res.redirect('/user/login'); 
//       }  
//       req.logIn(user, function(err) {
//         if(user.role == "admin") {
//           return res.redirect('/admin/dashboard');
//         }
//         return res.redirect('/');
//       });
//     })(req, res, next);
//   }
// });

router.post("/", async (req, res, next) => {
  //ERR CHECK
  console.log("check login Req!");
  reqBodyData = req.body;
  if(xss(reqBodyData.username) && xss(reqBodyData.password)) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
         console.log(err);
         return next(err); 
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      }
      // if (!user) {
      //    return res.redirect('/user/login'); 
      // }  
      req.logIn(user, function(err) {
        if(err) return;
        return res.render("homePage", {user:user});
        // if(user.role == "admin") {
        //   return res.redirect('/admin/dashboard');
        // }
        // return res.redirect('/');
      });
    })(req, res, next);
  }
});
  // passport.authenticate('login', {session:false}, async(err, user, info) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   if (info != undefined) {
  //     console.log(info.message);
  //     res.send(info.message);
  //   } else {
  //       const authUser = await UsersData.find(user.username);
  //     req.logIn(authUser, {session:false}, async(user, err) => {
  //       if(err) return;
        
  //       const token = jwt.sign({ user: authUser.username }, jwtSecret.secret);
  //       // res.status(200).send({
  //       //     auth: true,
  //       //     token: token,
  //       //     message: 'user found & logged in',
  //       // });
  //       res.json({authUser, token});
  //     });
  //   //   req.logIn(user, err => {
  //   //     User.findOne({
  //   //       where: {
  //   //         username: user.username,
  //   //       },
  //   //     }).then(user => {
  //   //       const token = jwt.sign({ id: user.username }, jwtSecret.secret);
  //   //       res.status(200).send({
  //   //         auth: true,
  //   //         token: token,
  //   //         message: 'user found & logged in',
  //   //       });
  //   //     });
  //   //   });
  //   }
  // })(req, res, next);


router.post('/register', async (req, res, next) => {
  // console.log("> routes/users/register");
  try {
    let newUserData = req.body;
    console.log(newUserData)
    
    if(xss(newUserData.username) && xss(newUserData.password) && xss(newUserData.type) && xss(newUserData.sport) ) {
      username = newUserData.username;
      userType = newUserData.type;
      userSport = newUserData.sport;
      password = newUserData.password;
      console.log("********************")

      const user = await UsersData.find(username);
      console.log("user:"+ user)


      if (user != null) {
          console.log('username already taken');
          return done(null, false, { error: 'username already taken' });
      } 
      else {
        console.log(username+" is new!");
          const temp =await bcrypt.hash(password, BCRYPT_SALT_ROUNDS,  async(err, hashedPassword)=>{
              if(err) return;
              console.log('> bcrypt');
              const newUser = await UsersData.create(username, hashedPassword, userType, userSport);
              // const updatedUser = await UsersData.updateTypeSport(newUser._id, userType, userSport);
              console.log('> routes/users/ user created');
              console.log(newUser)
//                 // note the return needed with passport local - remove this return for passport JWT to work
              console.log(temp)
              req.login(newUser, function(err){
                if(err) {
                  // req.flash('loginMessage', err);
                  // res.redirect("/user/signup");
                  res.redirect("/");
                  
                }
                // res.redirect('/user/profile');
                res.render("homePage", {user: newUser});
              });
              return (null, newUser);//newUser;//done
          });
        // console.log(newUser)
        // console.log(temp)
        //   req.login(newUser, function(err){
        //     if(err) {
        //       // req.flash('loginMessage', err);
        //       // res.redirect("/user/signup");
        //       res.redirect("/");
              
        //     }
        //     // res.redirect('/user/profile');
        //     res.render("homePage", {user: newUser});
        //   });
      }
    }
  } catch (err) {
      res.json({error:err});
      // done(err);
  }
});

  // } catch (error) {
  //   console.log("Got Exception error : " + error);
  //   res.redirect('/');
  // }

    // passport.authenticate('register', {session:false}, async(err, user, info) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   if (info != undefined) {
    //     console.log(info.message);
    //     res.send(info.message);
    //   } 
    //   else {
    //     console.log("****************************************************************************")
    //     const authUser = await UsersData.find(user.username);
    //     const formData = req.body;
    //     console.log(formData)
    //     // console.log(formData.sport)
    //     const updatedUser = await UsersData.updateTypeSport(authUser._id, formData["type"], formData["sport"]);
    //     req.logIn(updatedUser, {session:false}, async(user, err) => {
    //         if(err) {throw err;}
            
    //         const token = jwt.sign({ user: authUser.username }, jwtSecret.secret);
    //         console.log('user created in db');
    //         res.status(200).send({ message: 'user created' });
    //     });

    //   }
    // })(req, res, next);
    router.get('/logout', function (req, res) {
      console.log("/USERS/logout")
      req.logout();
      res.render("login");
      // res.redirect('/');
    });


module.exports = router;