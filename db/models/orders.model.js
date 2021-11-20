const {model,Schema} = require("mongoose")
const orderSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    orderName:{
        type:String,
        trim:true,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    paid:{
        type:Boolean,
        dafault:false
    },
    delivered:{
        type:Number,
        required:true
    }
},{timestamps:true})
orderSchema.methods.toJSON=function(){
    const order=this.toObject()
    const {__v,...others}=order
    return others
}

const Order = model("Order", orderSchema)

module.exports=Order