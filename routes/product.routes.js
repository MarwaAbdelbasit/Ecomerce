const productController = require("../controller/product.controller")
const productModel = require("../db/models/product.model")
const router = require("express").Router()
const auth= require("../middleware/auth")
const upload = require("../middleware/fileUpload")

router.get("/allProducts", productController.allProducts)
router.get("/singleProduct/:id", productController.singleProduct)
router.patch("/editProduct/:id",auth('Admin') ,productController.editProduct)
router.post("/addProduct", auth('Admin'),productController.addProduct)
router.delete("/delProduct/:id",auth('Admin'), productController.delProduct)
router.delete("/delAll",auth('Admin'), productController.delAll)

module.exports=router