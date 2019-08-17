const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

const passport = require("./passport/passporthandler");
const config = require("./config.prod");

const app = express();

app.use(express.static(path.resolve(__dirname, "public")));

app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  if (req.user) {
    // res.render("home", { user: req.user });
    res.redirect("http://localhost:3000/?id=" + req.user.id);
  } else {
    res.redirect("/auth/login");
  }
});

mongoose
  .connect(config.mongodb.URI, { useNewUrlParser: true })
  .then(() => {
    app.listen("5000", () => {
      console.log("server started at http://localhost:5000");
    });
  })
  .catch(() => {
    throw new Error("Could not connect to Database. Please try later.");
  });
