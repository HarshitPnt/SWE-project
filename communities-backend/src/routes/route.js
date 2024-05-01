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
import * as Moderator_Controller from "../controllers/moderatorController.js";
import * as CommunityUser_Controller from "../controllers/communityUserController.js";
import { getTrendingPosts } from "../controllers/trending.js";
import * as Votes_Controller from "../controllers/votesController.js";
import * as Comment_Controller from "../controllers/commentController.js";

const router = express.Router();

// auth routes
router.post("/register", Auth_Controller.register);
router.get("/verify/:token", Auth_Controller.verify);
router.get("/verifyToken", Auth_Controller.verifyTokenPath);
router.post("/login", Auth_Controller.login);
router.get(
  "/google",
  Auth_Controller.google_C,
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

// router.get("/user/:id", User_Controller.getUserByID); // tested

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  Auth_Controller.google_R
);

router.post("/forgot", Auth_Controller.forgot);
router.get("/trending", getTrendingPosts);

// user routes
router.get("/user/public/:id", User_Controller.getPublicUser);

// token verification
router.use(verify);
router.get("/user/username/:name", User_Controller.getUserByUsername); // tested
router.get("/user/:id", User_Controller.getUserByID); // tested
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

router.get("/community/:id/details", Community_Controller.getCommunityDetails);

router.get(
  "/post/community/:community_id/all",
  Post_Controller.getAllPostsByCommunityID
);
router.get("/search/post", Post_Controller.searchPosts);

// TODO: checkPrivileges middleware
// router.post("/post", Post_Controller.createPost);

router.patch("/post/:id", checkPostCreator, Post_Controller.updatePost);

router.delete("/post/:id", checkPostCreator, Post_Controller.deletePost);

// moderator routes
router.get("/moderator/user/:id", Moderator_Controller.getModeratorByUserID); // tested
router.get(
  "/moderator/community/:id",
  checkCommunityAdmin,
  Moderator_Controller.getModeratorByCommunityID
); //tested

router.post(
  "/moderator/:id",
  checkCommunityAdmin,
  Moderator_Controller.insertModerator
); //tested
router.patch(
  "/moderator/:id",
  checkCommunityAdmin,
  Moderator_Controller.updateModeratorPrivileges
); //tested

router.delete(
  "/moderator/:id",
  checkCommunityAdmin,
  Moderator_Controller.deleteModerator
); //tested

router.get(
  "/community/user/:id",
  checkCommunityAdmin,
  CommunityUser_Controller.getAllUsers
);

router.get(
  "/community/user/requested/:id",
  checkCommunityAdmin,
  CommunityUser_Controller.getRequested
);

router.get(
  "/community/user/invited/:id",
  checkCommunityAdmin,
  CommunityUser_Controller.getInvited
);

router.get(
  "/community/user/status/:community_id/:username",
  CommunityUser_Controller.getUserStatus
);

router.get(
  "/community/list/joined",
  CommunityUser_Controller.getJoinedCommunities
);

router.get(
  "/community/list/invited",
  CommunityUser_Controller.getInvitedCommunities
);

router.get(
  "/community/list/requested",
  CommunityUser_Controller.getRequestedCommunities
);

router.get("/community/list/admin", Community_Controller.getAdminCommunities);

router.get(
  "/community/list/moderator",
  Moderator_Controller.getModeratorCommunities
);

router.get("/vote/post/:post_id", Votes_Controller.getVotesByPostId);

router.get("/vote/poll/:poll_id", Votes_Controller.getVotesByPollId);

router.post("/vote/post/:post_id", Votes_Controller.createVoteByPostId);

router.post("/vote/poll/:poll_id", Votes_Controller.createVoteByPollId);

// comment routes
router.get("/comment/:id", Comment_Controller.getCommentsByPostId);

export default router;
