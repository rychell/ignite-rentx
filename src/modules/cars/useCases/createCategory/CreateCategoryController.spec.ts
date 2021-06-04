import request from "supertest";

import { startApp } from "@shared/infra/http/apps";

jest.setTimeout(30000);
describe("Create category controller", () => {
  let app = null;
  beforeAll(async () => {
    app = await startApp();
  });

  it("should be able to create a new category", async () => {
    jest.useFakeTimers();
    const userAdmin = {
      email: "admin@admin.com",
      password: "admin",
    };
    const responseToken = await request(app).post("/session").send(userAdmin);
    const { token } = responseToken.body;
    const response = await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: "asasda",
        description: "asdasd",
      });

    expect(response.status).toBe(201);
  });
});
