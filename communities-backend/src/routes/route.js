import express from "express";
import * as User_Controller from "../controllers/usersController.js";

const router = express.Router();

router.get("/user/:id", User_Controller.getUserById);

export default router;
