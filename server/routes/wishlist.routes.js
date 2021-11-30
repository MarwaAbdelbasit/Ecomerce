const router = require("express").Router()
const wishListController = require("../controller/wishlist.controller")
const auth = require("../middleware/auth")

router.post('/toggleWishList/:productId', auth('User'), wishListController.toggleWishList);
router.get('/getAllWishList', auth('User'),wishListController.getAllWishList)
router.delete('/deleteAllWishList', auth('User'),wishListController.deleteAllWishList)

module.exports = router