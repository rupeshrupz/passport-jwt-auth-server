const passport = require('passport');
let UserSchema = require('../Model/UserModel')
let JwtStrategy = require('passport-jwt').Strategy
 let   ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'skjdjskdsk';


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    UserSchema.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));