const nock = require("nock")
const chai = require("chai")
const expect = chai.expect
const {user} = require("../controller/student.controller")
// const {listUser} = require("../controller/user.controller")
// const userObj = new student()


describe("Testing with nock",()=>{
    it("API testing",(done)=>{
        let obj = {status:"ok",statusCode:200,data:[]}
        const apiHit = nock("http://localhost:4004/")
            .get("/list")
            .reply(200,obj)

        user()
            .then((record)=>{
                expect(record).to.be.equal(obj)
                done()
            })
            .catch(e=>{
                done(new Error("error:"+e))
            })

    })
})