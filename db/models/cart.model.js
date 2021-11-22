const {model,Schema} = require("mongoose")
const cartSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        trim:true,
        required:true,
    },
    amount:{
        type:Number,
        default:1,
    },
    price:{
        type:Number,
        required:true
    },
    discound:{
        type:Number,
        default:0
    }
},{timestamps:true})
cartSchema.methods.toJSON=function(){
    const cart=this.toObject()
    const {__v,...others}=cart
    return others
}

const Cart = model("Cart", cartSchema)

module.exports=Cart