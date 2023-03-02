const request = require("supertest");
const app = require("../App.js");

let expect = require("chai").expect;

describe("/get healthz", function () {
  it("it should return the heartbeat", async function () {
    let user = {
      username: "jack@gmail.com",
      password: "Jack",
      firstname: "test",
      lastname: "Test",
    };
    const response = await request(app).get("/healthz").send(user);

    expect(response.status).to.eql(200);
  });
});
