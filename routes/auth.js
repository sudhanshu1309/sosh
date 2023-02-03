const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.get("/signout", signout);

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 char long"),
    check("email").isEmail().withMessage("Email is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password should minimum 5 char"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({ min: 5 }).withMessage("Password is required!"),
  ],
  signin
);

router.get("/testroute", isSignedIn, (_req, res) => {
  res.send("this is protected!");
});

module.exports = router;
