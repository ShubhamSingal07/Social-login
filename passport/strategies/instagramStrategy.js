const InstagramStrategy = require("passport-instagram");

const config = require("../../config.prod");
const User = require("../../models/user");

module.exports = new InstagramStrategy(
  {
    clientID: config.instagram.clientId,
    clientSecret: config.instagram.clientSecret,
    callbackURL: config.instagram.callback,
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ instagramId: profile.id }).then(currentUser => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        new User({
          instagramId: profile.id,
          username: profile.displayName,
          thumbnail: profile._json.data.profile_picture,
          strategy: "Instagram",
        })
          .save()
          .then(newUser => {
            done(null, newUser);
          });
      }
    });
  },
);
