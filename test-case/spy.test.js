const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const Student = require("../controller/student.controller")
const studentObj = new Student();

//npm run test-single --test-case(file-name)/spy.test.js(test-name)

describe("------------------SPY---------------", () => {

    it("function visibily check", () => {
        expect(studentObj.userId()).to.be.equal(12)

    })
    it("function arg check", () => {
        let spyObj = sinon.spy(studentObj, "getInfo")
        studentObj.home(12)
        expect(spyObj.calledWith(12, 1)).to.be.true;
    })
    // it("function count Check", () => {
    //     let spyObj = sinon.spy(studentObj, "getInfo")
    //     studentObj.home(5);
    //     expect(spyObj.calledOnce).to.be.true;
    //     // expect(spyObj.calledTwice).to.be.true;
    //     // expect(spyObj.calledThrice).to.be.true;
    // })
})


describe("------------------STUB---------------", () => {

    it("Function arg check", () => {
        let stub = sinon.stub(studentObj,"getInternal")
        stub.withArgs(40).returns(10)
        expect(studentObj.finalMarks(40)).to.be.equal(61)

    })
})