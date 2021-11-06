let express=require("express");
const { sinUp, login, getUser } = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const { signUpRules,validator } = require("../middlewares/validator");
let router=express.Router();



router.post("/singUp",signUpRules(),validator,sinUp);
router.post("/login",login);
router.get("/get",auth,getUser)
module.exports=router