"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
// initializes the environment variables.
dotenv_1.default.config();
// create the javascript objec process.env
var _a = process.env, ENV = _a.ENV, POSTGRES_HOST = _a.POSTGRES_HOST, // host ip
POSTGRES_DB = _a.POSTGRES_DB, // Database
POSTGRES_DB_test = _a.POSTGRES_DB_test, POSTGRES_USER = _a.POSTGRES_USER, // database user
POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD;
var client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});
if (ENV === "dev") {
    console.log("------------------");
    console.log("DEVVVVVVVVVVVVVVVV");
    console.log("------------------");
    client = new pg_1.Pool({
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
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_test,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = client;
