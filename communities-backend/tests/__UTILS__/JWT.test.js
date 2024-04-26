import { generateToken, verifyToken } from "../../src/utils/Authenticaion/JWT";

let tokens = [];
let refreshTokens = [];

describe("testing generating JWT", () => {
  // testing generateToken
  test("generateToken for a username", () => {
    const user = {
      username: "jerog1",
    };
    const token = generateToken(user);
    expect(token).toHaveProperty("token");
    expect(token).toHaveProperty("refresh_token");
    tokens.push(token.token);
    refreshTokens.push(token.refresh_token);
  });
});

describe("testing verifying JWT", () => {
  // testing verifyToken
  test("verifyToken for a username", () => {
    const user = {
      user: {
        username: "jerog1",
      },
      token: tokens[0],
      refresh_token: refreshTokens[0],
    };
    const token = verifyToken(user);
    expect(token).toHaveProperty("token");
    expect(token).toHaveProperty("refresh_token");
  });

  // testing for invalid token
  test("verifyToken for invalid token", () => {
    const user = {
      user: {
        username: "jerog1",
      },
      token: "invalid token",
      refresh_token: refreshTokens[0],
    };
    try {
      const token = verifyToken(user);
    } catch (err) {
      expect(err).toEqual({ error: "jwt malformed" });
    }
  });

  // testing for invalid refresh token
  test("verifyToken for invalid refresh token", () => {
    const user = {
      user: {
        username: "jerog1",
      },
      token: tokens[0],
      refresh_token: "invalid refresh token",
    };
    try {
      const token = verifyToken(user);
    } catch (err) {
      expect(err).toEqual({ error: "jwt malformed" });
    }
  });

  // testing for token expiration
  test("verifyToken for token expiration", () => {
    try {
      // blocking code for 5 seconds (first need to change the expiry time in JWT.js to 5sec)
      const start = new Date().getTime();
      let end = start;
      while (end < start + 2000) {
        end = new Date().getTime();
      }
      const token = verifyToken({
        user: { username: "jerog1" },
        token: tokens[0],
        refresh_token: refreshTokens[0],
      });
    } catch (err) {
      expect(err).toEqual({ name: "TokenExpiredError" });
    }
  });
});
