const productController = require("../controller/product.controller")
const router = require("express").Router()
const adminAuth= require("../middleware/admin.auth")

router.get("/allProducts", productController.allProducts)
router.get("/singleProduct/:id", productController.singleProduct)
router.patch("/editProduct/:id",adminAuth ,productController.editProduct)
router.post("/addProduct", adminAuth,productController.addProduct)
router.delete("/delProduct/:id",adminAuth, productController.delProduct)
router.delete("/delAll",adminAuth, productController.delAll)

module.exports=router
 