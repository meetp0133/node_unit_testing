const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../server")
const expect = chai.expect
chai.should()
chai.use(chaiHttp)
const bcrypt = require("bcryptjs")
const userModel = require("../model/user")
describe("-----------------GET API TESTING--------------------", () => {
    it("Check response", (done) => {
        chai.request(server)
            .get("/list")
            .end((err, response) => {
                // console.log(response.body);
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property("data").with.lengthOf(7);
                done()
            })
    })

    it("Key value check", (done) => {
        chai.request(server)
            .get("/list")
            .end((err, response) => {
                // console.log(response.body);
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property("data").with.lengthOf(7);
                response.body.should.have.property("statusCode").equal(200);
                expect(response.body).to.have.property("data").with.lengthOf(7)
                done()
            })
    })

    it("User check by id", (done) => {
        let userId = "63806fee445c6f154f7fdb4c"
        chai.request(server)
            .get("/view/" + userId)
            .end((err, response) => {
                // console.log(response.body);z
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property("data");
                expect(response.body).to.have.nested.property("data._id").equal("63806fee445c6f154f7fdb4c")
                expect(response.body).to.have.nested.property("data.status").to.be.a("number")
                expect(response.body).to.have.nested.property("data.name").to.be.a("string")
                expect(response.body).to.have.nested.property("data.email").to.be.a("string")
                expect(response.body).to.have.nested.property("data.password").to.be.a("string")
                expect(response.body).to.have.nested.property("data.phone").to.be.a("number")
                expect(response.body).to.have.nested.property("data.deviceToken").to.be.a("string")
                done()
            })
    })
})

describe("-----------------POST API TESTING--------------------", () => {

    it("POST user data", (done) => {
        const data = {
            name: "Meet",
            email: "meet@gmail.com",
            password: "123456",
            phone: "9428651333",
            deviceToken: "415412",
        };
        chai.request(server)
            .post("/create")
            .send(data)
            .end(async (err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                expect(res.body.data).to.have.nested.property("name").eq("Meet")
                expect(res.body.data).to.have.nested.property("email").eq("meet@gmail.com")
                expect(res.body.data).to.have.nested.property("password").eq("123456")
                expect(res.body.data).to.have.nested.property("phone").eq(9428651333)
                expect(res.body.data).to.have.nested.property("deviceToken").eq("415412")
                done()

            })
    })

    it("POST user validation check", (done) => {
        const data = {
            "name": "Meet",
            "email": "meet@gmail.com",
            "password": "$2a$10$1JUoGME6ZCc.X6MgooZTy.jxKckgP4FMy2JOnL1zaCA7L8UgTELd2",
            "phone": 9428651333,
            "deviceToken": "415412"
        };
        chai.request(server)
            .post("/create")
            .send(data)
            .end(async (err, res) => {
                res.should.have.status(400);
                res.text.should.be.equal("Please enter proper details");
                done()

            })
    })

    it("POST user fields check", (done) => {
        const data = {
            "name": "Meet",
            "email": "meet@gmail.com",
            "password": "$2a$10$1JUoGME6ZCc.X6MgooZTy.jxKckgP4FMy2JOnL1zaCA7L8UgTELd2",
            "phone": "9428651333",
            "deviceToken": "415412"
        };
        chai.request(server)
            .post("/create")
            .send(data)
            .end(async (err, res) => {
                res.should.have.status(200);
                expect(res.body.data).to.have.nested.property("name").to.be.a("string")
                expect(res.body.data).to.have.nested.property("email").to.be.a("string")
                expect(res.body.data).to.have.nested.property("password").to.be.a("string")
                expect(res.body.data).to.have.nested.property("phone").to.be.a("number")
                expect(res.body.data).to.have.nested.property("deviceToken").to.be.a("string")
                done()

            })
    })
})

describe("------------------Check login credentials---------------------",()=>{
    it("Login response and fields check",(done)=>{
        let data = {
            "email": "meet@gmail.com",
            "password": "123456"
        };
        chai.request(server)
            .post("/log-in")
            .send(data)
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a("object")
                expect(res.body).to.have.all.keys("token","message","data")
                expect(res.body).to.have.nested.property("data.Email")
                expect(res.body).to.have.nested.property("data.Email").eq("meet@gmail.com")
                done()
            })
    })

    it("Login email and empty fields check",(done)=>{
        let data = {
            "email": "",
            "password": "123456"
        };
        chai.request(server)
            .post("/log-in")
            .send(data)
            .end((err,res)=>{
                res.should.have.status(400)
                res.body.should.be.a("object")
                expect(res.body).to.have.nested.property("message").eq("Email or Password invalid..!!")
                done()
            })
    })

    it("Login password and empty fields check",(done)=>{
        let data = {
            "email": "meet@gmail.cmom",
            "password": ""
        };
        chai.request(server)
            .post("/log-in")
            .send(data)
            .end((err,res)=>{
                res.should.have.status(400)
                res.body.should.be.a("object")
                expect(res.body).to.have.nested.property("message").eq("Email or Password invalid..!!")
                done()
            })
    })
})