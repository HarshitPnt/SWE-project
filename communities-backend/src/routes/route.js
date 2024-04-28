import express from "express";
import * as User_Controller from "../controllers/usersController.js";
import * as UserDB from "../controllers/db/user.js";
import * as Auth_Controller from "../controllers/authController.js";
import * as Post_Controller from "../controllers/postsController.js";
import { generateToken } from "../utils/Authenticaion/JWT.js";
import passport from "passport";
import { verify } from "../middleware/verifyToken.js";
import { checkSuperuser } from "../middleware/users/checkRoles.js";

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

router.post("/forgot", Auth_Controller.forgot);

// user routes
router.get("/user/public/:id", User_Controller.getPublicUser);

router.use(verify);
router.get("/user/private/:id", User_Controller.getPrivateUser);
router.patch("/superuser/ban/:id", checkSuperuser, User_Controller.banUser);
router.patch("/superuser/unban/:id", checkSuperuser, User_Controller.unbanUser);
router.get(
  "/superuser/getBanned",
  checkSuperuser,
  User_Controller.getAllBannedUsers
);
router.patch("/user/update", User_Controller.updateUser);
router.get("/user/ban", checkSuperuser, User_Controller.getAllBannedUsers);

// post routes
router.get("/post/:id", Post_Controller.getPostById);
router.get("/post/creator/:creator_id", Post_Controller.getPostByCreatorID);
router.get(
  "/post/community/:community_id",
  Post_Controller.getPostByCommunityID
);
router.get("/search/post", Post_Controller.searchPosts);

export default router;
