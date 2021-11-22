const productController = require("../controller/product.controller")
const router = require("express").Router()
const auth= require("../middleware/auth")
const upload = require("../middleware/fileUpload")

router.get("/allProducts", productController.allProducts)
router.get("/singleProduct/:id", productController.singleProduct)
router.patch("/editProduct/:id",auth('Admin') ,productController.editProduct)
router.post("/addCategory/:productId",auth("Admin") ,productController.addCategory)
router.patch("/uploadImage/:productId", auth("Admin"), upload.single('img'), productController.uploadImage)
router.post("/addProduct", auth('Admin'),productController.addProduct)
router.delete("/delProduct/:id",auth('Admin'), productController.delProduct)
router.delete("/delAll",auth('Admin'), productController.delAll)

module.exports=router
