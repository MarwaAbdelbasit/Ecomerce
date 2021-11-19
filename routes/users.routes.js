const router = require("express").Router();
const userController = require("../controller/user.controller")
router.post('/register',userController.register);
router.post('/login',userController.login); 
router.get('/showUser/:id',userController.showUser)
router.get('/showAll',userController.showAllUsers)
router.patch('/editUser/:id',userController.editUser)
router.delete('/deleteUser/:id',userController.delUser)
router.delete('/deleteAll',userController.delAll)
module.exports=router