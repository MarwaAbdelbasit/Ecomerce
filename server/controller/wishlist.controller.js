const wishlistModel = require("../db/models/wishlist.model")
const errorHandler = require('../helpers/errorHandler')
const successHandler = require('../helpers/successHandler')

class Wishlist {
    static toggleWishList= async (req, res) => {
        try {
            let product = await wishlistModel.find({productId:req.params.productId})
            if(product) throw new Error("product already wishlisted")
            const listItem = new wishlistModel({
                userId: req.user._id,
                productId:req.params.productId
            })
            await listItem.save()
            successHandler(listItem,res,'product added to wishlist successfully')    
        }
        catch(e) {
            errorHandler(e,res)
        }
    }
    static getAllWishList= async (req, res) => {
        try{
            let allWishList = await wishlistModel.find().populate("userId").populate("productId")
            if(allWishList.length==0) throw new Error("wishlist is empty")
            successHandler(allWishList,res,'data fetched successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }
    static deleteAllWishList= async (req, res)=>{
        try{
            await wishlistModel.deleteMany()
            successHandler(null,res,'wishList deleted successfully')
        }
        catch(e) {
            errorHandler(e,res)
        }
    }
}

module.exports = Wishlist