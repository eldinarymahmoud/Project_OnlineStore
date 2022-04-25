import { user, users } from "../users";
import client from "../../database";

const user_test = new users();

describe("Testing users model", () => {
  describe("Test user model exists", () => {
    it("Should have an create user method", () => {
      expect(user_test.create).toBeDefined();
    });

    it("Should have a read user method", () => {
      expect(user_test.index).toBeDefined();
    });

    it("Should have a show user method", () => {
      expect(user_test.show).toBeDefined();
    });

    it("Should have a delete user method", () => {
      expect(user_test.delete).toBeDefined();
    });

    it("Should have an authenticate user method", () => {
      expect(user_test.authenticate).toBeDefined();
    });
  });

  describe("Testing methods logic", () => {
    const userOne = {
      id: "5",
      firstname: "mike",
      lastname: "jones",
      email: "mikejones@gmail.com",
      password: "1234",
    } as user;

    beforeAll(async () => {
      const userT = await user_test.create(userOne as user);
    });

    afterAll(async () => {
      const conn = await client.connect();
      // const sqlone = 'ALTER SEQUENCE user_id RESTART WITH 1;'
      // await conn.query(sqlone);
      const sqltwo = "DELETE FROM users;";
      await conn.query(sqltwo);
      conn.release();
    });

    // Checking if user created
    // Checking the return of get endpoint
    it("Get method should return All available users in DB", async () => {
      const users = await user_test.index();
      expect(users.length).toBe(2); // another user created at orderSpec
    });

    it("Show method should return testUser when called with ID", async () => {
      const returnedUser = await user_test.show(userOne.id); // The user in orderSpec was created first

      expect(returnedUser.firstname).toBe("mike");
      expect(returnedUser.lastname).toBe("jones");
    });

    //check authenticate with correct input
    it("checking the return of the method authenticate", async () => {
      const authUser = await user_test.authenticate(
        userOne.email,
        userOne.password as string
      );
      expect(authUser?.firstname).toBe(userOne.firstname);
      expect(authUser?.lastname).toBe(userOne.lastname);
      expect(authUser?.email).toBe(userOne.email);
    });

    //check authenticate with wrong input
    it("checking the return of the method authenticate", async () => {
      const authUser = await user_test.authenticate(
        "jojo@hotmail.com",
        "blahblah"
      );
      expect(authUser).toBe(null);
    });

    //delete user
    it("Delete One method should delete user from DB", async () => {
      const deletedUser = await user_test.delete(
        userOne.id as unknown as string
      );
      expect(deletedUser.id.toString()).toEqual(
        userOne.id as unknown as string
      );
    });
  });
});
