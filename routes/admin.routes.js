const router = require("express").Router();
const adminController = require("../controller/admin.controller")
const adminAuth= require("../middleware/admin.auth")
router.post('/register',adminController.register);
router.post('/login',adminAuth,adminController.login); 
router.patch('/editAdmin/:id',adminAuth,adminController.editAdmin)
router.delete('/deleteAdmin/:id',adminAuth,adminController.delAdmin)
module.exports=router 
