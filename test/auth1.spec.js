const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../server")
const expect = chai.expect;

chai.use(chaiHttp)

const signInRequest = async (data) => {
    return await chai
        .request(server)
        .post("/signin")
        .send(data);
};

describe("Authentication API",()=>{
    describe("Signin Api", () => {
        describe("All field must be filled", () => {
            it("Email is required" , async() => {
                const data = {
                    // email : "yagnang2408@gmail.com",
                    password : "Yagnang@2408"
                }

                const res = await signInRequest(data);

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal("Email is required.")
            })

            it("Password is required" , async() => {
                const data = {
                    email : "yagnang2408@gmail.com",
                    // password : "Yagnang@2408"
                }

                const res = await signInRequest(data);

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal("Password is required.")
            })
        })
    
    describe("Signin Validation" , () => {
            it("Invalid email format." , async() => {
                const data = {
                    email : "yagnang2408@gmail.laluu",
                    password : "Yagnang@2408"
                }

                const res = await signInRequest(data);

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal("Invalid email format.")
            })

            it("Invalid Password pattern" , async() => {
                const data = {
                    email : "yagnang2408@gmail.com",
                    password : "123"
                }

                const res = await signInRequest(data);

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal("Invalid Password")
            })

            it("Username does not exist" , async() => {
                const data = {
                    email : "yagnang2408123@gmail.com",
                    password : "Yagnang@1234"
                }

                const res = await signInRequest(data);

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal("Username does not exist, please Signup")
            })

            it("Incorrect Password" , async() => {
                const data = {
                    email : "yagnang2408@gmail.com",
                    password : "Yagnang@123hi"
                }

                const res = await signInRequest(data);

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal("Incorrect Passsword")
            })

            // it("User Login Successfully" , async() => {
            //     const data = {
            //         email : "yagnang2408@gmail.com",
            //         password : ""
            //     }

            //     const res = await signInRequest(data);

            //     expect(res).to.have.status(200);
            //     expect(res.body.message).to.equal("User Login Successfully")
            // })

            
        })
    })
})