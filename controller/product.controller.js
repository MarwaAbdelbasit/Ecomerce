const productModel = require("../db/models/product.model")
const successHandler = require("../helpers/successHandler")
const errorHandler = require("../helpers/errorHandler")
class Product {

    static allProducts = async (req, res) => {
        try{
            const allProducts = await productModel.find()
            successHandler(allProducts,res,'all Products shown successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static singleProduct = async (req, res) => {
        try{
            const product = await productModel.findOne({_id:req.params.productId})
            if(!product) throw new Error("product not found")
            successHandler(product,res,'product shown successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
    //-------------------admin control for products-----------------
    static addProduct = async (req, res) => {
        try{
            const product =await new productModel(req.body)
            await product.save()
            successHandler(product,res,'Product added successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static editProduct = async (req, res) => {
        try{
            let product = await productModel.findByIdAndUpdate(req.params.productId,{$set:req.body})
            if(!product) throw new Error("product not found")
            await product.save()
            successHandler(product,res,' product is edited successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static delProduct = async (req, res) => {
        try{
            let product = await productModel.findByIdAndDelete(req.params.productId)
            if(!product) throw new Error("product not found")
            successHandler(null,res,' product is deleted successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static delAll = async (req, res) => {
        try{
            await productModel.deleteMany()
            successHandler(null,res,'all products are deleted successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static uploadImage = async (req, res) => {
        try{
            let product = await productModel.findByIdAndUpdate(req.params.productId, {
                $set:{image: "uploads/" + req.params.productId + "/" + req.file.filename}
            })
            if(!product) throw new Error("product not found")
            successHandler(product,res,'image uploaded successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static allCate = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.productId)
            if(!product) throw new Error("product not found")
            const allCate = product.category
            if(allCate.length==0) throw new Error("no categories to show")
            successHandler(allCate,res,'category added successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static singleCate = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.productId)
            if(!product) throw new Error("product not found")
            const cate = product.category.find(c=>c._id==req.params.catId)
            if(!cate) throw new Error("category not found")
            successHandler(cate,res,'category deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static addCategory = async (req, res) => {
        try {
            const product = await productModel.findByIdAndUpdate(
                req.params.productId,
                {$push:{category:req.body}}
            )
            successHandler(product,res,'category added successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static delCategory = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.productId)
            if(!product) throw new Error("product not found")
            product.category = product.category.filter(c=>c._id!=req.params.catId)
            await product.save()
            successHandler(product,res,'category deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static delAllCate = async (req, res) => {
        try {
            await productModel.findByIdAndUpdate(
                req.params.productId,{
                    $set:{category:[]}
                })
            successHandler(null,res,'category deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

}

module.exports = Product