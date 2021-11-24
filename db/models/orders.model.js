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
    amount:{
        type:Number,
        default:1,
        minlength:1
    },
    shipping:{
        shippedTo:{
            type:String,
            required:true
        },
        adress:{
            type:String,
            required:true
        }
    },
    paid:{
        type:Boolean,
        dafault:false
    },
    payment:{
        method:{
            type:String,
            required: function(){ return this.paid}
        },
        transaction:{
            type:String,
            required: function(){ return this.paid}
        }
    },
    delivered:{
        type:Boolean,
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