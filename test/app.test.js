const request = require("supertest");
const app = require("../App.js");

let expect = require("chai").expect;

describe("/get testStatus", function () {
  it("Your App is working GOOD!!", async function () {
    let user = {
      username: "test@gmail.com",
      password: "Test123",
      firstname: "Test",
      lastname: "Test",
    };
    const response = await request(app).get("/testStatus").send(user);

    expect(response.status).to.eql(200);
  });
});
