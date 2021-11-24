const {model,Schema} = require("mongoose")
const orderSchema = new Schema({
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
    orderName:{
        type:String,
        trim:true,
        required:true,
    },
    amount:{
        type:Number,
        default:1,
        minlength:1
    },
    paid:{
        type:Boolean,
        dafault:false
    },
    delivered:{
        type:Number,
        dafault:false
    }
},{timestamps:true})
orderSchema.methods.toJSON=function(){
    const order=this.toObject()
    const {__v,...others}=order
    return others
}

const Order = model("Order", orderSchema)

module.exports=Order