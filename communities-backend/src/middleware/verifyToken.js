import { verifyToken } from "../utils/Authenticaion/JWT.js";

export const verify = async (req, res, next) => {
  try {
    // token from request
    console.log("HERE");
    let token = req.body.token;
    // verify token
    if (!token) {
      req.verified = false;
      next(); // Add this line to move to the next middleware
    } else {
      const decoded = verifyToken({
        username: token.username,
        token: token.token,
      });
      if (decoded === false) {
        req.verified = false;
        next(); // Add this line to move to the next middleware
      } else {
        req.verified = true;
        req.username = token.username;
        next(); // Add this line to move to the next middleware
      }
    }
  } catch (err) {
    console.log(err);
    req.verified = false;
  }
};
