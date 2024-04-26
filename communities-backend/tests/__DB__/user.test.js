import * as UserDB from "../../src/controllers/db/user.js";
import { User } from "../../src/models/userModel.js";

// testing getUserById

describe(" testing getUserById", () => {
  // testing getUserById with valid id
  test("getUserById with valid id", async () => {
    const user = await UserDB.getUserById(1);
    // data: {id: 1, username: jerogi, email: jerogi@gmail, created_at: 2024-04-22 12:21:55.257457, updated_at: 2024-04-22 12:21:55.257457, is_superuser: f, is_banned: f, is_deleted: f, profile_picture: "", chat_setting: "everyone", profile_privacy_setting: public, notfication_setting: 1111, bio: I am a model, location: Hyderabad/India}
    const expected = new User({
      id: 1,
      username: "jerog1",
      email: "jerog1@dummy.com",
      created_at: new Date("2024-04-22T06:51:55.257Z"),
      updated_at: new Date("2024-04-22T06:51:55.257Z"),
      is_superuser: false,
      is_banned: false,
      is_deleted: false,
      profile_picture: "",
      chat_setting: "everyone",
      profile_privacy_setting: "public",
      notification_setting: "1111",
      bio: "I am a model",
      location: "Hyderabad/India",
    });
    expect(user.toJSON()).toEqual(expected.toJSON());
  });

  // testing getUserById with invalid id
  test("getUserById with invalid id", async () => {
    try {
      await UserDB.getUserById(-1);
    } catch (err) {
      expect(err).toEqual({ error: null, msg: "Invalid id" });
    }
  });

  // testing getUserById with invalid id
  test("getUserById with invalid id", async () => {
    try {
      await UserDB.getUserById(0);
    } catch (err) {
      expect(err).toEqual({ error: null, msg: "Invalid id" });
    }
  });

  // testing getUserById with an id which is not present in the database
  test("getUserById with an id which is not present in the database", async () => {
    try {
      await UserDB.getUserById(10000);
    } catch (err) {
      expect(err).toEqual({ error: null, msg: "User not found" });
    }
  });
});

// testing getUserByUsername

describe("testing getUserByUsername", () => {
  // testing getUserByUsername with valid username
  test("getUserByUsername with valid username", async () => {
    const user = await UserDB.getUserByUsername("jerog1");
    // data: {id: 1, username: jerog1, email: jerog1@dummy.com, created_at: 2024-04-22 12:21:55.257457, updated_at: 2024-04-22 12:21:55.257457, is_superuser: f, is_banned: f, is_deleted: f, profile_picture: "", chat_setting: "everyone", profile_privacy_setting: public, notfication_setting: 1111, bio: I am a model, location: Hyderabad/India}
    const expected = new User({
      id: 1,
      username: "jerog1",
      email: "jerog1@dummy.com",
      created_at: new Date("2024-04-22T06:51:55.257Z"),
      updated_at: new Date("2024-04-22T06:51:55.257Z"),
      is_superuser: false,
      is_banned: false,
      is_deleted: false,
      profile_picture: "",
      chat_setting: "everyone",
      profile_privacy_setting: "public",
      notification_setting: "1111",
      bio: "I am a model",
      location: "Hyderabad/India",
    });
    expect(user.toJSON()).toEqual(expected.toJSON());
  });

  // testing getUserByUsername with invalid username
  test("getUserByUsername with invalid username", async () => {
    try {
      await UserDB.getUserByUsername("jerog");
    } catch (err) {
      expect(err).toEqual({ error: null, msg: "User not found" });
    }
  });
});

// testing getUserByEmail

describe("testing getUserByEmail", () => {
  // testing getUserByEmail with valid email
  test("getUserByEmail with valid email", async () => {
    const user = await UserDB.getUserByEmail("jerog1@dummy.com");
    const expected = new User({
      id: 1,
      username: "jerog1",
      email: "jerog1@dummy.com",
      created_at: new Date("2024-04-22T06:51:55.257Z"),
      updated_at: new Date("2024-04-22T06:51:55.257Z"),
      is_superuser: false,
      is_banned: false,
      is_deleted: false,
      profile_picture: "",
      chat_setting: "everyone",
      profile_privacy_setting: "public",
      notification_setting: "1111",
      bio: "I am a model",
      location: "Hyderabad/India",
    });

    expect(user.toJSON()).toEqual(expected.toJSON());
  });

  // testing getUserByEmail with invalid email
  test("getUserByEmail with invalid email", async () => {
    try {
      await UserDB.getUserByEmail("jerog@dummy.com");
    } catch (err) {
      expect(err).toEqual({ error: null, msg: "User not found" });
    }
  });
});

// testing createUser

describe("testing createUser", () => {
  // testing createUser with valid username and email
  //   test("createUser with valid username and email", async () => {
  //     const data = {
  //       username: "jerog2",
  //       email: "jergo2@gmail.com",
  //     };
  //     const user = await UserDB.createUser(data.username, data.email);
  //     const expected = "User created successfully";
  //     expect(user).toEqual(expected);
  //   });

  // testing createUser with no username
  test("createUser with no username", async () => {
    try {
      await UserDB.createUser("", "demo@gmail.com");
    } catch (err) {
      expect(err).toEqual({ error: null, msg: "Invalid username or email" });
    }
  });

  // testing createUser with no email
  test("createUser with no email", async () => {
    try {
      await UserDB.createUser("demo", "");
    } catch (err) {
      expect(err).toEqual({ error: null, msg: "Invalid username or email" });
    }
  });

  // testing createUser with no username and email
  test("createUser with no username and email", async () => {
    try {
      await UserDB.createUser("", "");
    } catch (err) {
      expect(err).toEqual({ error: null, msg: "Invalid username or email" });
    }
  });

  // testing createUser with duplicate username
  test("createUser with duplicate username", async () => {
    try {
      await UserDB.createUser("jerog1", "jerog1@dummy.com");
    } catch (err) {
      expect({ error: err.error, msg: "Username already exists" }).toEqual({
        error: "SequelizeUniqueConstraintError",
        msg: "Username already exists",
      });
    }
  });
});

// testing updateUser

describe("testing updateUser", () => {
  // testing updateUser with valid id and data
  //   test("updateUser with valid id and data", async () => {
  //     const data = {
  //       username: "jerog2",
  //       email: "updating email",
  //       bio: "Updated bio",
  //     };
  //     // get user before updating
  //     let _user = await UserDB.getUserById(1);
  //     _user = _user.toJSON();

  //     let msg = await UserDB.updateUser(1, data);

  //     // get user after updating
  //     let user = await UserDB.getUserById(1);
  //     user = user.toJSON();

  //     // username and email and created_at should be same before and after updating
  //     const expected = {
  //       name: _user.username,
  //       email: _user.email,
  //       created_at: _user.created_at,
  //       msg: "User updated successfully",
  //     };
  //     expect({
  //       name: user.username,
  //       email: user.email,
  //       created_at: user.created_at,
  //       msg: msg,
  //     }).toEqual(expected);
  //     expect(_user.updated_at).not.toEqual(user.updated_at);
  //   });

  // testing updateUser with invalid id
  test("updateUser with invalid id", async () => {
    try {
      await UserDB.updateUser(-1, {
        username: "jerog2",
        email: "updating email",
        bio: "Updated bio",
      });
    } catch (err) {
      expect(err).toEqual({ error: null, msg: "Invalid id" });
    }
  });

  // testing updateUser with id not present in the database
  test("updateUser with id not present in the database", async () => {
    try {
      await UserDB.updateUser(10000, {
        username: "jerog2",
        email: "updating email",
        bio: "Updated bio",
      });
    } catch (err) {
      expect(err).toEqual({ error: null, msg: "User not found" });
    }
  });
});
