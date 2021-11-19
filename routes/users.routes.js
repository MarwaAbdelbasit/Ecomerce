const router = require("express").Router();
const userController = require("../controller/user.controller")
const auth = require("../middleware/auth")
const adminAuth = require("../middleware/admin.auth")
router.post('/register',userController.register);
router.post('/login',userController.login); 
router.get('/showUser/:id',userController.showUser)
router.get('/showAll',adminAuth,userController.showAllUsers)
router.patch('/editUser/:id',auth,userController.editUser)
router.delete('/deleteUser/:id',auth,userController.delUser)
router.delete('/deleteAll',adminAuth,userController.delAll)
module.exports=router