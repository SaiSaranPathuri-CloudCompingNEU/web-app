const request = require("supertest");
const app = require("../App.js");

let expect = require("chai").expect;

describe("/get testStatus", function () {
  it("Your App is working GOOD!!", async function () {
    let user = {
      username: "demo@demo.com",
      password: "test123",
      firstname: "Alpha",
      lastname: "Beta",
    };
    const response = await request(app).get("/healthz").send(user);

    expect(response.status).to.eql(200);
  });
});
