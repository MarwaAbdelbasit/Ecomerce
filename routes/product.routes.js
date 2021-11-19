const productController = require("../controller/product.controller")
const router = require("express").Router()

router.get("/allProducts", productController.allProducts)
router.get("/singleProduct/:id", productController.singleProduct)
router.patch("/editProduct/:id", productController.editProduct)
router.post("/addProduct", productController.addProduct)
router.delete("/delProduct/:id", productController.delProduct)
router.delete("/delAll", productController.delAll)

module.exports=router
 