const sinon = require("sinon")
const chai = require("chai")
const expect = chai.expect;
const student = require("../controller/student.controller")
const studentObj = new student();

describe("==============MOCK===============",()=>{
    it("Count function",()=>{
        let mock = sinon.mock(studentObj)
        let expt = mock.expects("getExternal");
        expt.exactly(1);
        expt.withArgs(40);
        studentObj.finalMarks(40)

        mock.verify()
    })
})