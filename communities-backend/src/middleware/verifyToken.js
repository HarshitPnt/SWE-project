import { verifyToken } from "../utils/Authenticaion/JWT.js";

export const verify = async (req, res, next) => {
  try {
    // token from request
    console.log("HERE");
    let token = req.body.token;
    console.log(token);
    // verify token
    if (!token) throw new Error("Token not found");
    const decoded = verifyToken({
      username: token.username,
      token: token.token,
    });
    if (decoded === false) throw new Error("Invalid Token");
    req.verified = true;
    req.username = token.username;
    next();
  } catch (err) {
    // console.log(err);
    req.verified = false;
    next();
  }
};
