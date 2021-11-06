const express = require("express");
const passport = require("passport");
const { signup, signin } = require("./user.controllers");

const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
module.exports = router;
