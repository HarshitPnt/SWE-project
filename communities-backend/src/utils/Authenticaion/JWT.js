import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let salt = process.env.JWT_SALT;
let refreshTokens = [];

export const generateToken = (user) => {
  const payload = {
    username: user.username,
  };
  const token = jwt.sign(payload, salt, { expiresIn: "1h" });
  const refresh_token = jwt.sign(payload, salt, { expiresIn: "20d" });
  const jwt = {
    username: user.username,
    token: token,
    refresh_token: refresh_token,
  };
  refreshTokens[refresh_token] = jwt;
  return { token, refresh_token };
};

export const verifyToken = ({ user, token, refresh_token }) => {
  let decoded = jwt.verify(token, salt);
  if (decoded.username !== user.username) {
    return { error: "Invalid token" };
  }
  decoded = jwt.verify(refresh_token, salt);
  if (refreshTokens[refresh_token].username !== user.username) {
    return { error: "Invalid refresh token" };
  }
  // sign new token
  const newToken = jwt.sign({ username: user.username }, salt, {
    expiresIn: "1h",
  });

  // check if refresh token is about to expire
  const expiration = new Date(decoded.exp * 100);
  if (expiration - Date.now() < 1000 * 60 * 60 * 24) {
    const newRefreshToken = jwt.sign({ username: user.username }, salt, {
      expiresIn: "20d",
    });
    refreshTokens[newRefreshToken] = refreshTokens[refresh_token];
    delete refreshTokens[refresh_token];
    refresh_token = newRefreshToken;
  }

  // generate new jwt
  refreshTokens[refresh_token].token = newToken;
  jwt = {
    username: user.username,
    token: newToken,
    refresh_token: refresh_token,
  };
  return jwt;
};
