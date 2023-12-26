const User = require("../models/User")
const jwt = require("jsonwebtoken")
const {hashPassword,comparePassword} = require("../helper/authHelper");
const Email = require("../nodemailer/email")

const Signup = async(req,res) =>{
    try {
        const{name,phone,email,role,password,cpassword} = req.body;

        const isMatch = await User.findOne({email:email})

        if(!name || !phone || !email || !role || !password || !cpassword){
            res.status(400).send({"error":"All Fields are Required"})
        }
        else if(password != cpassword){
            res.status(400).send({"error":"Password does not Match"})
        }
        else if(isMatch){
            res.status(400).send({"error":"User has Already Registered"})
        }
        else{
            const hashPass = await hashPassword(password)

            const user = new User({name,phone,email,role,password:hashPass})

            const save = await user.save()

            if(save){

                Email(save._id)

                res.status(200).send({"message":"User Registered Sucessfully"})
                
                
            }
            else{
                res.status(400).send({"error":"Error occured while registering user"})
            }
        }


    } catch (error) {
        console.log(error);
    }
}

const Signin = async(req,res) =>{
    try {

        const {email,password} = req.body;

        if(!email || !password){
            res.status(400).send({"error" : "All fields are required"})
        }

        const user = await User.findOne({email:email})

        if(user){
            const isMatch = await comparePassword(password,user.password)
        
            if(isMatch){
                SECRET_KEY = process.env.SECRET_KEY
                const payload = {
                    _id : user._id
                }

                const jwtoken = await jwt.sign(payload,SECRET_KEY,{expiresIn : '1h'})

                res.cookie("jwtoken",jwtoken,{
                    maxAge : 10000000000000,
                    httpOnly : true,
                    secure : true
                })

                res.status(200).send({"message" : "User Login Successfully"})
            }
            else{
                res.status(400).send({"error" : "Password does not Match"})
            }
        }
        else{
            res.status(400).send({"error" : "Username does not exist, please Signup"})
        }

        

        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {Signup,Signin}