const router = require("express").Router();
const userController = require("../controller/user.controller")
const auth = require("../middleware/auth")

//----------------user options to control his order ----------------
router.post('/placeOrder', auth, userController.placeOrder);
router.patch('/editOrder/:orderId', auth, userController.editOrder);
router.get('/allOrders', auth, userController.allOrders)
router.get('/singleOrder/:orderId', auth, userController.singleOrder)
router.delete('/delOrders', auth, userController.delOrders)
router.delete('/delOrder/:orderId', auth, userController.delOrder)

module.exports=router