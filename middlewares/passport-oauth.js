let GoogleSchema = require('../Model/GoogleModel')
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../config/index')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://passport-jwt-auth-server.vercel.app/auth/callback",
    // callbackURL:"http://localhost:5000/auth/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
     GoogleSchema.findOne({googleId: profile.id}, (err,user)=>
     {
        if (err) return cb(err, null)
        if(!user)
        {
            let newUser = new GoogleSchema({
                googleId: profile.id,
                username : profile.displayName,
                picture  : profile._json.picture
            })

            newUser.save()
            return cb(null, newUser)
        }
        else{
            return cb(null, user)
        }
     })
  }
));

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    GoogleSchema.findById(id, function(err, user)
    {
        done(err, user)
    })
})