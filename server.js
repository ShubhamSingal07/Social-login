const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

const passport = require("./passport/passporthandler");
const config = require("./config.prod");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.static(path.resolve(__dirname, "public")));

app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey]
  })
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

app.get("/logout", (req, res) => {
  try {
    req.logout();
    res.redirect("/");
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
});

mongoose
  .connect(config.mongodb.URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started at http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    throw new Error("Could not connect to Database. Please try later.");
  });
