const express = require("express")
const path = require("path")
const User = require("../models/User")
const {signupvalidation,signinvalidation,requireSignin,isAdmin} = require("../middleware/authMiddleware")
const {Signup,Signin} = require("../controller/authController")

const router = express.Router()

const spath = path.join(__dirname,"../")

router.get("/signup",(req,res)=>{
    res.sendFile(spath + "/Signup.html")
})

router.get("/signin",(req,res)=>{
    res.sendFile(spath + "/Signin.html")
})

router.post("/signup",signupvalidation,Signup)
router.post('/signin',signinvalidation,Signin)

router.get("/demo", requireSignin , async(req,res)=>{
    try {
        const isUser = await User.findOne({_id:req.userid})

        if(isUser){
            res.status(200).send({"message" : `Welcome ${isUser.name}`})
        }
    } catch (error) {
        console.log(error);
    }
})

router.get("/admin", requireSignin , isAdmin, async(req,res)=>{
    try {
        const isUser = await User.findOne({_id:req.userid})

        if(isUser){
            res.status(200).send({"message" : `Welcome ${isUser.name}`})
        }
    } catch (error) {
        console.log(error);
    }
})


module.exports = router