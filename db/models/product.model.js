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
    category:{
        type:String,
        required:true,
        maxlength:20,
        trim:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        dafault:false
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        max:90
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports=Product