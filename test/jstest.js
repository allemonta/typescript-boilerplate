const { expect } = require("chai")

describe("Check mocha/chai functionality in Javascript", function() {
    it("Test check", function() {
        expect(1+1).to.be.equal(2)
    })
})