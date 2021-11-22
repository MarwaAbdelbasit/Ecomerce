const router = require("express").Router();
const auth = require("../middleware/auth")
const cartController = require("../controller/cart.controller")

//----------------user options to control his cart ----------------
router.post('/addCartItem', auth('User'), cartController.addCartItem);
router.delete('/removeCartItem/:productId', auth('User'), cartController.removeCartItem);
router.get('/myCart', auth('User'),cartController.myCart)
router.patch('/editCartAmount/:productId', auth('User'), cartController.editCartAmount);
router.delete('/clearCart', auth('User'),cartController.clearCart)
module.exports=router