import express from "express";
import * as User_Controller from "../controllers/usersController.js";
import * as UserDB from "../controllers/db/user.js";
import * as Auth_Controller from "../controllers/authController.js";
import * as Post_Controller from "../controllers/postsController.js";
import * as Community_Controller from "../controllers/communityController.js";
import { generateToken } from "../utils/Authenticaion/JWT.js";
import passport from "passport";
import { verify } from "../middleware/verifyToken.js";
import {
  checkCommunityAdmin,
  checkSuperuser,
} from "../middleware/users/checkRoles.js";
import { checkPostCreator } from "../middleware/posts/checkPrivileges.js";

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

// token verification
router.use(verify);
router.get("/user/private/:id", User_Controller.getPrivateUser);
router.patch("/user/update", User_Controller.updateUser);

router.patch(
  "/superuser/user/ban/:id",
  checkSuperuser,
  User_Controller.banUser
);

router.patch(
  "/superuser/user/unban/:id",
  checkSuperuser,
  User_Controller.unbanUser
);

router.get(
  "/superuser/user/banned",
  checkSuperuser,
  User_Controller.getAllBannedUsers
);

router.patch(
  "/superuser/community/ban/:id",
  checkSuperuser,
  Community_Controller.banCommunity
);

router.patch(
  "/superuser/community/unban/:id",
  checkSuperuser,
  Community_Controller.unbanCommunity
); // tested

router.get(
  "/superuser/community/banned",
  checkSuperuser,
  Community_Controller.getAllBannedCommunities
); // tested

// community routes
router.get("/community/:id", Community_Controller.getCommunityByID); // tested

router.get(
  "/community/owner/:owner_id",
  Community_Controller.getCommunityByOwner
); // tested

router.get("/search/community", Community_Controller.searchCommunity); //tested

router.patch(
  "/community/:id",
  checkCommunityAdmin,
  Community_Controller.updateCommunity
); // tested

router.post("/community", Community_Controller.createCommunity);

router.post(
  "/community/delete/:id",
  checkCommunityAdmin,
  Community_Controller.deleteCommunity
);

// router.post("/post", Post_Controller.createPost);

// post routes
router.get("/post/:id", Post_Controller.getPostById); // tested
router.get("/post/creator/:creator_id", Post_Controller.getPostByCreatorID); // tested
router.get(
  "/post/community/:community_id",
  Post_Controller.getPostByCommunityID
);
router.get("/search/post", Post_Controller.searchPosts);

// TODO: checkPrivileges middleware
// router.post("/post", Post_Controller.createPost);

router.patch("/post/:id", checkPostCreator, Post_Controller.updatePost);

router.delete("/post/:id", checkPostCreator, Post_Controller.deletePost);

export default router;
