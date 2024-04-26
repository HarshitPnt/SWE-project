import { generateToken, verifyToken } from "../../src/utils/Authenticaion/JWT";

let tokens = [];

describe("testing generating JWT", () => {
  // testing generateToken
  test("generateToken for a username", () => {
    const user = {
      username: "jerog1",
    };
    const token = generateToken(user);
    expect(token).toHaveProperty("token");
    expect(token).toHaveProperty("refresh_token");
    tokens.push(token);
  });
});

describe("testing verifying JWT", () => {
  // testing verifyToken
  test("verifyToken for a username", () => {
    const user = {
      username: "jerog1",
    };
    const token = verifyToken({ user, ...tokens[0] });
    expect(token).toHaveProperty("username");
    expect(token).toHaveProperty("token");
    expect(token).toHaveProperty("refresh_token");
  });
});
