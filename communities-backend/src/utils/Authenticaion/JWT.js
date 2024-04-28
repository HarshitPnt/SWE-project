import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let salt = process.env.JWT_SALT;
let salt_refresh = process.env.JWT_SALT_REFRESH;
let refreshTokens = [];
const expiry_time = "1h";

export const generateToken = (user) => {
  const payload = {
    username: user.username,
    time: Date.now(),
  };
  const token = jwt.sign(payload, salt, { expiresIn: expiry_time });
  const jwtoken = {
    username: user.username,
    token: token,
  };
  return jwtoken;
};

export const verifyToken = ({ username, token }) => {
  try {
    let decoded = jwt.verify(token, salt);
    if (decoded.username !== username) {
      throw { name: "InvalidJWT" };
    }
    return true;
  } catch (err) {
    if (err.name == "JsonWebTokenError" && err.message === "jwt malformed") {
      return false;
    }
  }
};
