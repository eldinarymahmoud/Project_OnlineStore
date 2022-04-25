import { product, products } from "../../models/products";
import client from "../../database";
import app from "../../server";
import superTest from "supertest";
let token = '';

const product_test = new products();
const req = superTest(app);

describe("Testing API logic", () => {
  const productOne = {
    id: "2",
    name: "sprite",
    price: "10",
    category: "drinks",
  } as product;

  beforeAll(async () => {
    const productT = await product_test.create(productOne as product);
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sqltwo = "DELETE FROM users;";
    await conn.query(sqltwo);
    conn.release();
  });

  describe("Test CRUD API", () => {
    it(" Authenticate to get token for orders", async () => {
      const res = await req
        .post("/authenticate")
        .set("Content-type", "application/json")
        .send({
          email: "henryford@gmail.com",
          password: "1234",
        });
      expect(res.status).toBe(200);
      const { email, token: userToken } = res.body.data;
      expect(email).toBe("henryford@gmail.com");
      token = userToken;
    });
    
    it("should create new product", async () => {
      const res = await req
        .post("/products")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: 3,
          name: "sevenup",
          price: "10",
          category: "drinks",
        });
      expect(res.status).toBe(200);
      const { name, price, category } = res.body;
      expect(name).toBe("sevenup");
      expect(price).toBe(10);
      expect(category).toBe("drinks");
    });

    it("should get all products", async () => {
      const res = await req
        .get("/products")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
    });

    it("should show product info", async () => {
      const res = await req
        .get(`/products/2`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("sprite");
      expect(res.body.category).toBe("drinks");
    });

    it("should delete product", async () => {
      const res = await req
        .delete(`/products/2`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.id.toString()).toBe(productOne.id);
      expect(res.body.name).toBe("sprite");
      expect(res.body.category).toBe("drinks");
    });
  });
});
