const router = require("express").Router();
const orderController = require("../controller/orders.controller")
const auth = require("../middleware/auth")

//----------------user options to control his order ----------------
router.post('/placeOrder', auth, orderController.placeOrder);
router.patch('/editOrder/:orderId', auth, orderController.editOrder);
router.get('/allOrders', auth, orderController.allOrders)
router.get('/singleOrder/:orderId', auth, orderController.singleOrder)
router.delete('/delOrders', auth, orderController.delOrders)
router.delete('/delOrder/:orderId', auth, orderController.delOrder)

module.exports=router