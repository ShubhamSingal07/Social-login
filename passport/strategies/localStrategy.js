const LocalStrategy = require("passport-local").Strategy;

const User = require("../../models/user");

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email, strategy: "Local" });
      if (!user || user.password !== password) {
        req.authError = {
          password: "Invalid email or password",
        };
        return done(null, false, { message: "Invalid email or password" });
      }
      done(null, user);
    } catch (err) {
      req.authError = { password: "There was an Internal Server Error" };
      done(err);
    }
  },
);
