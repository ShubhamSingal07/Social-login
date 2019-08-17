const route = require("express").Router();
const passport = require("passport");

const config = require("../config.prod");
const { validateEmail, validatePassword } = require("../utils/validation");

route.get("/", (req, res) => {
  if (req.user) {
    res.redirect(`${config.frontend.url}/?id=${req.user.id}`);
  } else {
    res.render("login");
  }
});

route.post(
  "/",
  (req, res, next) => {
    const validEmail = validateEmail(req.body.email);
    const validPassword = validatePassword(req.body.password);
    if (validEmail.valid && validPassword.valid) {
      return next();
    }
    const validationError = {
      email: validEmail.error,
      password: validPassword.error,
    };
    return res.render("login", { error: validationError });
  },
  passport.authenticate("local", {
    failWithError: true,
  }),
  (req, res) => {
    res.redirect(`${config.frontend.url}/?id=${req.user.id}`);
  },
  (err, req, res, next) => {
    if (req.authError) {
      res.render("login", { error: req.authError });
    } else {
      next();
    }
  },
);

module.exports = route;
