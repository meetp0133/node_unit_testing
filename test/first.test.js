const assert = require("assert")

describe("My first test case",()=>{
    it("Value check",()=>{
        assert.equal([1,2,3].indexOf(1),0)
    })
    it("Length test",()=>{
        assert.equal([1,2,5,4].length,4)
    })

})