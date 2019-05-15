//Using https://gist.github.com/paigen11/c72c8c20da9cd440f45025a1b05e5e58 as a starting point

// const jwtSecret =require('./jwtSecret');
const bcrypt =require('bcrypt');

// const mongoCollections = require("../db/mongoCollections");
// const Users = mongoCollections.Users;
const data = require("../../data");
const UsersData = data.users;


const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
  
  module.exports = function(passport) {
    // passport session setup, required for persistent login sessions
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    //Attention: you can also use the same method body as serializeUser. remove user by id is not nesssary.
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, username, password, done) => {//function(req, username, password, done) {
                
        try {
          const user = await UsersData.find(username);
          
          if (user === null) {
              return done(null, false, { message: 'Invalid Username/Password Combination' });
          } 
          else {
              bcrypt.compare(password, user.hashedPassword, function(err,res) {
                  if(res){
                      console.log('user found & authenticated');
                      delete user.hashedPassword;
                      console.log(user);
                      // note the return needed with passport local - remove this return for passport JWT
                      return done(null, user);
                  }
                  else {
                      console.log('Invalid Username/Password Combination');
                      return done(null, false, { message: 'Invalid Username/Password Combination' });
                  }
              });
          }
      } catch (err) {
          done(err);
      }
            // userData.getUserByUsername(username.toLowerCase()).then((user) => {
            //     bcrypt.compare(password, user.password, function (err, res) {
            //         if (err){
            //             return done(null, false, req.flash('loginMessage', 'Incorrect Username'));
            //             // return Promise.reject("Error");
            //         }
            //         else {
            //             if (res === true)
            //                 return done(null, user);
            //             else
            //                 return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
            //         }
            //     });
            // }).catch((error) => {
            //     console.log(error);
            //     return done(null, false, req.flash('loginMessage', 'Incorrect Username'));
            // });
        }
    ));
}


//  passport.use( 
//   'register',
//   new localStrategy(
//     {
//       usernameField: 'username',
//       passwordField: 'password',
//       session: false,
//     },
//     async(username, password, done) => {

//       try {
//         // const User = await Users();
//         // //console.log(User);
//         // const user = await User.findOne({username: username});
//         const user = await UsersData.find(username);

//         if (user != null) {
//             console.log('username already taken');
//             return done(null, false, { message: 'username already taken' });
//         } 
//         else {
//             bcrypt.hash(password, BCRYPT_SALT_ROUNDS,  async(err, hashedPassword)=>{
//                 if(err) return;
//                 const newUser = await UsersData.create(username, hashedPassword);
//                 console.log('>passport/ user created');
//                 // note the return needed with passport local - remove this return for passport JWT to work
//                 return done(null, newUser);
//             })
//         }

//         // User.findOne({
//         //     where: {
//         //       username: username,
//         //     },
//         //   }).then(user => {
//         //     if (user != null) {
//         //       console.log('username already taken');
//         //       return done(null, false, { message: 'username already taken' });
//         //     } else {
//         //       bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
//         //         User.create({ username, password: hashedPassword }).then(user => {
//         //           console.log('user created');
//         //           // note the return needed with passport local - remove this return for passport JWT to work
//         //           return done(null, user);
//         //         });
//         //       });
//         //     }
//         //   });
//       } catch (err) {
//         done(err);
//       }
//     },
//   ),
// );

// passport.use(
//   'login',
//   new localStrategy(
//     {
//       usernameField: 'username',
//       passwordField: 'password',
//       session: false,
//     },
//     async (username, password, done) => {
//         //console.log(username);

//         // bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash){
//         //     if(err) return;
//         //     const hashedPassword= hash;
//         //     console.log(password +" "+hashedPassword);
//         // });//.then(pw=>{return pw;});
        
//       try {
//         const user = await UsersData.find(username);
//         console.log(user);
//         if (user === null) {
//             return done(null, false, { message: 'Invalid Username/Password Combination' });
//         } 
//         else {
//             bcrypt.compare(password, user.hashedPassword, function(err,res) {
//                 if(res){
//                     console.log('user found & authenticated');
//                     // note the return needed with passport local - remove this return for passport JWT
//                     return done(null, user);
//                 }
//                 else {
//                     console.log('Invalid Username/Password Combination');
//                     return done(null, false, { message: 'Invalid Username/Password Combination' });
//                 }
//             });
//         }
//         // User.findOne({username: username}).then(user => {
//         //   if (user === null) {
//         //     return done(null, false, { message: 'bad username' });
//         //   } else {
//         //     bcrypt.compare(password, user.password).then(response => {
//         //       if (response !== true) {
//         //         console.log('passwords do not match');
//         //         return done(null, false, { message: 'passwords do not match' });
//         //       }
//         //       console.log('user found & authenticated');
//         //       // note the return needed with passport local - remove this return for passport JWT
//         //       return done(null, user);
//         //     });
//         //   }
//         // });
//       } catch (err) {
//         done(err);
//       }
//     },
//   ),
// );

// const opts = {
//   jwtFromRequest: ExtractJWT.fromHeader('authorization'),//ExtractJWT.fromAuthHeaderAsBearerToken(),//ExtractJWT.fromAuthHeaderWithScheme('JWT'),
//   secretOrKey: jwtSecret.secret,
// };

// passport.use(
//   'jwt',
//   new JWTstrategy(opts, async(jwt_payload, done) => {
//     console.log("auth middleware")
//     try {
//         const user = await UsersData.find(jwt_payload.id);
//         console.log(user);
//         if (user) {
//             console.log('user found in db in passport');
//             // note the return removed with passport JWT - add this return for passport local
//             done(null, user);
//         } else {
//             console.log('user not found in db');
//             done(null, false);
//         }

//     //     const User = await Users();
//     //     console.log(User);
//     //   User.findOne({
//     //     where: {
//     //       username: jwt_payload.id,
//     //     },
//     //   }).then(user => {
//     //     if (user) {
//     //       console.log('user found in db in passport');
//     //       // note the return removed with passport JWT - add this return for passport local
//     //       done(null, user);
//     //     } else {
//     //       console.log('user not found in db');
//     //       done(null, false);
//     //     }
//     //   });
//     } catch (err) {
//       done(err);
//     }
//   }),
// );
