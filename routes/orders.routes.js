const router = require("express").Router();
const orderController = require("../controller/orders.controller")
const auth = require("../middleware/auth")
const adminAuth= require("../middleware/admin.auth")

//----------------user options to control his order ----------------
router.post('/placeOrder', auth, orderController.placeOrder);
router.patch('/editOrder/:orderId', auth, orderController.editOrder);
router.get('/showAllOrders', auth, orderController.showAllOrders)
router.get('/singleOrder/:orderId', auth, orderController.singleOrder)
router.delete('/delOrders', auth, orderController.delOrders)
router.delete('/delOrder/:orderId', auth, orderController.delOrder)

//----------------admin options to control orders ----------------
router.get('/allOrdersAdmin', adminAuth, orderController.allOrdersAdmin)
router.delete('/delOrdersAdmin/:userId', adminAuth, orderController.delOrdersAdmin)
router.delete('/delSingleOrderAdmin/:userId/:orderId', adminAuth, orderController.delSingleOrderAdmin)

module.exports=router