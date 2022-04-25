import { user, users } from "../../models/users";
import client from "../../database";
import app from "../../server";
import superTest from "supertest";

const user_test = new users();
const req = superTest(app);
let token = "";

describe("Testing API logic", () => {
  const userOne = {
    id: "2",
    firstname: "hugo",
    lastname: "boss",
    email: "hugoboss@gmail.com",
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

  // testing token
  describe("Test Authenticate API", () => {
    it(" Authenticate to get token for user acess ", async () => {
      const res = await req
        .post("/authenticate")
        .set("Content-type", "application/json")
        .send({
          email: "hugoboss@gmail.com",
          password: "1234",
        });
      expect(res.status).toBe(200);
      const { email, token: userToken } = res.body.data;
      expect(email).toBe("hugoboss@gmail.com");
      token = userToken;
    });

    it("Fail to authenticate with wrong email", async () => {
      const res = await req
        .post("/authenticate")
        .set("Content-type", "application/json")
        .send({
          email: "jackandjones@gmail.com",
          password: "test123",
        });
      expect(res.status).toBe(401);
    });
  });

  // testing index, show, delete, create
  describe("Test CRUD API", () => {
    it("should create new user", async () => {
      const res = await req
        .post("/users")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: 3,
          firstname: "test",
          lastname: "user",
          email: "test@gmail.com",
          password: "test123",
        });
      expect(res.status).toBe(200);
      const { email, firstname, lastname } = res.body;
      expect(email).toBe("test@gmail.com");
      expect(firstname).toBe("test");
      expect(lastname).toBe("user");
    });

    it("should get all users", async () => {
      const res = await req
        .get("/users")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it("should show user info", async () => {
      const res = await req
        .get(`/users/2`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.firstname).toBe("hugo");
      expect(res.body.lastname).toBe("boss");
    });

    it("should delete user", async () => {
      const res = await req
        .delete(`/users/2`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.id.toString()).toBe(userOne.id);
      expect(res.body.firstname).toBe("hugo");
      expect(res.body.lastname).toBe("boss");
    });
  });
});
