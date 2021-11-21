const productController = require("../controller/product.controller")
const productModel = require("../db/models/product.model")
const router = require("express").Router()
const adminAuth= require("../middleware/admin.auth")
const upload = require("../middleware/fileUpload")

router.get("/allProducts", productController.allProducts)
router.get("/singleProduct/:productId", productController.singleProduct)
router.post("/addProduct", adminAuth,productController.addProduct)
router.post("/addCategory/:productId",adminAuth ,productController.addCategory)
router.patch("/uploadImage/:productId", adminAuth, upload.single('img'), productController.uploadImage)
router.patch("/editProduct/:productId",adminAuth ,productController.editProduct)
router.delete("/delProduct/:productId",adminAuth, productController.delProduct)
router.delete("/delAll",adminAuth, productController.delAll)

module.exports=router