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
  const refresh_token = jwt.sign(payload, salt_refresh, { expiresIn: "20d" });
  const jwtoken = {
    username: user.username,
    token: token,
    refresh_token: refresh_token,
  };
  refreshTokens[refresh_token] = jwtoken;
  return jwtoken;
};

export const verifyToken = ({ user, token, refresh_token }) => {
  try {
    let decoded = jwt.verify(token, salt);
    if (decoded.username !== user.username) {
      throw { name: "InvalidJWT" };
    }
    decoded = jwt.verify(refresh_token, salt_refresh);
    if (decoded.username !== user.username) {
      throw { name: "InvalidRefreshJWT" };
    }
    if (refreshTokens[refresh_token].username !== user.username) {
      throw { name: "InvalidRefreshJWT" };
    }
    // sign new token
    const payload = {
      username: user.username,
      time: Date.now(),
    };

    const newToken = jwt.sign(payload, salt, {
      expiresIn: expiry_time,
    });

    // time when refresh token expires
    const expiration = jwt.decode(refresh_token).exp * 1000;
    //threshold is 1 day
    const threshold = 1000 * 60 * 60 * 24;
    if (expiration - Date.now() < threshold) {
      const newRefreshToken = jwt.sign(payload, salt_refresh, {
        expiresIn: "20d",
      });
      refreshTokens[newRefreshToken] = refreshTokens[refresh_token];
      delete refreshTokens[refresh_token];
      refresh_token = newRefreshToken;
    }

    // generate new jwt
    refreshTokens[refresh_token].token = newToken;
    const jwtoken = {
      username: user.username,
      token: newToken,
      refresh_token: refresh_token,
    };
    return jwtoken;
  } catch (err) {
    if (err.name == "JsonWebTokenError" && err.message === "jwt malformed") {
      throw { error: err.message };
    }
    return { error: err };
  }
};
