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
    static addReview = async (req, res) => {
        try{
            let product= await productModel.updateOne({_id:req.params.productId},{
                $push: {
                    reviews:{
                        ...req.body
                    }
                }
            })
            if(!product) throw new Error("product not found")
            successHandler(product,res,'review added  successfully')
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
                $set:{mainImage: "uploads/" + req.user._id + "/" + req.file.filename}
            })
            if(!product) throw new Error("product not found")
            successHandler(product,res,'image uploaded successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }
    static uploadImages = async (req, res) => {
        try{
            let product = await productModel.findByIdAndUpdate(req.params.productId, {
                $push:{images: "uploads/" + req.user._id + "/" + req.file.filename}
            })
            if(!product) throw new Error("product not found")
            successHandler(product,res,'image uploaded successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    //-------------------admin control for categories-----------------

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

    //-------------------admin control for discount-----------------
    static addDiscount = async (req, res) => {
        try {
            const product = await productModel.findByIdAndUpdate(
                req.params.productId,
                {$push:{discount:req.body}}
            )
            if(!product) throw new Error("product not found")
            successHandler(product,res,'discount added successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static editDiscount = async (req, res) => {
        try {
            let product = await productModel.findByIdAndUpdate(
                req.params.productId,
                {$set:{discount:req.body}}
            )
            if(!product) throw new Error("product not found")
            successHandler(product,res,'discount edited successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static delDiscount = async (req, res) => {
        try {
            await productModel.findByIdAndUpdate(
                req.params.productId,{
                    $set:{discount:[]}
                })
            successHandler(null,res,'discount deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

    static getDiscount = async (req, res) => {
        try {
            let product = await productModel.findById(req.params.productId)
            if(!product) throw new Error("product not found")
            let getdiscount = product.discount.find(d=>d._id==req.params.discountId)
            if(!getdiscount) throw new Error("discount not found")
            successHandler(getdiscount,res,'discount deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }

}

module.exports = Product