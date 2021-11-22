const productController = require("../controller/product.controller")
const productModel = require("../db/models/product.model")
const router = require("express").Router()
const auth= require("../middleware/auth")
const upload = require("../middleware/fileUpload")

//----------------crud operations of product controlled by admin-----
router.get("/allProducts", productController.allProducts)

//----------------crud operations of categories controlled by admin only-----
router.get("/allCate/:productId",adminAuth ,productController.allCate)
router.get("/singleCate/:productId/:catId",adminAuth ,productController.singleCate)
router.post("/addCategory/:productId",adminAuth ,productController.addCategory)
router.delete("/delCategory/:productId/:catId",adminAuth ,productController.delCategory)
router.delete("/delAllCate/:productId",adminAuth ,productController.delAllCate)

router.get("/singleProduct/:id", productController.singleProduct)
router.patch("/editProduct/:id",auth('Admin') ,productController.editProduct)
router.post("/addCategory/:productId",auth('Admin') ,productController.addCategory)
router.patch("/uploadImage/:productId",auth('Admin'), upload.single('img'), productController.uploadImage)
router.post("/addProduct", auth('Admin'),productController.addProduct)
router.delete("/delProduct/:id",auth('Admin'), productController.delProduct)
router.delete("/delAll",auth('Admin'), productController.delAll)

module.exports=router

