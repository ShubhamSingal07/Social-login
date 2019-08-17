const FacebookStrategy = require("passport-facebook");

const User = require("../../models/user");
const config = require("../../config.prod");

module.exports = new FacebookStrategy(
  {
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callback,
    profileFields: ["id", "displayName", "picture"],
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookId: profile.id }).then(currentUser => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        new User({
          facebookId: profile.id,
          username: profile.displayName,
          thumbnail: profile._json.picture.data.url,
          strategy: "Facebook",
        })
          .save()
          .then(newUser => {
            done(null, newUser);
          });
      }
    });
  },
);
