const passport = require("passport");

const strategies = require("./strategies");
const User = require("../models/user");

passport.use(strategies.localStrategy);
passport.use(strategies.googleStrategy);
passport.use(strategies.facebookStrategy);
passport.use(strategies.instagramStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

module.exports = passport;
