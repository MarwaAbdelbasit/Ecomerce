const productController = require("../controller/product.controller")
const productModel = require("../db/models/product.model")
const router = require("express").Router()
const adminAuth= require("../middleware/admin.auth")
const upload = require("../middleware/fileUpload")

//----------------crud operations of product controlled by admin-----
router.get("/allProducts", productController.allProducts)
router.get("/singleProduct/:productId", productController.singleProduct)
router.post("/addProduct", adminAuth,productController.addProduct)
router.patch("/uploadImage/:productId", adminAuth, upload.single('img'), productController.uploadImage)
router.patch("/editProduct/:productId",adminAuth ,productController.editProduct)
router.delete("/delProduct/:productId",adminAuth, productController.delProduct)
router.delete("/delAll",adminAuth, productController.delAll)

//----------------crud operations of categories controlled by admin only-----
router.get("/allCate/:productId",adminAuth ,productController.allCate)
router.get("/singleCate/:productId/:catId",adminAuth ,productController.singleCate)
router.post("/addCategory/:productId",adminAuth ,productController.addCategory)
router.delete("/delCategory/:productId/:catId",adminAuth ,productController.delCategory)
router.delete("/delAllCate/:productId",adminAuth ,productController.delAllCate)

module.exports=router