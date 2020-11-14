const request = require("supertest");
const app = require("../dist/app");
describe("Twitch Analytics", () => {
  it("Analytics example", async () => {
    const res = await request(app)
      .get("/twitch/analytics?username=caps")
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });
});
