const route = require("express").Router();
const passport = require("passport");

const config = require("../config.prod");

route.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile"],
  }),
);

route.get("/redirect", passport.authenticate("google", { failureRedirect: "/auth/login" }), (req, res) => {
  res.redirect(`${config.frontend.url}/?id=${req.user.id}`);
});

module.exports = route;
