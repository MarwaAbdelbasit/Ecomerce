const router = require("express").Router();
const userController = require("../controller/user.controller")
const userAuth = require("../middleware/user.auth")
const adminAuth = require("../middleware/admin.auth")
router.post('/register',userController.register);
router.post('/login',userAuth,userController.login); 
router.get('/showUser/:id',userController.showUser)
router.get('/showAll',adminAuth,userController.showAllUsers)
router.patch('/editUser/:id',userAuth,userController.editUser)
router.delete('/deleteUser/:id',userAuth,userController.delUser)
router.delete('/deleteAll',adminAuth,userController.delAll)
module.exports=router