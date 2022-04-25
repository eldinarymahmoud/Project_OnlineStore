import { product, products } from "../products";
import client from "../../database";

const product_test = new products();

describe("Testing products model", () => {
  describe("Test product model exists", () => {
    it("Should have an create product method", () => {
      expect(product_test.create).toBeDefined();
    });

    it("Should have a read product method", () => {
      expect(product_test.index).toBeDefined();
    });

    it("Should have a show product method", () => {
      expect(product_test.show).toBeDefined();
    });

    it("Should have a delete product method", () => {
      expect(product_test.delete).toBeDefined();
    });
  });

  describe("Testing methods logic", () => {
    const productOne = {
      id: "5",
      name: "pepsi",
      price: "10",
      category: "drinks",
    } as product;

    beforeAll(async () => {
      const productT = await product_test.create(productOne as product);
    });

    afterAll(async () => {
      const conn = await client.connect();
      // const sqlone = 'ALTER SEQUENCE product_id RESTART WITH 1;'
      // await conn.query(sqlone);
      const sqltwo = "DELETE FROM products;";
      await conn.query(sqltwo);
      conn.release();
    });

    // Checking if product created
    // Checking the return of get endpoint
    it("Get method should return All available products in DB", async () => {
      const products = await product_test.index();
      expect(products.length).toBe(4);
    });

    it("Show method should return testproduct when called with ID", async () => {
      const returnedproduct = await product_test.show(productOne.id); // products in orderSpec was created first
      expect(returnedproduct.name).toBe("pepsi");
      expect(returnedproduct.category).toBe("drinks");
    });

    //delete product
    it("Delete One method should delete product from DB", async () => {
      const deletedproduct = await product_test.delete(productOne.id);
      expect(deletedproduct.id.toString()).toBe(productOne.id);
    });
  });
});
