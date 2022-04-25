import dotenv from "dotenv";
import { Pool } from "pg";

// initializes the environment variables.
dotenv.config();

// create the javascript objec process.env
const {
  ENV,
  POSTGRES_HOST, // host ip
  POSTGRES_DB, // Database
  POSTGRES_DB_test,
  POSTGRES_USER, // database user
  POSTGRES_PASSWORD, // database password
} = process.env;

let client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

if (ENV === "dev") {
  console.log("------------------");
  console.log("DEVVVVVVVVVVVVVVVV");
  console.log("------------------");
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === "test") {
  console.log("------------------");
  console.log("TESTTTTTTTTTTTTTTT");
  console.log("------------------");
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_test,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
