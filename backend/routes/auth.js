import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import authController from "../controllers/authController.js";
import "../stratigies/local.js";
import passport from "passport";

const router = express.Router();



// Signup route
router.route("/signup").post(authController.signup); // Pass the function reference to handle POST requests

router.post("/login", passport.authenticate("local"), (req, res) => {
  req.authInfo.message
    ? res.status(200).send(req.authInfo)
    : res.status(200).send(req.user);
});

router.post("/verify", authController.userVerification);

export default router;
