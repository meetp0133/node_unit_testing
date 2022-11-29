const chai = require("chai")
const assert = chai.assert;
const {once} = require("../controller/testCOntroller")
const sinon = require("sinon")

describe("Sinon function check",()=>{
    it("calls the original function", function () {
        let callback = sinon.fake();
        let proxy = once(callback);
        proxy();

        assert(callback.called);
    });
    it("calls the original function only once", function () {
        let callback = sinon.fake();
        let proxy = once(callback);

        proxy();
        proxy();

        // assert(callback.calledOnce);
        // ...or:
        assert.equal(callback.callCount, 1);
    });
    it("calls original function with right this and args", function () {
        let callback = sinon.fake();
        let proxy = once(callback);
        let obj = {};

        proxy.call(obj, 1, 2, 3);

        assert(callback.calledOn(obj));
        assert(callback.calledWith(1, 2,3));
    });
    it("returns the return value from the original function", function () {
        let callback = sinon.fake.returns(42);
        let proxy = once(callback);

        assert.equal(proxy(), 42);
    });


})

/*
require("@fatso83/mini-mocha").install();
const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const assert = referee.assert;

it("should create a fake that 'throws'", function () {
    const fake = sinon.fake.throws(new Error("not apple pie"));

    // Expected to throw an error with message 'not apple pie'
    assert.exception(fake, { name: "Error", message: "not apple pie" });

});*/