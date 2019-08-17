const route = require("express").Router();

const User = require("../models/user");
const { validateEmail, validateName, validatePassword, matchPasswords } = require("../utils/validation");

route.get("/", (req, res) => {
  res.render("signup");
});

route.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const passwordAgain = req.body.passwordAgain;
    const validEmail = validateEmail(email);
    const validName = validateName(username);
    const validPassword = validatePassword(password);
    const matchPassword = matchPasswords(password, passwordAgain);
    if (validEmail.valid && validName.valid && validPassword.valid && matchPassword.valid) {
      const user = await User.findOne({ email, strategy: "Local" });
      if (!user) {
        const newUser = await new User({
          email,
          username,
          password,
          strategy: "Local",
        }).save();
        if (!newUser) throw new Error("Error creating user");

        res.redirect("/auth/login");
      } else {
        res.render("signup", {
          errors: {
            email: "User with this email already exists",
          },
        });
      }
    } else {
      res.render("signup", {
        errors: {
          email: validEmail.error,
          name: validName.error,
          password: validPassword.error,
          matchPassword: matchPassword.error,
        },
      });
    }
  } catch (err) {
    res.redirect("/auth/signup");
  }
});

module.exports = route;
