const router = require("express").Router();
const userController = require("../controller/user.controller")
const auth = require("../middleware/auth")
router.post('/register',userController.register);
router.post('/login',auth,userController.login);
router.get('/showUser/:id',userController.showUser)
router.get('/showAll',userController.showAllUsers)
router.get('/profile', auth, userController.profile)
router.patch('/editUser/:id',auth,userController.editUser)
router.delete('/deleteUser/:id',auth,userController.delUser)
router.delete('/deleteAll',userController.delAll)

router.post('/placeOrder', auth, userController.placeOrder);
router.get('/allOrders', auth, userController.allOrders)
router.get('/singleOrder/:orderId', auth, userController.singleOrder)
router.delete('/delOrders', auth, userController.delOrders)
router.delete('/delOrder/:orderId', auth, userController.delOrder)

module.exports=router