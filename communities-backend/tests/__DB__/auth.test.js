import * as AuthDB from "../../src/controllers/db/auth.js";
import { Authentication } from "../../src/models/authModel.js";

// testing getUserById

describe(" testing getUserById", () => {
  // testing getUserById with valid id
  test("getUserById with valid id", async () => {
    let user = await AuthDB.getUserById(1);
    const expected = { username: "jerog1", email: "jerog1@dummy.com" };
    user = user.toJSON();
    expect(user).toHaveProperty("password");
    expect({ username: user.username, email: user.email }).toEqual(expected);
  });

  // testing getUserById with invalid id
  test("getUserById with invalid id", async () => {
    try {
      await AuthDB.getUserById(-1);
    } catch (err) {
      expect({ error: err.error, msg: err.msg }).toEqual({
        error: null,
        msg: "Invalid Id",
      });
    }
  });

  // testing getUserById with invalid id not in db
  test("getUserById with invalid id not in db", async () => {
    try {
      await AuthDB.getUserById(10000);
    } catch (err) {
      expect({ error: err.error, msg: err.msg }).toEqual({
        error: null,
        msg: "User not found",
      });
    }
  });
});

// testing getUserByUsername

describe("testing getUserByUsername", () => {
  // testing getUserByUsername with valid username
  test("getUserByUsername with valid username", async () => {
    let user = await AuthDB.getUserByUsername("jerog1");
    const expected = { username: "jerog1", email: "jerog1@dummy.com" };
    user = user.toJSON();
    expect(user).toHaveProperty("password");
    expect({ username: user.username, email: user.email }).toEqual(expected);
  });

  // testing getUserByUsername with invalid username
  test("getUserByUsername with invalid username", async () => {
    try {
      await AuthDB.getUserByUsername("jerog2");
    } catch (err) {
      expect({ error: err.error, msg: err.msg }).toEqual({
        error: null,
        msg: "User not found",
      });
    }
  });
});

describe("testing getUserByEmail", () => {
  // testing getUserByEmail with valid email
  test("getUserByEmail with valid email", async () => {
    let user = await AuthDB.getUserByEmail("jerog1@dummy.com");
    const expected = { username: "jerog1", email: "jerog1@dummy.com" };
    user = user.toJSON();
    expect(user).toHaveProperty("password");
    expect({ username: user.username, email: user.email }).toEqual(expected);
  });

  // testing getUserByEmail with invalid email
  test("getUserByEmail with invalid email", async () => {
    try {
      await AuthDB.getUserByEmail("jerogi");
    } catch (err) {
      expect({ error: err.error, msg: err.msg }).toEqual({
        error: null,
        msg: "Invalid Email",
      });
    }
  });

  // testing getUserByEmail with invalid email not in db
  test("getUserByEmail with invalid email not in db", async () => {
    try {
      await AuthDB.getUserByEmail("jerog2@dummy.com");
    } catch (err) {
      expect({ error: err.error, msg: err.msg }).toEqual({
        error: null,
        msg: "User not found",
      });
    }
  });
});

// testing createUser

describe("testing createUser", () => {
  // testing createUser with valid username, email and password and user in users table
  // test("createUser with valid username, email and password", async () => {
  //   const data = {
  //     username: "jerog2",
  //     email: "jerog2@gmail.com",
  //     password: "password",
  //   };

  //   const user = await AuthDB.createUser(
  //     data.username,
  //     data.email,
  //     data.password
  //   );
  //   const expected = "User created successfully";
  //   expect(user).toEqual(expected);
  // });

  // testing createUser with username not in users table
  test("createUser with username not in users table", async () => {
    try {
      const data = {
        username: "jerog3",
        email: "jerog3@gmail.com",
        password: "password",
      };

      const user = await AuthDB.createUser("jerog3", data.email, data.password);
    } catch (err) {
      expect({ error: err.error, msg: err.msg }).toEqual({
        error: null,
        msg: "User not in users table",
      });
    }
  });

  // testing createUser with no username
  test("createUser with no username", async () => {
    try {
      await AuthDB.createUser("", "dummy@dummy.com", "password");
    } catch (err) {
      expect({ error: err.error, msg: err.msg }).toEqual({
        error: null,
        msg: "Invalid username or email",
      });
    }
  });

  //testing createUser with username already in db
  test("createUser with username already in db", async () => {
    try {
      await AuthDB.createUser("jerog1", "jerog1@dummy.com", "password");
    } catch (err) {
      expect({ error: err.error, msg: err.msg }).toEqual({
        error: "SequelizeUniqueConstraintError",
        msg: "User already exists",
      });
    }
  });

  // testing createUser with email not in users table
  test("createUser with email not in users table", async () => {
    try {
      const data = {
        username: "jerog1",
        email: "not",
        password: "password",
      };

      const user = await AuthDB.createUser(
        data.username,
        data.email,
        data.password
      );
    } catch (err) {
      expect({ error: err.error, msg: err.msg }).toEqual({
        error: null,
        msg: "Email not matched",
      });
    }
  });
});

// testing updateUser

describe("testing updateUserPassword", () => {
  // testing updateUserPassword with invalid username not in db
  test("updateUserPassword with invalid username not in db", async () => {
    try {
      await AuthDB.updateUserPassword("jerog3", "password");
    } catch (err) {
      expect({ error: err.error, msg: err.msg }).toEqual({
        error: null,
        msg: "User not found",
      });
    }
  });

  // testing updateUserPassword with no password
  test("updateUserPassword with no password", async () => {
    try {
      await AuthDB.updateUserPassword("jerog2", "");
    } catch (err) {
      expect({ error: err.error, msg: err.msg }).toEqual({
        error: null,
        msg: "Invalid Password",
      });
    }
  });

  // testing updateUserPassword with valid id and password
  test("updateUserPassword with valid id and password", async () => {
    const user = await AuthDB.updateUserPassword("jerog2", "password2");
    expect(user).toEqual([1]);
  });
});
