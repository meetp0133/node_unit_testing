const chai = require("chai");
const assert = chai.assert;
chai.should();
const expect = chai.expect;

//---------------------------ASSERT------------------------


describe("------Assert testing------",()=>{
    let username = "MeetPanchal111"
    let list= {
        item:[{
            id:1,name:"phone"
        },{
            phone:"78549961"
        }],
        title:"shop"
    }
    it("1.check type",()=>{
        assert.typeOf(username,'string')
    })
    it("2.equal string",()=>{
        assert.equal(username,"MeetPanchal111")
    })
    it("3.check length",()=>{
        assert.lengthOf(list.item,2)
    })
})


//---------------------------SHOULD------------------------

describe("------Should testing------",()=>{
    let username = "Meet"
    let bool =true
    let list= {
        item:[{
            id:1,name:"phone"
        },{
            phone:"78549961"
        }],
        title:["shop"]
    }
    it("4.Check string",()=>{
        username.should.be.a('string')
    })
    it("5.check type",()=>{
        bool.should.be.a("boolean")
    })
    it("6.equal string",()=>{
        username.should.equal("Meet")
    })
    it("7.Check length",()=>{
        list.item.should.have.lengthOf(2)
    })
    it("8.Property check",()=>{
        list.should.have.property("title").with.lengthOf(1)
    })
})

//---------------------------EXPECT------------------------

describe("------Expect testing------",()=>{
    let username = "Meet"
    // let bool =true
    let list= {
        item:[{
            id:1,name:"phone"
        },{
            phone:"78549961"
        }],
        title:["shop"]
    }
    it("9.Check String",()=>{
        expect(username).to.be.a("string")
    })
    it("10.Check equal string",()=>{
        expect(username).to.equal("Meet")
    })
    it("11.Check length",()=>{
        expect(list.item).to.have.lengthOf(2)
    })
    it("12.Check Property",()=>{
        expect(list).to.have.property("title").with.lengthOf(1)
    })
    it("13.api object match",()=>{
        expect(list).to.have.all.keys("item","title")
    })
    it("14.Phone num",()=>{
        expect(list).to.have.nested.property("item[1].phone")
    })
    it("15.Country Name check",()=>{
        expect(list).to.have.nested.include({"item[0].id": 1})
    })
})