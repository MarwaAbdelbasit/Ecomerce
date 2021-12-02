const router = require("express").Router();
const orderController = require("../controller/orders.controller")
const auth = require("../middleware/auth")

//----------------user options to control his order ----------------
router.post('/placeOrder/:productId', auth('User'), orderController.placeOrder);
router.patch('/editOrder/:orderId', auth('User'), orderController.editOrder);
router.get('/showAllOrders', auth('User'), orderController.showAllOrders)
router.get('/singleOrder/:orderId', auth('User'), orderController.singleOrder)
router.delete('/delOrders', auth('User'), orderController.delOrders)
router.delete('/delOrder/:orderId', auth('User'), orderController.delOrder)

//----------------admin options to control orders ----------------
router.get('/allOrdersAdmin', auth("Admin"), orderController.allOrdersAdmin)
router.delete('/delOrdersAdmin/:userId', auth("Admin"), orderController.delOrdersAdmin)
router.delete('/delSingleOrderAdmin/:orderId', auth("Admin"), orderController.delSingleOrderAdmin)

module.exports=router