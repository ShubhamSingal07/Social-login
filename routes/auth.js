const route = require("express").Router();

route.use("/login", require("./login"));
route.use("/signup", require("./signup"));

route.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

route.use("/google", require("./google"));
route.use("/facebook", require("./facebook"));
route.use("/instagram", require("./instagram"));

module.exports = route;
