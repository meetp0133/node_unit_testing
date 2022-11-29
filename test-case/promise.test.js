const sinon = require("sinon")
const chai = require("chai")
const expect = chai.expect;
const {Student,newsData} = require("../controller/student.controller")
const studentObj = new Student()
const chaiaspromise = require("chai-as-promised")
chai.use(chaiaspromise)

describe('============PROMISE===========',()=>{

    it("Normal value function",(done)=>{
            studentObj.dbData().then((result)=>{
                expect(result).to.be.equal(10)
                done();
            });
    })
    it("chai promise value function",()=>{
        return expect(studentObj.dbData()).to.eventually.equal(10)
    })
    it("OTP",()=>{
        return expect(newsData()).to.be.eventually.have.deep.property('otp')
    })
})