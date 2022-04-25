import client from "../database";

export type product = {
  id: string;
  name: String;
  price: string;
  category: String;
};

// class products is the representation of products table in JS
export class products {
  // READ
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get products ${error}`);
    }
  }
  // Read the row with specific id provided in the url verb
  async show(id: string): Promise<product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1);";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  // CREATE
  async create(b: product): Promise<product> {
    try {
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;";
      const conn = await client.connect();
      const result = await conn.query(sql, [b.name, b.price, b.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${b.name}. Error: ${err}`);
    }
  }
  // DELETE
  async delete(id: string): Promise<product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *;";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
