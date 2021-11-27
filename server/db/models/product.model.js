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
    sizes:[
        {
            size:{
                type:String,
                enum: ["small", "medium", "large",'x-large', 'x-xlarge'],
                required:true,
            },
            description:{
                type:String,
                default: "size of the product"
            }
        }
    ],
    colors:[
        {
            color:{
                type:String,
                required:true,
            },
            description:{
                type:String,
                default: "color of the product"
            }
        }
    ],
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
    mainImage:{
            type: String,
            trim: true,
            default: "https://www.psdstamps.com/wp-content/uploads/2019/11/round-new-product-stamp-png.png"
    },
    images:[
        {
            type: String,
            trim: true,
            default: "https://www.psdstamps.com/wp-content/uploads/2019/11/round-new-product-stamp-png.png"
        }
    ] ,
        inventoryQuantity:{
        type: Number,
        min: 1,
        required: true
    },
    discount:[
        {
        name:{
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
        }
    }
    ]
},{timestamps:true})
productSchema.methods.toJSON=function(){
    const product=this.toObject()
    const {__v,...others}=product
    return others
}
productSchema.virtual('productOrders',{
    ref:"Order",
    localField:"_id",
    foreignField:"productId"
})
productSchema.virtual('productCart',{
    ref:"Cart",
    localField:"_id",
    foreignField:"productId"
})
const Product = mongoose.model("Product", productSchema)

module.exports=Product