const productModel = require("../db/models/product.model")
const successHandler = require("../helpers/successHandler")
const errorHandler = require("../helpers/errorHandler")
class Product {
    static addProduct = async (req, res) => {
        try{
            const product =await new productModel(req.body)
            await product.save()
            successHandler(user,'Product added successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static allProducts = async (req, res) => {
        try{
            const allProducts = await productModel.find()
            successHandler(allProducts,'all Products shown successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static singleProduct = async (req, res) => {
        try{
            const product = await productModel.findOne({_id:req.params.id})
            successHandler(product,'product shown successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static editProduct = async (req, res) => {
        try{
            let product = await productModel.findByIdAndUpdate(req.params.id,{$set:req.body})
            if(!product) throw new Error("product not found")
            await product.save()
            successHandler(product,' product is edited successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static delProduct = async (req, res) => {
        try{
            let product = await productModel.findByIdAndDelete(req.params.id)
            if(!product) throw new Error("product not found")
            successHandler(null,' product is deleted successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }

    static delAll = async (req, res) => {
        try{
            await productModel.deleteMany()
            successHandler(null,'all products are deleted successfully')
        }
        catch(err) {
            errorHandler(err,res)
        }
    }
}

module.exports = Product