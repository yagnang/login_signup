const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../server")
const expect = chai.expect;

chai.use(chaiHttp)

const signUpRequest = async (data) => {
    return await chai 
        .request(server)
        .post("/signup")
        .send(data)
};

describe("Authentication API",()=>{
    describe("SignUp API", ()=>{
        describe("All Fields must be filled", ()=>{
            it("Name Cannot be empty", async()=>{
                const data = {
                    // name: "Test User",
                    phone : "123456789",
                    email : "yagnang0824@gmail.com",
                    role : "admin",
                    password : "Yagnang@2408",
                    cpassword : "Yagnang@2408"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Name is required.');
            })

            it("Phone Cannot be empty", async()=>{
                const data = {
                    name: "Test User",
                    // phone : "123456789",
                    email : "yagnang0824@gmail.com",
                    role : "admin",
                    password : "Yagnang@2408",
                    cpassword : "Yagnang@2408"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Field is required.');
            })


            it("Email Cannot be empty", async()=>{
                const data = {
                    name: "Test User",
                    phone : "123456789",
                    // email : "randomuser@gmail.com",
                    role : "admin",
                    password : "Yagnang@2408",
                    cpassword : "Yagnang@2408"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Email is required.');
            })


            it("Role Cannot be empty", async()=>{
                const data = {
                    name: "Test User",
                    phone : "123456789",
                    email : "yagnang0824@gmail.com",
                    // role : "admin",
                    password : "Yagnang@2408",
                    cpassword : "Yagnang@2408"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Role is required.');
            })


            it("Password Cannot be empty", async()=>{
                const data = {
                    name: "Test User",
                    phone : "123456789",
                    email : "yagnang0824@gmail.com",
                    role : "admin",
                    // password : "Yagnang@2408",
                    cpassword : "Yagnang@2408"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Password is required.');
            })


            it("Confirm Password Cannot be empty", async()=>{
                const data = {
                    name: "Test User",
                    phone : "123456789",
                    email : "yagnang0824@gmail.com",
                    role : "admin",
                    password : "Yagnang@2408",
                    // cpassword : "Yagnang@2408"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Confirm Password is required.');
            })
            
        })

        describe(("Check validation in all fields"), () => {
            it("Phone Field must be a number" , async() => {
                const data = {
                    name: "Test User",
                    phone : "abcdefghij",
                    email : "randomuser@gmail.com",
                    role : "admin",
                    password : "Yagnang@2408",
                    cpassword : "Yagnang@2408"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal("Field must be a number.")
            })

            it("Phone Field must be a integer" , async() => {
                const data = {
                    name: "Test User",
                    phone : "56734.785",
                    email : "randomuser@gmail1.com",
                    role : "admin",
                    password : "Yagnang@2408",
                    cpassword : "Yagnang@2408"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal("Field must be an integer.")
            })

            it("Email must be valid" , async() => {
                const data = {
                    name: "Test User",
                    phone : "567345785",
                    email : "randomuser@gmail.lalluprasad",
                    role : "admin",
                    password : "Yagnang@2408",
                    cpassword : "Yagnang@2408"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal("Invalid email format.")
            })

            it("Invalid Role" , async() => {
                const data = {
                    name: "Test User",
                    phone : "567345785",
                    email : "randomuser@gmail.com",
                    role : "bakwas",
                    password : "Yagnang@2408",
                    cpassword : "Yagnang@2408"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Invalid role. It must be either "admin" or "customer".')
            })

            it("Password Pattern Strong" , async() => {
                const data = {
                    name: "Test User",
                    phone : "567345785",
                    email : "randomuser@gmail.com",
                    role : "admin",
                    password : "123",
                    cpassword : "123"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long.')
            })

            it("Confirm Password do not match" , async() => {
                const data = {
                    name: "Test User",
                    phone : "567345785",
                    email : "randomuser@gmail.com",
                    role : "admin",
                    password : "Yagnang@123",
                    cpassword : "Yagnang@1234"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Passwords do not match.')
            })

            it("User Already Registered" , async() => {
                const data = {
                    name: "Test User",
                    phone : "9167345785",
                    email : "yagnang2408@gmail.com",
                    role : "admin",
                    password : "Yagnang@1234",
                    cpassword : "Yagnang@1234"
                }

                const res = await signUpRequest(data)

                expect(res).to.have.status(400);
                expect(res.body.error).to.equal("User has Already Registered")
            })


            // it("User Registered Successfully" , async() => {
            //     const data = {
            //         name: "Test User",
            //         phone : "9167345785",
            //         email : "yag1243@gmail.com",
            //         role : "admin",
            //         password : "Yagnang@1234",
            //         cpassword : "Yagnang@1234"
            //     }

            //     const res = await signUpRequest(data)

            //     expect(res).to.have.status(200);
            //     expect(res.body.message).to.equal("User Registered Sucessfully")
            // })
        })
        
    })
})