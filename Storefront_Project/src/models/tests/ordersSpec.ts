import { order, orders } from "../orders";
import { product, products } from "../../models/products";
import { user, users } from "../../models/users";
import client from "../../database";

const order_test = new orders();
const product_test = new products();
const user_test = new users();

describe("Testing orders model", () => {
  describe("Test order model exists", () => {
    it("Should have an create order method", () => {
      expect(order_test.create).toBeDefined();
    });

    it("Should have a read order method", () => {
      expect(order_test.index).toBeDefined();
    });

    it("Should have a show order method", () => {
      expect(order_test.show).toBeDefined();
    });

    it("Should have a delete order method", () => {
      expect(order_test.delete).toBeDefined();
    });

    it("Should have a delete order method", () => {
      expect(order_test.addProduct).toBeDefined();
    });
  });

  describe("Testing methods logic", () => {
    const userOne = {
      id: "4",
      firstname: "james",
      lastname: "bond",
      email: "jamesbond@gmail.com",
      password: "1234",
    } as user;

    const orderOne = {
      id: "2",
      user_id: "4",
      orderstatus: "open",
    } as order;

    const productOne = {
      id: "4",
      name: "miranda",
      price: "10",
      category: "drinks",
    } as product;

    beforeAll(async () => {
      const userT = await user_test.create(userOne as user);
      const productT = await product_test.create(productOne as product);
      const orderT = await order_test.create(orderOne);
    });

    afterAll(async () => {
      const conn = await client.connect();
      const sqltwo = "DELETE FROM orders CASCADE";
      await conn.query(sqltwo);
      conn.release();
    });

    // Checking if order created
    // Checking the return of get endpoint
    it("Get method should return All available orders in DB", async () => {
      const orders = await order_test.index();
      expect(orders.length).toBe(1);
    });

    it("Show method should return testorder when called with ID", async () => {
      const returnedorder = await order_test.show(orderOne.id);
      expect(returnedorder.user_id).toBe("4");
      expect(returnedorder.orderstatus).toBe("open");
    });

    //add product to order
    it("Adding product to order", async () => {
      const addedProduct = await order_test.addProduct(
        10,
        orderOne.id,
        productOne.id
      );
      expect(addedProduct.user_id).toBe(userOne.id as unknown as string);
    });

    //delete order
    it(" ---Delete order_products row---", async () => {
      const deletedorder = await order_test.deleteOrder_products("2");
      expect(deletedorder).toBe("DELETING ORDER_PRODUCTS item SUCCESS!");
    });

    //delete order
    it("Delete method should delete order from DB", async () => {
      const deletedorder = await order_test.delete(
        orderOne.id as unknown as string
      );
      expect(deletedorder.id?.toString()).toBe(orderOne.id);
    });
  });
});
