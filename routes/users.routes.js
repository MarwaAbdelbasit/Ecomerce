const router = require("express").Router();
const userController = require("../controller/user.controller")
router.post('/register',userController.register); 
router.get('/showUser',userController.showUser)
router.get('/showAll',userController.showAllUsers)
router.patch('/editUser',userController.editUser)
router.delete('/deleteUser',userController.delUser)
router.delete('/deleteAll',userController.delAll)
module.exports=router