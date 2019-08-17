const GoogleStrategy = require("passport-google-oauth20").Strategy;

const config = require("../../config.prod");
const User = require("../../models/user");

module.exports = new GoogleStrategy(
  {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callback,
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then(currentUser => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        new User({
          googleId: profile.id,
          username: profile.displayName,
          thumbnail: profile._json.picture,
          strategy: "Google",
        })
          .save()
          .then(newUser => {
            done(null, newUser);
          });
      }
    });
  },
);
