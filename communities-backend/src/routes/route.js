import express from "express";
import * as User_Controller from "../controllers/usersController.js";
import * as UserDB from "../controllers/db/user.js";
import * as Auth_Controller from "../controllers/authController.js";
import { generateToken } from "../utils/Authenticaion/JWT.js";
import passport from "passport";

const router = express.Router();

// auth routes
router.post("/register", Auth_Controller.register);
router.get("/verify/:token", Auth_Controller.verify);
router.post("/login", Auth_Controller.login);
router.get(
  "/google",
  Auth_Controller.google_C,
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  Auth_Controller.google_R
);

// user routes
router.get("/user", User_Controller.getUser);

export default router;
