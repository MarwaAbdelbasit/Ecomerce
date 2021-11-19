const router = require("express").Router();
const userController = require("../controller/user.controller")
const auth = require("../middleware/auth")
const adminAuth = require("../middleware/admin.auth")
router.post('/register',userController.register);
router.post('/login',userController.login); 
router.get('/showUser/:id',userController.showUser)
router.get('/showAll',adminAuth,userController.showAllUsers)
router.get('/profile', auth, userController.profile)
router.patch('/editUser/:id',auth,userController.editUser)
router.delete('/deleteUser/:id',auth,userController.delUser)
router.delete('/deleteAll',adminAuth,userController.delAll)

router.post('/placeOrder', auth, userController.placeOrder);
router.patch('/editOrder/:orderId', auth, userController.editOrder);
router.get('/allOrders', auth, userController.allOrders)
router.get('/singleOrder/:orderId', auth, userController.singleOrder)
router.delete('/delOrders', auth, userController.delOrders)
router.delete('/delOrder/:orderId', auth, userController.delOrder)

module.exports=router
module.exports=router