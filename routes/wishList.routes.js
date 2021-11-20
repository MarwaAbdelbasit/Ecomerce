const router = require("express").Router();
const userController = require("../controller/user.controller")
const auth = require("../middleware/auth")

//----------------user options to control his wishlist ----------------
router.post('/toggleWishList/:productId', auth, userController.toggleWishList);
router.get('/getAllWishList', auth,userController.getAllWishList)
router.delete('/deleteAllWishList', auth,userController.deleteAllWishList)

module.exports=router