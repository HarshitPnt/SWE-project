import { verifyToken } from "../utils/Authenticaion/JWT.js";

export const verify = async (req, res, next) => {
  try {
    // token from request
    let token = req.query.token;
    let username = req.query.username;
    // verify token
    if (!token || !username || username == undefined || token == undefined) {
      console.log("Unverified");
      req.verified = false;
      next(); // Add this line to move to the next middleware
    } else {
      const decoded = verifyToken({
        username: username,
        token: token,
      });
      if (decoded === false) {
        req.verified = false;
        next(); // Add this line to move to the next middleware
      } else {
        req.verified = true;
        req.username = req.query.username;
        next(); // Add this line to move to the next middleware
      }
    }
  } catch (err) {
    console.log(err);
    req.verified = false;
  }
};
