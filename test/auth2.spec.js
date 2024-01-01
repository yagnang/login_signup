const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../server")
const expect = chai.expect;

chai.use(chaiHttp)

describe("GET API auth", () => {
    it("You have to login to access this page" , async() => {
        const res = await chai
        .request(server)
        .get("/demo")

        expect(res).to.have.status(400)
        expect(res.body.error).to.equal("You have to login to access this page")
    })

    // it("Only Admin permission", async() => {
    //     const res = await chai
    //     .request(server)
    //     .get('/admin')

    //     expect(res).to.have.status(400)
    //     expect(res.body.error).to.equal("You have no permission to access this page")
    // })
})