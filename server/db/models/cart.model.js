const {model,Schema} = require("mongoose")
const cartSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:Schema.Types.ObjectId,
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
cartSchema.methods.toJSON=function(){
    const cart=this.toObject()
    const {__v,...others}=cart
    return others
}

const Cart = model("Cart", cartSchema)

module.exports=Cart