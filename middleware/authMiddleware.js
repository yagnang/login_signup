const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Joi = require("joi")

const signupvalidation = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        'any.required': 'Name is required.',
        'string.empty': 'Name cannot be empty.',
      }),
      phone: Joi.number().integer().required().messages({
        'any.required': 'Field is required.',
        'number.empty': 'Field must be filled',
        'number.base': 'Field must be a number.',
        'number.integer': 'Field must be an integer.',
        
    }),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow : ['com', 'in'] } }).required().messages({
        'any.required': 'Email is required.',
        'string.email': 'Invalid email format.',
    }),
      role: Joi.string().valid('admin', 'customer').required().messages({
        'any.required': 'Role is required.',
        'any.only': 'Invalid role. It must be either "admin" or "customer".',
      }),
      password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
        'any.required': 'Password is required.',
        'string.pattern.base': 'Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long.',
      }),
      cpassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.required': 'Confirm Password is required.',
        'any.only': 'Passwords do not match.',
      }),
    });
  
    const { error } = schema.validate(req.body, { abortEarly: false });
  
    if (error) {
      res.status(400).send({ "error": error.details[0].message });
    } else {
      next();
    }
  };

  
  const signinvalidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow : ['com', 'in'] } }).required().messages({
            'any.required': 'Email is required.',
            'string.email': 'Invalid email format.',
        }),
        password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
          'any.required': 'Password is required.',  
          'string.pattern.base': 'Invalid Password',
        }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        res.status(400).send({ "error": error.details[0].message });
    } else {
        next();
    }
};


const requireSignin = async(req,res,next) =>{
    try {
        const secretKey = process.env.SECRET_KEY;

        const jwtoken = req.cookies.jwtoken;

        if (jwtoken) {
            const data = await jwt.verify(jwtoken,secretKey)
            req.userid = data._id
            next();
        }
        else{
            res.status(400).send({"error" : "You have to login to access this page"})
        }
    } catch (error) {
        console.log(error);
    }
}


const isAdmin = async(req,res,next) => {
    try {
        const user = await User.findOne({_id : req.userid})

        if(user.role === "admin"){
            next();
        }
        else{
            res.status(400).send({"error":"You have no permission to access this page"})
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {signupvalidation,signinvalidation,requireSignin,isAdmin}