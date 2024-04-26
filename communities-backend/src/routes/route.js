import express from "express";
import * as User_Controller from "../controllers/usersController.js";

const router = express.Router();

router.get("/user", User_Controller.getUser);

export default router;
