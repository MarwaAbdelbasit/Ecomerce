const productModel = require("../db/models/product.model")

class Product {
    static addProduct = async (req, res) => {
        try{
            const product = new productModel(req.body)
            await product.save()
            res.status(200).send({
                apiStatus:true,
                data:product,
                message:"product added successfully"
            })
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }

    static allProducts = async (req, res) => {
        try{
            const allProducts = await productModel.find()
            res.status(200).send({
                apiStatus:true,
                data:allProducts,
                message:"data fetched successfully"
            })
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }

    static singleProduct = async (req, res) => {
        try{
            const product = await productModel.findOne({_id:req.params.id})
            res.status(200).send({
                apiStatus:true,
                data:product,
                message:"data fetched successfully"
            })
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }

    static editProduct = async (req, res) => {
        try{
            let product = await productModel.findOne({_id:req.params.id})
            if(!product) throw new Error("product not found")
            // product = req.body
            // product = {...req.body}
            // for(attr in req.body) {product.attr = req.body.attr}
            product.name = req.body.name
            product.description = req.body.description
            product.category = req.body.category
            product.amount = req.body.amount
            product.price = req.body.price
            product.discount = req.body.discount
            product.status = req.body.status

            await product.save()
            res.status(200).send({
                apiStatus:true,
                data:product,
                message:"data edited successfully"
            })
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }

    static delProduct = async (req, res) => {
        try{
            let product = await productModel.findByIdAndDelete({_id:req.params.id})
            if(!product) throw new Error("product not found")
            res.status(200).send({
                apiStatus:true,
                data:product,
                message:"data deleted successfully"
            })
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }

    static delAll = async (req, res) => {
        try{
            await productModel.deleteMany()
            res.status(200).send({
                apiStatus:true,
                message:"all data deleted successfully"
            })
        }
        catch(e) {
            res.status(500).send({
                apiStatus:false,
                message:e.message
            })
        }
    }
}

module.exports = Product