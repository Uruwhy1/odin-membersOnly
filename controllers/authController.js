const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.signupForm = (req, res) => {
  res.render("signup", {
    title: "Sign Up",
  });
};

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.redirect('/signup?status=error&message=match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      membershipStatus: false,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.loginForm = (req, res, next) => {
  res.render("login", {
    title: "Log In",
  });
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      // Redirect with error message as query parameter
      return res.redirect("/?error=" + encodeURIComponent(info.message));
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.user = user;
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
};
