const mongoose = require("mongoose")

const wishlistSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    amount:{
        type:Number,
        default:1,
    },
    price:{
        type:Number,
    },
    discound:{
        name:{
            type: String,
            trim:true,
        },
        percent:{
            type:Number,
            min:1
        }
    }
},{timestamps:true})

wishlistSchema.methods.toJSON=function(){
    const cart=this.toObject()
    const {__v,...others}=cart
    return others
}

const Wishlist = mongoose.model("Wishlist", wishlistSchema)
module.exports = Wishlist