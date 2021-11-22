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
        }}
    ],
    image: {
        type: String,
        trim: true
    },
    inventoryQuantity:{
        type: Number,
        min: 1,
        required: true
    },
    discount:[
        {name:{
            type: String,
            trim:true,
            maxlength:20
        },
        description:{
            type:String,
            trim:true
        },
        percent:{
            type:Number,
            min:1
        },
        active:{
            type:Boolean,
            dafault:true
        }}
    ]
},{timestamps:true})
productSchema.methods.toJSON=function(){
    const product=this.toObject()
    const {__v,...others}=product
    return others
}

const Product = mongoose.model("Product", productSchema)

module.exports=Product