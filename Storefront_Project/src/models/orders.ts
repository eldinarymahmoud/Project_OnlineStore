import { json } from "body-parser";
import client from "../database";

export type order = {
  id: string;
  user_id: String;
  orderstatus: string;
};

// class products is the representation of products table in JS
export class orders {
  // READ
  async index(): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get orders ${error}`);
    }
  }
  // Read the row with Id 1
  async show(id: string): Promise<order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  // CREATE
  async create(b: order): Promise<order> {
    try {
      const sql =
        "INSERT INTO orders (user_id, orderstatus) VALUES ((SELECT id FROM users where id=($1)), $2) RETURNING *;";
      const conn = await client.connect();
      const result = await conn.query(sql, [b.user_id, b.orderstatus]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${b.user_id}. Error: ${err}`);
    }
  }

  // DELETE order_product table to be able to delete the others because foreign key constraints
  async deleteOrder_products(id: string): Promise<string> {
    try {
      const sql = "DELETE FROM order_products WHERE id=($1) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return "DELETING ORDER_PRODUCTS item SUCCESS!";
    } catch (err) {
      throw new Error(`Could not delete order_products. Error: ${err}`);
    }
  }

  // DELETE
  async delete(id: string): Promise<order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  // Adding product to an order
  async addProduct(
    quantity: number,
    orderID: string,
    productID: string
  ): Promise<order> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, (SELECT id FROM orders where id=($2)), (SELECT id FROM products where id=($3))) RETURNING *";
      const sqlTwo = "SELECT * FROM orders WHERE id=($1)";

      const conn = await client.connect();
      const result = await conn.query(sqlTwo, [orderID]);
      conn.release();

      if (result.rows[0] === undefined) {
        throw new Error(
          `Could not add product ${productID} to order ${orderID}. Error: check inputs`
        );
      }
      const secondconn = await client.connect();
      const result_order_products = await conn.query(sql, [
        quantity,
        orderID,
        productID,
      ]);
      const order = result.rows[0];
      secondconn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productID} to order ${orderID}. Error: ${err}`
      );
    }
  }
}
