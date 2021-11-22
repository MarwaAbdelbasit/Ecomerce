const productController = require("../controller/product.controller")
const productModel = require("../db/models/product.model")
const router = require("express").Router()
const auth= require("../middleware/auth")
const upload = require("../middleware/fileUpload")

//----------------crud operations of product controlled by admin-----
router.get("/allProducts", productController.allProducts)
router.get("/singleProduct/:productId", productController.singleProduct)
router.patch("/editProduct/:productId",auth('Admin') ,productController.editProduct)
router.patch("/uploadImage/:productId",auth('Admin'), upload.single('img'), productController.uploadImage)
router.post("/addProduct", auth('Admin'),productController.addProduct)
router.delete("/delProduct/:productId",auth('Admin'), productController.delProduct)
router.delete("/delAll",auth('Admin'), productController.delAll)

//----------------crud operations of categories controlled by admin only-----
router.get("/allCate/:productId",auth('Admin') ,productController.allCate)
router.get("/singleCate/:productId/:catId",auth('Admin') ,productController.singleCate)
router.post("/addCategory/:productId",auth('Admin') ,productController.addCategory)
router.delete("/delCategory/:productId/:catId",auth('Admin') ,productController.delCategory)
router.delete("/delAllCate/:productId",auth('Admin') ,productController.delAllCate)

//----------------crud operations of discount controlled by admin only-----
router.post("/addDiscount/:productId", auth('Admin'), productController.addDiscount)
router.patch("/editDiscount/:productId", auth('Admin'), productController.editDiscount)
router.delete("/delDiscount/:productId", auth('Admin'), productController.delDiscount)
router.get("/getDiscount/:productId/:discountId", auth('Admin'), productController.getDiscount)

module.exports=router

