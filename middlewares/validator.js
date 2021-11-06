let express=require("express");
const { validationResult } = require("express-validator");
let {check}=require("express-validator")

exports.signUpRules=()=>[
check("fullName","this field is require" ).notEmpty(),
check("email", "this shuld be a valid email").isEmail(),
check("email", "this shuld be a valid email").notEmpty(),
check("password","password should be more than 5 digets").isLength({min:5})

]

exports.validator=(req,res,next)=>{
    let errors=validationResult(req)
    return errors.isEmpty()? next():res.status(400).json({ errors: errors.array() })
}
