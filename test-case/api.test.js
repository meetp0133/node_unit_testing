const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../server")
const expect = chai.expect
chai.should()
chai.use(chaiHttp)

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
                expect(res.body).to.have.nested.property("data.name").eq("Meet")
                expect(res.body).to.have.nested.property("data.email").eq("meet@gmail.com")
                expect(res.body).to.have.nested.property("data.password").eq("123456")
                expect(res.body).to.have.nested.property("data.phone").eq(9428651333)
                expect(res.body).to.have.nested.property("data.deviceToken").eq("415412")
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
})
