const router = require("express").Router();
const userController = require("../controller/user.controller")
const auth = require("../middleware/auth")
const adminAuth = require("../middleware/admin.auth")
//-----------------register/login for users -----------
router.post('/register',userController.register);
router.post('/login',userController.login); 
//----------------user options to show/edit/delete/logout(1/many devices) his account---------
router.get('/profile', auth, userController.profile)
router.patch('/editUser/:id',auth,userController.editUser)
router.delete('/deleteUser/:id',auth,userController.delUser)
router.post('/logout', auth, userController.logout)
router.post('/logoutall', auth, userController.logoutAll)

//----------------admin options to show single/all registerd users/delete them-----
router.get('/showUser/:id',adminAuth,userController.showUser)
router.get('/showAll',adminAuth,userController.showAllUsers)
router.delete('/deleteAll',adminAuth,userController.delAll)

module.exports=router