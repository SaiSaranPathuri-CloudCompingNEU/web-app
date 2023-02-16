const request = require("supertest");
const app = require("../App.js");

let expect = require("chai").expect;

describe("/get healthz", function () {
  it("Your App is working GOOD!!", async function () {
    let user = {
      username: "test@gmail.com",
      password: "Test123",
      first_name: "Test",
      last_name: "Test",
    };
    const response = await request(app).get("/healthz").send(user);

    expect(response.status).to.eql(400);
  });
});
