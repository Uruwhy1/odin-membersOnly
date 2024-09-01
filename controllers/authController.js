const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

function isAuthenticated(req) {
  return req.isAuthenticated();
}

exports.signupForm = (req, res) => {
  if (isAuthenticated(req)) return res.redirect("/");
  res.render("signup", {
    title: "Sign Up",
  });
};

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const emailExists = await User.findOne({ where: { email: email } });
    if (emailExists) {
      return res.redirect("signup/?error=email-existing");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      membershipStatus: false,
    });

    req.logIn(newUser, (err) => {
      if (err) {
        return next(err);
      }
      req.session.user = newUser;
      return res.redirect("/");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.loginForm = (req, res, next) => {
  if (isAuthenticated(req)) return res.redirect("/");
  else
    res.render("login", {
      title: "Log In",
    });
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      // Redirect with error message as query parameter
      return res.redirect("/login/?error=" + encodeURIComponent(info.message));
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

exports.membershipForm = (req, res) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/?error=Not authenticated");
  }

  res.render("become-member", { title: "Membership Form" });
};
exports.getMembership = async (req, res) => {
  try {
    const passCode = req.body.passKey;
    console.log(passCode);
    if (passCode !== "secretKey") {
      return res.redirect("/member/?error=Invalid passcode");
    }

    const user = req.user;
    user.membershipStatus = true;
    await user.save();


    // update session changes are displayed
    req.session.user = user;

    req.session.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
      res.redirect("/?success=Membership updated");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
