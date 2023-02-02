const request = require("supertest");
const app = require('../App.js');


let expect = require('chai').expect;

describe('/POST user', function(){

it('it should have no duplicates', async function(){
    let user = {
       
        "username": "jack@gmail.com",
        "password": "Jack",
        "firstname": "Jack",
        "lastname": "Jack",
    }
    const response = await request(app).post('/v1/user').send(user);

    expect (response.status).to.eql(400);
} )

})



