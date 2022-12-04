let GoogleSchema = require('../Model/GoogleModel')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "302433911650-g5hd4fdqte0fl47cvet5rtcn6i0v900v.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/callback"
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