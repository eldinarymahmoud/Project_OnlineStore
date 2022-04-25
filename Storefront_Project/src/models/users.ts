import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import usersRoute from "../handlers/users";

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS;

export type user = {
  id: string;
  firstname: String;
  lastname: String;
  email: string;
  password: String;
};

export class users {
  async create(u: user): Promise<user> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, firstname, lastname, email;";
      const hash = bcrypt.hashSync(
        `${u.password}${process.env.BCRPT_PASSWORD}`,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.email,
        hash,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(
        `unable create user (${u.firstname} + ${u.lastname}): ${err}`
      );
    }
  }

  // READ
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users ${error}`);
    }
  }
  // Read the row with Id 1
  async show(id: string): Promise<user> {
    try {
      const sql = "SELECT firstname, lastname FROM users WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  // DELETE
  async delete(id: string): Promise<user> {
    try {
      const sql =
        "DELETE FROM users WHERE id=($1) RETURNING id, firstname, lastname";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(email: string, password: string): Promise<user | null> {
    const conn = await client.connect();
    const sql = "SELECT password FROM users WHERE email=$1";
    const result = await conn.query(sql, [email]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (
        bcrypt.compareSync(
          `${password}${process.env.BCRPT_PASSWORD}`,
          user.password
        )
      ) {
        const userInfo = await conn.query(
          "SELECT id, firstname, lastname, email FROM users WHERE email=$1",
          [email]
        );
        conn.release();
        return userInfo.rows[0];
      }
    }
    conn.release();
    return null;
  }
}
