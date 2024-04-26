import express from "express";
import * as User_Controller from "../controllers/usersController.js";
import * as Auth_Controller from "../controllers/authController.js";

const router = express.Router();

// auth routes
router.post("/register", Auth_Controller.register);
router.get("/verify/:token", Auth_Controller.verify);

// user routes
router.get("/user", User_Controller.getUser);

export default router;
