const router = require("express").Router();
const adminController = require("../controller/admin.controller")
const adminAuth= require("../middleware/admin.auth")

//-----------------register/login for admins -----------
router.post('/register',adminController.register);
router.post('/login',adminAuth,adminController.login);

//----------------admin options to show/edit/delete/logout(1/many devices) his account---------
router.patch('/editAdmin/:id',adminAuth,adminController.editAdmin)
router.delete('/deleteAdmin/:id',adminAuth,adminController.delAdmin)
router.post('/logout', adminAuth, adminController.logout)
router.post('/logoutall', adminAuth, adminController.logoutAll)

//-----------------admin control for orders ---------------------
router.get('/allOrders',adminController.getAllOrders)

module.exports=router 
