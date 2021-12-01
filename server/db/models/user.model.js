const {model,Schema}=require('mongoose')
const {isEmail,isStrongPassword,isCreditCard} =require('validator')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema=new Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'email is required'],
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!isEmail(value)) throw new Error('this email is used before')
        }
    },
    password:{
        type:String,
        required:[true,'password is required'],
        validate(value){
            if(!isStrongPassword(value)) throw new Error(
                'Use a strong password instead'
                )
        }
    },
    security:{
        securityQuestion:{
            type:String,
        },
        answer:{
            type:String,
        }
    },
    profilePic:{
        type:String,
        default:"uploads/noAvatar.png"
    },
    adress:{
        country:{
            type:String,
            default:'Egypt'
        },
        city:{
            type:String,
        },
        postalCode:{
            type:String
        },
        telephone:{
            type:String,
        }
    },
    paymentDetails:{
        balance:{
            type:Number,
        },creditCard:{
            type:String,
            validte(value){
                if(!isCreditCard(value)) throw new Error('invalid credit card')
            }
        }
    },
    tokens:[
        {
            token:{
                type:String
            },
        }
    ],
    role:{
        type:String, 
        enum:["Admin", "User"],
        required:true,
        default:"User"
    },
    position:{
        type:String,
        enum:["Manger","Assistant"],
        required: function(){ return this.role != "User" }
    },

},{timestamps:true})
userSchema.pre('save',async function(){
    if(this.isModified('password')) this.password=await bcrypt.hash(this.password,10)
})
userSchema.methods.toJSON=function(){
    const user=this.toObject()
    const {password,__v,...others}=user
    return others
}
userSchema.statics.loginUser=async function(email,password){
    let user = await this.findOne({ email }) 
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {  
            return user
        }
        throw Error('Incorrect Password')
    }
    throw Error('Incorrect E-mail')
}
userSchema.methods.generateToken=function(){
    let token=jwt.sign({_id:this._id},process.env.TOKEN)
    this.tokens=this.tokens.concat({token})
}
userSchema.virtual('userOrders',{
    ref:"Order",
    localField:"_id",
    foreignField:"userId"
})
userSchema.virtual('userCart',{
    ref:"Cart",
    localField:"_id",
    foreignField:"userId"
})

userSchema.virtual('userWishlist',{
    ref:"Wishlist",
    localField:"_id",
    foreignField:"userId"
})

const User=model('User',userSchema)
module.exports=User