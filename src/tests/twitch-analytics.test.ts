import request from "supertest";
import app from "../index";

const username = "caps"

describe("Twitch Analytics", () => {
  it("Analytics for username", async () => {
    const res = await request(app)
      .get("/twitch/analytics?username=" + username)
      .send();
    expect(res.status).toEqual(200);
    expect(res.text).toBeDefined();
    expect(res.text.includes(username)).toEqual(true);
  });
});
