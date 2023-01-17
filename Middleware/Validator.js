const { check,validationResult } = require("express-validator")
const jwt=require('jsonwebtoken')


exports.userValidator = [
    check("name").trim().not().isEmpty().withMessage("Name Field Missing"),
    check("email").normalizeEmail().isEmail().withMessage("Enter a Valid Email Address"),
    check("password").trim().not().isEmpty().withMessage("Password Field is Empty")
    .isLength({ min: 8, max: 20 }).withMessage("Password Must be 8 to 20 Chaarcters Long")

];

exports.validate=(req,res,next)=>{
    const error=validationResult(req).array()
    if(error.length){
    res.status(200).send({message: error[0].msg})
    return;
    }
    next()

}

//middleware function to check the jwt token

exports.ProtectedRoutValidate=async(req,res,next)=>{
   try {
    const token=req.headers["authorization"].split(" ")[1];
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            res.status(401).send({message:"Authentication Failed Token expired or not matched",success:false})
        }else{
            req.body.userId=decoded.id;
            next()
        }

    })
   } catch (error) {
    return res.status(401).send({message:"Failed",success:false})
   }

}