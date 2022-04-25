import { order, orders } from "../../models/orders";
import client from "../../database";
import app from "../../server";
import { user, users } from "../../models/users";
import { product, products } from "../../models/products";

import superTest from "supertest";

const order_test = new orders();
const user_test = new users();
const product_test = new products();
const req = superTest(app);
let token ='';

describe("Testing API logic", () => {
  const userOne = {
    id: "1",
    firstname: "henry",
    lastname: "ford",
    email: "henryford@gmail.com",
    password: "1234",
  } as user;

  const productOne = {
    id: "1",
    name: "vimto",
    price: "10",
    category: "drinks",
  } as product;

  const orderOne = {
    id: "1",
    user_id: "1",
    orderstatus: "open",
  } as order;

  beforeAll(async () => {
    const userT = await user_test.create(userOne as user);
    const productT = await product_test.create(productOne as product);
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sqlthree = "DELETE FROM orders CASCADE;";
    await conn.query(sqlthree);
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

    it("should create new order", async () => {
      const res = await req
        .post("/orders")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(orderOne);
      expect(res.status).toBe(200);
      const { user_id, orderstatus } = res.body;
      expect(user_id).toBe("1");
      expect(orderstatus).toBe("open");
    });

    it("should get all orders", async () => {
      const res = await req
        .get("/orders")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it("should show order info", async () => {
      const res = await req
        .get(`/orders/1`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.user_id).toBe("1");
      expect(res.body.orderstatus).toBe("open");
    });

    //addProduct
    it("should add product to an order", async () => {
      const res = await req
        .post(`/orders/1/products`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          quantity: 10 as unknown as number,
          productId: productOne.id as unknown as string,
        });
      expect(res.status).toBe(200);
      expect(orderOne.id.toString()).toBe("1");
      expect(res.body.user_id.toString()).toBe("1");
      expect(res.body.orderstatus).toBe("open");
    });

    // delete product from order
    it("should delete orderproducts", async () => {
      const res = await req
        .delete(`/orderproducts/1`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.body).toBe("DELETING ORDER_PRODUCTS item SUCCESS!");
    });

    // delete product
    it("should delete order", async () => {
      const res = await req
        .delete(`/orders/1`)
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.id.toString()).toBe(orderOne.id);
      expect(res.body.user_id.toString()).toBe("1");
      expect(res.body.orderstatus).toBe("open");
    });
  });
});
