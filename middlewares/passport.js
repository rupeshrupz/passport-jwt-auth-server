const { compareSync } = require("bcrypt");
let passport = require("passport")
let LocalStrategy = require("passport-local").Strategy
let UserSchema = require("../Model/UserModel")

passport.use(new LocalStrategy(
    function(username, password, done) {
      UserSchema.findOne({ username: username }
           ,  function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false,{message:"incorret username"}); }
        if (!compareSync(password, user.password)) { return done(null, false,{message:"incorrect password"}); }
        return done(null, user);
      });
    }
  ));



passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    UserSchema.findById(id, function(err, user)
    {
        done(err, user)
    })
})