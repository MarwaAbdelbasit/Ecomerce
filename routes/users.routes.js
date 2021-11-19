const router = require("express").Router();
const userController = require("../controller/user.controller")
const auth = require("../middleware/auth")
router.post('/register',userController.register);
router.post('/login',auth,userController.login); 
router.get('/showUser/:id',userController.showUser)
router.get('/showAll',userController.showAllUsers)
router.patch('/editUser/:id',auth,userController.editUser)
router.delete('/deleteUser/:id',auth,userController.delUser)
router.delete('/deleteAll',userController.delAll)
module.exports=router