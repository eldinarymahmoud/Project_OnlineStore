import supertest from "supertest";
import app from "../server";

const serverTest = supertest(app);

describe("Testing basic server", () => {
  it("Get the server endpoint", async () => {
    const response = await serverTest.get("/");
    expect(response.status).toBe(200);
  });
});
