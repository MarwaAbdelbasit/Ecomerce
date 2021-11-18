const router = require("express").Router();
const userController = require("../controller/user.controller")
router.get('/register',userController.register); 

module.exports=router