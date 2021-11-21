const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:30
    },
    description:{
        type:String,
        trim:true,
        required:true,
        minlength:30
    },
    price:{
        type:Number,
        required:true
    },
    category:[
        {name:{
            type:String,
            trim:true,
            required:true,
            maxlength:30
        },
        description:{
            type:String,
            trim:true,
            // minlength:20
        },}
    ],
    image: {
        type: String,
        trim: true
    }
    // inventory_id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Inventory",
    //     required: true
    // },
    // discount_id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Discount",
    //     required: true
    // }
},{timestamps:true})
productSchema.methods.toJSON=function(){
    const product=this.toObject()
    const {__v,...others}=product
    return others
}

const Product = mongoose.model("Product", productSchema)

module.exports=Product