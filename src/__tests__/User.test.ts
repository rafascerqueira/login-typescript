import request from "supertest";
import { app } from "../app";

describe("All task that return with success", () => {
  it("should return with 'OK' in status code", async () => {
    const { body, status } = await request(app).get("/");

    expect(status).toBe(200);
    expect(body).toEqual({
      message: "Welcome to Login system!",
    });
  });

  // In database must have a user to test, if you use mock data adapt this 'it'
  it("should new login system and return success", async () => {
    const { body, status } = await request(app).post("/signin").send({
      email: "usertest@email.com",
      password: "123456",
    });

    expect(status).toBe(200);
    expect(body.success).toEqual("Welcome back User Test");
  });
});

describe("ALl task that fail when connect", () => {
  it("should be fail when trying login a nonexistent user", async () => {
    const { body, status } = await request(app).post("/signin").send({
      email: "trololo@email.com",
      password: "p4ssw0rd",
    });

    expect(status).toBe(404);
    expect(body).toEqual({
      loginFail: "There is no User",
    });
  });

  it("should be fail to login when password is wrong", async () => {
    const { body, status } = await request(app).post("/signin").send({
      email: "usertest@email.com",
      password: "abcdef",
    });

    expect(status).toBe(401);
    expect(body).toEqual({
      loginFail: "invalid password",
    });
  });
});
