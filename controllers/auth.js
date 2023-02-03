const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");

exports.signout = (_req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout successfully!",
  });
};

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
        error: err,
      });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found!",
      });
    }

    if (user.password !== password) {
      return res.status(403).json({
        error: "Wrong Password",
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to the front end
    const { _id, name, email } = user;
    return res.json({
      token,
      user: {
        _id,
        name,
        email,
      },
    });
  });
};

//protected routes
exports.isSignedIn = jwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
